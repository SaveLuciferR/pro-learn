<?php

namespace app\controllers;

use app\models\User;
use core\App;
use core\Cache;
use core\Language;
use foroco\BrowserDetection;
use http\Header;
use PHPMailer\PHPMailer\PHPMailer;

/** @property User $model */

/** Контроллер общего доступа для работы с пользователями (регистрация, авторизация, профиль) */
class UserController extends AppController
{
    public function authAction()
    {
        echo json_encode(array(
            'auth' => $this->model->checkAuth(),
            'needActivateAccount' => $_SESSION['user_activation']['activate'] ?? false,
            'user' => isset($_SESSION['user']) ? $_SESSION['user'] : []
        ));
    }

    //TODO Сделать повторный посыл кода

    public function loginAction()
    {
        $userParam = json_decode(file_get_contents("php://input"), true);
//        debug($userParam, 1);
        if ($_SERVER['REQUEST_METHOD'] === 'POST' && $userParam) {
            if ($this->model->login($userParam, $userParam['rememberMe'])) {
                $_SESSION['user']['success'] = true;
                $_SESSION['user_activation'] = [];

//                $userDevice = [];
//                if (isset($_SERVER['REMOTE_ADDR'])) {
//                    $json = json_decode(file_get_contents(GEOIP . "/132.3.200.1")); // . $_SERVER['REMOTE_ADDR']
//                    $userDevice['ip'] = $json->ip;
//                    $userDevice['success'] = $json->success;
//                    if ($userDevice['success']) {
//                        $userDevice['city'] = $json->city;
//                        $userDevice['country'] = $json->country;
//                        $browser = new BrowserDetection();
//                        $userDevice['browser'] = $browser->getBrowser($_SERVER['HTTP_USER_AGENT']);
//                        $userDevice['browser'] = $userDevice['browser']['browser_title'];
//                        $userDevice['type'] = $browser->getDevice($_SERVER['HTTP_USER_AGENT']);
//                        $userDevice['type'] = $userDevice['type']['device_type'];
//                        $userDevice['OS'] = $browser->getOS($_SERVER['HTTP_USER_AGENT']);
//                        $userDevice['OS'] = $userDevice['OS']['os_title'];
//                    }
//                }

//                $_SESSION['user']['sessionID'] = $this->model->saveSession($userDevice, $_SESSION['user']['username']);
            } else {
                header('HTTP/1.0 401 Unauthorized');
                die;
            }


            echo json_encode(array('auth' => $this->model->checkAuth()));
        } elseif ($_SERVER['REQUEST_METHOD'] === 'GET') {
            $viewWords = Language::$langView;

            echo json_encode(array('viewWords' => $viewWords), JSON_UNESCAPED_SLASHES);
        } else {
            header('HTTP/1.0 400 Bad Request');
            die;
        }
    }

    public function registerAction()
    {
        $userParam = json_decode(file_get_contents("php://input"), true);
        if ($_SERVER['REQUEST_METHOD'] === 'POST' && $userParam) {
            // debug(App::$app->getProperties(), 1);

            $error = '';
            //TODO Если аккаунт уже есть, но он не подтвержден
            $userID = $this->model->newUser($userParam, $error);
            if ($userID !== false) {
                $code = $this->model->sendCode($userParam['mail'], $userParam['username'], $userID, $_SESSION['user_activation']);
                if ($code === false) {
                    $this->model->deleteUser($userID);
                    header('HTTP/1.0 400 Bad Request');
                    $error = "Невозможно отправить код с подтверждением на эту почту";
                    echo json_encode(array('error' => $error));
                    die;
                } else {
                    $this->model->setActivationCode($userID, $code);
                }

                echo json_encode(array('result' => true));
            } else {
                header('HTTP/1.0 400 Bad Request');
                if (str_contains($error, 'UniqueMail')) {
                    $error = "Эта почта уже существует";
                } else if (str_contains($error, 'UniqueUsername')) {
                    $error = "Этот пользователь уже существует";
                }
                echo json_encode(array('error' => $error));
            }
        } elseif ($_SERVER['REQUEST_METHOD'] === 'GET') {
            $viewWords = Language::$langView;

            echo json_encode(array('viewWords' => $viewWords), JSON_UNESCAPED_SLASHES);
        } else {
            header('HTTP/1.0 400 Bad Request');
            die;
        }
    }

    public function confirmAction()
    {
        $data = json_decode(file_get_contents("php://input"), true);
        if ($_SERVER['REQUEST_METHOD'] === 'POST' && $data) {
            $error = '';
            $success = $this->model->activateAccount($data, $error);
            if (!$success && str_contains($error, 'InCorrectCode')) {
                header('HTTP/1.0 400 Bad Request');
                $error = 'Не правильный код';
                echo json_encode(array('error' => $error));
                die;
            }
            $_SESSION['user_activation'] = [];
            echo json_encode(array('success' => $success));
        } else {
            header('HTTP/1.0 400 Bad Request');
            die;
        }
    }

    public function restoreVerifyCodeAction()
    {
        $data = json_decode(file_get_contents("php://input"), true);
        if ($_SERVER['REQUEST_METHOD'] === 'POST' && $data) {
            $error = '';
            $success = $this->model->checkRestoreCode($data, $error);
            if (!$success && str_contains($error, 'InCorrectCode')) {
                header('HTTP/1.0 400 Bad Request');
                $error = 'Не правильный код';
                echo json_encode(array('error' => $error));
                die;
            }
            echo json_encode(array('success' => $success));
        } else {
            header('HTTP/1.0 400 Bad Request');
            die;
        }
    }

    public function restorePasswordAction()
    {
        $data = json_decode(file_get_contents("php://input"), true);
        if ($_SERVER['REQUEST_METHOD'] === 'POST' && $data) {
            $error = '';
            $success = $this->model->changePassword($data, $error);
            if ($success) {
                $_SESSION['user_restore'] = [];
            }
            echo json_encode(array('success' => $success));
        } else {
            header('HTTP/1.0 400 Bad Request');
            die;
        }
    }

