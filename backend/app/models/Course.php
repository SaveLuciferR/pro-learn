<?php

namespace app\models;

use app\models\AppModel;
use RedBeanPHP\R;

class Course extends AppModel
{

    public function getCourseForUser($username, $lang)
    {
        return R::getAll("SELECT c.id, uc.success,
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

    public function getAmountBlockInCourse($id)
    {
        return R::count('stagecourse', 'course_id = ?', [$id]);
    }

    public function getCourseLangProgByID($id)
    {
        return R::getAll("SELECT lp.id, lp.title
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

    public function getAllCourse($lang)
    {
        return R::getAll("SELECT c.id,
                                    c.slug, c.icon, c.difficulty, cd.title, cd.excerpt, u.username,
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
                               WHERE cd.language_id = ?", [$lang]);
    }

    public function getCourseBySlug($lang, $slug)
    {
        return R::getRow("SELECT c.id, c.slug, c.icon, c.difficulty, cd.keywords, cd.description, cd.title, cd.excerpt, u.username,
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
                               FROM course c JOIN user u ON u.id = c.user_id
                               JOIN course_description cd ON cd.course_id = c.id
                               WHERE cd.language_id = ? AND c.slug = ? AND c.status_id = 1", [$lang, $slug]);
    }

    public function getStageCourseBySlug($lang, $id)
    {
        return R::getAll("SELECT sc.id, sc.num_stage, sc.icon, scd.title
                                FROM stagecourse sc JOIN stagecourse_description scd ON scd.stage_course_id = sc.id
                                JOIN course c ON c.id = sc.course_id
                                WHERE sc.course_id = ? AND scd.language_id = ? AND c.status_id = 1", [$id, $lang]);
    }

    public function getStepCourseByStageID($lang, $id)
    {
        return R::getAll("SELECT sc.id, sc.num_step, scd.title
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
                                FROM course c JOIN status s ON s.id = c.status_id
                                WHERE status_id = 1 AND c.slug = ?", [$slug]);
    }

    public function getLessonFromCourse($lang, $courseID, $blockNum, $lessonNum)
    {
        return R::getRow("SELECT sc.id, scr.id AS 'current_stage_id', scr.num_stage AS 'block', tsc.code, scd.title, scd.description, scd.answer_option, scd.right_answer
                            FROM typestepcourse tsc JOIN stepcourse sc ON tsc.id = sc.typestepcourse_id
                            JOIN stagecourse scr ON scr.id = sc.stage_course_id
                            JOIN stepcourse_description scd ON scd.step_course_id = sc.id
                            JOIN course c ON scr.course_id = c.id
                            WHERE scd.language_id = ? AND scr.num_stage = ? AND sc.num_step = ? AND c.id = ?
                            ", [$lang, $blockNum, $lessonNum, $courseID]);
    }

    public function getAmountStepInStageCourse($id)
    {
        return R::getRow("SELECT COUNT(sc.id) AS 'amount_steps'
                            FROM stepcourse sc JOIN stagecourse scr ON scr.id = sc.stage_course_id
                            WHERE scr.id = ?", [$id]);
    }

    public function getTaskForStepCourse($step, $lang)
    {
        $stepCourse = R::load("stepcourse", $step);
        return R::getRow("SELECT c.id, c.slug, c.difficulty, c.date_of_publication, cd.title, c.for_course,
                                cd.description, cd.keywords, cd.content, c.slug, u.username, u.role
                                FROM challenge c JOIN challenge_description cd ON cd.challenge_id = c.id
                                JOIN user u ON u.id = c.user_id JOIN status s ON s.id = c.status_id
                                WHERE s.code LIKE 'public' AND cd.language_id = ? AND c.id = ?", [$lang, $stepCourse->challenge_id]);
    }

    public function getTaskTags($taskID)
    {
        return R::getAll("SELECT ct.title 
                                FROM challengetag ct JOIN challenge_challengetag cct ON ct.id = cct.challengetag_id 
                                WHERE cct.challenge_id = ?", [$taskID]);
    }

    public function getTemplateProjectForTask($id)
    {
        return R::getRow("SELECT t.slug, t.id
                                FROM projecttemplate t JOIN challenge c ON c.template_id = t.id
                                WHERE c.id = ?", [$id]);
    }

    public function getTaskLangProgByID($id)
    {
        return R::getAll("SELECT lp.id, lp.title
                                FROM challenge c JOIN challenge_categorylangprog cclp ON c.id = cclp.challenge_id
                                JOIN langprog lp ON lp.id = cclp.lang_prog_id
                                WHERE c.id = ?", [$id]);
    }

    public function getProjectForTask($id)
    {
        return R::getRow("SELECT p.slug, p.id 
                            FROM challenge c JOIN project p ON c.project_id = p.id 
                            WHERE c.id = ?", [$id]);
    }

    public function getUserTask($userID, $stepID)
    {
        $step = R::load('stepcourse', $stepID);
        return R::getRow("SELECT success FROM user_challenge WHERE user_id = ? AND challenge_id = ?", [$userID, $step->challenge_id]);
    }

    public function saveUserCourse($userID, $courseID, $success, $currentStage, $currentStep)
    {
        R::begin();
        try {
            R::exec("INSERT INTO user_course (user_id, course_id, success, current_step, current_stage) VALUES (?, ?, ?, ?, ?)", [
                $userID,
                $courseID,
                $success ? 1 : 0,
                $currentStep,
                $currentStage
            ]);

            R::commit();
            return true;
        } catch (\Exception $ex) {
            R::rollback();
            if (str_contains($ex->getMessage(), 'PRIMARY')) {
                R::begin();
                try {
                    R::exec("UPDATE user_course SET success = ?, current_step = ?, current_stage = ? WHERE user_id = ? AND course_id = ?", [
                        $success ? 1 : 0,
                        $currentStep,
                        $currentStage,
                        $userID,
                        $courseID
                    ]);
                    R::commit();
                    return true;
                } catch (\Exception $ex2) {
                    R::rollback();
                    return false;
                }
            }

            return false;
        }
    }

    public function canBeStudyLesson($block, $lesson, $userID, $courseID): bool
    {
        if (!(is_numeric($block) && is_numeric($lesson) && is_numeric($userID) && is_numeric($courseID))) return false;
        if ($block <= 0 || $lesson <= 0) return false;

        $userCourse = $this->getInfoAboutUserFromCourse($userID, $courseID);
        if ($userCourse['success']) return true;


        return $block < $userCourse['current_stage'] || $block === $userCourse['current_stage'] && $lesson <= $userCourse['current_step'];
    }

}