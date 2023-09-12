<?php

namespace app\controllers;

use app\controllers\AppController;
use core\App;

class CourseController extends AppController
{
    public function indexAction() {
        if (array_key_exists('user', $_SESSION)) {
            $currentUser = $_SESSION['user'];
        } else {
          $currentUser = null;
        }

        $finishedCourse = $this->model->getFinishedCourse(App::$app->getProperty('language')['ID']);
        debug($finishedCourse, 1);
    }
}