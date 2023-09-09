<?php

namespace app\controllers;

use core\App;

class BlogController extends AppController
{
    public function indexAction()
    {
        $allBlogItem = $this->model->getAllBlogs(App::$app->getProperty('language')['ID']);

        // debug($allBlogItem, 1);

        echo json_encode(array('allBlogs' => $allBlogItem));
    }

    public function viewAction()
    {
        $blog = $this->model->getBlog(App::$app->getProperty('language')['ID'], $this->route['slug']);

        echo json_encode(array('blog' => $blog));
    }
}
