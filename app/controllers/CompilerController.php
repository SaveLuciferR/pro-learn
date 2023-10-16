<?php

namespace app\controllers;

use app\controllers\AppController;

class CompilerController extends AppController
{
    public function indexAction()
    {
//        $parameters = json_decode(file_get_contents("php://input"), true);
//        $progLanguage = $parameters['language'];

        if (false == exec('py /public/projects/Hello-worldProgram/main.py')) echo 'sss';
        // /public/compiler/Python /public/projects/Hello-worldProgram/main.py PROGRAMMING_LANGUAGES[$progLanguage]['run_cmd']

    }
}