<?php

namespace app\controllers;

use core\App;

class TemplateController extends AppController
{
    public function indexAction()
    {
        $templates = [];
        $search = isset($_GET['search']) ? '%' . $_GET['search'] . '%' : '%';
//        debug($_GET, 1);
        if (isset($_GET['type']) && $_GET['type'] === 'admin') {
            $templates = $this->model->getAllAdminTemplates(App::$app->getProperty('language')['id'], $search);
        } else if (isset($_GET['type']) && $_GET['type'] === 'user') {
            $templates = $this->model->getAllUserTemplates(App::$app->getProperty('language')['id'], $search);
        } else {
            $templates = $this->model->getAllTemplates(App::$app->getProperty('language')['id'], $search);
        }

        echo json_encode(array('templates' => $templates));
    }
}