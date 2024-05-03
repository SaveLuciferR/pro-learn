<?php

namespace app\models\admin;

use RedBeanPHP\R;

class Feedback extends User
{
    public function getFeedback($start, $end)
    {
        $data = R::getAll(
            "SELECT f.id, f.user_id, fcd.title, f.name, f.email, f.text, sd.title, f.date_of_departure 
                          FROM feedback f
                          JOIN status s ON f.status_id = s.id
                          JOIN status_description sd ON s.id = sd.status_id
                          JOIN feedbackcategory fc ON fc.id = f.feedbackcategory_id
                          JOIN feedbackcategory_description fcd ON fcd.feedbackcategory_id = fc.id
                          WHERE fcd.language_id = 1 AND sd.language_id = 1
                          LIMIT ?, ?",
            [$start, $end]
        );

        foreach ($data as $k => &$v) {
            if ($v["user_id"] !== null) {
                $v['username'] = R::load("user", $v["user_id"])->username;
            } else {
                $v["username"] = null;
            }
            unset($v["user_id"]);
        }
        return $data;
    }

    public function getCountFeedback()
    {
        return R::count('feedback');
    }

    public function getFeedbackById($id)
    {
        $data = R::getRow(
            "SELECT f.id, f.user_id, fcd.title, f.name, f.email, f.text, sd.title, f.date_of_departure 
                          FROM feedback f
                          JOIN status s ON f.status_id = s.id
                          JOIN status_description sd ON s.id = sd.status_id
                          JOIN feedbackcategory fc ON fc.id = f.feedbackcategory_id
                          JOIN feedbackcategory_description fcd ON fcd.feedbackcategory_id = fc.id
                          WHERE fcd.language_id = 1 AND sd.language_id = 1 AND f.id = ?",
            [$id]
        );


        if ($data["user_id"] !== null) {
            $data['username'] = R::load("user", $data["user_id"])->username;
        } else {
            $data["username"] = null;
        }
        unset($data["user_id"]);


        return $data;
    }

    public function checkFeedback($data)
    {
        R::begin();
        try {
            $status = R::findOne('status', 'code = ?', [$data['status']]);
            R::exec('UPDATE feedback SET status_id = ?, user_id = ?
                     WHERE id = ?', [$status->id, $_SESSION['user']['id'], $data['id']]);
            R::commit();
            return true;
        } catch (\Exception $ex) {
            R::rollback();
            return false;
        }
    }

    public function deleteFeedback($data)
    {
        R::begin();
        try {
            $feedback = R::load('feedback', $data['id']);
            R::trash($feedback);
            R::commit();
            return true;

        } catch (\Exception $ex) {
            R::rollback();
            return false;
        }
    }
}
