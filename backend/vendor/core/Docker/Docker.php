<?php

namespace core\Docker;

use core\TSingleton;

class Docker
{
//    use TSingleton;

    private string $name = '';
    private string $image = '';
    private string $tag = '';
    private string $projectPath = '';
    private string $commandPathProject = '';
    private bool $daemonize = true;
    private bool $privileged = false;
    public string $shell = 'bash';
    public ?string $network = null;

    public function __construct($image, $projectPath, $name = '')
    {
//        $this->deleteUnusedAll();

        $this->image = $image;
        $this->projectPath = $projectPath;
        $this->commandPathProject = "cd " . $this->projectPath; //  . " && cd.."
        $this->$name = $name;
    }

    public function createImage()
    {
//        if (!isset($_SESSION['docker'])) {
//            $_SESSION['docker'] = [];
//        }

        $commandCreateImages = 'docker build . -t ' . $this->image . ($this->tag !== '' ? (':' . $this->tag) : '');
        $cmd = $this->commandPathProject . ' && ' . $commandCreateImages;

//        exec($cmd);

        $process = popen($cmd, 'r');

        echo "<pre>";
        while (!feof($process)) {
            echo json_encode(array('data' => fread($process, 4096)), JSON_UNESCAPED_SLASHES);
            flush();
            ob_flush();
        }

//        debug($cmd, 1);
        $this->runContainer();
    }

    public function runContainer()
    {
        $commandRunContainer = 'docker run -i -t ' . $this->image . ($this->tag !== '' ? (':' . $this->tag) : ''); //--rm -it
        $cmd = $this->commandPathProject . ' && ' . $commandRunContainer;
//        exec($cmd);

//        $process = popen($cmd, 'r');
//        echo "<pre>";
//        while (!feof($process)) {
//            echo json_encode(array('data' => fread($process, 4096)), JSON_UNESCAPED_SLASHES);
//            flush();
//            ob_flush();
//        }

        $descriptorspec = array(
            0 => array("pipe", "r"), // stdin is a pipe that the child will read from
            1 => array("pipe", "w"), // stdout is a pipe that the child will write to
            2 => array("pipe", "w") // stderr is a pipe that the child will write to
        );

        $process = proc_open($cmd, $descriptorspec, $pipes, null, null);

        if (is_resource($process)) {
            $cmd = 'demo';
            fwrite($pipes[0], $cmd);
            fclose($pipes[0]);

            echo stream_get_contents($pipes[1]);
            fclose($pipes[1]);

            $return_value = proc_close($process);
        }

//        debug($return_value);

        debug('', 1);
    }

    public function deleteUnusedAll()
    {
        $return_value = '';
        $process = proc_open("docker system prune", array(), $pipes, null, null);

        if (is_resource($process)) {
//            debug($pipes, 1);
//            fwrite($pipes[0], 'y');
//            fclose($pipes[0]);
            $return_value = proc_close($process);
        }

//        debug(1, 1);
//        exec("docker container prune -a");
//        exec("docker system prune -a");
    }

}