    public function resendCodeAction()
    {
        $_POST = json_decode(file_get_contents("php://input"), true);
        if ($_SERVER['REQUEST_METHOD'] === 'POST' && $_POST) {
            if ($_POST['type'] === 'restore') {
                $user = $this->model->getUserByMail($_SESSION['user_restore']['mail']);
                $code = $this->model->sendCode($user['mail'], $user['username'], $user['id'], $_SESSION['user_restore']);
                if ($code === false) {
                    header('HTTP/1.0 400 Bad Request');
                    $error = "Невозможно отправить код с подтверждением на эту почту";
                    echo json_encode(array('error' => $error));
                    die;
                } else {
                    $this->model->setChangeCode($user['id'], $code);
                }
            } else if ($_POST['type'] === 'create') {
                $user = $this->model->getUserByMail($_SESSION['user_activation']['mail']);
                $code = $this->model->sendCode($user['mail'], $user['username'], $user['id'], $_SESSION['user_activation']);
                if ($code === false) {
                    header('HTTP/1.0 400 Bad Request');
                    $error = "Невозможно отправить код с подтверждением на эту почту";
                    echo json_encode(array('error' => $error));
                    die;
                } else {
                    $this->model->setActivationCode($user['id'], $code);
                }
            }
        }
    }

    public function sendCodeRestoreAction()
    {
        $userParam = json_decode(file_get_contents("php://input"), true);
        if ($_SERVER['REQUEST_METHOD'] === 'POST' && $userParam) {
            $error = '';
            //TODO Если аккаунт уже есть, но он не подтвержден
            $user = $this->model->getUserByMail($userParam['mail']);
            if ($user) {
                $code = $this->model->sendCode($userParam['mail'], $user['username'], $user['id'], $_SESSION['user_restore']);
                if ($code === false) {
                    header('HTTP/1.0 400 Bad Request');
                    $error = "Невозможно отправить код с подтверждением на эту почту";
                    echo json_encode(array('error' => $error));
                    die;
                } else {
                    $this->model->setChangeCode($user['id'], $code);
                }
                echo json_encode(array('result' => true));
            } else {
                header('HTTP/1.0 400 Bad Request');
                $error = "Пользователя не существует";
                echo json_encode(array('error' => $error));
            }
        } elseif ($_SERVER['REQUEST_METHOD'] === 'GET') {
            $viewWords = Language::$langView;

            echo json_encode(array('viewWords' => $viewWords), JSON_UNESCAPED_SLASHES);
        } else {
            header('HTTP/1.0 400 Bad Request');
            die;
        }
    }

    public function logoutAction()
    {
        if (isset($_SESSION['user'])) {
            unset($_SESSION['user']);
        }
    }

    public function feedbackAction()
    {
        $userParam = json_decode(file_get_contents("php://input"), true);

        if ($userParam) {
            debug($userParam, 1);
        }
    }

    public function uploadAvatarAction()
    {
        if (!(isset($_SESSION['user']) && $_SESSION['user']['username'] === $this->route['username'])) {
            header('HTTP/1.0 404 Not Found');
            die;
        }

        if (isset($_FILES['img'])) {

            $mas = ['profile', $_SESSION['user']['username'], date('Y', time()), date('m', time())];
            $endPath = WWW . '/uploads';

            foreach ($mas as $k => $v) {
                $endPath .= '/' . $v;
                if (!file_exists($endPath)) {
                    mkdir($endPath);
                }
            }

//            $endPath = WWW . '/uploads/profile/' . $_SESSION['user']['username'] . '/' . date('Y', time()) . '/' . date('m', time()) . '/' . $_FILES['img']['name'];
            move_uploaded_file($_FILES['img']['tmp_name'], $endPath . '/' . $_FILES['img']['name']);
            $url = UPLOADS . '/profile' . '/' . $_SESSION['user']['username'] . '/' . date('Y', time()) . '/' . date('m', time()) . '/' . $_FILES['img']['name'];
            echo json_encode(array('url' => $url));
            return;
        }

        echo json_encode(array('url' => ''));
    }

    public function profileAction()
    {
        $profileInfo = $this->model->getUserInfo($this->route['username']);
        if (!$profileInfo) {
            header($_SERVER['SERVER_PROTOCOL'] . ' 404 Not Found', true, 404);
            die;
        }
        $profileInfo['date_of_registration'] = date('d.m.Y', strtotime($profileInfo['date_of_registration']));

        $profileInfo['projects'] = $this->model->getUserProjects($this->route['username']);
        foreach ($profileInfo['projects'] as $k => $v) {
            $profileInfo['projects'][$k]['date_of_publication'] = date('d.m.Y', strtotime($v['date_of_publication']));
        }

        $userCourse = $this->model->getUserCourses($this->route['username'], App::$app->getProperty('language')['id']);
        foreach ($userCourse as $k => $v) {
            $userCourse[$k]['date_of_publication'] = date('d.m.Y', strtotime($v['date_of_publication']));
            $userCourse[$k]['tags'] = $this->model->getCourseTagByID($k);
            $userCourse[$k]['language'] = $this->model->getCourseLangProgByID($k);
        }

        // Сортировка курсов на текущие и пройденнык
        $profileInfo['completeCourse'] = [];
        $profileInfo['currentCourse'] = [];
        foreach ($userCourse as $k => $v) {
            if ($v['success']) {
                $v['current_stage'] = $v['amount_stage'];
                array_push($profileInfo['completeCourse'], $v);
            } else {
                array_push($profileInfo['currentCourse'], $v);
            }
        }

        if (!(isset($_SESSION['user']) && $_SESSION['user']['username'] === $this->route['username'])) {

            // если весь профиль приватен, то сразу возвращает с базовой информацией массив
            if ($profileInfo['all_profile_private']) {
                unset($profileInfo['last_name']);
                unset($profileInfo['first_name']);
                unset($profileInfo['about_user']);
                unset($profileInfo['projects']);
                unset($profileInfo['country_address']);
                unset($profileInfo['completeCourse']);
                unset($profileInfo['currentCourse']);

                echo json_encode(array('profileInfo' => $profileInfo), JSON_UNESCAPED_SLASHES);

                return;
            }

            if ($profileInfo['look_current_course_private']) {
                unset($profileInfo['completeCourse']);
                unset($profileInfo['currentCourse']);
            }

            if ($profileInfo['personal_info_private']) {
                unset($profileInfo['last_name']);
                unset($profileInfo['first_name']);
                unset($profileInfo['about_user']);
                unset($profileInfo['country_address']);
            }

            // Сортировка проектов
            foreach ($profileInfo['projects'] as $k => $v) {
                if ($v['private']) unset($profileInfo['projects'][$k]);
            }
            $profileInfo['projects'] = array_values($profileInfo['projects']);
        }


//        debug($profileInfo, 1);
        echo json_encode(array('profileInfo' => $profileInfo, 'viewWords' => Language::$langView), JSON_UNESCAPED_SLASHES);
    }

