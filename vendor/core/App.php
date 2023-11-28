<?php

namespace core;


/** Основной класс фреймворка. В нем идет запись параметров, создание класса отловли ошибок и запись url-адреса */

class App
{
    public static $app;

    public function __construct()
    {
        $query = trim(urldecode($_SERVER['QUERY_STRING']), '/');
        new ErrorHandler();

        // debug(session_id(), 1);
        // ini_set('session.cookie_secure', 'true');
        session_start();
        // session_regenerate_id();

        // $userParam = json_decode(file_get_contents("php://input"), true);
        // if (isset($userParam['client']) && $userParam['client'] !== 'undefined') {
        //     session_write_close();
        //     session_id($userParam['client']);
        //     session_start();
        // }

        self::$app = Registry::getInstance();
        $this->getParams();

        Router::dispatch($query);
    }


    /** Функция для подключения в проект параметров */

    protected function getParams()
    {
        $params = require_once CONFIG . '/params.php';
        if (!empty($params)) {
            foreach($params as $k => $v) {
                self::$app->setProperty($k, $v);
            }
        }
    }
}
