<?php

namespace app\controllers;

use app\controllers\AppController;

class CompilerController extends AppController
{
    public function indexAction()
    {
        $parameters = json_decode(file_get_contents("php://input"), true);
        $progLanguage = $parameters['language'];

        shell_exec(COMPILER . PROGRAMMING_LANGUAGES[$progLanguage]['run_cmd']); // /public/compiler/Python /public/projects/Hello-worldProgram/main.py

    }
}