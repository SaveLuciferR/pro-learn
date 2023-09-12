<?php

namespace app\controllers;


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

    public function profileAction() {

    }

    public function projectListAction() {

    }

    public function projectAction() {

    }
}
