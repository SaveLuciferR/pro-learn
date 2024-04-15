<?php

namespace app\models;

use app\models\AppModel;

class Compiler extends AppModel
{
    private $containerInstance = null;

    public function getUrlPathProject($username, $project)
    {
        return PATH . '/public/projects/' . $username . '/' . $project . '/src';
    }

    protected function getInfoDirectory($path, $url, $localPath = ""): array
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
                $tree[$v]['children'] = $this->getInfoDirectory($path . '/' . $v, $url . '/' . $v, $localPath . "/" . $v);
            } else {
                $tree[$v]['type'] = 'file';
                $tree[$v]['path'] = $localPath . "/" . $v;
                $tree[$v]['language'] = substr(strrchr($v, '.'), 1);
                if ($tree[$v]['language'] === 'png' ||
                    $tree[$v]['language'] === 'jpg' ||
                    $tree[$v]['language'] === 'svg' ||
                    $tree[$v]['language'] === 'ico' ||
                    $tree[$v]['language'] === 'gif') {
                    $tree[$v]['type'] = 'img';
                    $tree[$v]['body'] = $url . '/' . $v;
                } else {
//                    $tree[$v]['body'] = utf8_encode(file_get_contents($path . '/' . $v));
                    $tree[$v]['body'] = file_get_contents($path . '/' . $v);
//                    $tree[$v]['body'] = mb_convert_encoding(file_get_contents($path . '/' . $v), 'UTF-8', 'auto');
                }
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

    public function getAllFileProject($user, $project, $url)
    {
        $path = $this->getPathProject($user, $project);

//        debug($path, 1);

        if (!file_exists($path)) return false;

        $files = $this->getInfoDirectory($path, $url);

//        debug($files, 1);

        return $files;
    }

    public function getPathProject($user, $project): string
    {
        return USER_PROJECT . '/' . $user . '/' . $project . '/src';
    }

    public function startOrUpdateDockerContainer($pathProject, $str = '')
    {

        $retval = null;
        $output = array();

        $commandPathProject = "cd " . $pathProject . " && cd..";
        $commandDockerProject = 'docker-compose up --build -d'; //"C:\Program Files\Docker\Docker\resources\cli-plugins\docker-compose.exe"

        set_time_limit(0);
        ob_implicit_flush(1);
        ob_end_flush();

        //output_buffering

//        for ($i = 0; $i < 10; $i++) {
//            echo $i . '<br />';
//            flush();
//            ob_flush();
//            sleep(1);
//        }

        $cmd = $commandPathProject . ' && ' . $commandDockerProject;

//        $cmd = 'ping 127.0.0.1';

        $descriptorspec = array(
            0 => array("pipe", "r"), // stdin is a pipe that the child will read from
            1 => array("pipe", "w"), // stdout is a pipe that the child will write to
            2 => array("pipe", "w") // stderr is a pipe that the child will write to
        );
//        flush();
        $process = popen($cmd, 'r');
//        echo "<pre>";
        while (!feof($process)) {
            echo json_encode(array('data' => fread($process, 4096)), JSON_UNESCAPED_SLASHES);
            flush();
            ob_flush();
        }
//        echo "</pre>";


//        echo json_encode(['proccess' => 5, 'data' => 'sdd']);
//        flush();
//        ob_flush();
//        sleep(1);
//        echo json_encode(['proccess' => 35, 'data' => '323']);
//        flush();
//        ob_flush();
//        sleep(1);
//        echo json_encode(['proccess' => 60, 'data' => '6545']);
//        flush();
//        ob_flush();
//        sleep(1);
//        echo json_encode(['proccess' => 100, 'success' => 1, 'data' => '6545']);

//        exec($commandPathProject . " && " . $commandDockerProject, $output, $retval);

//        exec("docker system prune -f");

//        debug($output);
//        $imageDockerName = md5(session_id());
    }
}