    public function projectListAction()
    {
        $user = $this->model->getUserInfo($this->route['username']);
        if (!$user) {
            header($_SERVER['SERVER_PROTOCOL'] . ' 404 Not Found', true, 404);
            die;
        }

        $projects = $this->model->getUserProjects($this->route['username']);
        if (!(isset($_SESSION['user']) && $_SESSION['user']['username'] === $this->route['username'])) {
            foreach ($projects as $k => $v) {
                if ($v['private']) unset($projects[$k]);
            }
        }

        $projects = array_values($projects);

        echo json_encode(array('projects' => $projects), JSON_UNESCAPED_SLASHES);
    }

    public function templateListAction()
    {
        $user = $this->model->getUserInfo($this->route['username']);
        if (!$user) {
            header($_SERVER['SERVER_PROTOCOL'] . ' 404 Not Found', true, 404);
            die;
        }

        $templates = $this->model->getUserTemplate($user['id'], App::$app->getProperty('language')['id']);
        if (!(isset($_SESSION['user']) && $_SESSION['user']['username'] === $this->route['username'])) {
            foreach ($templates as $k => $v) {
                if ($v['private']) unset($templates[$k]);
            }
        } else if (isset($_GET['type']) && $_GET['type'] === 'all') {
            $otherTemplates = $this->model->getUserOtherTemplate(App::$app->getProperty('language')['id']);
            $templates = array_merge($otherTemplates, $templates);
            //            $templates = [];
            $templates = array_values(array_column($templates, null, 'slug'));
        }

        echo json_encode(array('templates' => $templates), JSON_UNESCAPED_SLASHES);
    }

    public function courseListAction()
    {
        $user = $this->model->getUserInfo($this->route['username']);
        if (!$user) {
            header($_SERVER['SERVER_PROTOCOL'] . ' 404 Not Found', true, 404);
            die;
        }

        $courses = $this->model->getUserCourses($this->route['username'], App::$app->getProperty('language')['id']);
        foreach ($courses as $k => $v) {
            $courses[$k]['date_of_publication'] = date('d.m.Y', strtotime($v['date_of_publication']));
            $courses[$k]['tags'] = $this->model->getCourseTagByID($k);
            $courses[$k]['language'] = $this->model->getCourseLangProgByID($k);
        }

        echo json_encode(array('courses' => $courses), JSON_UNESCAPED_SLASHES);
    }

    public function courseFromUserAction()
    {
        $user = $this->model->getUserInfo($this->route['username']);
        if (!$user) {
            header($_SERVER['SERVER_PROTOCOL'] . ' 404 Not Found', true, 404);
            die;
        }

        $courses = $this->model->getUserCoursesFromUser($this->route['username'], App::$app->getProperty('language')['id']);
        foreach ($courses as $k => $v) {
            if ($v['date_of_publication']) {
                $courses[$k]['date_of_publication'] = date('d.m.Y', strtotime($v['date_of_publication']));
            }
            $courses[$k]['tags'] = $this->model->getCourseTagByID($k);
            $courses[$k]['language'] = $this->model->getCourseLangProgByID($k);
        }

        echo json_encode(array('courses' => $courses), JSON_UNESCAPED_SLASHES);
    }

    public function taskFromUserAction()
    {
        $user = $this->model->getUserInfo($this->route['username']);
        if (!$user) {
            header($_SERVER['SERVER_PROTOCOL'] . ' 404 Not Found', true, 404);
            die;
        }

        $tasks = $this->model->getUserTasksFromUser($this->route['username'], App::$app->getProperty('language')['id']);
        foreach ($tasks as $k => $v) {
            $tasks[$k]['date_of_publication'] = date('d.m.Y', strtotime($v['date_of_publication']));
            $tasks[$k]['tags'] = $this->model->getTaskTagByID($k);
            $tasks[$k]['language'] = $this->model->getTaskLangProgByID($k);
        }

        echo json_encode(array('tasks' => $tasks), JSON_UNESCAPED_SLASHES);
    }

    public function templateToProjectAction()
    {
        if (!(isset($_SESSION['user']) && $_SESSION['user']['username'] === $this->route['username'])) {
            header('HTTP/1.0 404 Not Found');
            die;
        }

        $_POST = json_decode(file_get_contents("php://input"), true);
        $slug = '';
        if (!empty($_POST)) {
            $template = $this->model->getTemplateByID($_POST['template']);
            if (!$template) {
                header('HTTP/1.0 404 Not Found');
                die;
            }
            Cache::getInstance()->setCache($_SESSION['user']['username'] . '/' . md5(session_id()), PROJECT_CACHE . '/' . md5($_SESSION['user']['username']) . '/' . md5(session_id()));
            $this->pushProjectInCache(false, array('slug' => session_id()), TEMPLATE . '/' . $template['username'] . '/' . $template['slug']);
            if ($_POST['isCreate']) {
                $slug = $this->model->createProjectWithName($_POST['titleProject'], Cache::getInstance()->getCache($_SESSION['user']['username'] . '/' . md5(session_id())));
                Cache::getInstance()->deleteCache($_SESSION['user']['username'] . '/' . md5(session_id()));
            }
        }

        echo json_encode(array('slug' => $slug));
    }

    public function taskListAction()
    {
        $user = $this->model->getUserInfo($this->route['username']);
        if (!$user) {
            header($_SERVER['SERVER_PROTOCOL'] . ' 404 Not Found', true, 404);
            die;
        }

        $tasks = $this->model->getUserTasks($this->route['username'], App::$app->getProperty('language')['id']);
        foreach ($tasks as $k => $v) {
            $tasks[$k]['date_of_publication'] = date('d.m.Y', strtotime($v['date_of_publication']));
            $tasks[$k]['tags'] = $this->model->getTaskTagByID($k);
            $tasks[$k]['language'] = $this->model->getTaskLangProgByID($k);
        }

        echo json_encode(array('tasks' => $tasks), JSON_UNESCAPED_SLASHES);
    }

