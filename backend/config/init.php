<?php

const DEBUG = 1; // 1 dev, 0 prod
define("ROOT", dirname(__DIR__));
const WWW = ROOT . '/public';
const USER_PROJECT = WWW . '/projects';
const TEMPLATE = WWW . '/templates';
const COMPILER = WWW . '/compiler';
const APP = ROOT . '/app';
const CORE = ROOT . '/vendor/core';
const HELPERS = ROOT . '/vendor/core/helpers';
const CACHE = ROOT . '/tmp/cache';
const PROJECT_CACHE = ROOT . '/tmp/project';
const LOGS = ROOT . '/tmp/logs';
const CONFIG = ROOT . '/config';
const LAYOUT = 'pro-learn';
const PATH = 'http://api.pro-learn.my';
const ADMIN = 'http://api.pro-learn.my/admin';

const GEOIP = "https://ipwho.is/";

const UPLOADS = PATH . '/public/uploads';


require_once ROOT . '/vendor/autoload.php';
