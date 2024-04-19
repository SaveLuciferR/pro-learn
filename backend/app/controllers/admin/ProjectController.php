<?php

namespace app\controllers\admin;

class ProjectController extends AppController
{
    public function indexAction()
    {
        $result['projectCount'] = $this->model->getCountProject();
        $result['projects'] = $this->model->getAllProject($_GET['start'] ?? 0, $_GET['end'] ?? 10);
        foreach ($result['projects'] as $k => $v) {
            if ($v['date_of_publication'] !== null) {
                $result['projects'][$k]['date_of_publication'] = date('d.m.Y', strtotime($v['date_of_publication']));
            }
        }

        echo json_encode(array('result' => $result), JSON_UNESCAPED_SLASHES);
    }

    public function searchAction()
    {
        $result['userCount'] = $this->model->getCountProject();
        $result['users'] = $this->model->getAllProjectBySearch(
            isset($_GET['search']) ?
                '%' . $_GET['search'] . '%'
                : '%',
            $_GET['start'] ?? 0,
            $_GET['end'] ?? 10);
        foreach ($result['users'] as $k => $v) {
            if ($v['date_of_publication'] !== null) {
                $result['users'][$k]['date_of_publication'] = date('d.m.Y', strtotime($v['date_of_publication']));
            }
        }

        echo json_encode(array('result' => $result), JSON_UNESCAPED_SLASHES);
    }
}