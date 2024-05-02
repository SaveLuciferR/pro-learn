<?php

namespace app\models;

use core\App;
use core\Cache;
use http\Exception;
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
        return R::getAll("SELECT s.id, s.type_device, s.country_address, s.city_address, s.date_of_last_session, s.ip_address
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
        $path = USER_PROJECT . '/' . $project['username'] . '/' . $project['slug'] . '/' . $secondaryPath; // . '/src/'

        return $this->createProjectFileList($path);
    }

    public function getFilesProjectInCache($cacheKey, &$path, $secondaryPath = "")
    {
        $path = Cache::getInstance()->getCache($cacheKey) . '/' . $secondaryPath;

//        debug($path);

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

            $this->copyCacheProject($pathProject, $distPath); // . '/src'

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

        if (!is_dir($path)) { // && (str_contains($path, '.'))
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
            return true;
        } catch (\Exception $ex) {
            debug($ex);
            return false;
        }
    }

    public function getUserInfo($username)
    {
        return R::getRow("SELECT u.id, u.username, u.role, u.last_name, 
                                    u.first_name, u.country_address, 
                                    u.date_of_registration, avatar_img, heading_img,
                                    about_user, all_profile_private, personal_info_private,
                                    look_current_course_private
                            FROM user u
                            WHERE u.username = ?", [$username]);
    }

    public function getUserProjects($username)
    {
        return R::getAll("SELECT p.id, p.id, p.slug, p.title, p.date_of_publication, p.private, p.description
                               FROM project p JOIN user u ON u.id = p.user_id
                               WHERE u.username = ?", [$username]);
    }

    public function getUserTemplate($userID, $lang)
    {
        return R::getAll("SELECT t.id, u.username, u.role, t.slug, t.icon, t.private, t.for_project, td.title, td.description
                                FROM projecttemplate t JOIN projecttemplate_description td ON td.projecttemplate_id = t.id
                                JOIN user u ON u.id = t.user_id
                                WHERE u.id = ? AND td.language_id = ?", [$userID, $lang]);
    }

    public function getUserOtherTemplate($lang)
    {
        return R::getAll("SELECT t.id, u.username, u.role, t.slug, t.icon, t.private, t.for_project, td.title, td.description
                                FROM projecttemplate t JOIN projecttemplate_description td ON td.projecttemplate_id = t.id
                                JOIN user u ON u.id = t.user_id
                                WHERE td.language_id = ? AND t.private = 0", [$lang]);
    }

    public function getUserCourses($username, $lang)
    {
        return R::getAssoc("SELECT c.id, uc.success,
                                    c.slug, c.icon, c.difficulty, cd.title, cd.excerpt, uc.current_stage, u.username,
                                    u.role, c.date_of_publication, c.views,
                                    (SELECT COUNT(sc.id)
                                    FROM stagecourse sc 
                                    WHERE sc.course_id = c.id) AS 'amount_stage',
                                    (SELECT COUNT(sct.id)
                                    FROM stepcourse sct JOIN stagecourse sc ON sc.id = sct.stage_course_id
                                    WHERE sc.course_id = c.id) AS 'amount_step',
                                   (SELECT COUNT(sct.id)
                                    FROM stepcourse sct JOIN stagecourse sc ON sc.id = sct.stage_course_id
                                    WHERE sc.course_id = c.id AND sct.challenge_id <> null) AS 'final_projects',
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
                                    c.slug, c.icon, c.difficulty, cd.title, cd.excerpt,c.date_of_publication, c.views,
                                    (SELECT COUNT(sc.id)
                                    FROM stagecourse sc 
                                    WHERE sc.course_id = c.id) AS 'amount_stage',
                                    (SELECT COUNT(sct.id)
                                    FROM stepcourse sct JOIN stagecourse sc ON sc.id = sct.stage_course_id
                                    WHERE sc.course_id = c.id) AS 'amount_step',
                                    (SELECT COUNT(sct.id)
                                    FROM stepcourse sct JOIN stagecourse sc ON sc.id = sct.stage_course_id
                                    WHERE sc.course_id = c.id AND sct.challenge_id <> null) AS 'final_projects',
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
        return R::getAll("SELECT ct.title 
                                FROM coursetag ct JOIN course_coursetag cct ON ct.id = cct.coursetag_id 
                                WHERE cct.course_id = ?", [$id]);
    }

    public function getUserTasks($username, $lang)
    {
        return R::getAssoc("SELECT c.id, uc.success, c.slug, c.difficulty, cd.title, cd.content, c.date_of_publication, c.views,
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
        return R::getAll("SELECT c.id, c.slug, c.difficulty, cd.title, cd.content, c.date_of_publication, views,
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
        return R::getAll("SELECT lp.id, lp.title
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
        R::begin();
        try {
            $user = R::load('user', $id);
            $user->username = $data['username'];
            $user->avatar_img = $data['avatar_img'];
            $user->heading_img = $data['heading_img'];
            $user->about_user = $data['about_user'];
            $user->last_name = $data['last_name'];
            $user->first_name = $data['first_name'];
            $user->country_address = $data['country_address'];
            $userID = R::store($user);
            R::commit();
            return true;
        } catch (\Exception $ex) {
//            debug($ex->getMessage());
            R::rollback();
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
                    return false;
                }
            } else {
                return 'InCorrectPassword';
            }
        }

        return "";
    }

    public function getTypeLesson($lang)
    {
        return R::getAll("SELECT t.id, t.code, td.title 
                                FROM typestepcourse t JOIN typestepcourse_description td ON td.typestepcourse_id = t.id
                                WHERE td.language_id = ?", [$lang]);
    }

    public function saveCourse($userID, &$slug)
    {
        $lang = App::$app->getProperty('language')['id'];
        $data = $_POST['course'];
        $data['status'] = $_POST['status'];

        R::begin();
        try {

            $status = R::findOne("status", "code = ?", [$data['status']]);

            if ($data['slug'] === '') {
                if (!$status) throw new \Exception("Not status");

                $course = R::dispense('course');

                $course->user_id = $userID;
                $course->views = 0;
                $course->status_id = $status->id;
                $course->icon = $data['icon'];
                $course->difficulty = $data['difficulty'];

                $courseID = R::store($course);

                $course->slug = AppModel::createSlug('course', 'slug', $data['main'][$lang]['title'], $courseID);
            } else {
                $course = R::findOne('course', 'slug = ?', [$data['slug']]);

                $course->status_id = $status->id;
                $course->icon = $data['icon'];
                $course->difficulty = $data['difficulty'];
            }

            if ($status->code === 'public') {
                $course->date_of_publication = R::isoDate(time());
            }

            $slug = $course->slug;

            $courseID = R::store($course);
            R::commit();

            return $this->saveCourseDescription($courseID, $data);
        } catch (\Exception $ex) {
            R::rollback();
            debug($ex);
            return false;
        }
    }

    public function getCourseForEdit(&$username, $slug, $isAdmin = false)
    {
        //TODO: категория и язык
        if ($isAdmin) {
            $course = R::getRow("SELECT c.id, c.slug, u.username, c.difficulty, c.icon, s.code AS 'status' 
                                FROM course c JOIN status s ON s.id = c.status_id
                                JOIN user u ON u.id = c.user_id
                                WHERE c.slug = ?", [$slug]);
            $username = $course['username'];
        } else {
            $course = R::getRow("SELECT c.id, c.slug, u.username, c.difficulty, c.icon, s.code AS 'status' 
                                FROM course c JOIN status s ON s.id = c.status_id
                                JOIN user u ON u.id = c.user_id
                                WHERE c.slug = ? AND u.username = ?", [$slug, $username]);
        }

        if (!$course) {
            return $course;
        }

        $course['main'] = R::getAssoc("SELECT cd.language_id, cd.title, cd.excerpt, cd.description, cd.keywords
                                            FROM course_description cd 
                                            WHERE cd.course_id = ?", [$course['id']]);

        foreach ($course['main'] as $lang => &$desc) {
            $course['main'][$lang]['block'] = R::getAssoc("SELECT s.num_stage, s.id, sd.title 
                                                                FROM stagecourse s JOIN stagecourse_description sd ON sd.stage_course_id = s.id
                                                                WHERE s.course_id = ? AND sd.language_id = ?", [$course['id'], $lang]);

            foreach ($course['main'][$lang]['block'] as $numStage => &$blockDesc) {
                $course['main'][$lang]['block'][$numStage]['lesson'] = R::getAssoc("SELECT s.num_step, s.challenge_id, t.code, sd.title, 
                                                                                            sd.description, sd.answer_option, 
                                                                                            sd.right_answer
                                                                                         FROM stepcourse s JOIN stepcourse_description sd ON s.id = sd.step_course_id
                                                                                         JOIN typestepcourse t ON t.id = s.typestepcourse_id
                                                                                         WHERE s.stage_course_id = ? AND sd.language_id = ?", [$blockDesc['id'], $lang]);
                foreach ($blockDesc['lesson'] as $numStep => &$stepDesc) {
//                    debug($blockDesc, 1);
                    $stepDesc['answer_option'] = json_decode($stepDesc['answer_option'], true);
                }
                unset($course['main'][$lang]['block'][$numStage]['id']);
            }
        }

        $course['lang_prog'] = R::getAll("SELECT l.lang_prog_id FROM course_categorylangprog l WHERE l.course_id = ? ", [$course['id']]);
        $course['category_prog'] = R::getAll("SELECT c.category_prog_id FROM course_categorylangprog c WHERE c.course_id = ?", [$course['id']]);

        unset($course['id'], $course['username']);
//        debug($course, 1);
        return $course;
    }

    public function getTaskForEdit(&$username, $slug, $isAdmin = false)
    {
        //TODO: категория и язык
        if ($isAdmin) {
            $task = R::getRow("SELECT t.id, t.slug, u.username, t.num_of_input_data, t.for_course, t.project_id, t.template_id, t.difficulty, s.code AS 'status' 
                                FROM task t JOIN status s ON s.id = t.status_id
                                JOIN user u ON u.id = t.user_id
                                WHERE t.slug = ?", [$slug]);
            $username = $task['username'];
        } else {
            $task = R::getRow("SELECT t.id, t.slug, u.username, t.num_of_input_data, t.for_course, t.project_id, t.template_id, 
                                            t.difficulty, s.code AS 'status' 
                                FROM challenge t JOIN status s ON s.id = t.status_id
                                JOIN user u ON u.id = t.user_id
                                WHERE t.slug = ? AND u.username = ?", [$slug, $username]);
        }


        if (!$task) {
            return $task;
        }

        $task['main'] = R::getAssoc("SELECT cd.language_id, cd.title, cd.content, cd.description, cd.keywords
                                            FROM challenge_description cd 
                                            WHERE cd.challenge_id = ?", [$task['id']]);
        $task['input_output_data'] = R::getAll("SELECT i.input_data AS 'input', i.output_data AS 'output' 
                                                    FROM inputoutputdata i
                                                    WHERE i.challenge_id = ?", [$task['id']]);
        foreach ($task['input_output_data'] as $k => &$v) {
            $v['input'] = json_decode($v['input'], JSON_UNESCAPED_SLASHES);
            $v['output'] = json_decode($v['output'], JSON_UNESCAPED_SLASHES);
        }
        $task['lang_prog'] = R::getAll("SELECT l.lang_prog_id FROM challenge_categorylangprog l WHERE l.challenge_id = ? ", [$task['id']]);
        $task['category_prog'] = R::getAll("SELECT c.category_prog_id FROM challenge_categorylangprog c WHERE c.challenge_id = ?", [$task['id']]);
        return $task;
    }

    public function getCategoryLang($lang)
    {
        return R::getAll("SELECT c.id, cd.title, c.code 
                                FROM categoryprog c JOIN categoryprog_description cd ON c.id = cd.category_prog_id 
                                WHERE cd.language_id = ? ", [$lang]);
    }

    public function getLangProg()
    {
        return R::getAll("SELECT l.id, l.title, l.code FROM langprog l");
    }

    public function saveTask($userID, &$slug = '')
    {
        $lang = App::$app->getProperty('language')['id'];
        $data = $_POST['task'];
        $data['status'] = $_POST['status'];

        R::begin();
        try {
            $status = R::findOne("status", "code = ?", [$data['status']]);

            if ($data['slug'] === '') {
                if (!$status) throw new \Exception("Not status");

                $task = R::dispense('challenge');

                $task->user_id = $userID;
                $task->views = 0;
                $task->status_id = $status->id;
                $task->difficulty = $data['difficulty'];
                $task->project_id = $data['project_id'];
                $task->template_id = $data['template_id'];
                $task->num_of_input_data = $data['num_of_input_data'];
                $task->for_course = $data['for_course'];

                $taskID = R::store($task);

                $task->slug = AppModel::createSlug('challenge', 'slug', $data['main'][$lang]['title'], $taskID);
            } else {
                $task = R::findOne('challenge', 'slug = ?', [$data['slug']]);

                $task->status_id = $status->id;
                $task->difficulty = $data['difficulty'];
                $task->project_id = $data['project_id'];
                $task->template_id = $data['template_id'];
                $task->num_of_input_data = $data['num_of_input_data'];
                $task->for_course = $data['for_course'];
            }


            $slug = $task->slug;

            $taskID = R::store($task);
            R::commit();

            return $this->saveTaskDescription($taskID, $data);
        } catch (\Exception $ex) {
            R::rollback();
            debug($ex);
            return false;
        }
    }

    protected function saveTaskDescription($taskID, $data)
    {
        $flag = true;
        if (isset($data['main'])) {
            foreach ($data['main'] as $langID => $item) {
                R::begin();
                try {
                    if ($data['slug'] === '') {

                        R::exec("INSERT INTO challenge_description (language_id, challenge_id, title, content, description, keywords) VALUES (?, ?, ?, ?, ?, ?)", [
                            $langID,
                            $taskID,
                            $item['title'],
                            $item['content'],
                            $item['description'],
                            $item['keywords'],
                        ]);
                    } else {
                        R::exec("UPDATE challenge_description SET title = ?, description = ?, keywords = ?, content = ? WHERE language_id = ? AND challenge_id = ?", [
                            $item['title'],
                            $item['description'],
                            $item['keywords'],
                            $item['content'],
                            $langID,
                            $taskID
                        ]);
                    }

                    R::commit();
                } catch (\Exception $ex) {
                    R::rollback();
                    debug($ex);
                    return false;
                }
            }
        }

        $flag = $this->saveInputOutputData($taskID, $data['input_output_data']);

        return $flag;

    }

    protected function saveInputOutputData($taskID, $data)
    {
        $flag = true;
        R::begin();
        try {
            $amountData = R::getAll("SELECT i.id FROM inputoutputdata i WHERE i.challenge_id = ?", [$taskID]);
            R::commit();
        } catch (\Exception $ex) {
            debug($ex);
            R::rollback();
            return false;
        }
//        debug($amountData, 1);
        if (count($amountData) > 0) {
            foreach ($amountData as $v) {
                R::begin();
                try {
//                    debug($v, 1);
                    $removeInput = R::load("inputoutputdata", $v['id']);
                    R::trash($removeInput);
                    R::commit();
                } catch (\Exception $ex) {
                    R::rollback();
                    debug($ex);
                    return false;
                }
            }
        }

        foreach ($data as $index => $input) {
            R::begin();
            try {
//                debug($input, 1);
                $addInput = R::dispense('inputoutputdata');
                $addInput->challenge_id = $taskID;
                $addInput->input_data = json_encode($input['input']);
                $addInput->output_data = json_encode($input['output']);

                R::store($addInput);
                R::commit();
            } catch (\Exception $ex) {
                R::rollback();
                debug($ex);
                return false;
            }
        }

        return $flag;
    }

    protected function saveCourseDescription($courseID, $data)
    {
//        debug($data, 1);
        R::begin();
        try {
            $flag = true;
            if (isset($data['main'])) {
                foreach ($data['main'] as $langID => $item) {
                    if ($data['slug'] === '') {
                        R::exec("INSERT INTO course_description (language_id, course_id, title, excerpt, description, keywords) VALUES (?, ?, ?, ?, ?, ?)", [
                            $langID,
                            $courseID,
                            $item['title'],
                            $item['excerpt'],
                            $item['description'],
                            $item['keywords'],
                        ]);
                    } else {
                        R::exec("UPDATE course_description SET title = ?, description = ?, keywords = ?, excerpt = ? WHERE language_id = ? AND course_id = ?", [
                            $item['title'],
                            $item['description'],
                            $item['keywords'],
                            $item['excerpt'],
                            $langID,
                            $courseID
                        ]);
                    }
                }
                R::commit();
                $flag = $this->saveStageCourse($courseID, $data['slug'], $data['main']);
            } else {
                R::commit();
            }
            return $flag;
        } catch (\Exception $ex) {
            R::rollback();
            debug($ex);
            return false;
        }
    }

    protected function saveStageCourse($courseID, $slug, $data)
    {
        $flag = true;
        $amountStage = R::getAll("SELECT s.num_stage FROM stagecourse s WHERE s.course_id = ?", [$courseID]);

        foreach ($data as $langID => $item) {
            if (isset($item['block'])) {
                foreach ($item['block'] as $numStage => $block) {
                    R::begin();
                    try {
                        $stageCurrent = R::findOne("stagecourse", "course_id = ? AND num_stage = ?", [$courseID, $numStage]);
                        if (!$stageCurrent) {
                            $stage = R::dispense("stagecourse");
                            $stage->course_id = $courseID;
                            $stage->num_stage = $numStage;
                            $stage->icon = "/tmp/";
                            $stageID = R::store($stage);
                        } else {
                            $stageID = $stageCurrent->id;
                        }

                        R::commit();
                        if (!$this->saveStageDescriptionCourse($block, $slug, $stageID, $langID)) $flag = false;
                    } catch (\Exception $ex) {
                        R::rollback();
                        debug($ex);
                        return false;
                    }
                }
            }
        }

        if (count($data[array_key_first($data)]['block']) < count($amountStage)) {
            foreach ($amountStage as $v) {
                if ($v['num_stage'] > count($data[array_key_first($data)]['block'])) {
                    R::begin();
                    try {
//                        debug($v['num_stage'], 1);
                        $stage = R::findOne('stagecourse', 'num_stage = ? AND course_id = ?', [$v['num_stage'], $courseID]);
                        R::trash($stage);
                        R::commit();
                    } catch (\Exception $ex) {
                        R::rollback();
                        debug($ex);
                        return false;
                    }
                }
            }
        }
        return $flag;
    }

    protected function saveStageDescriptionCourse($block, $slug, $stageID, $langID)
    {
        R::begin();
        try {
            R::exec("INSERT INTO stagecourse_description (language_id, stage_course_id, title) VALUES (?, ?, ?)", [
                $langID,
                $stageID,
                $block['title'],
            ]);

            R::commit();
            $this->saveStepCourse($block, $slug, $langID, $stageID);
            return true;
        } catch (\Exception $ex) {
            R::rollback();
            if (str_contains($ex->getMessage(), 'PRIMARY')) {
                R::begin();
                try {
                    R::exec("UPDATE stagecourse_description SET title = ? WHERE language_id = ? AND stage_course_id = ?", [
                        $block['title'],
                        $langID,
                        $stageID
                    ]);
                    R::commit();

                    $this->saveStepCourse($block, $slug, $langID, $stageID);
                    return true;
                } catch (\Exception $ex2) {
                    R::rollback();
                    debug($ex . $ex2);
                    return false;
                }
            }

            return false;
        }
    }

    protected function saveStepCourse($block, $slug, $langID, $stageID)
    {
//        debug($block);
        $flag = true;
        $amountStep = R::getAll("SELECT s.num_step FROM stepcourse s WHERE s.stage_course_id = ?", [$stageID]);

        if (isset($block['lesson'])) {
            foreach ($block['lesson'] as $numStep => $lesson) {
                R::begin();
                try {
                    $type = R::findOne("typestepcourse", "code = ?", [$lesson['code']]);

                    $stepCurrent = R::findOne("stepcourse", "num_step = ? AND stage_course_id = ?", [$numStep, $stageID]);
                    if (!$stepCurrent) {
                        $step = R::dispense("stepcourse");
                        $step->stage_course_id = $stageID;
                        $step->typestepcourse_id = $type->id;
                        $step->challenge_id = $lesson['challenge_id'];
                        //TODO: Запись id задачи
                        $step->num_step = $numStep;
                        $stepID = R::store($step);
                    } else {
                        $stepID = $stepCurrent->id;

                        if ($slug !== '') {
                            $step = R::load('stepcourse', $stepID);
                            $step->typestepcourse_id = $type->id;
                            $step->challenge_id = $lesson['challenge_id'];
                            R::store($step);
                        }
                    }
                    R::commit();
                    if (!$this->saveStepDescriptionCourse($langID, $slug, $stepID, $lesson)) $flag = false;
                } catch (\Exception $ex) {
                    R::rollback();
                    debug($ex);
                    return false;
                }
            }


            if (count($block['lesson']) < count($amountStep)) {
//                debug($block, 1);
                foreach ($amountStep as $v) {
                    if ($v['num_step'] > count($block['lesson'])) {
                        R::begin();
                        try {
                            $step = R::findOne('stepcourse', 'num_step = ? AND stage_course_id = ?', [$v['num_step'], $stageID]);
                            R::trash($step);
                            R::commit();
                        } catch (\Exception $ex) {
                            R::rollback();
                            debug($ex);
                            return false;
                        }
                    }
                }
            }
        }

//        debug($block['lesson'], 1);
        return $flag;
    }

    protected function saveStepDescriptionCourse($langID, $slug, $stepID, $lesson)
    {
//        debug($lesson, 1);
        R::begin();
        try {
            R::exec("INSERT INTO stepcourse_description (language_id, step_course_id, title, description, answer_option, right_answer) VALUES (?, ?, ?, ?, ?, ?)", [
                $langID,
                $stepID,
                $lesson['title'],
                $lesson['description'],
                json_encode($lesson['answer_option'], JSON_UNESCAPED_UNICODE) ?: null,
                $lesson['right_answer']
            ]);

            R::commit();
            return true;
        } catch (\Exception $ex) {
            R::rollback();

//            debug($ex->getMessage(), 1);

            if (str_contains($ex->getMessage(), 'PRIMARY')) {
                R::begin();
                try {
                    R::exec("UPDATE stepcourse_description SET title = ?, description = ?, answer_option = ?, right_answer = ? WHERE language_id = ? AND step_course_id = ?", [
                        $lesson['title'],
                        $lesson['description'],
                        json_encode($lesson['answer_option'], JSON_UNESCAPED_UNICODE) ?: null,
                        $lesson['right_answer'],
                        $langID,
                        $stepID

                    ]);
                    R::commit();
                    return true;
                } catch (\Exception $ex2) {
                    R::rollback();
                    debug($ex . $ex2);
                    return false;
                }
            }

            return false;
        }
    }
}