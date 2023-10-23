<?php

namespace app\controllers;

use app\controllers\AppController;
use core\App;

class CourseController extends AppController
{

    /* Вызывается, если в url адресе код_языка/course */
    public function indexAction()
    {
        if (array_key_exists('user', $_SESSION)) {
            $currentUser = $_SESSION['user'];

            $currentCourse = null;
            $finishedCourse = $this->model->getFinishedCourse(App::$app->getProperty('language')['id'], $currentUser);
            debug($finishedCourse, 1);
        } else {
            $finishedCourse = null;
            $currentCourse = null;
        }

        if (!empty($_GET)) {
            $category = get('category');
            $user = get('user');
            $progLang = get('proglang');
            $courses = $this->model->getAllCourses(App::$app->getProperty('language')['id'], $category, $user, $progLang);
        } else {
            $courses = $this->model->getAllCourses(App::$app->getProperty('language')['id']);
            debug($courses, 1);
        }

    }


    /* Вызывается, если в url адресе код_языка/course/slug_курса */
    public function viewAction()
    {

    }
}