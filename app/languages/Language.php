<?php

namespace app\languages;

use core\App;
use RedBeanPHP\R;

class Language
{
    // protected $tpl;
    // protected $languages;
    // protected $language;

    public function __construct()
    {
        // $this->tpl = __DIR__ . '\lang_tpl.php';
        // $this->run();
    }

    // public function run()
    // {
    //     $this->languages = App::$app->getProperty('languages');
    //     $this->language = App::$app->getProperty('language');
    //     echo $this->getHtml();
    // }

    public static function getLanguages(): array
    {
        return R::getAssoc("SELECT Code, Title, Base, ID FROM Language ORDER BY base DESC");
    }

    public static function getLanguage($languages)
    {
        // debug(App::$app->getProperty('lang'), 1);

        $lang = App::$app->getProperty('lang');
        if ($lang && array_key_exists($lang, $languages)) {
            $key = $lang;
        } else if (!$lang) {
            $key = key($languages);
        } else {
            $lang = h($lang);
            throw new \Exception("Not Found language {lang}", 404);
        }

        $lang_info = $languages[$key];
        $lang_info['Code'] = $key;
        return $lang_info;
    }

    // protected function getHtml(): string
    // {
    //     ob_start();
    //     require_once $this->tpl;
    //     return ob_get_clean();
    // }
}
