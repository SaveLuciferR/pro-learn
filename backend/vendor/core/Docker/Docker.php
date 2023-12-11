<?php

namespace core\Docker;

use core\TSingleton;

class Docker
{
    use TSingleton;

    private string $name = '';
    private string $image = '';
    private bool $daemonize = true;
    private bool $privileged = false;
    public string $shell = 'bash';
    public ?string $network = null;

    public function __construct($image, $name = '')
    {
        $this->image = $image;
        $this->$name = $name;
    }

    public function create(...$arg)
    {
        return new static(...$arg);
    }


}