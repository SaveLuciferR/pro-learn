<?php

namespace app\models\admin;

use RedBeanPHP\R;

class User extends \app\models\User
{
    public static function isAdmin()
    {
        return (isset($_SESSION['user']) && $_SESSION['user']['role'] === 'admin');
    }

    public function getCountUser()
    {
        return R::count('user');
    }

    public function getAllUser($start, $end)
    {
        return R::getAll("SELECT id, username, avatar_img, role, mail, about_user, mb_for_project, date_of_registration
                                FROM user
                                LIMIT ?,?", [$start, $end]);
    }

    public function getAllUserBySearch($search, $start, $end)
    {
        return R::getAll("SELECT id, username, avatar_img, role, mail, about_user, mb_for_project, date_of_registration
                                FROM user
                                WHERE username LIKE ?
                                LIMIT ?,?", [$search, $start, $end]);
    }
}