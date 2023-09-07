<?php

use core\Language;

function debug($data, $die = false)
{
    echo '<pre>' . print_r($data, 1) . '</pre>';
    if ($die) {
        die;
    }
}

function h($str)
{
    return htmlspecialchars($str);
}

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

function echoWords($key)
{
    echo Language::getWords($key);
}

function returnWords($key)
{
    return Language::getWords($key);
}
