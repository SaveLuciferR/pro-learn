<?php

const DEBUG = 1; // 1 dev, 0 prod
define("ROOT", dirname(__DIR__));
const WWW = ROOT . '/public';
const USER_PROJECT = WWW . '/projects';
const COMPILER = WWW . '/compiler';
const APP = ROOT . '/app';
const CORE = ROOT . '/vendor/core';
const HELPERS = ROOT . '/vendor/core/helpers';
const CACHE = ROOT . '/tmp/cache';
const LOGS = ROOT . '/tmp/logs';
const CONFIG = ROOT . '/config';
define("PROGRAMMING_LANGUAGES", json_decode(file_get_contents(CONFIG . "/compilerInfo.json"), true));
const LAYOUT = 'pro-learn';
const PATH = 'http://pro-learn';
const ADMIN = 'http://pro-learn/admin';
//const NO_IMAGE = '/public/uploads/no_image.jpg';

require_once ROOT . '/vendor/autoload.php';
