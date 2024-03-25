<?php

namespace app\models;

use app\models\AppModel;
use RedBeanPHP\R;

class Course extends AppModel
{

    public function getCourseForUser($username, $lang)
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

    public function getAllCourse($lang)
    {
        return R::getAssoc("SELECT c.id,
                                    c.slug, c.icon, c.difficulty, cd.heading, cd.excerpt, u.username,
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
                               WHERE cd.language_id = ?", [$lang]);
    }

    public function getCourseBySlug($lang, $slug)
    {
        return R::getRow("SELECT c.id, c.slug, c.icon, c.difficulty, cd.heading, cd.excerpt, u.username,
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
                               WHERE cd.language_id = ? AND c.slug = ?", [$lang, $slug]);
    }

    public function getStageCourseBySlug($lang, $id)
    {
        return R::getAssoc("SELECT sc.id, sc.num_stage, sc.icon, scd.title
                                FROM stagecourse sc JOIN stagecourse_description scd ON scd.stage_course_id = sc.id
                                WHERE sc.course_id = ? AND scd.language_id = ?", [$id, $lang]);
    }

    public function getStepCourseByStageID($lang, $id)
    {
        return R::getAssoc("SELECT sc.id, sc.num_step, scd.title
                               FROM stepcourse sc JOIN stepcourse_description scd ON scd.step_course_id = sc.id
                               WHERE scd.language_id = ? AND sc.stage_course_id = ?", [$lang, $id]);
    }

    public function getInfoAboutUserFromCourse($user_id, $course_id)
    {
        return R::getRow("SELECT uc.success, uc.current_step, uc.current_stage
                                FROM user_course uc
                                WHERE uc.user_id = ? AND uc.course_id = ?", [$user_id, $course_id]);
    }

    public function getCourseIDBySlug($slug)
    {
        return R::getRow("SELECT c.id
                                FROM course c
                                WHERE c.slug = ?", [$slug]);
    }

    public function getLessonFromCourse($lang, $courseID, $blockNum, $lessonNum)
    {
        return R::getRow("SELECT tsc.id, scr.id AS 'current_stage_id', tsc.code, scd.title, tscd.answer_option, tscd.rigth_answer
                            FROM typestepcourse tsc JOIN typestepcourse_description tscd ON tsc.id = tscd.type_step_course_id
                            JOIN stepcourse sc ON sc.id = tscd.step_course_id
                            JOIN stagecourse scr ON scr.id = sc.stage_course_id
                            JOIN stepcourse_description scd ON scd.step_course_id = sc.id
                            WHERE tscd.language_id = ? AND scd.language_id = ? AND sc.num_step = ? AND scr.num_stage = ?
                            ", [$lang, $lang, $blockNum, $lessonNum]);
    }

    public function getAmountStepInStageCourse($id)
    {
        return R::getRow("SELECT COUNT(sc.id) AS 'amount_steps'
                            FROM stepcourse sc JOIN stagecourse scr ON scr.id = sc.stage_course_id
                            WHERE scr.id = ?", [$id]);
    }

}