    public function templateAction()
    {
        $path = "";
        $templateTemp = $this->model->getTemplateInfoBySlugByLang(App::$app->getProperty('language')['id'], $this->route['slug'], $this->route['username']);

        if (!$templateTemp) {
            header($_SERVER['SERVER_PROTOCOL'] . ' 404 Not Found Project', true, 404);
            die;
        }

        $filesProject = isset($this->route['secondaryPath']) ?
            $this->model->getFilesProject(true, $templateTemp, $path, $this->route['secondaryPath']) :
            $this->model->getFilesProject(true, $templateTemp, $path);

        if ($filesProject === false) {
            header($_SERVER['SERVER_PROTOCOL'] . ' 404 Not Found', true, 404);
            die;
        }

        $template = [];
        $template['info'] = $templateTemp;

//        $projectInfo['languagesProgProject'] = $this->model->getProjectLangsByID($project['id']);
//        $projectInfo['info'] = $project;


        $readmeFile = "";

        if (file_exists($path . "/README.md")) {
            $readmeFile = file_get_contents($path . "/README.md");
        }

        echo json_encode(array('template' => $template, 'filesInfo' => $filesProject, 'readmeFile' => $readmeFile), JSON_UNESCAPED_SLASHES);
    }

    public function projectAction()
    {
        $path = "";
        $project = $this->model->getProjectInfoBySlug($this->route['slug'], $this->route['username']);

        if (!$project) {
            header($_SERVER['SERVER_PROTOCOL'] . ' 404 Not Found Project', true, 404);
            die;
        }

        $project['date_of_publication'] = date('d.m.Y', strtotime($project['date_of_publication']));

        $filesProject = isset($this->route['secondaryPath']) ?
            $this->model->getFilesProject(false, $project, $path, $this->route['secondaryPath']) :
            $this->model->getFilesProject(false, $project, $path);

        if ($filesProject === false) {
            header($_SERVER['SERVER_PROTOCOL'] . ' 404 Not Found', true, 404);
            die;
        }

        $projectInfo = [];

        $projectInfo['languagesProgProject'] = $this->model->getProjectLangsByID($project['id']);
        $projectInfo['info'] = $project;


        $readmeFile = "";

        if (file_exists($path . "/README.md")) {
            $readmeFile = file_get_contents($path . "/README.md");
        }

        echo json_encode(array('projectInfo' => $projectInfo, 'filesInfo' => $filesProject, 'readmeFile' => $readmeFile), JSON_UNESCAPED_SLASHES);
    }

    public function projectDownloadAction()
    {
        $project = $this->model->getProjectInfoBySlug($this->route['slug'], $this->route['username']);

        if (!$project) {
            header($_SERVER['SERVER_PROTOCOL'] . ' 404 Not Found Project', true, 404);
            die;
        }

        $rootPath = USER_PROJECT . '/' . $this->route['username'] . '/' . $this->route['slug'];
        $fileName = $this->route['username'] . '-' . $this->route['slug'] . '.zip';
        $dist = DOWNLOAD_CACHE . '/' . $fileName;
        $zip = new \ZipArchive();
        if ($zip->open($dist, \ZipArchive::CREATE | \ZipArchive::OVERWRITE)) {
            $files = new \RecursiveIteratorIterator(
                new \RecursiveDirectoryIterator($rootPath),
                \RecursiveIteratorIterator::LEAVES_ONLY
            );

//            debug($dist, 1);

            foreach ($files as $name => $file) {
                if (!$file->isDir()) {
//                    debug($name, 1);
                    $filePath = $file->getRealPath();
                    $relativePath = substr($filePath, strlen($rootPath) + 1);
                    $zip->addFile($filePath, $relativePath);
                }
            }
            if ($zip->close()) {
                header('Content-Type: application/zip');
                header('Content-Disposition: attachment; filename="' . basename($dist) . '"');
                readfile($dist);
            }
        }

//        echo json_encode(array('downloadUrl' => $dist, 'fileName' => $fileName));
    }

    public function projectDeleteAction()
    {
        if (!(isset($_SESSION['user']) && $_SESSION['user']['username'] === $this->route['username'])) {
            header('HTTP/1.0 404 Not Found');
            die;
        }

        echo json_encode(array('success' => $this->model->deleteProject($_SESSION['user']['id'], $_SESSION['user']['username'], $this->route['slug'])));
    }

    public function addProjectAction()
    {
        if (!(isset($_SESSION['user']) && $_SESSION['user']['username'] === $this->route['username'])) {
            header('HTTP/1.0 404 Not Found');
            die;
        }

//        $this->deleteAllCacheProject();

        $cache = Cache::getInstance();

//        $_POST = json_decode(file_get_contents("php://input"), true);
        if (!empty($_POST)) {
//            $files = $_POST['uploadInfoFiles'];

//            $mainFolder = $_POST['mainFolderProject'];
            $files = $_FILES;
            $username = $_SESSION['user']['username'];
            $newProject = $_POST['newProject'];

            //TODO: Сделать так, чтобы проект пользователя сохранялся лишь по его нику из роутера в кеш.

            $userCacheProjectFolder = PROJECT_CACHE . "/" . md5($username);
            if (!is_dir($userCacheProjectFolder)) {
                mkdir($userCacheProjectFolder);
            }

            $folder = md5(session_id());
//            debug($folder);
            if (isset($_POST['template']) && $_POST['template']) {
                $folder = md5('template') . $folder;
//                debug($folder);
            }

            $userCacheProjectFolder .= "/" . $folder;
            if (!is_dir($userCacheProjectFolder)) {
                mkdir($userCacheProjectFolder);
            }
            $keyCache = $username . '/' . $folder;
            $data = '';

            if ((!$newProject) && (!$cache->getCache($keyCache, $data))) { // Не новый проект и закончился кеш
                $this->deleteDirectoryProject($data);
            } else if ($newProject) { // Новый проект
                // debug($files, 1);
                $this->pushProject($cache, $keyCache, $folder, $userCacheProjectFolder, $files);
            } else { // Не новый проект и кеш не закончилсяx
                $this->pushProject($cache, $keyCache, $folder, $userCacheProjectFolder, $files);
            }
        }
    }

