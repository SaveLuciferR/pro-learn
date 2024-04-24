<?php

namespace app\controllers;

use app\controllers\AppController;

class CompilerController extends AppController
{
    public function indexAction()
    {
        $urlProject = $this->model->getUrlPathProject($this->route['username'], $this->route['slug']);
        $fileStructure = $this->model->getAllFileProject($this->route['username'], $this->route['slug'], $urlProject);
        $pathProject = $this->model->getPathProject($this->route['username'], $this->route['slug']);

//        $fileStructure['blog-bg.jpg']['body'] = utf8_encode($fileStructure['blog-bg.jpg']['body']);

        //TODO Причина не отправки проекта транспортной компании является json_encode, он не может первести контент картинки в объект JSON, можно кодировать контент картинки в utf8 и тогда все будет норм, но стоит переделать получение информации о картинки, как о файле

//        debug($fileStructure, 1);
//        debug(json_encode($fileStructure), 1);

//        debug(json_last_error(), 1);

        if (!$fileStructure) {
            header('HTTP/1.0 404 Not Found');
            die;
        }

        $tasks = $this->model->getTasksForProject($pathProject);
        $shouldBeRunAtStart = false;

        if (isset($tasks['tasks'])) {
            foreach ($tasks['tasks'] as $k => $task) {
                if (isset($task['runAtStart']) && $task['runAtStart']) {
                    $shouldBeRunAtStart = true;
                    break;
                }
            }
        }

        //TODO JSON не сохраняется, а приходит пустым!!!

        echo json_encode(array('fileStructure' => $fileStructure, 'path' => $pathProject, 'tasks' => $tasks, 'shouldBeRunAtStart' => $shouldBeRunAtStart), JSON_UNESCAPED_SLASHES);
    }

    public function startDockerSessionAction()
    {
        $this->model->startOrUpdateDockerContainer($this->model->getPathProject($this->route['username'], $this->route['slug']));
    }

    public function checkSolutionTaskAction()
    {
        $output = [];
        $success = true;
        $error = "";
        $taskInputOutputData = $this->model->getDataSolutionTask($this->route['slugTask']);
//        debug($taskInputOutputData, 1);

        foreach ($taskInputOutputData as $k => &$v) {
            $v['input_data'] = json_decode($v['input_data'], true);
            $v['output_data'] = json_decode($v['output_data'], 1);
            $this->model->startOrUpdateDockerContainer(
                $this->model->getPathProject($this->route['username'], $this->route['slugProject']),
                $output, $error, $v['input_data']
            );
            $temp = implode(PHP_EOL, $v['output_data']);
            if (is_array($output)) $output = implode(PHP_EOL, $output);
            if (trim($output) !== trim($temp)) {
//                debug($output);
                $success = false;
                break;
            }
        }

        if ($success) {
            $this->model->saveSolvedTask($_SESSION['user']['id'], $this->route['slugTask']);
        }

        echo json_encode(array('success' => $success), JSON_UNESCAPED_SLASHES);
    }

    public function solveTaskAction()
    {
        if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['task'])) {
            $task = $this->model->getSolveTask($_SESSION['user']['id'], $_GET['task']);
            if ($task) {
                if ($task['input_data']) {
                    $task['input_data'] = json_decode($task['input_data'], true);
                }

                if ($task['output_data']) {
                    $task['output_data'] = json_decode($task['output_data'], true);
                }
//                debug(json_encode(array('task' => $task), JSON_UNESCAPED_SLASHES), 1);
                echo json_encode(array('task' => $task), JSON_UNESCAPED_SLASHES);
            } else {
                header('HTTP/1.0 404 Not Found');
                die;
            }
        } else if ($_SERVER['REQUEST_METHOD'] === 'POST') {

        }
    }

    public function requestTerminalAction()
    {

    }

    public function saveAction()
    {
        $_POST = json_decode(file_get_contents("php://input"), true);

        if ((empty($_POST)) || empty($_POST['file'])) {
            header('HTTP/1.0 400 Bad Requst');
            die;
        }

        $file = $_POST['file']['save'];
        $pathProject = $this->model->getPathProject($this->route['username'], $this->route['slug']);

        // debug($pathProject . $file['path'], 1);

        file_put_contents($pathProject . $file['path'], $file['body']);

        $this->model->startOrUpdateDockerContainer($this->model->getPathProject($this->route['username'], $this->route['slug']));
    }

    public function deleteAction()
    {
    }

    public function renameAction()
    {
        $_POST = json_decode(file_get_contents("php://input"), true);

        if ((empty($_POST)) || empty($_POST['file'])) {
            header('HTTP/1.0 400 Bad Request');
            die;
        }

        $file = $_POST['file']['rename'];
        $pathProject = $this->model->getPathProject($this->route['username'], $this->route['slug']);
        $newFilename = "";

        $oldPath = explode('/', $file['path']);
        array_pop($oldPath);
        $newFilename = implode('/', $oldPath) . '/' . $file['newName'];

        rename($pathProject . $file['path'], $pathProject . $newFilename);
    }
}
