<?php

namespace app\controllers;

use app\models\User;

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
        $project = $this->model->getProjectInfoBySlug($this->route['slug'], $this->route['username']);
        if (!$project) throw new \Exception("Проект не найден", 404);

        $languagesProgProject = $this->model->getProjectLangsByID($project['id']);

        if (isset($this->route['secondaryPath'])) {
            $filesProject = $this->model->getFilesProject($project, $this->route['secondaryPath']);
//            debug($filesProject['body'], 1);
        } else {
            $filesProject = $this->model->getFilesProject($project);
            if ($filesProject === false) {
                throw new \Exception("Проект не найден", 404);
            }
        }

        if (isset($filesProject['body'])) echo json_encode(array('fileInfo' => $filesProject), JSON_UNESCAPED_SLASHES);
        else echo json_encode(array('filesProject' => $filesProject), JSON_UNESCAPED_SLASHES);
    }
}
