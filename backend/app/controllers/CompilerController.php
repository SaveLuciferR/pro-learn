<?php

namespace app\controllers;

use app\controllers\AppController;

class CompilerController extends AppController
{
    public function indexAction()
    {
        $isOnwer = isset($_SESSION['user']) && $_SESSION['user']['username'] === $this->route['username'];
        $urlProject = $this->model->getUrlPathProject($this->route['username'], $this->route['slug']);
        $fileStructure = $this->model->getAllFileProject($this->route['username'], $this->route['slug'], $urlProject);
        $pathProject = $this->model->getPathProject($this->route['username'], $this->route['slug']);
        $project = $this->model->getProject($this->route['slug']);

//        $fileStructure['blog-bg.jpg']['body'] = utf8_encode($fileStructure['blog-bg.jpg']['body']);

        //TODO Причина не отправки проекта транспортной компании является json_encode, он не может первести контент картинки в объект JSON, можно кодировать контент картинки в utf8 и тогда все будет норм, но стоит переделать получение информации о картинки, как о файле
        //TODO Картинки в редакторе

//        debug($fileStructure, 1);
//        debug(json_encode($fileStructure), 1);

//        debug(json_last_error(), 1);

        if (!$project || $fileStructure === false || !($isOnwer || $project['private'] === '0')) {
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


        $isWebProject = $this->model->isWebProject($pathProject, $fileStructure, $tasks);

        echo json_encode(array(
            'fileStructure' => $fileStructure,
            'isWebProject' => $isWebProject,
            'path' => $pathProject,
            'tasks' => $tasks,
            'shouldBeRunAtStart' => $shouldBeRunAtStart,
            'project' => $project['title'],
            'canBeEdit' => $isOnwer,
        ), JSON_UNESCAPED_SLASHES);
    }

    public function startTaskAction()
    {
        if (isset($_GET['task'])) {
            $output = '';
            $error = '';
            $pathProject = $this->model->getPathProject($this->route['username'], $this->route['slug']);
            $task = [];
            $tasks = $this->model->getTasksForProject($pathProject);
            foreach ($tasks['tasks'] as $k => $v) { 
                if ($k === $_GET['task']) {
                    $task = $v;
                }
            }
            if (!isset($task['data'])) {
                $task['data'] = [];
            }

            $index = $this->model->startOrUpdateDockerContainer($pathProject, $output, $error, $task['data']);

            if ($index === -1) {
                header('HTTP/1.0 204 No Content');
                die;
            }

            echo json_encode(array('output' => $output, 'error' => $error));
        }
    }

    public function startDockerSessionAction()
    {
        $output = '';
        $error = '';
//        debug($_SESSION, 1);
        $index = $this->model->startOrUpdateDockerContainer(
            $this->model->getPathProject($this->route['username'], $this->route['slug']), $output, $error
        );

        if ($index === -1) {
            header('HTTP/1.0 204 No Content');
            die;
        }


//        debug($index);
//        debug($_SESSION['docker'], 1);

//            debug(, 1);
        if (isset($_SESSION['docker'][count($_SESSION['docker']) - 1])) {
            $ports = $_SESSION['docker'][count($_SESSION['docker']) - 1]['ports'];
        } else {
            $ports = null;
        }

        echo json_encode(array('output' => $output, 'error' => $error, 'ports' => $ports));
    }

    public function portsProjectAction()
    {
        if ($_SESSION['docker']) {

        }
    }

    public function checkSolutionTaskAction()
    {
        $output = '';
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
                $success = false;
                break;
            }
        }

        if ($success) {
            $this->model->saveSolvedTask($_SESSION['user']['id'], $this->route['slugTask']);
        }

        echo json_encode(array('success' => $success, 'error' => $error, 'output' => $output), JSON_UNESCAPED_SLASHES);
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
        } else {
            header("HTTP/1.0 400 Bad Request");
            die;
        }
    }

    public function requestTerminalAction()
    {

    }

    public function newFileAction()
    {
        $_POST = json_decode(file_get_contents("php://input"), true);

        if ((empty($_POST)) || empty($_POST['file'])) {
            header('HTTP/1.0 400 Bad Requst');
            die;
        }

        $file = $_POST['file']['newFile'];
        $pathProject = $this->model->getPathProject($this->route['username'], $this->route['slug']);
        if (!file_exists($pathProject . $file['path'])) {
            mkdir($pathProject . $file['path']);
        }

        file_put_contents($pathProject . $file['path'] . '/' . $file['name'], '');
    }

    public function newFolderAction()
    {
        $_POST = json_decode(file_get_contents("php://input"), true);

        if ((empty($_POST)) || empty($_POST['file'])) {
            header('HTTP/1.0 400 Bad Requst');
            die;
        }

        $file = $_POST['file']['newFolder'];
        $pathProject = $this->model->getPathProject($this->route['username'], $this->route['slug']);
        if (!file_exists($pathProject . $file['path'])) {
            mkdir($pathProject);
        }

        if (!file_exists($pathProject . $file['path'] . '/' . $file['name'])) {
            mkdir($pathProject . $file['path'] . '/' . $file['name']);
        }
    }

    public function saveAction()
    {
        $_POST = json_decode(file_get_contents("php://input"), true);

        if ((empty($_POST)) || empty($_POST['file'])) {
            header('HTTP/1.0 400 Bad Request');
            die;
        }

//        debug($_POST, 1);

        $file = $_POST['file']['save'];
        $pathProject = $this->model->getPathProject($this->route['username'], $this->route['slug']);

        // debug($pathProject . $file['path'], 1);

        file_put_contents($pathProject . $file['path'], $file['body']);

//        $this->model->startOrUpdateDockerContainer($this->model->getPathProject($this->route['username'], $this->route['slug']));
    }

    public function deleteAction()
    {
        $_POST = json_decode(file_get_contents("php://input"), true);

        if ((empty($_POST)) || empty($_POST['file'])) {
            header('HTTP/1.0 400 Bad Request');
            die;
        }

        $file = $_POST['file']['delete'];
        $pathProject = $this->model->getPathProject($this->route['username'], $this->route['slug']);
        if (file_exists($pathProject . $file)) {
            if (is_dir($pathProject . $file)) {
                $this->model->deleteDirectoryProject($pathProject . $file);
            } else {
                unlink($pathProject . $file);
            }
        }
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

    public function pastAction()
    {
        $_POST = json_decode(file_get_contents("php://input"), true);

        if ((empty($_POST)) || empty($_POST['file'])) {
            header('HTTP/1.0 400 Bad Request');
            die;
        }

        $file = $_POST['file']['past'];
        $pathProject = $this->model->getPathProject($this->route['username'], $this->route['slug']);
        if ($pathProject . '/' . $file['path'] === $pathProject . '/' . $file['to']) return;

        $namesPath = explode('/', $file['path']);
        $namesTo = explode('/', $file['to']);
//        debug($namesPath);
//        debug($namesTo);
        if (is_dir($pathProject . $file['to'])) {
            $this->model->copyFileOrDir(
                $pathProject . $file['path'],
                $pathProject . $file['to'] . '/' . $namesPath[count($namesPath) - 1],
                is_dir($pathProject . $file['path']),
                $file['type']
            );
        } else {
            array_pop($namesTo);
            $this->model->copyFileOrDir(
                $pathProject . $file['path'],
                $pathProject . implode('/', $namesTo) . '/' . $namesPath[count($namesPath) - 1],
                is_dir($pathProject . $file['path']),
                $file['type']
            );
        }
    }
}
