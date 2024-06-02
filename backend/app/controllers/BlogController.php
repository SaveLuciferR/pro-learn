<?php

namespace app\controllers;

use app\models\Blog;
use core\App;

use OpenApi\Attributes as OA;

/** @property Blog $model */


/** Контроллер общего доступа статей */

class BlogController extends AppController
{

    #[OA\Get(
        path: '/{langCode}/blog',
        description: 'Получает все статьи, что были опубликованы.',
        summary: 'Все статьи',
        tags: ["Blog"],
        parameters: [
            new OA\Parameter(
                name: 'langCode',
                description: "Код языка (ru, en)",
                in: "path",
                required: true,
                schema: new OA\Schema(
                    type: 'string'
                )

            ),

        ],
        responses: [
            new OA\Response(response: 200, description: 'Возвращает JSON-объект со всеми найденными статьями'),
        ]
    )]

    /** Вызывается, если в url код_языка/blog */

    public function indexAction()
    {
        $allBlogItem = $this->model->getAllBlogs(App::$app->getProperty('language')['id']);
        $popularBlogs = $this->model->getPopularBlogs(App::$app->getProperty('language')['id']);

        if (!$allBlogItem) {
            header('HTTP/1.0 400 Have not blogs');
            die;
        }

        // $allBlogItem['date_of_publication'] = date('d.m.Y', strtotime($allBlogItem['date_of_publication']));
        // $popularBlogs['date_of_publication'] = date('d.m.Y', strtotime($popularBlogs['date_of_publication']));
        // debug($allBlogItem, 1);

        echo json_encode(array('allBlogs' => $allBlogItem, 'popularBlogs' => $popularBlogs), JSON_UNESCAPED_SLASHES);
    }


    #[OA\Get(
        path: '/{langCode}/blog/slug',
        description: 'Получает все статьи, что были опубликованы.',
        summary: 'Все статьи',
        tags: ["Blog"],
        parameters: [
            new OA\Parameter(
                name: 'langCode',
                description: "Код языка (ru, en)",
                in: "path",
                required: true,
                schema: new OA\Schema(
                    type: 'string'
                )

            ),
            new OA\Parameter(
                name: 'slug',
                description: "Slug-курса",
                in: "path",
                required: true,
                schema: new OA\Schema(
                    type: 'string'
                )

            ),

        ],
        responses: [
            new OA\Response(response: 200, description: 'Возвращает JSON-объект со всеми найденными статьями'),
            new OA\Response(response: 404, description: 'Возвращает 404 ошибку, если статья не была найдена или не была опубликована'),
        ]
    )]

    /** Вызывается, если в url код_языка/blog/url_статьи */

    public function viewAction()
    {
        $blog = $this->model->getBlog(App::$app->getProperty('language')['id'], $this->route['slug']);

        if (!$blog) {
            header('HTTP/1.0 404 Not Found');
            die;
        }

        $blogResponse = $this->model->getResponseByBlog($blog['id']);

        echo json_encode(array('blog' => $blog, 'blogResponse' => $blogResponse), JSON_UNESCAPED_SLASHES);
    }
}
