<?php

namespace app\controllers;

use app\models\User;
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
}
