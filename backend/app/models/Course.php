<?php

namespace app\models;

use app\models\AppModel;
use RedBeanPHP\R;

class Course extends AppModel
{
    public function getFinishedCourse($lang, $user)
    {
        return R::getAll("SELECT c.id, c.slug, c.icon, c.difficulty, c.date_of_publication, cd.heading, cd.excerpt,
                                        cd.title, cd.description, cd.keywords, u.username, u.role,
                                        (SELECT COUNT(cc.challenge_id) 
                                                FROM course_challenge cc JOIN course ON course.id = cc.course_id) AS 'count_project'
                                FROM course c JOIN course_description cd ON c.id = cd.course_id
                                JOIN user u ON u.id = c.user_id
                                WHERE u.id = ");
    }

    public function getAllCourses($lang, $category = '', $proglang = '', $user = '') {
        return R::getAll("SELECT c.id, c.slug, c.icon, c.difficulty, c.date_of_publication, cd.heading, cd.excerpt,
                                        cd.title, cd.description, cd.keywords, u.username, u.role,
                                        (SELECT COUNT(cc.challenge_id) 
                                        FROM course_challenge cc JOIN course ON course.id = cc.course_id) AS 'count_project'
                                FROM course c JOIN course_description cd ON c.id = cd.course_id
                                JOIN user u ON u.id = c.user_id
                                JOIN course_categorylangprog cclp ON cclp.course_id = c.id
                                WHERE u.role LIKE ? AND cclp.category_prog_id = ? AND cd.language_id = ? AND cclp.lang_prog_id   = ?", [$user, $category, $lang, $proglang]);
    }
}