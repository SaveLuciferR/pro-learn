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
        if ($_SERVER['REQUEST_METHOD'] === 'POST' && $userParam) {
            if ($this->model->login($userParam)) {
                $_SESSION['user']['success'] = true;
                $_SESSION['user_activateion'] = [];

                $userDevice = [];
                if (isset($_SERVER['REMOTE_ADDR'])) {
                    $json = json_decode(file_get_contents(GEOIP . "/132.3.200.1")); // . $_SERVER['REMOTE_ADDR']
                    $userDevice['ip'] = $json->ip;
                    $userDevice['success'] = $json->success;
                    if ($userDevice['success']) {
                        $userDevice['city'] = $json->city;
                        $userDevice['country'] = $json->country;
                        $browser = new BrowserDetection();
                        $userDevice['browser'] = $browser->getBrowser($_SERVER['HTTP_USER_AGENT']);
                        $userDevice['browser'] = $userDevice['browser']['browser_title'];
                        $userDevice['type'] = $browser->getDevice($_SERVER['HTTP_USER_AGENT']);
                        $userDevice['type'] = $userDevice['type']['device_type'];
                        $userDevice['OS'] = $browser->getOS($_SERVER['HTTP_USER_AGENT']);
                        $userDevice['OS'] = $userDevice['OS']['os_title'];
                    }
                }

                $_SESSION['user']['sessionID'] = $this->model->saveSession($userDevice, $_SESSION['user']['username']);
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
                $mail = new PHPMailer(true);
                try {
                    //Enable verbose debug output
                    $mail->SMTPDebug = 0; //SMTP::DEBUG_SERVER;

                    //Send using SMTP
                    $mail->isSMTP();

                    //Set the SMTP server to send through
                    $mail->Host = App::$app->getProperty('smtp_host');

                    //Enable SMTP authentication
                    $mail->SMTPAuth =  App::$app->getProperty('smtp_auth');

                    //SMTP username
                    $mail->Username = App::$app->getProperty('smtp_username');

                    //SMTP password
                    $mail->Password = App::$app->getProperty('smtp_password');

                    //Enable TLS encryption;
                    $mail->SMTPSecure = App::$app->getProperty('site_secure');

                    //TCP port to connect to, use 465 for `PHPMailer::ENCRYPTION_SMTPS` above
                    $mail->Port = App::$app->getProperty('smtp_port');

                    //Recipients
                    $mail->setFrom(App::$app->getProperty('smtp_from_email'), App::$app->getProperty('site_name'));

                    // $mail->smtpConnect(array("ssl" => array(
                    //     "verify_peer" => false,
                    //     "verify_peer_name" => false,
                    //     "allow_self_signed" => true
                    // )));

                    //Add a recipient
                    $mail->addAddress($userParam['mail'], $userParam['username']);

                    //Set email format to HTML
                    $mail->isHTML(true);

                    $verification_code = substr(number_format(time() * rand(), 0, '', ''), 0, 6);

                    $mail->Subject = 'Email verification';
                    $mail->Body    = '<p>Your verification code is: <b style="font-size: 30px;">' . $verification_code . '</b></p>';
                    // $mail->Mail

                    if ($mail->send()) {
                        $this->model->setActivationCode($userID, $verification_code);
                        $_SESSION['user_activation'] = [];
                        $_SESSION['user_activation']['activate'] = true;
                        $_SESSION['user_activation']['mail'] = $userParam['mail'];
                        echo json_encode(array('result' => true));
                    } else {
                        header('HTTP/1.0 400 Bad Request');
                    }
                } catch (\Exception $e) {
                    $this->model->deleteUser($userID);
                    header("HTTP/1.0 400 Bat Request");
                    $error = "Невозможно отправить код с подтверждением на эту почту";
                    echo json_encode(array('error' => $error));
                }
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

    public function profileAction()
    {
        $profileInfo = $this->model->getUserInfo($this->route['username']);
        if (!$profileInfo) {
            header($_SERVER['SERVER_PROTOCOL'] . ' 404 Not Found', true, 404);
            die;
        }
        $profileInfo['date_of_registration'] = date('d.m.Y', strtotime($profileInfo['date_of_registration']));
        $profileInfo['projects'] = $this->model->getUserProjects($this->route['username']);

        $userCourse = $this->model->getUserCourses($this->route['username'], App::$app->getProperty('language')['id']);

        // Сортировка курсов на текущие и пройденнык
        foreach ($userCourse as $k => $v) {
            if ($v['success']) {
                $profileInfo['completeCourse'][$k] = $v;
            } else {
                $profileInfo['currentCourse'][$k] = $v;
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
        }


        echo json_encode(array('profileInfo' => $profileInfo), JSON_UNESCAPED_SLASHES);
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
            $this->model->getFilesProject($project, $path, $this->route['secondaryPath']) :
            $this->model->getFilesProject($project, $path);

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

    public function addProjectAction()
    {
        if (!(isset($_SESSION['user']) && $_SESSION['user']['username'] === $this->route['username'])) {
            header('HTTP/1.0 404 Not Found');
            die;
        }

        $this->deleteAllCacheProject();

        $cache = Cache::getInstance();

        $_POST = json_decode(file_get_contents("php://input"), true);
        if (!empty($_POST)) {
            $files = $_POST['uploadInfoFiles'];

            $mainFolder = $_POST['mainFolderProject'];
            $username = $_POST['username'];
            $newProject = $_POST['newProject'];

            $keyCache = $username . '/' . $mainFolder;
            //TODO: Сделать так, чтобы проект пользователя сохранялся лишь по его нику из роутера в кеш.

            $userCacheProjectFolder = PROJECT_CACHE . "/" . md5($username);
            if (!is_dir($userCacheProjectFolder)) {
                mkdir($userCacheProjectFolder);
            }

            $userCacheProjectFolder .= "/" . md5($mainFolder);
            if (!is_dir($userCacheProjectFolder)) {
                mkdir($userCacheProjectFolder);
            }
            $data = '';

            if ((!$newProject) && (!$cache->getCache($keyCache, $data))) { // Не новый проект и закончился кеш
                $this->deleteDirectoryProject($data);
            } else if ($newProject) { // Новый проект
                // debug($files, 1);
                $this->pushProject($cache, $keyCache, $mainFolder, $userCacheProjectFolder, $files);
            } else { // Не новый проект и кеш не закончилсяx
                $this->pushProject($cache, $keyCache, $mainFolder, $userCacheProjectFolder, $files);
            }
        }
    }

    public function saveProjectAction()
    {
        if (!(isset($_SESSION['user']) && $_SESSION['user']['username'] === $this->route['username'])) {
            header('HTTP/1.0 404 Not Found');
            die;
        }

        $_POST = json_decode(file_get_contents("php://input"), true);
        if (!empty($_POST)) {
            $projectPath = Cache::getInstance()->getCache($_POST['username'] . '/' . $_POST['mainFolderProject']);

            $data = [];
            $data['title'] = $_POST['nameProject'];
            $data['desc'] = $_POST['descProject'];
            $data['private'] = $_POST['privacyProject'];

            $slug = $this->model->saveNewProject($data, $projectPath, $_POST['username']);
            if (!$slug) {
                header($_SERVER['SERVER_PROTOCOL'] . ' 400 Not Found', true, 400);
                die;
            }

            Cache::getInstance()->deleteCache($_POST['username'] . '/' . $_POST['mainFolderProject']);
            // rmdir(PROJECT_CACHE . '/' . md5($_POST['username']) . '/' . md5($_POST['mainFolderProject']));
            rmdir(PROJECT_CACHE . '/' . md5($_POST['username']));

            echo json_encode(array('slug' => $slug));
        }
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

        $_POST = json_decode(file_get_contents("php://input"), true);
        if (!empty($_POST)) {
            $cache = Cache::getInstance();

            $pathProject = $cache->getCache($_POST['username'] . '/' . $_POST['mainFolderProject']);

            foreach ($_POST['newFilesInfo'] as $k => $v) {
                if ($v['path'] !== 'undefined') {
                    foreach ($v['path'] as $key => $folder) {
                        if ($folder === 'undefined') {
                            continue;
                        }

                        if (is_dir($pathProject . '/' . $folder)) {
                            $pathProject = $pathProject . '/' . $folder;
                        }
                    }
                }

                $v_parts = explode(";base64,", $v['content']);
                //                debug($v_parts[1]);

                file_put_contents($pathProject . '/' . $v['fileName'], base64_decode($v_parts[1]));
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

            $mainFolder = $_POST['mainFolderProject'];
            $username = $_POST['username'];

            // debug($files, 1);

            $keyCache = $username . '/' . $mainFolder;

            $path = "";

            $filesProject = isset($_POST['secondaryPathProject']) ?
                $this->model->getFilesProjectInCache($keyCache, $path, $_POST['secondaryPathProject']) :
                $this->model->getFilesProjectInCache($keyCache, $path);

            if (!$filesProject) {
                header('HTTP/1.0 404 Not Found');
                die;
            }

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

            echo json_encode(array('profile_general' => $profileGeneral), JSON_UNESCAPED_SLASHES);
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

        echo json_encode(array('profile_security' => $profileSecurity), JSON_UNESCAPED_SLASHES);
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

        echo json_encode(array('profile_privacy' => $profilePrivacy), JSON_UNESCAPED_SLASHES);
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

    protected function pushProject($cache, $keyCache, $mainFolder, $userCacheProjectFolder, $files)
    {
        foreach ($files as $k => $v) {
            $currentPathFile = $userCacheProjectFolder;

            foreach ($v['path'] as $key => $folder) {
                if ($folder == $mainFolder) {
                    continue;
                }

                if (!(is_dir($currentPathFile . '/' . $folder))) {
                    mkdir($currentPathFile . '/' . $folder);
                }

                $currentPathFile = $currentPathFile . "/" . $folder;
            }

            $v_parts = explode(";base64,", $v['content']);
            // debug($currentPathFile, 1);

            file_put_contents($currentPathFile . '/' . $v['fileName'], base64_decode($v_parts[1]));
        }

        $cache->setCache($keyCache, $userCacheProjectFolder, 7200);
    }
}
