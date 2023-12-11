<?php

namespace core;

use Exception;
use RedBeanPHP\R;


/** Класс для создания подключения к базе данных и установка базовых параметров */

class DataBase
{
    use TSingleton;

    public static array $dataBase = [];


    /** Конструктор с подключением параметров для подключения к базе данных и подключение к ней */

    private function __construct()
    {
        $dataBase = require_once CONFIG . '/config_db.php';

        // debug($this->dataBase);

        DataBase::run($dataBase);
    }

//    public static function refreshDataBase($user = 'root', $password = '', $dsn = 'mysql:host=localhost;dbname=ProLearn;charset=utf8')
//    {
//        $dataBase['dsn'] = $dsn;
//        $dataBase['user'] = $user;
//        $dataBase['password'] = $password;
//
//        // debug($dataBase, 1);
//
//        R::close();
//
//        redirect();
//
//        DataBase::run($dataBase);
//    }


    /** Функция для подключения к базе данных
     * @param array $dataBase Параметры для подключения к базе данных
     */


    public static function run($dataBase)
    {
        R::setup($dataBase['dsn'], $dataBase['user'], $dataBase['password']);
        if (!R::testConnection()) {
            throw new \Exception('No connection to DataBase', 500);
        }
        R::freeze(true);

        if (DEBUG) {
            R::debug(true, 3);
        }
    }
}
