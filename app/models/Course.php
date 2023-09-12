<?php

namespace app\models;

use app\models\AppModel;
use RedBeanPHP\R;

class Course extends AppModel
{
    public function getFinishedCourse($lang)
    {
        return R::getAll("SELECT c.id, c.slug, c.icon, c.difficulty, c.dateofpublication, cd.heading, cd.excerpt,
                                        cd.title, cd.description, cd.keywords, u.username, u.role,
                                        (SELECT COUNT(cc.challenge_id) 
                                                FROM course_challenge cc JOIN course ON course.id = cc.course_id) AS 'countproject'
                                FROM course c JOIN course_description cd ON c.id = cd.course_id
                                JOIN user u ON u.id = c.user_id");
    }
}