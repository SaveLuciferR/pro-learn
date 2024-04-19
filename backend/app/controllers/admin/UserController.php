<?php

namespace app\controllers\admin;

class UserController extends AppController
{
    public function indexAction()
    {
        $result['userCount'] = $this->model->getCountUser();
        $result['users'] = $this->model->getAllUser($_GET['start'] ?? 0, $_GET['end'] ?? 10);
        foreach ($result['users'] as $k => $v) {
            if ($v['date_of_registration'] !== null) {
                $result['users'][$k]['date_of_registration'] = date('d.m.Y', strtotime($v['date_of_registration']));
            }
        }

        echo json_encode(array('result' => $result), JSON_UNESCAPED_SLASHES);
    }

    public function searchAction()
    {
        $result['userCount'] = $this->model->getCountUser();
            $result['users'] = $this->model->getAllUserBySearch(
            isset($_GET['search']) ?
                '%' . $_GET['search'] . '%'
                : '%',
            $_GET['start'] ?? 0,
            $_GET['end'] ?? 10);
        foreach ($result['users'] as $k => $v) {
            if ($v['date_of_registration'] !== null) {
                $result['users'][$k]['date_of_registration'] = date('d.m.Y', strtotime($v['date_of_registration']));
            }
        }

        echo json_encode(array('result' => $result), JSON_UNESCAPED_SLASHES);
    }
}