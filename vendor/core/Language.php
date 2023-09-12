<?php

namespace core;


/** Класс для работы шаблонами статического текста на сайте на разных языках */

class Language
{
    public static array $langData = [];
    public static array $langLayout = [];
    public static array $langView = [];


    /** Функция для загрузка шаблонов в программу, если они существуют */

    public static function loadWords($lang, $route)
    {
        $langLayout = APP . "/languages/{$lang['Code']}.php";
        $langView = APP . "/languages/{$lang['Code']}/{$route['controller']}/{$route['action']}.php";

        if (file_exists($langLayout)) {
            self::$langLayout = require_once $langLayout;
        }

        if (file_exists($langView)) {
            self::$langView = require_once $langView;
        }

        self::$langData = array_merge(self::$langLayout, self::$langView);
    }


    /** Функция для получения текста на текущем языке сайта по ключу шаблона
     * @param string $key Ключ текста из шаблона
     * @return string Возвращает текст, если нашел его по ключу, иначе вернет ключ
     */

    public static function getWords($key)
    {
        return self::$langData[$key] ?? $key;
    }
}
