<?php

namespace core;

class Language
{
    public static array $langData = [];
    public static array $langLayout = [];
    public static array $langView = [];

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

    public static function getWords($key)
    {
        return self::$langData[$key] ?? $key;
    }
}
