<?php

namespace app\controllers;

use app\models\Blog;
use core\App;

/** @property Blog $model */


/** Контроллер общего доступа статей */

class BlogController extends AppController
{


    /** Вызывается, если в url код_языка/blog */

    public function indexAction()
    {
        $allBlogItem = $this->model->getAllBlogs(App::$app->getProperty('language')['id']);
        $popularBlogs = $this->model->getPopularBlogs(App::$app->getProperty('language')['id']);

        if (!$allBlogItem) {
            throw new \Exception("Статьи не найдены...", 404);
        }

        // $allBlogItem['date_of_publication'] = date('d.m.Y', strtotime($allBlogItem['date_of_publication']));
        // $popularBlogs['date_of_publication'] = date('d.m.Y', strtotime($popularBlogs['date_of_publication']));
        // debug($allBlogItem, 1);

        echo json_encode(array('allBlogs' => $allBlogItem, 'popularBlogs' => $popularBlogs), JSON_UNESCAPED_SLASHES);
    }


    /** Вызывается, если в url код_языка/blog/url_статьи */

    public function viewAction()
    {
        $blog = $this->model->getBlog(App::$app->getProperty('language')['id'], $this->route['slug']);

        if (!$blog) {
            throw new \Exception("Статья по запросу {$this->route['slug']} не найдена", 404);
        }

        $blogResponse = $this->model->getResponseByBlog($blog['id']);

//        debug($blogresponse, 1);

        echo json_encode(array('blog' => $blog, 'blogResponse' => $blogResponse), JSON_UNESCAPED_SLASHES);
    }
}
