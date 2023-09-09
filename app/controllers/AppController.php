<?php

namespace app\controllers;

use core\Controller;
use app\models\AppModel;
use app\languages\Language;
use core\App;
use core\Language as CoreLanguage;
use app\models\User;
use RedBeanPHP\R;

class AppController extends Controller
{
    public function __construct($route)
    {
        parent::__construct($route);

        // if (!User::isLogin() && $route['action'] != 'login' && $route['action'] != 'sign-up') {
        //     redirect('/user/login');
        // }

        // debug($_SESSION['user'], 1);

        new AppModel();

        App::$app->setProperty('languages', Language::getLanguages());
        App::$app->setProperty('language', Language::getLanguage(App::$app->getProperty('languages')));

        $lang = App::$app->getProperty('language');
        CoreLanguage::loadWords($lang, $this->route);

        
    }
}