    public function saveNewTemplateAction()
    {
        if (!(isset($_SESSION['user']) && $_SESSION['user']['username'] === $this->route['username'])) {
            header('HTTP/1.0 404 Not Found');
            die;
        }

        $_POST = json_decode(file_get_contents("php://input"), true);
        if (!empty($_POST)) {
            $projectPath = Cache::getInstance()->getCache($_POST['username'] . '/' . md5('template') . md5(session_id()));

            $data = [];
            $data['info'] = $_POST['infoTemplate'];
            $data['forProject'] = $_POST['forProject'];
            $data['private'] = $_POST['privacyProject'];

            $slug = $this->model->saveNewTemplate($data, $projectPath, $_POST['username']);
            if (!$slug) {
                header($_SERVER['SERVER_PROTOCOL'] . ' 400 Not Found', true, 400);
                die;
            }

            Cache::getInstance()->deleteCache($_POST['username'] . '/' . md5('template') . md5(session_id()));
            // rmdir(PROJECT_CACHE . '/' . md5($_POST['username']) . '/' . md5($_POST['mainFolderProject']));
//            rmdir(PROJECT_CACHE . '/' . md5($_POST['username']));

            echo json_encode(array('slug' => $slug));
        }
    }

    public function saveNewProjectAction()
    {
        if (!(isset($_SESSION['user']) && $_SESSION['user']['username'] === $this->route['username'])) {
            header('HTTP/1.0 404 Not Found');
            die;
        }

        $_POST = json_decode(file_get_contents("php://input"), true);
        if (!empty($_POST)) {
            $projectPath = Cache::getInstance()->getCache($_POST['username'] . '/' . md5(session_id()));

            $data = [];
            $data['title'] = $_POST['nameProject'];
            $data['desc'] = $_POST['descProject'];
            $data['private'] = $_POST['privacyProject'];

            $slug = $this->model->saveNewProject($data, $projectPath, $_POST['username']);
            if (!$slug) {
                header($_SERVER['SERVER_PROTOCOL'] . ' 400 Not Found', true, 400);
                die;
            }

            Cache::getInstance()->deleteCache($_POST['username'] . '/' . md5(session_id()));
            // rmdir(PROJECT_CACHE . '/' . md5($_POST['username']) . '/' . md5($_POST['mainFolderProject']));
//            rmdir(PROJECT_CACHE . '/' . md5($_POST['username']));

            echo json_encode(array('slug' => $slug));
        }
    }

    public function saveEditTemplateAction()
    {
        if (!(isset($_SESSION['user']) && $_SESSION['user']['username'] === $this->route['username'])) {
            header('HTTP/1.0 404 Not Found');
            die;
        }

        $_POST = json_decode(file_get_contents("php://input"), true);
        if (!empty($_POST)) {

            $projectPath = Cache::getInstance()->getCache($_POST['username'] . '/' . md5('template') . md5($this->route['slug']));

            $data = [];
            $data['info'] = $_POST['infoTemplate'];
            $data['forProject'] = $_POST['forProject'];
            $data['private'] = $_POST['privacyProject'];
            $data['slug'] = $this->route['slug'];

            $slug = $this->model->editTemplate($data, $projectPath, $_POST['username']);
            if (!$slug) {
                header($_SERVER['SERVER_PROTOCOL'] . ' 400 Not Found', true, 400);
                die;
            }
            Cache::getInstance()->deleteCache($_POST['username'] . '/' . md5('template') . md5($this->route['slug']));
            // rmdir(PROJECT_CACHE . '/' . md5($_POST['username']) . '/' . md5($_POST['mainFolderProject']));
//            rmdir(PROJECT_CACHE . '/' . md5($_POST['username']));

            echo json_encode(array('slug' => $slug));
        }
    }

    public function saveEditProjectAction()
    {
        if (!(isset($_SESSION['user']) && $_SESSION['user']['username'] === $this->route['username'])) {
            header('HTTP/1.0 404 Not Found');
            die;
        }

        $_POST = json_decode(file_get_contents("php://input"), true);
        if (!empty($_POST)) {

            $projectPath = Cache::getInstance()->getCache($_POST['username'] . '/' . md5($this->route['slug']));

            $data = [];
            $data['title'] = $_POST['nameProject'];
            $data['desc'] = $_POST['descProject'];
            $data['private'] = $_POST['privacyProject'];
            $data['slug'] = $this->route['slug'];

            $slug = $this->model->editProject($data, $projectPath, $_POST['username']);
            if (!$slug) {
                header($_SERVER['SERVER_PROTOCOL'] . ' 400 Not Found', true, 400);
                die;
            }
            Cache::getInstance()->deleteCache($_POST['username'] . '/' . md5($this->route['slug']));
            // rmdir(PROJECT_CACHE . '/' . md5($_POST['username']) . '/' . md5($_POST['mainFolderProject']));
//            rmdir(PROJECT_CACHE . '/' . md5($_POST['username']));

            echo json_encode(array('slug' => $slug));
        }
    }

    public function templateForEditAction()
    {
        if (!(isset($_SESSION['user']) && $_SESSION['user']['username'] === $this->route['username'])) {
            header('HTTP/1.0 404 Not Found');
            die;
        }


        $template = $this->model->getTemplateInfoBySlug($this->route['slug'], $_SESSION['user']['id']);
        $cache = Cache::getInstance();
        $keyCache = $_SESSION['user']['username'] . '/' . md5('template') . md5($template['slug']);
        $cache->setCache($keyCache, PROJECT_CACHE . '/' . md5($_SESSION['user']['username']) . '/' . md5('template') . md5($template['slug']), 3600);
        $this->pushProjectInCache(true, $template, TEMPLATE . '/' . $_SESSION['user']['username'] . '/' . $this->route['slug']);

        echo json_encode(array('template' => $template), JSON_UNESCAPED_SLASHES);
    }

    public function projectForEditAction()
    {
        if (!(isset($_SESSION['user']) && $_SESSION['user']['username'] === $this->route['username'])) {
            header('HTTP/1.0 404 Not Found');
            die;
        }


        $project = $this->model->getProjectInfoBySlug($this->route['slug'], $this->route['username']);
        $cache = Cache::getInstance();
        $keyCache = $_SESSION['user']['username'] . '/' . md5($project['slug']);
        $cache->setCache($keyCache, PROJECT_CACHE . '/' . md5($_SESSION['user']['username']) . '/' . md5($project['slug']), 3600);
        $this->pushProjectInCache(false, $project, USER_PROJECT . '/' . $_SESSION['user']['username'] . '/' . $this->route['slug']);

        echo json_encode(array('project' => $project), JSON_UNESCAPED_SLASHES);
    }

