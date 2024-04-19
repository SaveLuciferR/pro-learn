<?php

namespace app\models\admin;

use RedBeanPHP\R;

class Main extends \app\models\AppModel
{
    public function getUserCount()
    {
        return R::count('user');
    }

    public function getCourseCountModer()
    {
        return R::count('course', 'status_id = 4');
    }

    public function getFeedbackCountModer()
    {
        return R::count('feedback');//TODO изменить бд на status_id
    }

    public function getCourseCount()
    {
        return R::count('course', 'status_id = 1');
    }

    public function getTaskCountModer()
    {
        return R::count('challenge', 'status_id = 4');
    }

    public function getTaskCount()
    {
        return R::count('challenge', 'status_id = 1');
    }

    public function getProjectCount()
    {
        return R::count('project');
    }
}