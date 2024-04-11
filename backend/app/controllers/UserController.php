<?php

namespace app\controllers;

use app\models\User;
use core\App;
use core\Cache;
use foroco\BrowserDetection;

/** @property User $model */

/** Контроллер общего доступа для работы с пользователями (регистрация, авторизация, профиль) */
class UserController extends AppController
{
    public function authAction()
    {
        echo json_encode(array('auth' => $this->model->checkAuth(), 'user' => isset($_SESSION['user']) ? $_SESSION['user'] : []));
    }

    public function loginAction()
    {
        $userParam = json_decode(file_get_contents("php://input"), true);

        if ($userParam) {
            if ($this->model->login($userParam)) {
                $_SESSION['user']['success'] = true;

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
                header($_SERVER['SERVER_PROTOCOL'] . ' 401 Incorrect data', true, 401);
                die;
            }


            echo json_encode(array('auth' => $this->model->checkAuth()));
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

            if (!$profileInfo['look_current_course_private']) {
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
        $projects = $this->model->getUserProjects($this->route['username']);
        if (!(isset($_SESSION['user']) && $_SESSION['user']['username'] === $this->route['username'])) {
            foreach ($projects as $k => $v) {
                if ($v['private']) unset($projects[$k]);
            }
        }

        echo json_encode(array('projects' => $projects), JSON_UNESCAPED_SLASHES);

    }

    public function courseListAction()
    {
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
        if (!$project) throw new \Exception("Проект не найден", 404);

        $project['date_of_publication'] = date('d.m.Y', strtotime($project['date_of_publication']));

        if (isset($this->route['secondaryPath'])) {
            $filesProject = $this->model->getFilesProject($project, $path, $this->route['secondaryPath']);
        } else {
            $filesProject = $this->model->getFilesProject($project, $path);
            if ($filesProject === false) {
                throw new \Exception("Проект не найден", 404);
            }
        }

        $projectInfo = [];

        $projectInfo['languagesProgProject'] = $this->model->getProjectLangsByID($project['id']);
        $projectInfo['info'] = $project;
        // debug($projectInfo, 1);


        $readmeFile = "";

        if (file_exists($path . "/README.md")) {
            $readmeFile = file_get_contents($path . "/README.md");
            // debug($readmeFile, 1);
        }

        // debug($path, 1);

        echo json_encode(array('projectInfo' => $projectInfo, 'filesInfo' => $filesProject, 'readmeFile' => $readmeFile), JSON_UNESCAPED_SLASHES);
    }

    public function addProjectAction()
    {
        $this->deleteAllCacheProject();

        $cache = Cache::getInstance();

        $_POST = json_decode(file_get_contents("php://input"), true);
        if (!empty($_POST)) {
            // debug($_POST, 1);
            // debug(json_decode(file_get_contents("php://input"), true), 1);

            $files = $_POST['uploadInfoFiles'];

            // debug($files, 1);

            $mainFolder = $_POST['mainFolderProject'];
            $username = $_POST['username'];
            $newProject = $_POST['newProject'];

            // debug($files, 1);

            $keyCache = $username . '/' . $mainFolder;

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
        $_POST = json_decode(file_get_contents("php://input"), true);
        if (!empty($_POST)) {
            $projectPath = Cache::getInstance()->getCache($_POST['username'] . '/' . $_POST['mainFolderProject']);

            $data = [];
            $data['title'] = $_POST['nameProject'];
            $data['desc'] = $_POST['descProject'];
            $data['private'] = $_POST['privacyProject'];

            $slug = $this->model->saveNewProject($data, $projectPath, $_POST['username']);
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

            $this->model->saveFeedback($data);
        }
    }

    public function addNewFilesAction()
    {
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
        $_POST = json_decode(file_get_contents("php://input"), true);
        if (!empty($_POST)) {

            $mainFolder = $_POST['mainFolderProject'];
            $username = $_POST['username'];

            // debug($files, 1);

            $keyCache = $username . '/' . $mainFolder;

            $path = "";

            if (isset($_POST['secondaryPathProject'])) {
                $filesProject = $this->model->getFilesProjectInCache($keyCache, $path, $_POST['secondaryPathProject']);
                // debug($filesProject['body'], 1);
            } else {
                $filesProject = $this->model->getFilesProjectInCache($keyCache, $path);
                if ($filesProject === false) {
                    throw new \Exception("Проект не найден", 404);
                }
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
        $fGeneral['errorUpdate'] = "";
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
                        $profileGeneral['errorUpdate'] = "UniqueUsername";

                        $profile = $this->model->getGeneralSettingsByUser($_SESSION['user']['username']);
                        $profileGeneral = array_merge($profile, $profileGeneral);
                        $profileGeneral['success'] = true;
                    }
                }
            }

            $profile = $this->model->getGeneralSettingsByUser($_SESSION['user']['username']);
            $profileGeneral = array_merge($profile, $profileGeneral);
            $profileGeneral['success'] = true;

            echo json_encode(array('profile_general' => $profileGeneral), JSON_UNESCAPED_SLASHES);
        } else {
            header($_SERVER['SERVER_PROTOCOL'] . ' 404 Not Found', true, 404);
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
                            $profileSecurity['errorUpdate'] = $updateTable;
                            $flag = false;
                        }
                    } else {
                        $data['mail'] = $_POST['mail'];
                        $data['second_mail'] = $_POST['second_mail'];
                        $updateTable = $this->model->updateSecurityUserSettings($data, $_SESSION['user']['id']);

                        if ($updateTable !== true && str_contains($updateTable, 'UniqueMail')) {
                            $profileSecurity['errorUpdate'] = "UniqueMail";
                            $flag = false;
                        }
                    }
                }
            }
            $profile = $this->model->getSecuritySettingsByUser($_SESSION['user']['username']);
            $profileSecurity = array_merge($profile, $profileSecurity);
            $profileSecurity['success'] = $flag;
        } else {
            $profileSecurity['success'] = false;
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

            $profileSessions = $this->model->getSessions($_SESSION['user']['username']);
            $profileSessions['success'] = true;
//            debug($profileSessions, 1);
        }
        echo json_encode(array('profile_sessions' => $profileSessions), JSON_UNESCAPED_SLASHES);
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
        }

        echo json_encode(array('profile_created' => $profileCreated), JSON_UNESCAPED_SLASHES);
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
        }

        echo json_encode(array('result' => $result), JSON_UNESCAPED_SLASHES);
    }

    public function editCourseAction()
    {
        $result = [];
        $result['success'] = false;
        if (isset($_SESSION['user']) && $_SESSION['user']['username'] == $this->route['username']) {
            $result['course'] = $this->model->getCourseForEdit($_SESSION['user']['username'], $this->route['slug']);
            $result['success'] = (bool)$result['course'];
        }

        echo json_encode(array('result' => $result), JSON_UNESCAPED_SLASHES);
    }

    public function saveIconAction()
    {
//        debug($_FILES, 1);
        if (isset($_SESSION['user']) && $_SESSION['user']['username'] === $this->route['username'] && isset($_FILES['icon']) &&
            file_exists($_FILES['icon']['tmp_name'][0]) && is_uploaded_file($_FILES['icon']['tmp_name'][0])) {
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