    public function feedbackCategoryAction()
    {
        $categories = $this->model->getFeedbackCategory(App::$app->getProperty('language')['id']);
        echo json_encode(array('categories' => $categories));
    }

    public function saveFeedbackAction()
    {
        $_POST = json_decode(file_get_contents("php://input"), true);
        //        debug($_POST, 1);
        if (!empty($_POST)) {
            $data['name'] = $_POST['name'];
            $data['email'] = $_POST['email'];
            $data['category'] = $_POST['currentFeedbackCategory']['id'];
            $data['message'] = $_POST['message'];

            $feedback = $this->model->saveFeedback($data);
            if (!$feedback) {
                header('HTTP/1.0 400 Bad Request');
                die;
            }
        }
    }

    public function addNewFilesAction()
    {
        if (!(isset($_SESSION['user']) && $_SESSION['user']['username'] === $this->route['username'])) {
            header('HTTP/1.0 404 Not Found');
            die;
        }

//        $_POST = json_decode(file_get_contents("php://input"), true);
//        debug($_POST, 1);
        if (!empty($_POST) && $_FILES) {
            $cache = Cache::getInstance();

            $folder = $_POST['type'] === 'edit' ? md5($_POST['slug']) : md5(session_id());
            if (isset($_POST['template']) && $_POST['template']) {
                $folder = md5('template') . $folder;
            }

            $pathProject = $cache->getCache($_SESSION['user']['username'] . '/' . $folder) . $_POST['secondaryPathProject'];

            foreach ($_FILES['newFilesInfo']['tmp_name'] as $k => $v) {
                move_uploaded_file($v, $pathProject . $_FILES['newFilesInfo']['name'][$k]);
            }
//            foreach ($_POST['newFilesInfo'] as $k => $v) {
//                if ($v['path'] !== 'undefined') {
//                    foreach ($v['path'] as $key => $folder) {
//                        if ($folder === 'undefined') {
//                            continue;
//                        }
//
//                        if (is_dir($pathProject . '/' . $folder)) {
//                            $pathProject = $pathProject . '/' . $folder;
//                        }
//                    }
//                }
//
//                $v_parts = explode(";base64,", $v['content']);
//                //                debug($v_parts[1]);
//
//                file_put_contents($pathProject . '/' . $v['fileName'], base64_decode($v_parts[1]));
//            }
        }
    }

    public function deleteFileAction()
    {
        if (!(isset($_SESSION['user']) && $_SESSION['user']['username'] === $this->route['username'])) {
            header('HTTP/1.0 404 Not Found');
            die;
        }

        $_POST = json_decode(file_get_contents("php://input"), true);
        if (!empty($_POST)) {
            $cache = Cache::getInstance();
            $folder = $_POST['type'] === 'edit' ? md5($_POST['slug']) : md5(session_id());
            if (isset($_POST['template']) && $_POST['template']) {
                $folder = md5('template') . $folder;
            }

            $pathProject = $cache->getCache($_SESSION['user']['username'] . '/' . $folder);

            if (is_dir($pathProject . $_POST['path'])) {
                $this->deleteDirectoryProject($pathProject . $_POST['path']);
            } else {
                unlink($pathProject . $_POST['path']);
            }
        }
    }

    public function getProjectInCacheAction()
    {
        if (!(isset($_SESSION['user']) && $_SESSION['user']['username'] === $this->route['username'])) {
            header('HTTP/1.0 404 Not Found');
            die;
        }

        $_POST = json_decode(file_get_contents("php://input"), true);
        if (!empty($_POST)) {

//            $mainFolder = $_POST['mainFolderProject'];
            $username = $_POST['username'];

            $folder = $_POST['type'] === 'edit' ? md5($_POST['slug']) : md5(session_id());
            if (isset($_POST['template']) && $_POST['template']) {
                $folder = md5('template') . $folder;
//                debug($folder);
            }

            // debug($files, 1);
            $keyCache = $username . '/' . $folder;
            $cache = Cache::getInstance();
            if (!$cache->getCache($keyCache)) {
                header('HTTP/1.0 404 Not Found');
                die;
            }

            $path = "";

            $filesProject = isset($_POST['secondaryPathProject']) ?
                $this->model->getFilesProjectInCache($keyCache, $path, $_POST['secondaryPathProject']) :
                $this->model->getFilesProjectInCache($keyCache, $path);


            // $readmeFile = "";

            // if (file_exists($path . "/README.md")) {
            //     $readmeFile = file_get_contents($path . "/README.md");
            //     // debug($readmeFile, 1);
            // }

            // debug($path, 1); 'readmeFile' => $readmeFile

            // debug($filesProject, 1);

            echo json_encode(array('filesInfo' => $filesProject), JSON_UNESCAPED_SLASHES);
        }
    }

    public function generalAction()
    {
        $profileGeneral['errorUpdate'] = "";
        $profileGeneral['success'] = false;
        if (isset($_SESSION['user']) && $_SESSION['user']['username'] == $this->route['username']) {
            if ($_SERVER['REQUEST_METHOD'] == 'POST') {
                $_POST = json_decode(file_get_contents("php://input"), true);
                if (!empty($_POST)) {
                    //                    debug($_POST, 1);
                    $data['username'] = $_POST['username'];
                    $data['avatar_img'] = $_POST['avatar_img'];
                    $data['heading_img'] = $_POST['heading_img'];
                    $data['about_user'] = $_POST['about_user'];
                    $data['last_name'] = $_POST['last_name'];
                    $data['first_name'] = $_POST['first_name'];
                    $data['country_address'] = $_POST['country_address'];
                    //                    debug($data, 1);

                    $updateTable = $this->model->updateNewGenericUserSettings($data, $_SESSION['user']['id']);
                    //                    debug($updateTable, 1);
                    if ($updateTable !== true && str_contains($updateTable, 'UniqueUsername')) {
                        header('HTTP/1.0 400 UniqueUsername');
                        die;
                    }
                }
            }

            $profile = $this->model->getGeneralSettingsByUser($_SESSION['user']['username']);
            $profileGeneral = array_merge($profile, $profileGeneral);
            $profileGeneral['success'] = true;

            echo json_encode(array('profile_general' => $profileGeneral, 'viewWords' => Language::$langView), JSON_UNESCAPED_SLASHES);
        } else {
            header('HTTP/1.0 404 Not Found');
            die;
        }
    }

