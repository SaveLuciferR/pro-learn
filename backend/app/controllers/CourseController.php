<?php

namespace app\controllers;

use app\controllers\AppController;
use core\App;

class CourseController extends AppController
{

    /* Вызывается, если в url адресе код_языка/course */
    public function indexAction()
    {
        $course = [];

        if (isset($_SESSION['user'])) {
            $course['user_course'] = $this->model->getCourseForUser($_SESSION['user']['username'], App::$app->getProperty('language')['id']);

            foreach ($course['user_course'] as $k => $v) {
                $course[$k]['date_of_publication'] = date('d.m.Y', strtotime($v['date_of_publication']));
                $course[$k]['tags'] = $this->model->getCourseTagByID($k);
                $course[$k]['language'] = $this->model->getCourseLangProgByID($k);
            }
        }

        $course['all_course'] = $this->model->getAllCourse(App::$app->getProperty('language')['id']);
        foreach ($course['all_course'] as $k => $v) {
            $course[$k]['date_of_publication'] = date('d.m.Y', strtotime($v['date_of_publication']));
            $course[$k]['tags'] = $this->model->getCourseTagByID($k);
            $course[$k]['language'] = $this->model->getCourseLangProgByID($k);
        }

        echo json_encode(array('course' => $course), JSON_UNESCAPED_SLASHES);
    }


    /* Вызывается, если в url адресе код_языка/course/slug_курса */
    public function viewAction()
    {
        $course = $this->model->getCourseBySlug(App::$app->getProperty('language')['id'], $this->route['slug']);
        $course['stage_course'] = [];
        if (isset($_SESSION['user'])) {
            $stageCourse = $this->model->getStageCourseBySlug(App::$app->getProperty('language')['id'], $course['id']);
            foreach ($stageCourse as $k => &$v) {
                $stageCourse[$k]['success'] = 0;
                $stageCourse[$k]['step_course'] = $this->model->getStepCourseByStageID(App::$app->getProperty('language')['id'], $k);

                foreach ($stageCourse[$k]['step_course'] as $ks => $vs) {
                    $stageCourse[$k]['step_course'][$ks]['success'] = 0;
                }
            }
            $firstStageKey = array_key_first($stageCourse);
            $firstStepKey = array_key_first($stageCourse[$firstStageKey]['step_course']);
            $stageCourse[$firstStageKey]['success'] = 2;
            $stageCourse[$firstStageKey]['step_course'][$firstStepKey]['success'] = 2;

            $userCourse = $this->model->getInfoAboutUserFromCourse($_SESSION['user']['id'], $course['id']);
            if ($userCourse) {
                if ($userCourse['success'] == 1) {
                    $course['success'] = 1;
                } else {
                    $course['success'] = 0;
                }

                foreach ($stageCourse as $k => &$v) {
                    if ($v['num_stage'] < $userCourse['current_stage']) {
                        $stageCourse[$k]['success'] = 1;
                    } else if ($v['num_stage'] > $userCourse['current_stage']) {
                        $stageCourse[$k]['success'] = 0;
                    } else {
                        $stageCourse[$k]['success'] = 2;
                    }

                    foreach ($stageCourse[$k]['step_course'] as $ks => &$vs) {
                        if ($v['success'] == 1) {
                            $stageCourse[$k]['step_course'][$ks]['success'] = 1;
                        } else if ($v['success'] == 0) {
                            $stageCourse[$k]['step_course'][$ks]['success'] = 0;
                        } else {
                            if ($vs['num_step'] < $userCourse['current_step']) {
                                $stageCourse[$k]['step_course'][$ks]['success'] = 1;
                            } else if ($vs['num_step'] > $userCourse['current_step']) {
                                $stageCourse[$k]['step_course'][$ks]['success'] = 0;
                            } else {
                                $stageCourse[$k]['step_course'][$ks]['success'] = 2;
                            }
                        }
                    }
                }
            } else {
                $course['success'] = 0;
            }
            $course['stage_course'] = $stageCourse;
//            debug($stageCourse, 1);
        }

        echo json_encode(array('course' => $course), JSON_UNESCAPED_SLASHES);
    }

