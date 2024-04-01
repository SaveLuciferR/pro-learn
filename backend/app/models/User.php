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
        $email = $userParam['email'];
        $password = $userParam['password'];

        if ($email && $password) {
            $user = R::findOne('user', 'mail = ?', [$email]);

            if ($user) {
                if (password_verify($password, $user->password)) {
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

    public function saveSession($data, $username)
    {
        $row = R::getRow("SELECT s.id, s.ip_address FROM session s JOIN user u ON s.user_id = u.id
                                WHERE u.username = ? AND s.ip_address = ?", [$username, $data['ip']]);

        R::begin();
        try {
            $session = null;
            if ($row == null) {
                $session = R::dispense('session');
            } else {
                $session = R::load('session', $row['id']);
            }
            $session->type_device = $data['type'];
            $session->user_id = $_SESSION['user']['id'];
            $session->country_address = $data['country'];
            $session->city_address = $data['city'];
            $session->date_of_last_session = date('Y-m-d');
            $session->ip_address = $data['ip'];
            $sessionID = R::store($session);
            R::commit();

            return $sessionID;
        } catch (\Exception $ex) {
            if ($row == null) R::rollback();
            debug($ex);
            return false;
        }
    }

    public function getSessions($username)
    {
        return R::getAssoc("SELECT s.id, s.type_device, s.country_address, s.city_address, s.date_of_last_session, s.ip_address
                            FROM session s JOIN user u ON u.id = s.user_id WHERE u.username = ?", [$username]);
    }

    public function deleteSession($id)
    {
        R::begin();
        try {
            $session = R::load('session', $id);
            R::trash($session);
            R::commit();
        } catch (\Exception $ex) {
            R::rollback();
            debug($ex, 1);
            return false;
        }
    }

    public function getCourseCreatedUser($username, $lang)
    {
        return R::getAssoc("SELECT c.id, c.slug, cd.title, c.status, c.views,
                                (SELECT COUNT(uc.user_id)
                                    FROM user_course uc
                                    WHERE uc.success = 1 AND uc.course_id = c.id) AS 'finish_users',
                                    (SELECT COUNT(cm.user_id)
                                    FROM course_mark cm
                                    WHERE cm.course_id = c.id AND cm.mark = 1) AS 'like',
                                    (SELECT COUNT(cm.user_id)
                                    FROM course_mark cm
                                    WHERE cm.course_id = c.id AND cm.mark = 0) AS 'dislike'
                                   FROM course c JOIN course_description cd ON cd.course_id = c.id
                                   JOIN user u ON u.id = c.user_id
                                   WHERE u.username = ? AND cd.language_id = ?", [$username, $lang]);
    }

    public function getBlogCreatedUser($username, $lang)
    {

    }

    public function getTaskCreatedUser($username, $lang)
    {
        return R::getAssoc("SELECT c.id, c.slug, cd.title, c.views, c.status,
                                (SELECT COUNT(uc.user_id)
                                    FROM user_challenge uc
                                    WHERE uc.success = 1 AND uc.challenge_id = c.id) AS 'finish_users',
                                    (SELECT COUNT(cm.user_id)
                                    FROM challenge_mark cm
                                    WHERE cm.challenge_id = c.id AND cm.mark = 1) AS 'like',
                                    (SELECT COUNT(cm.user_id)
                                    FROM challenge_mark cm
                                    WHERE cm.challenge_id = c.id AND cm.mark = 0) AS 'dislike'
                                FROM challenge c JOIN challenge_description cd ON cd.challenge_id = c.id
                                JOIN user u ON u.id = c.user_id
                                WHERE u.username = ? AND cd.language_id = ?", [$username, $lang]);
    }

    public function getUserPrivacy($username)
    {
        return R::getRow("SELECT u.all_profile_private, u.personal_info_private, u.look_current_course_private FROM user u WHERE u.username = ?", [$username]);
    }

    public function savePrivacySettingUser($data, $id)
    {
        try {
            $user = R::load('user', $id);
            $user->all_profile_private = $data['all_profile_private'] ? 1 : 0;
            $user->personal_info_private = $data['personal_info_private'] ? 1 : 0;
            $user->look_current_course_private = $data['look_current_course_private'] ? 1 : 0;
            R::store($user);
            return true;
        } catch (\Exception $ex) {
            debug($ex);
            return false;
        }
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

    public function getUserInfo($username)
    {
        return R::getRow("SELECT u.username, u.role, u.last_name, 
                                    u.first_name, u.country_address, 
                                    u.date_of_registration, avatar_img, heading_img,
                                    about_user, all_profile_private, personal_info_private,
                                    look_current_course_private
                            FROM user u
                            WHERE u.username = ?", [$username]);
    }

    public function getUserProjects($username)
    {
        return R::getAll("SELECT p.id, p.slug, p.title, p.date_of_publication, p.private, p.description
                               FROM project p JOIN user u ON u.id = p.user_id
                               WHERE u.username = ?", [$username]);
    }

    public function getUserCourses($username, $lang)
    {
        return R::getAssoc("SELECT c.id, uc.success,
                                    c.slug, c.icon, c.difficulty, cd.heading, cd.excerpt, uc.current_stage, u.username,
                                    u.role, c.date_of_publication, c.views,
                                    (SELECT COUNT(sc.id)
                                    FROM stagecourse sc 
                                    WHERE sc.course_id = c.id) AS 'amount_stage',
                                    (SELECT COUNT(sct.id)
                                    FROM stepcourse sct JOIN stagecourse sc ON sc.id = sct.stage_course_id
                                    WHERE sc.course_id = c.id) AS 'amount_step',
                                    (SELECT COUNT(cc.challenge_id)
                                    FROM course_challenge cc
                                    WHERE cc.course_id = c.id) AS 'final_projects',
                                    (SELECT COUNT(uc.user_id)
                                    FROM user_course uc
                                    WHERE uc.success = 1 AND uc.course_id = c.id) AS 'finish_users',
                                    (SELECT COUNT(cm.user_id)
                                    FROM course_mark cm
                                    WHERE cm.course_id = c.id AND cm.mark = 1) AS 'like',
                                    (SELECT COUNT(cm.user_id)
                                    FROM course_mark cm
                                    WHERE cm.course_id = c.id AND cm.mark = 0) AS 'dislike'
                               FROM course c JOIN user_course uc ON uc.course_id = c.id
                               JOIN user u ON u.id = uc.user_id
                               JOIN course_description cd ON cd.course_id = c.id
                               WHERE u.username = ? AND cd.language_id = ?", [$username, $lang]);
    }

    public function getUserCoursesFromUser($username, $lang)
    {
        return R::getAll("SELECT c.id,
                                    c.slug, c.icon, c.difficulty, cd.heading, cd.excerpt,c.date_of_publication, c.views,
                                    (SELECT COUNT(sc.id)
                                    FROM stagecourse sc 
                                    WHERE sc.course_id = c.id) AS 'amount_stage',
                                    (SELECT COUNT(sct.id)
                                    FROM stepcourse sct JOIN stagecourse sc ON sc.id = sct.stage_course_id
                                    WHERE sc.course_id = c.id) AS 'amount_step',
                                    (SELECT COUNT(cc.challenge_id)
                                    FROM course_challenge cc
                                    WHERE cc.course_id = c) AS 'final_projects',
                                    (SELECT COUNT(uc.user_id)
                                    FROM user_course uc
                                    WHERE uc.success = 1 AND uc.course_id = c.id) AS 'finish_users',
                                    (SELECT COUNT(cm.user_id)
                                    FROM course_mark cm
                                    WHERE cm.course_id = c.id AND cm.mark = 1) AS 'like',
                                    (SELECT COUNT(cm.user_id)
                                    FROM course_mark cm
                                    WHERE cm.course_id = c.id AND cm.mark = 0) AS 'dislike'
                               FROM course c JOIN user u ON u.id = c.user_id
                               JOIN course_description cd ON cd.course_id = c.id
                               WHERE u.username = ? AND cd.language_id = ?", [$username, $lang]);
    }

    public function getCourseLangProgByID($id)
    {
        return R::getAssoc("SELECT lp.id, lp.title
                                FROM course c JOIN course_categorylangprog cclp ON c.id = cclp.course_id
                                JOIN langprog lp ON lp.id = cclp.lang_prog_id
                                WHERE c.id = ?", [$id]);
    }

    public function getCourseTagByID($id)
    {
        return R::getAssoc("SELECT ct.title 
                                FROM coursetag ct JOIN course_coursetag cct ON ct.id = cct.coursetag_id 
                                WHERE cct.course_id = ?", [$id]);
    }

    public function getUserTasks($username, $lang)
    {
        return R::getAssoc("SELECT c.id, uc.success, c.slug, c.difficulty, cd.heading, cd.content, c.date_of_publication, c.views,
                                (SELECT COUNT(uc.user_id)
                                    FROM user_challenge uc
                                    WHERE uc.success = 1 AND uc.challenge_id = c.id) AS 'finish_users',
                                (SELECT COUNT(cm.user_id)
                                    FROM challenge_mark cm
                                    WHERE cm.challenge_id = c.id AND cm.mark = 1) AS 'like',
                                    (SELECT COUNT(cm.user_id)
                                    FROM challenge_mark cm
                                    WHERE cm.challenge_id = c.id AND cm.mark = 0) AS 'dislike'
                               FROM challenge c JOIN user_challenge uc ON uc.challenge_id = c.id
                                JOIN user u ON u.id = uc.user_id
                                JOIN challenge_description cd ON cd.challenge_id = c.id
                                WHERE u.username = ? AND cd.language_id = ?", [$username, $lang]);
    }

    public function getUserTasksFromUser($username, $lang)
    {
        return R::getAll("SELECT c.id, c.slug, c.difficulty, cd.heading, cd.content, c.date_of_publication, views,
                                 (SELECT COUNT(uc.user_id)
                                    FROM user_challenge uc
                                    WHERE uc.success = 1 AND uc.challenge_id = c.id) AS 'finish_users',
                                (SELECT COUNT(cm.user_id)
                                    FROM challenge_mark cm
                                    WHERE cm.challenge_id = c.id AND cm.mark = 1) AS 'like',
                                    (SELECT COUNT(cm.user_id)
                                    FROM challenge_mark cm
                                    WHERE cm.challenge_id = c.id AND cm.mark = 0) AS 'dislike'
                               FROM challenge c
                                JOIN user u ON u.id = c.user_id
                                JOIN challenge_description cd ON cd.challenge_id = c.id
                                WHERE u.username = ? AND cd.language_id = ?", [$username, $lang]);
    }

    public function getTaskLangProgByID($id)
    {
        return R::getAssoc("SELECT lp.id, lp.title
                                FROM challenge c JOIN challenge_categorylangprog cclp ON c.id = cclp.challenge_id
                                JOIN langprog lp ON lp.id = cclp.lang_prog_id
                                WHERE c.id = ?", [$id]);
    }

    public function getTaskTagByID($id)
    {
        return R::getAll("SELECT ct.title 
                                FROM challengetag ct JOIN challenge_challengetag cct ON ct.id = cct.challengetag_id 
                                WHERE cct.challenge_id = ?", [$id]);
    }

    public function getGeneralSettingsByUser($username)
    {
        return R::getRow("SELECT u.id, u.username, u.avatar_img, u.heading_img, u.about_user, u.last_name, u.first_name, u.country_address
                        FROM user u
                        WHERE u.username = ?", [$username]);
    }

    public function updateNewGenericUserSettings($data, $id)
    {
        try {
            $user = R::load('user', $id);
            $user->username = $data['username'];
            $user->avatar_img = $data['avatar_img'];
            $user->heading_img = $data['heading_img'];
            $user->about_user = $data['about_user'];
            $user->last_name = $data['last_name'];
            $user->first_name = $data['first_name'];
            $user->country_address = $data['country_address'];
//            debug($user);
            $userID = R::store($user);
            return true;
        } catch (\Exception $ex) {
//            debug($ex->getMessage());
            return $ex->getMessage();
        }
    }

    public function getSecuritySettingsByUser($username)
    {
        return R::getRow("SELECT u.mail, u.second_mail
                            FROM user u
                             WHERE u.username = ?", [$username]);
    }

    public function updateSecurityUserSettings($data, $id)
    {
        try {
            $user = R::load('user', $id);
            $user->mail = $data['mail'];
            $user->second_mail = $data['second_mail'];

            $UserID = R::store($user);
            return true;
        } catch (\Exception $ex) {
//            debug($ex);
            return $ex->getMessage();
        }
    }

    public function updatePasswordUserSettings($data, $id)
    {
        $user = R::findOne("user", "id = ?", [$id]);

        if ($user) {
            if (password_verify($data["old_password"], $user->password)) {
                try {
                    $user = R::load('user', $id);
                    $user->password = password_hash($data['new_password'], null);

                    $UserID = R::store($user);
                    return true;
                } catch (\Exception $ex) {
                    debug($ex->getMessage());

                }
            }
        }

        return "нет";
    }

}