    public function securityAction()
    {
        $flag = true;
        $profileSecurity['errorUpdate'] = "";
        if (isset($_SESSION['user']) && $_SESSION['user']['username'] == $this->route['username']) {
            if ($_SERVER['REQUEST_METHOD'] == 'POST') {
                $_POST = json_decode(file_get_contents("php://input"), true);
                if (!empty($_POST)) {
                    if (isset($_POST['new_password'])) {
                        $data['old_password'] = $_POST['old_password'];
                        $data['new_password'] = $_POST['new_password'];

                        $updateTable = $this->model->updatePasswordUserSettings($data, $_SESSION['user']['id']);
                        if ($updateTable === 'InCorrectPassword') {
                            header('HTTP/1.0 400 InCorrectPassword');
                            die;
                        }
                    } else {
                        $data['mail'] = $_POST['mail'];
                        $data['second_mail'] = $_POST['second_mail'];
                        $updateTable = $this->model->updateSecurityUserSettings($data, $_SESSION['user']['id']);

                        if ($updateTable !== true && str_contains($updateTable, 'UniqueMail')) {
                            header('HTTP/1.0 400 UniqueMail');
                            die;
                        }
                    }
                }
            }
            $profile = $this->model->getSecuritySettingsByUser($_SESSION['user']['username']);
            $profileSecurity = array_merge($profile, $profileSecurity);
            $profileSecurity['success'] = $flag;
        } else {
            header('HTTP/1.0 404 Not Found');
            die;
        }

        echo json_encode(array('profile_security' => $profileSecurity, 'viewWords' => Language::$langView), JSON_UNESCAPED_SLASHES);
    }

    public function sessionAction()
    {
        $profileSessions = [];
        $profileSessions['success'] = false;
        if (isset($_SESSION['user']) && $_SESSION['user']['username'] == $this->route['username']) {
            if ($_SERVER['REQUEST_METHOD'] == 'POST') {
                $_POST = json_decode(file_get_contents("php://input"), true);
                if (!empty($_POST)) {
                    $this->model->deleteSession($_POST['id']);
                }
            }

            $profileSessions['session'] = $this->model->getSessions($_SESSION['user']['username']);
            $profileSessions['success'] = true;

            echo json_encode(array('profile_sessions' => $profileSessions), JSON_UNESCAPED_SLASHES);
        } else {
            header('HTTP/1.0 404 Not Found');
            die;
        }
    }

    public function createdByUserAction()
    {
        $profileCreated = [];
        $profileCreated['success'] = false;
        $profileCreated['created'] = [];
        if (isset($_SESSION['user']) && $_SESSION['user']['username'] == $this->route['username']) {
            $type = 'course';
            if (isset($_GET['type'])) {
                $type = $_GET['type'];
            }
            $created = [];
            if ($type == 'blog') {
                $created = $this->model->getBlogCreatedUser($_SESSION['user']['username'], App::$app->getProperty('language')['id']);
            } else if ($type == 'task') {
                $created = $this->model->getTaskCreatedUser($_SESSION['user']['username'], App::$app->getProperty('language')['id']);
            } else {
                $created = $this->model->getCourseCreatedUser($_SESSION['user']['username'], App::$app->getProperty('language')['id']);
            }

            $profileCreated['success'] = true;
            $profileCreated['created'] = $created;

            echo json_encode(array('profile_created' => $profileCreated), JSON_UNESCAPED_SLASHES);
        } else {
            header('HTTP/1.0 404 Not Found');
            die;
        }
    }

    public function privacyAction()
    {
        $profilePrivacy = [];
        $profilePrivacy['success'] = false;
        $profilePrivacy['privacy'] = [];
        if (isset($_SESSION['user']) && $_SESSION['user']['username'] == $this->route['username']) {
            if ($_SERVER['REQUEST_METHOD'] == 'POST') {
                $_POST = json_decode(file_get_contents("php://input"), true);
                if (!empty($_POST)) {
                    $data['all_profile_private'] = $_POST['all_profile_private'];
                    $data['personal_info_private'] = $_POST['personal_info_private'];
                    $data['look_current_course_private'] = $_POST['look_current_course_private'];
                    $updateTable = $this->model->savePrivacySettingUser($data, $_SESSION['user']['id']);
                }
            }

            $privacy = $this->model->getUserPrivacy($_SESSION['user']['username']);
            $profilePrivacy['success'] = true;
            $profilePrivacy['privacy'] = $privacy;
        } else {
            header('HTTP/1.0 404 Not Found');
            die;
        }

        echo json_encode(array('profile_privacy' => $profilePrivacy, 'viewWords' => Language::$langView), JSON_UNESCAPED_SLASHES);
    }

    public function typeLessonAction()
    {
        $type = $this->model->getTypeLesson(App::$app->getProperty('language')['id']);

        echo json_encode(array('type_course' => $type), JSON_UNESCAPED_SLASHES);
    }

    public function categoryLangProgAction()
    {
        $categoryLang = $this->model->getCategoryLang(App::$app->getProperty('language')['id']);
        $langProg = $this->model->getLangProg();

        echo json_encode(array('category_lang' => $categoryLang, 'lang_prog' => $langProg), JSON_UNESCAPED_SLASHES);
    }

    public function createCourseAction()
    {
        $result = [];
        $result['success'] = false;
        if (isset($_SESSION['user']) && $_SESSION['user']['username'] == $this->route['username'] && $_SERVER['REQUEST_METHOD'] == 'POST') {
            $_POST = json_decode(file_get_contents("php://input"), true);
            if (!empty($_POST)) {
                //TODO: Icon from cache
                $result['slug'] = '';
                $result['success'] = $this->model->saveCourse($_SESSION['user']['id'], $result['slug']);
            }

            echo json_encode(array('result' => $result), JSON_UNESCAPED_SLASHES);
        } else {
            header('HTTP/1.0 404 Not Found');
            die;
        }
    }

    public function editCourseAction()
    {
        $result = [];
        $result['success'] = false;
        if (isset($_SESSION['user']) && $_SESSION['user']['username'] == $this->route['username']) {
            $result['course'] = $this->model->getCourseForEdit($_SESSION['user']['username'], $this->route['slug']);
            if (!$result['course']) {
                header('HTTP/1.0 404 Not Found');
                die;
            }

            $result['success'] = (bool)$result['course'];

            echo json_encode(array('result' => $result), JSON_UNESCAPED_SLASHES);
        } else {
            header('HTTP/1.0 404 Not Found');
            die;
        }
    }

