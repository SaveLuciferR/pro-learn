<?php

namespace app\models;

use app\models\AppModel;

class Compiler extends AppModel
{
    protected function getInfoDirectory($path): array {
        $files = scandir($path);
        array_shift($files);
        array_shift($files);

        // debug($files, 1);

        $tree = array();

        foreach ($files as $k => $v) {
            if (is_dir($path . '/' . $v)) {
                $tree[$v]['type'] = 'directory';
                $tree[$v]['children'] = $this->getInfoDirectory($path . '/' . $v);
            }
            else {
                $tree[$v]['type'] = 'file';
                $tree[$v]['language'] = substr(strrchr($v, '.'), 1);
                $tree[$v]['body'] = file_get_contents($path . '/' . $v);
            }
        }

        $tempDirectory = array();
        $tempFile = array();

        foreach($tree as $k => $v) {
            if ($tree[$k]['type'] === 'directory') {
                $tempDirectory[$k] = $v;
            }
            else {
                $tempFile[$k] = $v;
            }
        }

        ksort($tempDirectory);
        ksort($tempFile);

        $tree = array_merge($tempDirectory, $tempFile);

        return $tree;
    }

    public function getAllFileProject($user, $project)
    {
        $path = USER_PROJECT . '/' . $user . '/' . $project;

        if (!file_exists($path)) throw new \Exception("Файл или директория не была найдена", 404);

        $files = $this->getInfoDirectory($path);

        return $files;
    }
}
