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
            header('HTTP/1.0 401 Unauthorized');
            die;
        }

        echo json_encode(array('fileStructure' => $fileStructure, 'path' => $pathProject), JSON_UNESCAPED_SLASHES);
    }

    public function startDockerSessionAction()
    {
        $this->model->startOrUpdateDockerContainer($this->model->getPathProject($this->route['username'], $this->route['slug']));
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
