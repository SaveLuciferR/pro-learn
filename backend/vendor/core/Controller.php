<?php

namespace core;


/** Абстрактный класс конроллера */

abstract class Controller
{
    public array $data = [];
    public array $meta = ['title' => '', 'description' => '', 'keywords' => ''];
    public false|string $layout = '';
    public string $view = '';
    public object $model;

    public function __construct(public $route = [])
    {
    }


    /** Функция для подключения модели (если существует) определенного контроллера по url-адресу */

    public function getModel()
    {
        $model = 'app\models\\' . $this->route['admin_prefix'] . $this->route['controller'];

        if (class_exists($model)) {
            $this->model = new $model();
        }
    }


    /** Функция для подключения вида (если существует) определенного контроллера и определенного действия (action) по url-адресу */

    public function getView()
    {
        $this->view = $this->view ?: $this->route['action'];
        (new View($this->route, $this->layout, $this->view, $this->meta))->render($this->data);
    }


    /** Функция для записи данных, которые будут использоваться в подключенном виде
     * @param mixed $data Данные для использовании в подключенном виде
     */

    public function setData($data)
    {
        $this->data = $data;
    }


    /** Функция для записи динамических мета-данных
     * @param string $title Заголовок страницы
     * @param string $description Мета-описание
     * @param string $keywords Ключевые слова
     */

    public function setMeta($title = '', $description = '', $keywords = '')
    {
        $this->meta = [
            'title' => App::$app->getProperty('site_name') . ' :: ' . $title,
            'description' => $description,
            'keywords' => $keywords
        ];
    }


    /** Функция для проверки был ли запрос на backend
     * @return bool Возвращает True, если бы, иначе false
     */

    public function isAjax(): bool
    {
        return isset($_SERVER['HTTP_X_REQUESTED_WITH']) && $_SERVER['HTTP_X_REQUESTED_WITH'] === 'XMLHttpRequest';
    }


    /** Функция для вывода вида по названию действия (action) */

    public function loadView($view, $vars = [])
    {
        extract($vars);
        $prefix = str_replace('\\', '/', $this->route['admin_prefix']);
        require APP . "/views/{$prefix}{$this->route['controller']}/{$view}.php";
        die;
    }

    /** Функция для вывода ошибки при включенной отладки
     * @param string $folder Путь до вида 404/500 страницы
     * @param int $view Файл с видом с 404 ошибкой или 500
     * @param int $response Код ошибки
     */

    public function error404($folder = 'Error', $view = 404, $response = 404)
    {
        http_response_code($response);
        
        $this->setMeta('Page Not Found');
        $this->route['controller'] = $folder;
        $this->view = $view;
    }
}
