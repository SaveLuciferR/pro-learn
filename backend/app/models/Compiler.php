<?php

namespace app\models;

use app\models\AppModel;
use core\Docker\Docker;
use RedBeanPHP\R;

class Compiler extends AppModel
{
    private $containerInstance = null;

    public function getUrlPathProject($username, $project)
    {
        return PATH . '/public/projects/' . $username . '/' . $project; //
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
        return USER_PROJECT . '/' . $user . '/' . $project; // . '/src'
    }

    public function getTasksForProject($pathProject)
    {
        if (is_dir($pathProject)) {
            $files = scandir($pathProject);

            $plFolder = array_search('.prolearn', $files);

            if ($plFolder && is_dir($pathProject . '/' . $files[$plFolder])) {
                $filesPLFolder = scandir($pathProject . '/' . $files[$plFolder]);
                $tasks = array_search('tasks.json', $filesPLFolder);
                if ($tasks && file_exists($pathProject . '/' . $files[$plFolder] . '/' . $filesPLFolder[$tasks])) {
                    return json_decode(file_get_contents($pathProject . '/' . $files[$plFolder] . '/' . $filesPLFolder[$tasks]), true);
                }
            }
            //TODO: что если нету тасков или папки .prolearn
        } else {
            header("HTTP/1.0 404 Not Found");
            die;
        }
    }

    public function startOrUpdateDockerContainer($pathProject, &$output, &$error, $data = [])
    {
        $retval = null;
        $output = array();

        $tasks = $this->getTasksForProject($pathProject);

//        debug($tasks, 1);

        $docker = new Docker(md5($pathProject), $pathProject, $tasks);
        if (file_exists($pathProject . '/' . 'docker-compose.yml')) {
            $docker->runDockerCompose();
        } else {
            $docker->createImage();
            $docker->runContainer($data, $output, $error);
        }
    }

    public function getSolveTask($userID, $slug)
    {
        return R::getRow("SELECT c.id, cd.title, cd.content, i.input_data, i.output_data
                                FROM challenge c JOIN challenge_description cd ON cd.challenge_id = c.id
                                JOIN inputoutputdata i ON i.challenge_id = c.id
                                WHERE c.slug = ?", [$slug]);
    }

    public function getDataSolutionTask($slug)
    {
        return R::getAll("SELECT i.id, i.input_data, i.output_data
                                FROM challenge c JOIN inputoutputdata i ON i.challenge_id = c.id
                                WHERE c.slug = ?", [$slug]);
    }

    public function saveSolvedTask($userID, $taskSlug)
    {
        $task = R::findOne('challenge', "slug = ?", [$taskSlug]);

        R::begin();
        try {
            R::exec("UPDATE user_challenge SET success = 1 WHERE user_id = ? AND challenge_id = ?", [$userID, $task->id]);
            R::commit();
        } catch (\Exception $ex) {
//            debug($ex);
            R::rollback();
            return false;
        }
    }
}
