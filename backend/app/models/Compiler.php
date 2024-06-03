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

    public function getLangProg()
    {
        return R::getAll('SELECT id, title, extension, code FROM langprog');
    }

    public function getProject($slug)
    {
        return R::getRow('SELECT * FROM project WHERE slug = ?', [$slug]);
    }

    protected function getInfoDirectory($path, $url, $localPath = ""): array|false
    {
        if (!file_exists($path)) {
            return false;
        }
        $files = scandir($path);
        array_shift($files);
        array_shift($files);

        $tree = array();

        foreach ($files as $k => $v) {
            if (is_dir($path . '/' . $v)) {
                $tree[$v]['type'] = 'directory';
                $tree[$v]['path'] = $localPath . "/" . $v;
                $tree[$v]['children'] = $this->getInfoDirectory($path . '/' . $v, $url . '/' . $v, $localPath . "/" . $v);
            } else {
                $tree[$v]['type'] = 'file';
                $tree[$v]['path'] = $localPath . "/" . $v;
                $tree[$v]['extension'] = substr(strrchr($v, '.'), 1);
                foreach ($this->getLangProg() as $k => $l) {
                    if ($l['extension'] === $tree[$v]['extension']) {
                        $tree[$v]['language'] = $l['code'];
                    }
                }
                if (!isset($tree[$v]['language'])) {
                    $tree[$v]['language'] = $tree[$v]['extension'];
                }
                if ($tree[$v]['language'] === 'png' ||
                    $tree[$v]['language'] === 'jpg' ||
                    $tree[$v]['language'] === 'svg' ||
                    $tree[$v]['language'] === 'ico' ||
                    $tree[$v]['language'] === 'gif') {
                    $tree[$v]['type'] = 'img';
                    $tree[$v]['body'] = $url . '/' . $v;
                } else {
                    $tree[$v]['body'] = file_get_contents($path . '/' . $v);
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

    public function dockerExists($pathProject)
    {
        if (file_exists($pathProject . '/' . 'docker-compose.yml')) {
            return true;
        } else if (file_exists($pathProject . '/' . 'Dockerfile') || file_exists($pathProject . '/' . 'dockerfile')) {
            return true;
        } else {
            return false;
        }
    }

    public function startOrUpdateDockerContainer($pathProject, &$output, &$error, $data = [])
    {
        $tasks = $this->getTasksForProject($pathProject);
        if (!$this->dockerExists($pathProject)) {
            return -1;
        }
        $_SESSION['docker'] = [];
//        debug($tasks, 1);

        $docker = new Docker(md5($pathProject), $pathProject, $tasks);
        if (file_exists($pathProject . '/' . 'docker-compose.yml')) {
            $docker->runDockerCompose($output, $error);
        } else {
            $docker->createImage($output, $error);
            $docker->runContainer($data, $output, $error);
        }


        if (!isset($_SESSION['docker'])) {
            $_SESSION['docker'] = [];
        }

//        $_SESSION['docker'][0] = $docker;
        return array_push($_SESSION['docker'],
            array(
                'image' => $docker->getImage(),
                'tag' => $docker->getTag(),
                'container' => $docker->getContainer(),
                'ports' => $docker->getPorts(),
            )
        );
    }

    public function isWebProject($pathProject, $files, $tasks)
    {
        $dockerContent = '';
        $dockerComposeContent = '';
        //TODO проверить что таски не содержат веб проект\
        foreach ($files as $k => $v) {
            if ($k === 'Dockerfile' || $k === 'dockerfile') {
                $dockerContent = file_get_contents($pathProject . '/' . $v['path']);
            } else if ($k === 'docker-compose.yml') {
                $dockerComposeContent = file_get_contents($pathProject . '/' . $v['path']);
            }
        }

        //TODO проверка что подтекст незакоммечен
        if (str_contains($dockerContent, 'EXPOSE') || str_contains($dockerComposeContent, 'ports:')) {
            return true;
        } else {
            return false;
        }
    }

    public function getSolveTask($slug)
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

    public function copyFileOrDir($from, $to, $isDir, $type)
    {
        if ($isDir) {
            $this->copyFolderInCompiler($from, $to);
            if ($type === 'cut') {
                $this->deleteDirectoryProject($from);
            }
        } else {
            copy($from, $to);
            if ($type === 'cut') {
                unlink($from);
            }
        }
    }

    protected function copyFolderInCompiler($folder, $to, $name = '')
    {
        if (!is_dir($folder)) return;
        if (!file_exists($to)) {
            mkdir($to . '/' . $name);
        }
        $files = scandir($folder);
        array_shift($files);
        array_shift($files);
        foreach ($files as $k => $v) {
            if (is_dir($folder . '/' . $v)) {
                $this->copyFolderInCompiler($folder, $to, $v);
            } else {
                copy($folder . '/' . $v, $to . '/' . $v);
            }
        }
    }

    public function deleteDirectoryProject($dir)
    {
        if (is_dir($dir)) {
            $files = scandir($dir);
            foreach ($files as $file) {
                if ($file != "." && $file != "..") {
                    $this->deleteDirectoryProject($dir . '/' . $file);
                }
            }
            rmdir($dir);
        } else if (file_exists($dir)) {
            unlink($dir);
        }
    }
}