    public function studyAction()
    {
        $lesson = [];
        if (isset($_SESSION['user'])) {
            $course = $this->model->getCourseIDBySlug($this->route['slug']);
            $userCourse = $this->model->getInfoAboutUserFromCourse($_SESSION['user']['id'], $course['id']);

            if (!$userCourse) {
                $lesson = $this->model->getLessonFromCourse(App::$app->getProperty('language')['id'], $course['id'], 1, 1);
                //TODO: Запись в бд, что пользователь начал проходить курс
                $lesson['current_step'] = 1;
            } else {
                if ((isset($_GET['block']) && isset($_GET['lesson'])) &&
                    (is_numeric($_GET['block']) && is_numeric($_GET['lesson'])) &&
                    ($_GET['block'] > 0 && $_GET['lesson'] > 0) &&
                    ($_GET['block'] < $userCourse['current_stage'] ||
                        $_GET['block'] == $userCourse['current_stage'] &&
                        $_GET['lesson'] <= $userCourse['current_stage'])) {
                    $lesson = $this->model->getLessonFromCourse(
                        App::$app->getProperty('language')['id'], $course['id'],
                        $_GET['block'], $_GET['lesson']);
//                    debug($lesson, 1);
                    $lesson['current_step'] = $_GET['lesson'];
                    $lesson = array_merge($lesson, $this->model->getAmountStepInStageCourse($lesson['current_stage_id']));
                    unset($lesson['current_stage_id']);
                } else {
                    $lesson = $this->model->getLessonFromCourse(
                        App::$app->getProperty('language')['id'], $course['id'],
                        $userCourse['current_stage'], $userCourse['current_step']);
//                    debug($lesson, 1);
                    $lesson['current_step'] = $userCourse['current_step'];
                    $lesson = array_merge($lesson, $this->model->getAmountStepInStageCourse($lesson['current_stage_id']));
                    unset($lesson['current_stage_id']);
                }
                $lesson['answer_option'] = json_decode($lesson['answer_option'], true);
            }

            if ($lesson) {
                if ($lesson['code'] == 'task') {
                    $taskForStepCourse = $this->model->getTaskForStepCourse($lesson['id'], App::$app->getProperty('language')['id']);
                }
            }
        }

        echo json_encode(array('lesson' => $lesson), JSON_UNESCAPED_SLASHES);
    }

    public function studyCheckAction()
    {
        $lesson = [];
        $success = false;
        if (isset($_SESSION['user']) && isset($_GET['block']) && isset($_GET['lesson']) && isset($_GET['answer'])) {
            $course = $this->model->getCourseIDBySlug($this->route['slug']);
            $userCourse = $this->model->getInfoAboutUserFromCourse($_SESSION['user']['id'], $course['id']);
            if ($userCourse) {
                $lesson = $this->model->getLessonFromCourse(
                    App::$app->getProperty('language')['id'], $course['id'],
                    $_GET['block'], $_GET['lesson']);

                if ($lesson['code'] == 'theory') {
                    $success = true;
                } else if ($lesson['code'] == 'one-answer') {
                    $success = $lesson['rigth_answer'] == $_GET['answer'];
                } else if ($lesson['code'] == 'few-answer') {
                    $answerChoose = explode(',', $_GET['answer'], 20);
                    $answerRight = explode(',', $lesson['rigth_answer'], 20);
                    sort($answerRight);
                    sort($answerChoose);

                    $success = implode(" ", $answerChoose) == implode(" ", $answerRight);
                }
                //TODO: Если проект курса или если это задача

                //TODO: Если Success = true запись в бд о переходе на новый урок или блок
                // TODO: Если последний урок курса или блока
            }
        }

        echo json_encode(array('success' => $success), JSON_UNESCAPED_SLASHES);
    }
}