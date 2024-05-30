<?php

namespace app\controllers;


use app\controllers\AppController;
use core\App;
use core\Language;

use OpenApi\Attributes as OA;

class CourseController extends AppController
{
    #[OA\Get(
        path: '/{langCode}/course',
        description: 'Получает все курсы, что были опубликованы. Если пользователь авторизован, то пытается найти курсы, что он проходит или проходил',
        summary: 'Все курсы',
        tags: ["Course"],
        parameters: [
            new OA\Parameter(
                name: 'langCode',
                description: "Код языка (ru, en)",
                in: "path",
                required: true,
                schema: new OA\Schema(
                    type: 'string'
                )

            ),

        ],
        responses: [
            new OA\Response(response: 200, description: 'Возвращает JSON-объект со всеми найденными курсами'),
        ]
    )]
    /* Вызывается, если в url адресе код_языка/course */
    public function indexAction()
    {
        $course = [];

        if (isset($_SESSION['user'])) {
            $course['user_course'] = $this->model->getCourseForUser($_SESSION['user']['username'], App::$app->getProperty('language')['id']);

            foreach ($course['user_course'] as $k => $v) {
                $course['user_course'][$k]['date_of_publication'] = date('d.m.Y', strtotime($v['date_of_publication']));
                $course['user_course'][$k]['tags'] = $this->model->getCourseTagByID($v['id']);
                $course['user_course'][$k]['language'] = $this->model->getCourseLangProgByID($v['id']);
            }
        }

        $course['all_course'] = $this->model->getAllCourse(App::$app->getProperty('language')['id']);
        foreach ($course['all_course'] as $k => $v) {
            $course['all_course'][$k]['date_of_publication'] = date('d.m.Y', strtotime($v['date_of_publication']));
            $course['all_course'][$k]['tags'] = $this->model->getCourseTagByID($v['id']);
            $course['all_course'][$k]['language'] = $this->model->getCourseLangProgByID($v['id']);
        }

        echo json_encode(array('course' => $course, 'viewWords' => Language::$langView), JSON_UNESCAPED_SLASHES);
    }


    #[OA\Get(
        path: '/{langCode}/course/{slug}',
        description: 'Получает всю информацию о нужном курсе или 404 ошибка',
        summary: 'Получает информацию о курсе',
        tags: ["Course"],
        parameters: [
            new OA\Parameter(
                name: 'langCode',
                description: "Оставить пустым, если нужен базовый язык",
                in: "path",
                required: true,
                schema: new OA\Schema(
                    type: 'string'
                )

            ),
            new OA\Parameter(
                name: 'slug',
                description: "slug-курса",
                in: "path",
                required: true,
                schema: new OA\Schema(
                    type: 'string'
                )
            ),
        ],
        responses: [
            new OA\Response(response: 200, description: 'Возвращает JSON-объект со всеми найденными курсами'),
            new OA\Response(response: 404, description: 'Возврашает 404 ошибку, если курс не был найден, или он не был опубликован')
        ]
    )]

    /* Вызывается, если в url адресе код_языка/course/slug_курса */
    public function viewAction()
    {
        $course = $this->model->getCourseBySlug(App::$app->getProperty('language')['id'], $this->route['slug']);
//        debug($course, 1);
        if (!$course) {
            header('HTTP/1.0 404 Not Found');
            die;
        }
        $course['date_of_publication'] = date('d.m.Y', strtotime($course['date_of_publication']));
        $course['tags'] = $this->model->getCourseTagByID($course['id']);
        $course['stage_course'] = [];
        if (isset($_SESSION['user'])) {
            $stageCourse = $this->model->getStageCourseBySlug(App::$app->getProperty('language')['id'], $course['id']);
            foreach ($stageCourse as $k => &$v) {
                $stageCourse[$k]['success'] = 0;
                $stageCourse[$k]['step_course'] = $this->model->getStepCourseByStageID(App::$app->getProperty('language')['id'], $v['id']);

                foreach ($stageCourse[$k]['step_course'] as $ks => $vs) {
                    $stageCourse[$k]['step_course'][$ks]['success'] = 0;
                }
            }

//            debug($stageCourse, 1);
            $firstStageKey = array_key_first($stageCourse);
//            debug($stageCourse[$firstStageKey]['step_course'], 1);
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


    #[OA\Get(
        path: '/{langCode}/course/{slug}/lessons',
        description: 'Получает всю информацию о уроке курса, если пользователь авторизован',
        summary: 'Получает информацию о уроке курса',
        tags: ["Course"],
        parameters: [
            new OA\Parameter(
                name: 'langCode',
                description: "Оставить пустым, если нужен базовый язык",
                in: "path",
                required: true,
                schema: new OA\Schema(
                    type: 'string'
                )

            ),
            new OA\Parameter(
                name: 'slug',
                description: "slug-курса",
                in: "path",
                required: true,
                schema: new OA\Schema(
                    type: 'string'
                )
            ),
            new OA\Parameter(
                name: 'block',
                description: "Номер блока курса. Если не заполнять, то выдаст текущий блок и урок",
                in: "query",
                required: false,
                schema: new OA\Schema(
                    type: 'integer'
                )
            ),
            new OA\Parameter(
                name: 'lesson',
                description: "Номер урока в блоке курса. Если не заполнять, то выдаст текущий блок и урок",
                in: "query",
                required: false,
                schema: new OA\Schema(
                    type: 'integer'
                )
            ),
        ],
        responses: [
            new OA\Response(response: 200, description: 'Возвращает JSON-объект с информацией о уроке'),
            new OA\Response(response: 401, description: 'Возвращает 401 ошибку, если пользователь не был авторизован'),
            new OA\Response(response: 404, description: 'Возврашает 404 ошибку, если урок или курс не был найден, или он не был опубликован')
        ]
    )]

    public function studyAction()
    {
        if (isset($_SESSION['user'])) {
            $lesson = [];
            $canBeNextLesson = false;
            $canBePrevLesson = false;
            $course = $this->model->getCourseIDBySlug($this->route['slug']);
            if (!$course) {
                header("HTTP/1.0 404 Not Found");
                die;
            }

            $userCourse = $this->model->getInfoAboutUserFromCourse($_SESSION['user']['id'], $course['id']);
            if (!$userCourse) {
//                debug($userCourse, 1);
                $lesson = $this->model->getLessonFromCourse(App::$app->getProperty('language')['id'], $course['id'], 1, 1);
                $this->model->saveUserCourse($_SESSION['user']['id'], $course['id'], false, 1, 1);
                $lesson['current_step'] = 1;
                unset($lesson['current_stage_id']);
            } else {
                if ((isset($_GET['block']) && isset($_GET['lesson'])) &&
                    $this->model->canBeStudyLesson($_GET['block'], $_GET['lesson'], $_SESSION['user']['id'], $course['id'])) {
                    $lesson = $this->model->getLessonFromCourse(
                        App::$app->getProperty('language')['id'], $course['id'],
                        $_GET['block'], $_GET['lesson']);
                    $lesson['current_step'] = $_GET['lesson'];
                    if ($_GET['block'] === $userCourse['current_stage'] && $lesson['current_step'] < $userCourse['current_step'] ||
                        $_GET['block'] < $userCourse['current_stage']) {
                        $canBeNextLesson = true;
                    }
                } else {
                    $lesson = $this->model->getLessonFromCourse(
                        App::$app->getProperty('language')['id'], $course['id'],
                        $userCourse['current_stage'], $userCourse['current_step']);
                    $lesson['current_step'] = $userCourse['current_step'];
                }
                if (!isset($lesson['current_stage_id'])) {
                    header("HTTP/1.0 404 Not Found");
                    die;
                }
                $lesson = array_merge($lesson, $this->model->getAmountStepInStageCourse($lesson['current_stage_id']));
                unset($lesson['current_stage_id']);

                if ($lesson['current_step'] > 1) {
                    $canBePrevLesson = true;
                }

                $lesson['answer_option'] = json_decode($lesson['answer_option'], true);
            }


            if ($lesson) {
                if ($lesson['code'] === 'task') {
                    $taskForStepCourse = $this->model->getTaskForStepCourse($lesson['id'], App::$app->getProperty('language')['id']);
                    $taskForStepCourse['date_of_publication'] = date('d.m.Y', strtotime($taskForStepCourse['date_of_publication']));
                    $taskForStepCourse['tags'] = $this->model->getTaskTags($taskForStepCourse['id']);
                    $taskForStepCourse['template'] = $this->model->getTemplateProjectForTask($taskForStepCourse['id']);
                    $taskForStepCourse['lang'] = $this->model->getTaskLangProgByID($taskForStepCourse['id']);
                    $taskForStepCourse['project'] = $this->model->getProjectForTask($taskForStepCourse['id']);
                    $lesson['task'] = $taskForStepCourse;
                }
            }
            $lesson['amount_block'] = $this->model->getAmountBlockInCourse($course['id']);
            if ((string)$lesson['amount_block'] === $lesson['block'] && $lesson['amount_steps'] === $lesson['current_step']) {
                $canBeNextLesson = false;
            }
            echo json_encode(array(
                'lesson' => $lesson,
                'can_be_next_lesson' => $canBeNextLesson,
                'can_be_prev_lesson' => $canBePrevLesson
            ), JSON_UNESCAPED_SLASHES);
        } else {
            header("HTTP/1.0 401 Unauthorized");
            die;
        }

    }


    #[OA\Get(
        path: '/{langCode}/course/{slug}/lessons/study-check',
        description: 'Проверяет ответ в уроке курса, если пользователь авторизован',
        summary: 'Проверяет ответ в уроке курса',
        tags: ["Course"],
        parameters: [
            new OA\Parameter(
                name: 'langCode',
                description: "Оставить пустым, если нужен базовый язык",
                in: "path",
                required: true,
                schema: new OA\Schema(
                    type: 'string'
                )

            ),
            new OA\Parameter(
                name: 'slug',
                description: "slug-курса",
                in: "path",
                required: true,
                schema: new OA\Schema(
                    type: 'string'
                )
            ),
            new OA\Parameter(
                name: 'block',
                description: "Номер блока курса. Если не заполнять, то выдаст текущий блок и урок",
                in: "query",
                required: false,
                schema: new OA\Schema(
                    type: 'integer'
                )
            ),
            new OA\Parameter(
                name: 'lesson',
                description: "Номер урока в блоке курса. Если не заполнять, то выдаст текущий блок и урок",
                in: "query",
                required: false,
                schema: new OA\Schema(
                    type: 'integer'
                )
            ),
            new OA\Parameter(
                name: 'answer',
                description: 'Ответ от пользователя. Если это теория, то null. Если это один ответ, то ключ овета. Если входные данные, то все данные через заглушку. Если несколько ответов, то ключи ответов через запятую',
                in: 'query',
                required: false,
                schema: new OA\Schema(
                    type: 'mixedList'
                )
            )
        ],
        responses: [
            new OA\Response(response: 200, description: 'Возвращает JSON-объект со всеми найденными курсами'),
            new OA\Response(response: 400, description: 'Возвращает 400 ошибку, если не были переданы query параметры'),
            new OA\Response(response: 401, description: 'Возвращает 401 ошибку, если пользователь не был авторизован'),
            new OA\Response(response: 404, description: 'Возврашает 404 ошибку, если урок или курс не был найден, или он не был опубликован')
        ]
    )]

    public function studyCheckAction()
    {
        if (isset($_SESSION['user']) && isset($_GET['block']) && isset($_GET['lesson']) && isset($_GET['answer'])) {
            $lesson = [];
            $success = false;
            $blockSuccess = false;
            $courseSuccess = false;
            $nextStage = 0;
            $nextStep = 0;
            $course = $this->model->getCourseIDBySlug($this->route['slug']);
            if (!$course) {
                header("HTTP/1.0 404 Not Found");
                die;
            }
            $userCourse = $this->model->getInfoAboutUserFromCourse($_SESSION['user']['id'], $course['id']);
            if ($userCourse && $this->model->canBeStudyLesson($_GET['block'], $_GET['lesson'], $_SESSION['user']['id'], $course['id'])) {
                $lesson = $this->model->getLessonFromCourse(
                    App::$app->getProperty('language')['id'], $course['id'],
                    $_GET['block'], $_GET['lesson']);
                if (!$lesson) {
                    header('HTTP/1.0 404 Not Found');
                    die;
                }

                if ($lesson['code'] == 'theory') {
                    $success = true;
                } else if ($lesson['code'] == 'one-answer') {
                    $success = $lesson['right_answer'] == $_GET['answer'];
                } else if ($lesson['code'] == 'few-answer') {
                    $answerChoose = explode(',', $_GET['answer'], 20);
                    $answerRight = explode(',', $lesson['right_answer'], 20);
                    sort($answerRight);
                    sort($answerChoose);

                    $success = implode(" ", $answerChoose) == implode(" ", $answerRight);
                } else if ($lesson['code'] === 'input-data') {

                    preg_match_all('/<code class="markdown-inline-block-code">.*?<\/code>/u', $lesson['description'], $matches);
                    foreach ($matches[0] as $k => &$v) {
                        $v = str_replace('</code>', '', $v);
                        $v = str_replace('<code class="markdown-inline-block-code">', '', $v);
                    }
                    $matches = $matches[0];
                    $answer = explode('```prolearnreplace```', $_GET['answer']);
                    foreach ($answer as $k => &$v) {
                        $v = h($v);
                    }
//                    debug($answer);
//                    debug($matches, 1);
                    $success = $matches == $answer;
                } else if ($lesson['code'] === 'task') {
                    $userTask = $this->model->getUserTask($_SESSION['user']['id'], $lesson['id']);
                    $success = $userTask && $userTask['success'];
                } else {
                    header('HTTP/1.0 400 Bad Request');
                    die;
                }

                if ($success) {
                    $lesson = $this->model->getLessonFromCourse(
                        App::$app->getProperty('language')['id'], $course['id'],
                        $_GET['block'], $_GET['lesson'] + 1);
                    if ($lesson) {
                        if (!$this->model->canBeStudyLesson($_GET['block'], $_GET['lesson'] + 1, $_SESSION['user']['id'], $course['id'])) {
                            $this->model->saveUserCourse($_SESSION['user']['id'], $course['id'], $userCourse['success'], $_GET['block'], $_GET['lesson'] + 1);
                        }
                        $nextStage = (int)$_GET['block'];
                        $nextStep = $_GET['lesson'] + 1;
                    } else {
                        $blockSuccess = true;
                        $lesson = $this->model->getLessonFromCourse(
                            App::$app->getProperty('language')['id'], $course['id'],
                            $_GET['block'] + 1, 1);
                        if ($lesson) {
                            if (!$this->model->canBeStudyLesson($_GET['block'] + 1, 1, $_SESSION['user']['id'], $course['id'])) {
                                $this->model->saveUserCourse($_SESSION['user']['id'], $course['id'], $userCourse['success'], $_GET['block'] + 1, 1);
                            }

                            $nextStage = (int)$_GET['block'] + 1;
                            $nextStep = 1;
                        } else {
                            $courseSuccess = true;
                            $this->model->saveUserCourse($_SESSION['user']['id'], $course['id'], true, $_GET['block'] + 1, 0);
                        }
                    }
                }
            } else {
                header("HTTP/1.0 400 Bad Request");
                die;
            }

            echo json_encode(array(
                'success' => $success,
                'block_success' => $blockSuccess,
                'course_success' => $courseSuccess,
                'next_lesson' => $nextStep,
                'next_block' => $nextStage
            ), JSON_UNESCAPED_SLASHES);
        } else {
            header("HTTP/1.0 400 Bad Request");
            die;
        }

    }
}