<?php

namespace app\models;

use app\models\AppModel;
use Spatie\Docker\DockerContainer;

class Compiler extends AppModel
{
    private $containerInstance = null;

    protected function getInfoDirectory($path, $localPath = ""): array
    {
        $files = scandir($path);

//        debug($files, 1);
        array_shift($files);
        array_shift($files);

        // debug($files, 1);

        $tree = array();

        foreach ($files as $k => $v) {
            if (is_dir($path . '/' . $v)) {
                $tree[$v]['type'] = 'directory';
                $tree[$v]['path'] = $localPath . "/" . $v;
                $tree[$v]['children'] = $this->getInfoDirectory($path . '/' . $v, $localPath . "/" . $v);
            } else {
                $tree[$v]['type'] = 'file';
                $tree[$v]['path'] = $localPath . "/" . $v;
                $tree[$v]['language'] = substr(strrchr($v, '.'), 1);
                $tree[$v]['body'] = file_get_contents($path . '/' . $v);
            }
        }

        $tempDirectory = array();
        $tempFile = array();

        foreach ($tree as $k => $v) {
            if ($tree[$k]['type'] === 'directory') {
                $tempDirectory[$k] = $v;
            } else {
                $tempFile[$k] = $v;
            }
        }

        ksort($tempDirectory);
        ksort($tempFile);

        $tree = array_merge($tempDirectory, $tempFile);

//        debug($tree, 1);

        return $tree;
    }

    public function getAllFileProject($user, $project)
    {
        $path = $this->getPathProject($user, $project);

//        debug($path, 1);

        if (!file_exists($path)) throw new \Exception("Файл или директория не была найдена", 404);

        $files = $this->getInfoDirectory($path);

//        debug($files, 1);

        return $files;
    }

    public function getPathProject($user, $project): string
    {
        return USER_PROJECT . '/' . $user . '/' . $project . '/src';
    }

    public function startOrUpdateDockerContainer($pathProject)
    {
        $retval = null;
        $output = array();

        $commandPathProject = "cd " . $pathProject . " && cd..";
        $commandDockerProject = 'docker-compose up --build -d'; //"C:\Program Files\Docker\Docker\resources\cli-plugins\docker-compose.exe"
        exec($commandPathProject . " && " . $commandDockerProject, $output, $retval);

        exec("docker system prune -f");

//        $imageDockerName = md5(session_id());
    }
}
