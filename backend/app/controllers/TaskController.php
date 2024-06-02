<?php

namespace app\controllers;

use core\App;
use OpenApi\Attributes as OA;

class TaskController extends AppController
{

    #[OA\Get(
        path: '/{langCode}/task',
        description: 'Получает все задачи, что были опубликованы',
        summary: 'Все задачи',
        tags: ["Task"],
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
            new OA\Response(response: 200, description: 'Возвращает JSON-объект с выводом и ошибками при запуске задачи'),
        ]
    )]
    public function indexAction()
    {
        $tasks = $this->model->getAllTasks(App::$app->getProperty('language')['id']);

        foreach ($tasks as $k => &$v) {
            $v['date_of_publication'] = date('d.m.Y', strtotime($v['date_of_publication']));
            $v['tags'] = $this->model->getTaskTagByID($v['id']);
            $v['lang'] = $this->model->getTaskLangProgByID($v['id']);
        }

        echo json_encode(array('tasks' => $tasks), JSON_UNESCAPED_SLASHES);
    }


    #[OA\Get(
        path: '/{langCode}/task/{slug}',
        description: 'Получает задачу по ее слагу',
        summary: 'Страница задачи',
        tags: ["Task"],
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
                description: "Слаг задачи",
                in: "path",
                required: true,
                schema: new OA\Schema(
                    type: 'string'
                )
            ),
        ],
        responses: [
            new OA\Response(response: 200, description: 'Возвращает JSON-объект с выводом и ошибками при запуске задачи'),
            new OA\Response(response: 404, description: 'Возвращает 404 ошибку, если не была найдена задача, или она не опубликована'),
        ]
    )]
    public function viewAction()
    {
        $task = $this->model->getTaskBySlug($this->route['slug'], App::$app->getProperty('language')['id']);
        if (!$task || (!(isset($_SESSION['user']) && $_SESSION['user']['username'] === $task['username']) && $task['for_course'] === '1')) {
            header("HTTP/1.0 404 Not Found");
            die;
        }

        $task['date_of_publication'] = date('d.m.Y', strtotime($task['date_of_publication']));
        $task['tags'] = $this->model->getTaskTagByID($task['id']);
        $task['lang'] = $this->model->getTaskLangProgByID($task['id']);
        $task['project'] = $this->model->getProjectForTask($task['id']);
        $task['template'] = $this->model->getTemplateProjectForTask($task['id']);

        echo json_encode(array('task' => $task), JSON_UNESCAPED_SLASHES);
    }


    #[OA\Get(
        path: '/{langCode}/task/{slug}/solve',
        description: 'Записывает в бд, что пользователь начал решать задачу',
        summary: 'Решение задачи',
        tags: ["Task"],
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
                description: "Слаг задачи",
                in: "path",
                required: true,
                schema: new OA\Schema(
                    type: 'string'
                )
            ),
        ],
        responses: [
            new OA\Response(response: 200, description: 'Возвращает JSON-объект с выводом и ошибками при запуске задачи'),
            new OA\Response(response: 401, description: 'Возвращает 401 ошибку, если пользователь не был авторизован'),
            new OA\Response(response: 404, description: 'Возвращает 404 ошибку, если не была найдена задача, или она не опубликована'),
        ]
    )]
    public function solveTaskAction()
    {
        // Добавление проекта с файлами из темплейта
        // Если пользователь не зареган ошибка
        // Запись в бд, что пользователь начал решать задачу (Добавить в бд id на проект)
        // Отдать клиенту сгенерированный slug проекта и slug задачи

        if ($_SERVER['REQUEST_METHOD'] === 'POST') $_POST = json_decode(file_get_contents("php://input"), true);

        if (isset($_SESSION['user']) && isset($_POST['title'])) {
            $result = [];
            $userTask = $this->model->getUserSolveChallenge($_SESSION['user']['id'], $this->route['slug']);
            if (!$userTask) {
                // только начинаем проходить
                $result['projectSlug'] = $this->model->solveTask($_SESSION['user'], $this->route['slug'], $_POST, 'new');
//            } else if ($userTask['success'] === 1) {
//                // не даем воможность зайти на задачу тк прошли
//                header("HTTP/1.0 403 Not Forbidden");
//                die;
            } else if ($userTask['project_id'] === null) {
                // проект был удален
                $result['projectSlug'] = $this->model->solveTask($_SESSION['user'], $this->route['slug'], $_POST, 'edit');
            } else {
                // отдаем пользователю его проект с решением задачи
                $result['projectSlug'] = $this->model->getSolveTask($userTask['project_id']);
            }

//            debug($result, 1);

            echo json_encode(array('result' => $result), JSON_UNESCAPED_SLASHES);
        } else {
            header('HTTP/1.0 401 Unauthorized');
            die;
        }
    }

    public function solveCheckTaskAction()
    {

    }
}