<?php

namespace app\controllers;

use app\controllers\AppController;

class CompilerController extends AppController
{
    public function indexAction()
    {
        $fileStructure = $this->model->getAllFileProject($this->route['username'], $this->route['slug']);
        $pathProject = $this->model->getPathProject($this->route['username'], $this->route['slug']);

        $this->model->startOrUpdateDockerContainer($this->model->getPathProject($this->route['username'], $this->route['slug']));
//        debug(mb_strlen(json_encode($fileStructure)), 1);

        echo json_encode(array('fileStructure' => $fileStructure, 'path' => $pathProject), JSON_UNESCAPED_SLASHES);
    }

    public function saveAction()
    {
        $_POST = json_decode(file_get_contents("php://input"), true);

        if ((empty($_POST)) && empty($_POST['file'])) {
            debug('2', 1);
        }

        $file = $_POST['file']['save'];
        $pathProject = $this->model->getPathProject($this->route['username'], $this->route['slug']);

        // debug($pathProject . $file['path'], 1);

        file_put_contents($pathProject . $file['path'], $file['body']);

        // $this->model->startOrUpdateDockerContainer($this->model->getPathProject($this->route['username'], $this->route['slug']));
    }

    public function deleteAction()
    {
    }

    public function renameAction()
    {
        $_POST = json_decode(file_get_contents("php://input"), true);

        if ((empty($_POST)) && empty($_POST['file'])) {
            debug('2', 1);
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
