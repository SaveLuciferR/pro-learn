<?php

namespace app\models;

use core\App;
use core\Cache;
use RedBeanPHP\R;


/** Модель общего доступа для контроллера UserController */
class User extends AppModel
{


    /** Функция, которая проверяет авторизацию пользователя на сайте
     * @return array|false Возвращает массив с данными о пользователе, кроме пароля, либо вернет false (если пользователь не авторизован)
     */

    public function checkAuth()
    {
        return isset($_SESSION['user']) || isset($_COOKIE['user']);
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
            return R::getRow("SELECT p.id, p.title, p.description, p.private, p.slug, u.username, u.role, p.date_of_publication
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
        $path = USER_PROJECT . '/' . $project['username'] . '/' . $project['slug'] . '/src/' . $secondaryPath;

        return $this->createProjectFileList($path);
    }

    public function getFilesProjectInCache($cacheKey, &$path, $secondaryPath = "")
    {
        $path = Cache::getInstance()->getCache($cacheKey) . '/' . $secondaryPath;

        return $this->createProjectFileList($path);
    }

    public function saveNewProject($data, $pathProject, $username)
    {
        R::begin();
        try {
            $project = R::dispense('project');
            // $project->user_id = $_SESSION['user']['id'];
            $project->user_id = 2;
            $project->title = $data['title'];
            $project->private = $data['private'];
            $project->description = $data['desc'];
            $projectID = R::store($project);

            // debug($data, 1);

            $project->slug = AppModel::createSlug('project', 'slug', $data['title'], $projectID);

            // debug($project->slug, 1);

            $project->path_project = '/public/projects/' . $username . '/' . $project->slug;

            R::store($project);

            $distPath = USER_PROJECT . '/' . $username;
            if (!file_exists($distPath)) {
                mkdir($distPath);
            }

            $distPath .= '/' . $project->slug;
            if (!file_exists($distPath)) {
                mkdir($distPath);
            }

            $this->copyCacheProject($pathProject, $distPath . '/src');
            
            // $this->deleteCacheProjectDir($pathProject);

            $slug = $project->slug;

            R::commit();
            return $slug;
        } catch (\Exception $ex) {
            debug($ex);
            return false;
        }
    }

    protected function copyCacheProject($src, $dist)
    {
        if (file_exists($dist)) {
            $this->deleteCacheProjectDir($dist);
        }
        if (is_dir($src)) {
            mkdir($dist);
            $files = scandir($src);
            foreach ($files as $file) {
                if ($file != '.' && $file != '..') {
                    $this->copyCacheProject($src . '/' . $file, $dist . '/' . $file);
                }
            }
            rmdir($src);
        } else if (file_exists($src)) {
            copy($src, $dist);
            unlink($src);
        }
    }

    protected function deleteCacheProjectDir($dir)
    {
        if (is_dir($dir)) {
            $files = scandir($dir);
            foreach ($files as $file) {
                if ($file != "." && $file != "..") {
                    $this->deleteCacheProjectDir($dir . '/' . $file);
                }
            }
            rmdir($dir);
        } else if (file_exists($dir)) {
            unlink($dir);
        }
    }

    protected function createProjectFileList($path)
    {
        if (!file_exists($path)) throw new \Exception("Файл или директория не была найдена", 404);
        $directoryInfo = [];
        // debug($path, 1);

        if (str_contains($path, '.')) {
            $fileInfo['fileName'] = $path;
            while (str_contains($fileInfo['fileName'], '/')) {
                $fileInfo['fileName'] = strrchr($fileInfo['fileName'], '/');
                $fileInfo['fileName'] = substr($fileInfo['fileName'], 1);
            }

            $fileInfo['language'] = substr(strrchr($fileInfo['fileName'], '.'), 1);
            $fileInfo['body'] = file_get_contents($path); // h(file_get_contents($path))
            //    debug($fileInfo, 1);
            return $fileInfo;
        } else {
            $directoryInfo = scandir($path);

            array_shift($directoryInfo);
            array_shift($directoryInfo);

            $directoryData = [];

            foreach ($directoryInfo as $k => $v) {
                $temp = [];

                if (str_contains($v, '.')) {
                    $temp['type'] = substr(strrchr($v, '.'), 1);
                } else {
                    $temp['type'] = "directory";
                }

                $temp['lastCommit'] = date("d F Y", filemtime($path . '/' . $v));
                $temp['fileName'] = $v;

                $directoryData[$k] = $temp;
            }
        }

        return $directoryData;
    }

    public function getFeedbackCategory($lang)
    {
        return R::getAll("SELECT fc.id, fc.code, fcd.title
                              FROM feedbackcategory fc JOIN feedbackcategory_description fcd ON fc.id=fcd.feedbackcategory_id
                              WHERE fcd.language_id = ?", [$lang]);
    }

    public function saveFeedback($data)
    {
        R::begin();
        try {
            $feedback = R::dispense('feedback');
            $feedback->feedbackcategory_id = $data['category'];
            $feedback->name = $data['name'];
            $feedback->email = $data['email'];
            $feedback->text = $data['message'];
            $feedbackID = R::store($feedback);
            R::commit();
        } catch (\Exception $ex) {
            debug($ex);
            return false;
        }
    }
}
