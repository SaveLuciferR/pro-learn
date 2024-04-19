<?php

namespace app\controllers\admin;

class MainController extends AppController
{
    public function indexAction()
    {
        $result['user'] = $this->model->getUserCount();
        $result['courseModer'] = $this->model->getCourseCountModer();
        $result['feedbackModer'] = $this->model->getFeedbackCountModer();
        $result['course'] = $this->model->getCourseCount();
        $result['taskModer'] = $this->model->getTaskCountModer();
        $result['task'] = $this->model->getTaskCount();
        $result['project'] = $this->model->getProjectCount();

        echo json_encode(array('result' => $result), JSON_UNESCAPED_SLASHES);
    }
}