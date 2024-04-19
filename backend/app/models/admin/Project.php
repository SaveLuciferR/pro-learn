<?php

namespace app\models\admin;

use RedBeanPHP\R;

class Project extends \app\models\AppModel
{
    public function getCountProject()
    {
        return R::count('project');
    }

    public function getAllProject($start, $end)
    {
        return R::getAll("SELECT p.id, p.title, u.username, p.slug, p.private, p.date_of_publication, p.description
                                FROM project p JOIN user u ON u.id = p.user_id
                                LIMIT ?, ?", [$start, $end]);
    }

    public function getAllProjectBySearch($search, $start, $end)
    {
        return R::getAll("SELECT p.id, p.title, u.username, p.slug, p.private, p.date_of_publication, p.description
                                FROM project p JOIN user u ON u.id = p.user_id
                                WHERE p.title LIKE ?
                                LIMIT ?, ?", [$search, $start, $end]);
    }
}