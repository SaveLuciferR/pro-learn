<?php

namespace app\models;

use RedBeanPHP\R;


/** Модель общего доступа для контроллера UserController */
class User extends AppModel
{


    /** Функция, которая проверяет авторизацию пользователя на сайте
     * @return array|false Возвращает массив с данными о пользователе, кроме пароля, либо вернет false (если пользователь не авторизован)
     */

    public function checkAuth()
    {
        return isset($_SESSION['user']);
        // return isset($_COOKIE['user_token']);
    }


    /** Функция для авторизации пользователя. Если данные введены правильно, то данные о пользователе из базы данных записываются в $_SESSION['user']
     * @param array $userParam Массив, в котором должны быть ключи: email и password, по которым проверяется существование пользователя в базе данных
     * @return bool Возвращает результат работы, если пользователь ввел правильные данные, то true, если что-то неправильно, то false
     */

    public function login($userParam): bool
    {
        // var_dump($userParam['email']);

        $email = $userParam['email'];
        $password = $userParam['password'];

        if ($email && $password) {
            $user = R::findOne('user', 'mail = ?', [$email]);

            if ($user) {
                if ($password == $user->password) { // password_verify($password, $user->password)
                    foreach ($user as $k => $v) {
                        if (!$k != 'password') {
                            $_SESSION['user'][$k] = $v;
                        }
                    }

                    // echo session_id();

                    // if (isset($_COOKIE['user_token'])) {
                    //     setcookie('user_token', '', 0, "/");
                    // }

                    // $userToken = md5($email);

                    // $timeCookie = 2592000;
                    // setcookie('user_token', $userToken, time() + $timeCookie, '/', 'pro-learn', false, false);

                    // echo $_COOKIE['user_token'];

                    // $lastLoginTime = time();
                    // $lastLoginIP = $_SERVER['REMOTE_ADDR'];

                    return true;
                }
            }
        }

        return false;
    }


    /** Получение из базы данных информации о проекте */

    public function getProjectInfoBySlug($slug, $username)
    {
        if ($this->checkAuth() && $_SESSION['user']['username'] == $username) {
            return R::getRow("SELECT p.title, p.description, p.private, p.slug, u.username, u.role, p.date_of_publication
                                FROM project p JOIN prolearn.user u ON p.user_id = u.id
                                WHERE p.slug = ? AND u.username = ?", [$slug, $username]);
        }

        return R::getRow("SELECT p.id, p.title, p.description, p.private, p.slug, u.username, u.role, p.date_of_publication
                                FROM project p JOIN prolearn.user u ON p.user_id = u.id
                                WHERE p.slug = ? AND u.username = ? AND p.private = 0", [$slug, $username]);
    }

    public function getProjectLangsByID($id)
    {
        return R::getAll("SELECT lp.id, lp.title
                                FROM project_langprog plp JOIN langprog lp on plp.lang_prog_id = lp.id
                                WHERE plp.project_id = ?", [$id]);
    }

    public function getFilesProject($project, &$path, $secondaryPath = "")
    {
        $path = USER_PROJECT . '/' . $project['username'] . '/' . $project['slug'] . '/' . $secondaryPath;

        if (!file_exists($path)) throw new \Exception("Файл или директория не была найдена", 404);
        $directoryInfo = [];
//        debug($path);

        if (str_contains($path, '.')) {
            $fileInfo['fileName'] = $path;
            while(str_contains($fileInfo['fileName'], '/')) {
                $fileInfo['fileName'] = strrchr( $fileInfo['fileName'], '/');
                $fileInfo['fileName'] = substr( $fileInfo['fileName'], 1);
            }

            $fileInfo['language'] = substr(strrchr( $fileInfo['fileName'], '.'), 1);
            $fileInfo['body'] = file_get_contents($path); // h(file_get_contents($path))
        //    debug($fileInfo, 1);
            return $fileInfo;
        }
        else {
            $directoryInfo = scandir($path);

            array_shift($directoryInfo);
            array_shift($directoryInfo);

            $directoryData = [];

            foreach ($directoryInfo as $k => $v) {
                $temp = [];

                if (str_contains($v, '.')) {
                    $temp['type'] = substr(strrchr($v, '.'), 1);
                }
                else {
                    $temp['type'] = "directory";
                }

                $temp['lastCommit'] = date("d F Y", filemtime($path . '/' . $v));
                $temp['fileName'] = $v;

                $directoryData[$k] = $temp;
            }
        }

        return $directoryData;
    }

}
