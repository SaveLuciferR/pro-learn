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

        session_start();
        

        // echo json_encode(array('query' => $query));

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
