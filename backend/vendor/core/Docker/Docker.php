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

    public function runDockerCompose(&$output, &$error)
    {
        $this->getPortsForProjct();
        $this->restoreSessionDocker();
        $commandDockerProject = 'docker-compose up --build -d'; //"C:\Program Files\Docker\Docker\resources\cli-plugins\docker-compose.exe"

        set_time_limit(0);
        ob_implicit_flush(1);
        ob_end_flush();

        $cmd = $this->commandPathProject . ' && ' . $commandDockerProject;
        $process = proc_open($cmd, $this->descriptorspec, $pipes);

//        debug($cmd, 1);
        if (is_resource($process)) {
//            if (is_array($inputData)) {
//                foreach ($inputData as $input) {
//                    fwrite($pipes[0], $input . PHP_EOL);
//                }
//            } else {
//                fwrite($pipes[0], $inputData);
//            }

            fclose($pipes[0]);

            $output .= stream_get_contents($pipes[1]);
            fclose($pipes[1]);

            $error .= stream_get_contents($pipes[2]);
//            debug($error, 1);
            fclose($pipes[2]);

            proc_close($process);
//
//            echo json_encode(array('data' => $output));
////
//            if (!empty($error)) {
//                echo json_encode(array('data' => 'Error: ' . $error), JSON_UNESCAPED_SLASHES);
//            }
        }

//        while (!feof($process)) {
//            echo json_encode(array('data' => fread($process, 4096)), JSON_UNESCAPED_SLASHES);
//            flush();
//            ob_flush();
//        }

//        exec($this->$commandPathProject . " && " . $commandDockerProject, $output, $retval);
//        debug($output);
    }

    protected function getPortsForProjct()
    {
        $dockerfile = '';
        $dockerCompose = '';
        if (file_exists($this->projectPath . '/docker-compose.yml')) {
            $dockerCompose = file_get_contents($this->projectPath . '/docker-compose.yml');
        } else if (file_exists($this->projectPath . '/dockerfile')) {
            $dockerfile = file_get_contents($this->projectPath . '/dockerfile');
        } else if (file_exists($this->projectPath . '/Dockerfile')) {
            $dockerfile = file_get_contents($this->projectPath . '/Dockerfile');
        }
//        debug($dockerCompose, 1);
        if ($dockerCompose !== '') {
            preg_match_all('/\r?(\s+)ports:(\s+)?(\n(\s+)?-\s)("([0-9]+):([0-9]+)")(.*?)\n/m', $dockerCompose, $matches);
//            debug($matches, 1);
            $this->ports = $matches[6];
        } else if ($dockerfile !== '') {
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

    public function restoreSessionDocker()
    {
//        debug($_SESSION, 1);
        if (isset($_SESSION['docker'])) {
//        debug($_SESSION['docker'], 1);
            $key = -1;
            foreach ($_SESSION['docker'] as $k => $v) {
                if ($this->image === $v['image']) {
                    exec("docker container stop " . $v['container']);
                    exec("docker container prune -f " . $v['container']);
                    exec("docker image rm " . $v['image'] . ($v['tag'] !== '' ? (':' . $v['tag']) : ''));
//                    $_SESSION['docker'][$k] = $this;
                    $key = $k;
                }
            }
            if ($key !== -1) {
                unset($_SESSION['docker'][$key]);
            }
            $_SESSION['docker'] = array_values($_SESSION['docker']);
        }
    }

    public function createImage(&$output, &$error)
    {
        $this->restoreSessionDocker();

        $this->getPortsForProjct();
        $commandCreateImages = 'docker build . -t ' . $this->image . ($this->tag !== '' ? (':' . $this->tag) : '');
        $cmd = $this->commandPathProject . ' && ' . $commandCreateImages;


//        exec($cmd);

        $process = proc_open($cmd, $this->descriptorspec, $pipes);

        if (is_resource($process)) {
//            if (is_array($inputData)) {
//                foreach ($inputData as $input) {
//                    fwrite($pipes[0], $input . PHP_EOL);
//                }
//            } else {
//                fwrite($pipes[0], $inputData);
//            }
            fclose($pipes[0]);

//            $output .= stream_get_contents($pipes[1]);
            fclose($pipes[1]);


//            debug(stream_get_contents($pipes[2]));
//            $error .= stream_get_contents($pipes[2]);
            fclose($pipes[2]);

            proc_close($process);
//
//            echo json_encode(array('data' => $output));
////
//            if (!empty($error)) {
//                echo json_encode(array('data' => 'Error: ' . $error), JSON_UNESCAPED_SLASHES);
//            }
        }
//        debug(1, 1);


//        $process = popen($cmd, 'r');
//        debug($cmd, 1);

//        debug(, 1);

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

        $commandRunContainer = 'docker run -i --rm ' . $commandPorstContainer . ' --name ' . $this->container . ' ' .
            $this->image . ($this->tag !== '' ? (':' . $this->tag) : ''); //-d -it

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

//            debug(stream_get_contents($pipes[1]));
            $output = stream_get_contents($pipes[1]);
            fclose($pipes[1]);

            $error .= stream_get_contents($pipes[2]);
            fclose($pipes[2]);

            proc_close($process);

//            echo json_encode(array('data' => $output));
//
//            if (!empty($errors)) {
//                echo json_encode(array('data' => 'Error: ' . $errors), JSON_UNESCAPED_SLASHES);
//            }
        }
    }

    public function deleteUnusedAll()
    {
        exec('docker system prune -f');
    }

}