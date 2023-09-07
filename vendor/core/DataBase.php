<?php

namespace core;

use Exception;
use RedBeanPHP\R;

class DataBase
{
    use TSingleton;

    public static array $dataBase = [];

    private function __construct()
    {
        $dataBase = require_once CONFIG . '/config_db.php';

        // debug($this->dataBase);

        DataBase::run($dataBase);
    }

    public static function refreshDataBase($user = 'root', $password = '', $dsn = 'mysql:host=localhost;dbname=ProLearn;charset=utf8')
    {
        $dataBase['dsn'] = $dsn;
        $dataBase['user'] = $user;
        $dataBase['password'] = $password;

        // debug($dataBase, 1);

        R::close();

        redirect();

        DataBase::run($dataBase);
    }



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
