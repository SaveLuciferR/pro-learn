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
    public function authAction()
    {
        echo json_encode(array('auth' => $this->model->checkAuth()));
    }

    public function loginAction()
    {
        $userParam = json_decode(file_get_contents("php://input"), true);

        if ($userParam) {
            if ($this->model->login($userParam)) {
                $this->authAction();
            } else {
                echo json_encode(array('auth' => false));
            }
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
        $path = USER_PROJECT . $this->route['username'] . $this->route['slug'] . (isset($this->route['secondaryPath']) ? $this->route['secondaryPath'] : "");
        $project = $this->model->getProjectInfoBySlug($this->route['slug'], $this->route['username']);
        if (!$project) throw new \Exception("Проект не найден", 404);

        $project['date_of_publication'] = date('d.m.Y', strtotime($project['date_of_publication']));

        if (isset($this->route['secondaryPath'])) {
            $filesProject = $this->model->getFilesProject($project, $path, $this->route['secondaryPath']);
            //    debug($filesProject['body'], 1);
        } else {
            $filesProject = $this->model->getFilesProject($project, $path,);
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
            // debug(json_decode(file_get_contents("php://input"), true), 1);

            $files = $_POST['uploadInfoFiles'];

            // debug($files, 1);

            $mainFolder = $_POST['mainFolderProject'];
            $username = 'user1';
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
                $this->pushProject($cache, $keyCache, $userCacheProjectFolder, $files);
            } else { // Не новый проект и кеш не закончилсяx
                $this->pushProject($cache, $keyCache, $userCacheProjectFolder, $files);
            }
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

    protected function pushProject($cache, $keyCache, $userCacheProjectFolder, $files)
    {
        $currentPathFile = $userCacheProjectFolder;

        // debug($files, 1);

        foreach ($files as $k => $v) {

            foreach ($v['path'] as $key => $folder) {
                if ($folder == '/') {
                    continue;
                }

                if (!(is_dir($userCacheProjectFolder . '/' . $folder))) {
                    mkdir($userCacheProjectFolder . '/' . $folder);
                }

                $currentPathFile = $currentPathFile . "/" . $folder;
            }

            $v_parts = explode(";base64,", $v['content']);
            // $v_type_aux = explode("");

            file_put_contents($currentPathFile . '/' . $v['fileName'], base64_decode($v_parts[1]));
        }

        $cache->setCache($keyCache, $userCacheProjectFolder, 5);
    }
}
