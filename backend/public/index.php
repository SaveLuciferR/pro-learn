<?php

header('Access-Control-Allow-Origin: http://pro-learn.my:3000');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE');
header('Access-Control-Allow-Headers: Origin, Content-Type, Accept, Authorization, X-Request-With');
header('Content-Type: application/json');
header('Access-Control-Allow-Credentials: true');
header('Set-Cookie; SameSite=Strict; Secure', true);

session_set_cookie_params(0, '/', '.api.pro-learn.my', false, false);
ini_set('session.cookie_samesite', 'Strict');
//ini_set('max_file_uploads', '500');

if (PHP_MAJOR_VERSION < 8) {
    die('Необходима версия PHP >= 8');
}

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header('Access-Control-Allow-Origin: http://pro-learn.my:3000');
    header('Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE');
    header('Access-Control-Allow-Headers: Origin, Content-Type, Accept, Authorization, X-Request-With');
    header("HTTP/1.1 200 OK");
    die();
}

require_once dirname(__DIR__) . '/config/init.php';
require_once HELPERS . '/functions.php';
require_once CONFIG . '/routes.php';

new \core\App();
