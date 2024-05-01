<?php

namespace core\Docker;

use core\TSingleton;

class Docker
{
//    use TSingleton;

    private string $name = '';
    private string $image = '';
    private string $tag = '';
    private string $container = '';
    private array $ports = [];
    private string $projectPath = '';
    private string $commandPathProject = '';
    private array $runAtStartTask = [];
    private array $descriptorspec = array(
        0 => array("pipe", "r"), // stdin is a pipe that the child will read from
        1 => array("pipe", "w"), // stdout is a pipe that the child will write to
        2 => array("pipe", "w") // stderr is a pipe that the child will write to
    );
    private bool $daemonize = true;
    private bool $privileged = false;
    public string $shell = 'bash';
    public ?string $network = null;

    public function __construct($image, $projectPath, $tasks, $name = '')
    {
        $this->deleteUnusedAll();


        $this->image = $image;
        $this->projectPath = $projectPath;
        $this->commandPathProject = "cd " . $this->projectPath; //  . " && cd.."
        $this->$name = $name;

        if (isset($tasks['tasks'])) {
            foreach ($tasks['tasks'] as $k => $task) {
                if (isset($task['runAtStart']) && $task['runAtStart']) {
                    array_push($this->runAtStartTask, $task);
                }
            }
        }
    }

    public function runDockerCompose()
    {
        $commandDockerProject = 'docker-compose up --build -d'; //"C:\Program Files\Docker\Docker\resources\cli-plugins\docker-compose.exe"

        set_time_limit(0);
        ob_implicit_flush(1);
        ob_end_flush();

        $cmd = $this->commandPathProject . ' && ' . $commandDockerProject;

//        debug($cmd, 1);
        $process = popen($cmd, 'r');

        while (!feof($process)) {
            echo json_encode(array('data' => fread($process, 4096)), JSON_UNESCAPED_SLASHES);
            flush();
            ob_flush();
        }

//        exec($this->$commandPathProject . " && " . $commandDockerProject, $output, $retval);
//        debug($output);
    }

    protected function getPortsForProjct()
    {
        $dockerfile = '';
        if (file_exists($this->projectPath . '/dockerfile')) {
            $dockerfile = file_get_contents($this->projectPath . '/dockerfile');
        } else if (file_exists($this->projectPath . '/Dockerfile')) {
            $dockerfile = file_get_contents($this->projectPath . '/Dockerfile');
        }
        if ($dockerfile !== '') {
            preg_match_all('/(\r?\n|\r[^\s#])+EXPOSE\s([0-9]+)\n?/m', $dockerfile, $matches);
            $this->ports = $matches[2];
//            debug($this->ports);
//            debug($matches, 1);
        }
    }

    public function getImage()
    {
        return $this->image;
    }

    public function getTag()
    {
        return $this->tag;
    }

    public function getContainer()
    {
        return $this->container;
    }

    public function getPorts()
    {
        return $this->ports;
    }

    public function createImage()
    {
//        if (isset($_SESSION['docker'])) {
//            $key = -1;
//            foreach ($_SESSION['docker'] as $k => $v) {
////                debug($_SESSION['docker'], 1);
//                if ($this->image === $v['image']) {
//                    exec("docker container stop " . $v['container']);
//                    exec("docker container prune -f " . $v['container']);
//                    exec("docker image rm " . $v['image'] . ($v['tag'] !== '' ? (':' . $v['tag']) : ''));
////                    $_SESSION['docker'][$k] = $this;
//                    $key = $k;
//                }
//            }
//            if ($key !== -1) {
//                unset($_SESSION['docker'][$key]);
//            }
//        }

        $this->getPortsForProjct();
        $commandCreateImages = 'docker build . -t ' . $this->image . ($this->tag !== '' ? (':' . $this->tag) : '');
        $cmd = $this->commandPathProject . ' && ' . $commandCreateImages;

//        exec($cmd);

        $process = popen($cmd, 'r');
//        debug($cmd, 1);


//        echo "<pre>";
//        while (!feof($process)) {
//            echo json_encode(array('data' => fread($process, 4096)), JSON_UNESCAPED_SLASHES);
//            flush();
//            ob_flush();
//        }
    }

    public static function execIntoContainer($cmd)
    {

    }

    public function runContainer($inputData, &$output, &$error)
    {
        $commandPorstContainer = '';
        if ($this->ports) {
            $commandPorstContainer = '-p';
            foreach ($this->ports as $k => $v) {
                $commandPorstContainer .= ' ' . $v . ':' . $v;
            }
        }

        $this->container = md5($this->image);

        $commandRunContainer = 'docker run -i ' . $commandPorstContainer . ' --name ' . $this->container . ' ' .
            $this->image . ($this->tag !== '' ? (':' . $this->tag) : ''); //--rm -it

//        debug($commandRunContainer, 1);

        $process = proc_open($commandRunContainer, $this->descriptorspec, $pipes);

        if (is_resource($process)) {
            if (is_array($inputData)) {
                foreach ($inputData as $input) {
                    fwrite($pipes[0], $input . PHP_EOL);
                }
            } else {
                fwrite($pipes[0], $inputData);
            }
            fclose($pipes[0]);

            $output = stream_get_contents($pipes[1]);
            fclose($pipes[1]);

            $errors = stream_get_contents($pipes[2]);
            fclose($pipes[2]);

            proc_close($process);

//            echo json_encode(array('data' => $output));

//            if (!empty($errors)) {
//                echo json_encode(array('data' => 'Error: ' . $errors), JSON_UNESCAPED_SLASHES);
//            }
        }
    }

    public function deleteUnusedAll()
    {
        exec('docker container prune -f');
    }

}