    public function editTaskAction()
    {
        $result = [];
        $result['success'] = false;
        if (isset($_SESSION['user']) && $_SESSION['user']['username'] == $this->route['username']) {
            $result['task'] = $this->model->getTaskForEdit($_SESSION['user']['username'], $this->route['slug']);
            if (!$result['task']) {
                header('HTTP/1.0 404 Not Found');
                die;
            }

            $result['success'] = (bool)$result['task'];

            echo json_encode(array('result' => $result), JSON_UNESCAPED_SLASHES);
        } else {
            header('HTTP/1.0 404 Not Found');
            die;
        }
    }

    public function saveIconAction()
    {
        if (
            isset($_SESSION['user']) && $_SESSION['user']['username'] === $this->route['username'] && isset($_FILES['icon']) &&
            file_exists($_FILES['icon']['tmp_name'][0]) && is_uploaded_file($_FILES['icon']['tmp_name'][0])
        ) {
            $fileExt = explode("/", $_FILES['icon']['type'][0])[1];
            $fileExt = explode("+", $fileExt)[0];
            $fileName = md5($_SESSION['user']['username']) . '.' . $fileExt;

            $path = WWW . '/uploads/course/creation';
            if (!is_dir($path)) {
                mkdir($path);
            }

            $path .= '/' . date("Y", time());
            if (!is_dir($path)) {
                mkdir($path);
            }

            $path .= '/' . date("m", time());
            if (!is_dir($path)) {
                mkdir($path);
            }

            move_uploaded_file($_FILES['icon']['tmp_name'][0], $path . '/' . $fileName);
            $pathClient = UPLOADS . '/course/creation/' . date("Y", time()) . '/' . date('m', time()) . '/' . $fileName;

            echo json_encode(array('icon' => $pathClient), JSON_UNESCAPED_SLASHES);
        } else {
            header('HTTP/1.0 404 Not Found');
            die;
        }
    }

    public function createTaskAction()
    {
        $result = [];
        $result['success'] = false;
        if (isset($_SESSION['user']) && $_SESSION['user']['username'] == $this->route['username'] && $_SERVER['REQUEST_METHOD'] == 'POST') {
            $_POST = json_decode(file_get_contents("php://input"), true);
            if (!empty($_POST)) {
                $result['slug'] = '';
                $result['success'] = $this->model->saveTask($_SESSION['user']['id'], $result['slug']);
                if (!$result['success']) {
                    header("HTTP/1.0 400 Bad Request");
                }
            }

            echo json_encode(array('result' => $result), JSON_UNESCAPED_SLASHES);
        } else if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        } else {
            header('HTTP/1.0 404 Not Found');
            die;
        }
    }

    protected function deleteAllCacheProject()
    {
    }

    protected function deleteDirectoryProject($dir): bool
    {
        if (is_dir($dir)) {
            $objects = scandir($dir);
            foreach ($objects as $object) {
                if ($object != "." && $object != "..") {
                    if (is_dir($dir . DIRECTORY_SEPARATOR . $object) && !is_link($dir . "/" . $object)) {
                        $this->deleteDirectoryProject($dir . DIRECTORY_SEPARATOR . $object);
                    } else {
                        unlink($dir . DIRECTORY_SEPARATOR . $object);
                    }
                }
            }
            rmdir($dir);
            return true;
        }

        return false;
    }

    protected function pushProjectInCache($isTemplate, $project, $pathProject, $pathCache = '')
    {
//        debug($pathProject, 1);
        if ($pathCache === '') {
            $pathCache = PROJECT_CACHE . '/' . md5($_SESSION['user']['username']);
            if (!file_exists($pathCache)) {
                mkdir($pathCache);
            }
            if ($isTemplate) {
                $pathCache .= '/' . md5('template') . md5($project['slug']);
            } else {
                $pathCache .= '/' . md5($project['slug']);
            }
            if (!file_exists($pathCache)) {
                mkdir($pathCache);
            }
        }

        if (is_dir($pathProject)) {
            $files = scandir($pathProject);
//            debug($files, 1);
            foreach ($files as $k => $v) {
                if ($v !== '.' && $v !== '..' && !file_exists($pathCache . '/' . $v)) {
                    if (is_dir($pathProject . '/' . $v)) {
                        mkdir($pathCache . '/' . $v);
                        $this->pushProjectInCache($isTemplate, $project, $pathProject . '/' . $v, $pathCache . '/' . $v);
                    } else {
                        copy($pathProject . '/' . $v, $pathCache . '/' . $v);
                    }
                }
            }
        }
    }

    protected function pushProject($cache, $keyCache, $mainFolder, $userCacheProjectFolder, $files)
    {
        if (!$files) {
            return;
        }

        foreach ($files['uploadInfoFiles']['tmp_name'] as $k => $v) {
            $currentPathFile = $userCacheProjectFolder;
            $path = explode('/', $files['uploadInfoFiles']['full_path'][$k]);
            array_shift($path);
            array_pop($path);
            if ($path) {
                foreach ($path as $pk => $pv) {
                    if (!(is_dir($currentPathFile . '/' . $pv))) {
                        mkdir($currentPathFile . '/' . $pv);
                    }
                    $currentPathFile = $currentPathFile . "/" . $pv;
                }
            }

            move_uploaded_file($v, $currentPathFile . '/' . $files['uploadInfoFiles']['name'][$k]);

        }

        $cache->setCache($keyCache, $userCacheProjectFolder, 7200);
    }

//    protected function pushProject($cache, $keyCache, $mainFolder, $userCacheProjectFolder, $files)
//    {
//        foreach ($files as $k => $v) {
//            $currentPathFile = $userCacheProjectFolder;
//
//            foreach ($v['path'] as $key => $folder) {
//                if ($folder == $mainFolder) {
//                    continue;
//                }
//
//                if (!(is_dir($currentPathFile . '/' . $folder))) {
//                    mkdir($currentPathFile . '/' . $folder);
//                }
//
//                $currentPathFile = $currentPathFile . "/" . $folder;
//            }
//
//            $v_parts = explode(";base64,", $v['content']);
//            // debug($currentPathFile, 1);
//
//            file_put_contents($currentPathFile . '/' . $v['fileName'], base64_decode($v_parts[1]));
//        }
//
//        $cache->setCache($keyCache, $userCacheProjectFolder, 7200);
//    }
}
