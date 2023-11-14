<?php

namespace app\controllers;

use app\controllers\AppController;

class CompilerController extends AppController
{
    public function indexAction()
    {
        $fileStructure = $this->model->getAllFileProject($this->route['username'], $this->route['slug']);
        $pathProject = $this->model->getPathProject($this->route['username'], $this->route['slug']);

        $retval = null;
        $output = array();
        $commandPathProject = "cd " . $pathProject . " && cd..";
        $commandDockerProject = '"C:\Program Files\Docker\Docker\resources\cli-plugins\docker-compose.exe" up --build -d';

        debug($commandPathProject . " && " . $commandDockerProject);

        exec($commandPathProject . " && " . $commandDockerProject, $output, $retval); // . "; if($?) " . $commandDockerProject

        // debug($retval);

        print_r($output);

        // echo json_encode(array('fileStructure' => $fileStructure, 'path' => $pathProject), JSON_UNESCAPED_SLASHES);
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
    }

    public function deleteAction() {
        
    }

    public function renameAction() {
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