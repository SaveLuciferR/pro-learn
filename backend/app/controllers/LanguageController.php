<?php


namespace app\controllers;

use core\App;
use core\Language;
use RedUNIT\Base\Indexes;

/** Котроллер, который отвечает за смену языка */
class LanguageController extends AppController
{

    public function indexAction()
    {
        $layoutWords = Language::$langLayout;

        echo json_encode(
            array(
                'language' => App::$app->getProperty('language'),
                'languages' => App::$app->getProperty('languages'),
                'layoutWords' => $layoutWords
            ), JSON_UNESCAPED_SLASHES
        );
    }

    /** Функция вызывается, когда идет запрос на смену языка.
     * PS: не рабочее :)
     */

    public function changeAction()
    {
        $lang = get('lang', 's');
        if ($lang) {
            if (array_key_exists($lang, App::$app->getProperty('languages'))) {
                // отрезаем базовый URL
                $url = trim(str_replace(PATH, '', $_SERVER['HTTP_REFERER']), '/');

                // разбиваем на 2 части... 1-я часть - возможный бывший язык
                $url_parts = explode('/', $url, 2);
                // ищем первую часть (бывший язык) в массиве языков
                if (array_key_exists($url_parts[0], App::$app->getProperty('languages'))) {
                    // присваиваем первой части новый язык, если он не является базовым
                    if ($lang != App::$app->getProperty('language')['code']) {
                        $url_parts[0] = $lang;
                    } else {
                        // если это базовый язык - удалим язык из url
                        array_shift($url_parts);
                    }
                } else {
                    // присваиваем первой части новый язык, если он не является базовым
                    if ($lang != App::$app->getProperty('language')['code']) {
                        array_unshift($url_parts, $lang);
                    }
                }

                $url = PATH . '/' . implode('/', $url_parts);
                redirect($url);
            }
        }
        redirect();
    }
}
