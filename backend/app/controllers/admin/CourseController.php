<?php

namespace app\controllers\admin;

use app\models\admin\User;

class CourseController extends AppController
{
    public function indexAction()
    {
        $result['courseCount'] = $this->model->getCountCourse();
        $result['courses'] = $this->model->getAllCourses($_GET['start'] ?? 0, $_GET['end'] ?? 10, $_GET['lang'] ?? 1);
        foreach ($result['courses'] as $k => $v) {
            if ($v['date_of_publication'] !== null) {
                $result['courses'][$k]['date_of_publication'] = date('d.m.Y', strtotime($v['date_of_publication']));
            }
        }

        echo json_encode(array('result' => $result), JSON_UNESCAPED_SLASHES);
    }

    public function searchAction()
    {
        $result['courseCount'] = $this->model->getCountCourse();
        $result['courses'] = $this->model->getCourseBySearch(
            isset($_GET['search']) ?
                '%' . $_GET['search'] . '%'
                : '%',
            $_GET['start'] ?? 0,
            $_GET['end'] ?? 10,
            $_GET['lang'] ?? 1);
        foreach ($result['courses'] as $k => $v) {
            if ($v['date_of_publication'] !== null) {
                $result['courses'][$k]['date_of_publication'] = date('d.m.Y', strtotime($v['date_of_publication']));
            }
        }

        echo json_encode(array('result' => $result), JSON_UNESCAPED_SLASHES);
    }

    public function createAction()
    {
        debug('add', 1);
    }

    public function saveAction()
    {
        debug('save', 1);
    }

    public function editAction()
    {
        $result = [];
        $result['success'] = false;
        $result['canBeEditable'] = false;
        $result['course'] = $this->model->getCourseForEdit($result['username'], $this->route['slug'], User::isAdmin());
        if (!$result['course']) {
            header('HTTP/1.0 404 Not Found');
            die;
        }
        //TODO Управление одного админка курсом другого

        if ($result['username'] === $_SESSION['user']['username']) {
            $result['canBeEditable'] = true;
        }

        $result['success'] = (bool)$result['course'];

        echo json_encode(array('result' => $result), JSON_UNESCAPED_SLASHES);
    }

    public function deleteAction()
    {
        debug('delete', 1);
    }

}