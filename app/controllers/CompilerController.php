<?php

namespace app\controllers;

use app\controllers\AppController;

class CompilerController extends AppController
{
    public function indexAction()
    {
        $fileStructure = $this->model->getAllFileProject($this->route['username'], $this->route['slug']);

        echo json_encode(array('fileStructure' => $fileStructure), JSON_UNESCAPED_SLASHES);
    }
}