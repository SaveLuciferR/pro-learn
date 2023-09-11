<?php

namespace core;

use Exception;


/** Класс для работы с перенаправлением задач на контроллеры, модели и виды по url-адерсу */

class Router
{
    protected static array $routes = [];
    protected static array $route = [];


    /** Функция, которая добавляет шаблон возможного url-адреса. Также дает возможность самому обозначить контроллер и вид на определнный шаблон
     * @param string $reqexp Шаблон строки url-адреса без учета главного домена сайта
     * @param array $route Позволяет записать свой массив ключ значение для подключения контроллера, вида и прочее
     */

    public static function add($reqexp, $route = [])
    {
        self::$routes[$reqexp] = $route;
    }


    /** Функция для отладки, которая возвращает массив со всеми шаблонами url-адреса
     * @return array Массив с шаблонами url-адреса
     */

    public static function getRoutes(): array
    {
        return self::$routes;
    }


    /** Функция для получения работающего в данный момент контроллера, вида и прочее
     * @return array Массив с работающим в данный момент компонентами
     */

    public static function getRoute(): array
    {
        return self::$route;
    }


    /** Удаление get-параметров из url-адреса
     * @param string $url Текущий url-адрес
     * @return string Возвращает url-адрес без get-параметров
     */

    protected static function removeQueryString($url)
    {
        if ($url) {
            $params = explode('&', $url, 2);
            if (false === str_contains($params[0], '=')) {
                return rtrim($params[0], '/');
            }
        }

        return '';
    }


    /** Функция для проверки url-запроса по шаблонам роутера и установка ключ => значение
     * @param string $url Текущий url-адрес
     * @return null|Exception Ничего не вернет, если все прошло успешно, иначе выдаст ошибку 404
     */

    public static function dispatch($url)
    {
        $url = self::removeQueryString($url);
        if (self::matchRoute($url)) {
            if (!empty(self::$route['lang'])) {
                App::$app->setProperty('lang', self::$route['lang']);
            }

            $controller = 'app\controllers\\' . self::$route['admin_prefix'] . self::$route['controller'] . 'Controller';
            if (class_exists($controller)) {

                /** @var Controller $controllerObject */

                $controllerObject = new $controller(self::$route);
                $controllerObject->getModel();
                $action = self::lowerCamelCase(self::$route['action'] . 'Action');

                if (method_exists($controllerObject, $action)) {
                    $controllerObject->$action();
                    $controllerObject->getView();
                    return null;
                } else {
                    throw new \Exception("Метод {$controller}::{$action} не найден", 404);
                }
            } else {
                throw new \Exception("Контроллер {$controller} не найден", 404);
            }
        } else {
            throw new \Exception("Страница не найдена", 404);
        }
    }


    /** Функция для проверки шаблона по всем роутерам
     * @param string $url Текущий url-адрес
     * @return bool True, если нашло совпадение, false, если совпадений не было найдено
     */

    public static function matchRoute($url): bool
    {
        foreach (self::$routes as $pattern => $route) {
            if (preg_match("#{$pattern}#", $url, $matches)) {
                foreach ($matches as $k => $v) {
                    if (is_string($k)) {
                        $route[$k] = $v;
                    }
                }

                if (empty($route['action'])) {
                    $route['action'] = 'index';
                }

                if (!isset($route['admin_prefix'])) {
                    $route['admin_prefix'] = '';
                } else {
                    $route['admin_prefix'] .= '\\';
                }

                $route['controller'] = self::upperCamelCase($route['controller']);
                self::$route = $route;

                return true;
            }
        }

        return false;
    }


    /** Функция для создания правильного формата названия компонента. В верхний регист все слова
     * @param string $name Название компонента, который нужно отформатировать
     * @return string Возвращает правильный формат названия компонента
     */

    protected static function upperCamelCase($name): string
    {
        $name = str_replace('-', ' ', $name); // $name = cart-model
        $name = ucwords($name);                                 // $name = cart model
        $name = str_replace(' ', '', $name); // $name = Cart Model
        return $name;                                          // $name = CartModel
    }


    /** Функция для создания первой буквы в нижний регистр
     * @param string $name Слово для создания правильного формата
     * @return string Возвращает слово с первой буквой в нижнем регистре
     */

    protected static function lowerCamelCase($name): string
    {
        return lcfirst(self::upperCamelCase($name)); // $name = CartModel => $name = cartModel
    }
}
