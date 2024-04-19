<?php

namespace app\controllers\admin;

use app\languages\Language;
use app\models\admin\User;
use app\models\AppModel;
use core\App;
use core\Language as CoreLanguage;

class AppController extends \core\Controller
{
    public function __construct($route = [])
    {
        parent::__construct($route);

        if (!User::isAdmin() && $route['action'] !== 'login-admin') {
            header("HTTP/1.0 401 Not Authorized");
            die;
        }

        new AppModel();
        App::$app->setProperty('languages', Language::getLanguages());
        App::$app->setProperty('language', Language::getLanguage(App::$app->getProperty('languages')));

        $lang = App::$app->getProperty('language');
        CoreLanguage::loadWords($lang, $this->route);
    }
}