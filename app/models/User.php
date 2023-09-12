<?php

namespace app\models;

use RedBeanPHP\R;

class User extends AppModel
{
    public function checkAuth()
    {
        return isset($_SESSION['user']);
    }

    public function login($userParam): bool
    {
        $email = $userParam['email'];
        $password = $userParam['password'];

        if ($email && $password) {
            $user = R::findOne('user', 'email = ?', [$email]);

            if ($user) {
                if($password == $user->password) { // password_verify($password, $user->password)
                    foreach ($user as $k => $v) {
                        if (!$k != 'password') {
                            $_SESSION['user'][$k] = $v;
                        }
                    }

                    return true;
                }
            }

            return false;
        }

        return false;

    }
}
