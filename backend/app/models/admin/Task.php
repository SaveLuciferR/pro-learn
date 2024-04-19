<?php

namespace app\models\admin;

use RedBeanPHP\R;

class Task extends \app\models\Task
{
    public function getCountTask()
    {
        return R::count('challenge');
    }

    public function getAllTask($start, $end, $lang)
    {
        return R::getAll("SELECT c.id, c.slug, cd.title, c.difficulty, s.code, c.date_of_publication, u.username,
                                (SELECT COUNT(cm.user_id)
                                    FROM course_mark cm
                                    WHERE cm.course_id = c.id AND cm.mark = 1) AS 'like',
                                    (SELECT COUNT(cm.user_id)
                                    FROM course_mark cm
                                    WHERE cm.course_id = c.id AND cm.mark = 0) AS 'dislike'
                                FROM challenge c JOIN user u ON u.id = c.user_id
                                JOIN challenge_description cd ON cd.challenge_id = c.id
                                JOIN status s ON s.id = c.status_id
                                WHERE cd.language_id = ?
                                LIMIT ?,?", [$lang, $start, $end]);
    }

    public function getTaskBySearch($search, $start, $end, $lang)
    {
        return R::getAll("SELECT c.id, c.slug, cd.title, c.difficulty, s.code, c.date_of_publication, u.username,
                                (SELECT COUNT(cm.user_id)
                                    FROM course_mark cm
                                    WHERE cm.course_id = c.id AND cm.mark = 1) AS 'like',
                                    (SELECT COUNT(cm.user_id)
                                    FROM course_mark cm
                                    WHERE cm.course_id = c.id AND cm.mark = 0) AS 'dislike'
                                FROM challenge c JOIN user u ON u.id = c.user_id
                                JOIN challenge_description cd ON cd.challenge_id = c.id
                                JOIN status s ON s.id = c.status_id
                                WHERE cd.language_id = ? AND cd.title LIKE ?
                                LIMIT ?,?", [$lang, $search, $start, $end]);
    }
}