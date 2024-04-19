<?php

namespace app\controllers\admin;

class TaskController extends AppController
{
    public function indexAction()
    {
        $result['taskCount'] = $this->model->getCountTask();
        $result['tasks'] = $this->model->getAllTask($_GET['start'] ?? 0, $_GET['end'] ?? 10, $_GET['lang'] ?? 1);
        foreach ($result['tasks'] as $k => $v) {
            if ($v['date_of_publication'] !== null) {
                $result['tasks'][$k]['date_of_publication'] = date('d.m.Y', strtotime($v['date_of_publication']));
            }
        }

        echo json_encode(array('result' => $result), JSON_UNESCAPED_SLASHES);
    }

    public function searchAction()
    {
        $result['taskCount'] = $this->model->getCountTask();
        $result['tasks'] = $this->model->getTaskBySearch(
            isset($_GET['search']) ?
                '%' . $_GET['search'] . '%'
                : '%',
            $_GET['start'] ?? 0,
            $_GET['end'] ?? 10,
            $_GET['lang'] ?? 1);
        foreach ($result['tasks'] as $k => $v) {
            if ($v['date_of_publication'] !== null) {
                $result['tasks'][$k]['date_of_publication'] = date('d.m.Y', strtotime($v['date_of_publication']));
            }
        }

        echo json_encode(array('result' => $result), JSON_UNESCAPED_SLASHES);
    }
}