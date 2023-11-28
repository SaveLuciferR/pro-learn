<?php

namespace app\controllers;

use app\models\User;
use core\Cache;
use DateTime;
use IntlDateFormatter;

/** @property User $model */

/** Контроллер общего доступа для работы с пользователями (регистрация, авторизация, профиль) */
class UserController extends AppController
{
    public function getSessionIdAction() {
        $userParam = json_decode(file_get_contents("php://input"), true);
        if (isset($userParam['client']) && $userParam['client'] !== 'undefined') {
            session_write_close();
            session_id($userParam['client']);
            session_start();
        }

        echo json_encode(array('client' => session_id()));
        // phpinfo();
    } 

    public function authAction()
    {
        // $userParam = json_decode(file_get_contents("php://input"), true);
        // if (isset($userParam['client']) && $userParam['client'] !== 'undefined') {
        //     // debug("ds");
        //     session_write_close();
        //     session_id($userParam['client']);
        //     session_start();
        // }

        // var_dump($_SESSION);
        echo json_encode(array('auth' => $this->model->checkAuth(), 'user' => isset($_SESSION['user']) ? $_SESSION['user'] : [], 'client' => session_id()));
    }

    public function loginAction()
    {
        $userParam = json_decode(file_get_contents("php://input"), true);
        // if (isset($userParam['client']) && $userParam['client'] !== 'undefined') {
        //     session_write_close();
        //     session_id($userParam['client']);
        //     session_start();
        // }

        if ($userParam) {
            if ($this->model->login($userParam)) {
                // $_SESSION['success'] = "успешно";
            }

            // $this->authAction();
            echo json_encode(array('auth' => $this->model->checkAuth(), 'client' => session_id()));
        }
    }

    public function logoutAction()
    {
        $userParam = json_decode(file_get_contents("php://input"), true);
        if (isset($userParam['client']) && $userParam['client'] !== 'undefined') {
            session_write_close();
            session_id($userParam['client']);
            session_start();
        }

        if (isset($_SESSION['user'])) {
            unset($_SESSION['user']);
        }
    }

    public function profileAction()
    {
        echo "Current Profile: " . $this->route['username'];
    }

    public function projectListAction()
    {
        debug(PROGRAMMING_LANGUAGES, 1);
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

    public function addAction()
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

    public function saveAction()
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

    public function addNewFilesAction()
    {
        $_POST = json_decode(file_get_contents("php://input"), true);
        if (!empty($_POST)) {
            $cache = Cache::getInstance();

            $pathProject = $cache->getCache($_POST['username'] . '/' . $_POST['mainFolderProject']);

            foreach ($_POST['newFilesInfo'] as $k => $v) {

                foreach ($v['path'] as $key => $folder) {
                    if ($folder === 'undefined') {
                        continue;
                    }

                    if (is_dir($pathProject . '/' . $folder)) {
                        $pathProject = $pathProject . '/' . $folder;
                    }
                }

                $v_parts = explode(";base64,", $v['content']);
                debug($v_parts[1]);

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
