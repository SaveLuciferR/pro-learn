<?php

namespace app\controllers;

use core\Controller;
use app\models\AppModel;
use app\languages\Language;
use core\App;
use core\Language as CoreLanguage;
use app\models\User;
use RedBeanPHP\R;


/** Контроллер, который наследуется от контроллера фреймворка.
 * Здесь прописана логика для всех контроллеров общего доступа.
 * От AppController идет наследование на все контроллеры общего доступа.
 */

class AppController extends Controller
{

    /** Создание объекта, передавая маршрут в дочерние элементы
     * @param $route string Текущий маршрут url-запроса
     */
    public function __construct($route)
    {
        parent::__construct($route);

        new AppModel(); // Создание модели

        App::$app->setProperty('languages', Language::getLanguages()); // Запись всех языков из базы данных
        App::$app->setProperty('language', Language::getLanguage(App::$app->getProperty('languages'))); // Проверка и запись текущего языка на сайте

        $lang = App::$app->getProperty('language');
        CoreLanguage::loadWords($lang, $this->route);
    }
}
