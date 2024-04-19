<?php

namespace app\models\admin;

use RedBeanPHP\R;

class Course extends \app\models\Course
{
    public function getAllCourses($start, $end, $lang)
    {
        return R::getAll("SELECT c.slug, c.id, s.code, c.date_of_publication, cd.title, u.username,
                                    (SELECT COUNT(cm.user_id)
                                    FROM course_mark cm
                                    WHERE cm.course_id = c.id AND cm.mark = 1) AS 'like',
                                    (SELECT COUNT(cm.user_id)
                                    FROM course_mark cm
                                    WHERE cm.course_id = c.id AND cm.mark = 0) AS 'dislike'
                                FROM course c JOIN status s ON s.id = c.status_id
                                JOIN course_description cd ON cd.course_id = c.id
                                JOIN user u ON u.id = c.user_id
                                WHERE cd.language_id = ?
                                LIMIT ?, ?", [$lang, $start, $end]);
    }

    public function getCourseBySearch($search, $start, $end, $lang)
    {
        return R::getAll("SELECT c.slug, c.id, s.code, c.date_of_publication, cd.title, u.username,
                                    (SELECT COUNT(cm.user_id)
                                    FROM course_mark cm
                                    WHERE cm.course_id = c.id AND cm.mark = 1) AS 'like',
                                    (SELECT COUNT(cm.user_id)
                                    FROM course_mark cm
                                    WHERE cm.course_id = c.id AND cm.mark = 0) AS 'dislike'
                                FROM course c JOIN status s ON s.id = c.status_id
                                JOIN course_description cd ON cd.course_id = c.id
                                JOIN user u ON u.id = c.user_id
                                WHERE cd.title LIKE ? AND cd.language_id = ?
                                LIMIT ?, ?", [$search, $lang, $start, $end]);
    }

    public function getCountCourse()
    {
        return R::count('course');
    }

    public function getCourseForEdit(&$username, $slug, $isAdmin)
    {
        $user = new \app\models\User();
        return $user->getCourseForEdit($username, $slug, $isAdmin);
    }
}