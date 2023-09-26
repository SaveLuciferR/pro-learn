<?php

use core\Language;


/** функция для отладки
 * @param mixed $data Любые типы данных для вывода на экран
 * @param bool $die Если 1 (true), то программа прекращает работу, после вывода. Если 0 (false), то программа продолжает работу
 */

function debug($data, $die = false)
{
    echo '<pre>' . print_r($data, 1) . '</pre>';
    if ($die) {
        die;
    }
}


/** Сокращение функции htmlspecialchars. Конвертирует все символы в html объекты */

function h($str)
{
    return htmlspecialchars($str);
}


/** Функция для перенаправление
 * @param string|bool $http [Опционально] url-адрес куда надо перенаправить пользователя.
 * Если false (или пустая строка), то пользовател перенаправляется либо остается на той же странице,
 * что и был, либо перенаправляется на главную (например, если были post запросы)
 */

function redirect($http = false)
{
    if ($http) {
        $redirect = $http;
    } else {
        $redirect = isset($_SERVER['HTTP_REFERER']) ? $_SERVER['HTTP_REFERER'] : PATH;
    }
    header("Location: $redirect");
    die;
}


/** Установка базового url сайта (включая код языка) */

function baseUrl()
{
    return PATH . '/' . (\core\App::$app->getProperty('lang') ? \core\App::$app->getProperty('lang') . '/' : '');
}


/**
 * @param string $key Key of GET array
 * @param string $type Values 'i', 'f', 's'
 * @return float|int|string
 */

// get('page')
// $_GET['page']
function get($key, $type = 'i')
{
    $param = $key;
    $$param = $_GET[$param] ?? ''; // $page = $_GET['page'] ?? ''

    if ($type == 'i') {
        return (int)$$param;
    } else if ($type == 'f') {
        return (float)$$param;
    } else {
        return trim($$param);
    }
}


/**
 * @param string $key Key of POST array
 * @param string $type Values 'i', 'f', 's'
 * @return int|float|string
 */

// post('page')
// $_POST['page']
function post($key, $type = 's')
{
    $param = $key;
    $$param = $_POST[$param] ?? ''; // $page = $_POST['page'] ?? ''

    if ($type == 'i') {
        return (int)$$param;
    } else if ($type == 'f') {
        return (float)$$param;
    } else {
        return trim($$param);
    }
}


/** Функция для вывода текста из шаблона по ключу */

function echoWords($key)
{
    echo Language::getWords($key);
}


/** Функция для возвращения текста из шаблона по ключу */

function returnWords($key)
{
    return Language::getWords($key);
}
