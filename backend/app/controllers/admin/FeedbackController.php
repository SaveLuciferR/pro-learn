<?php

namespace app\controllers\admin;

class FeedbackController extends AppController
{
    public function indexAction()
    {
        $result['feedbackCount'] = $this->model->getCountFeedback();
        $result['feedback'] = $this->model->getFeedback($_GET['start'] ?? 0, $_GET['end'] ?? 10);
        foreach ($result['feedback'] as $k => $v) {
            if ($v['date_of_departure'] !== null) {
                $result['feedback'][$k]['date_of_departure'] = date('d.m.Y', strtotime($v['date_of_departure']));
            }
        }

        echo json_encode(array('result' => $result), JSON_UNESCAPED_SLASHES);
    }

    public function viewAction()
    {
        $feedback = $this->model->getFeedbackById($this->route['id']);
        $feedback['date_of_departure'] = date('d.m.Y', strtotime($feedback['date_of_departure']));

        echo json_encode(array('feedback' => $feedback), JSON_UNESCAPED_SLASHES);
    }


    public function searchAction()
    {
    }

    public function deleteAction()
    {
        
    }

    public function checkAction()
    {
        $data = json_decode(file_get_contents("php://input"), true);
        if ($_SERVER['REQUEST_METHOD'] === 'POST' && $data) {
            echo json_encode(array('result' => $this->model->checkFeedback($data)), JSON_UNESCAPED_SLASHES);
        } else {
            header("HTTP/1.0 400 Bad Request");
            die;
        }
    }
}
