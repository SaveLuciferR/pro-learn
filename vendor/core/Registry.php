<?php

namespace core;


/** Класс, который записывает параметры сайта (например, информация о всех языках или о текущем языке на сайте) */

class Registry
{
    use TSingleton;

    protected static array $properties = [];


    /** Функция для ввода параметров в объект
     * @param string $name Ключ параметра, по которму можно достать параметр
     * @param mixed $value Значение параметра
     */

    public function setProperty($name, $value)
    {
        self::$properties[$name] = $value;
    }


    /** Функция для ввода параметров в объект
     * @param string $name Ключ параметра, по которму нужно достать параметр
     * @return mixed|null Любой тип параметра
     */

    public function getProperty($name)
    {
        return self::$properties[$name] ?? null;
    }

    /** Функция, которая возвращает все параметры записанные в объект
     * @return array|null Массив параметров
     */

    public function getProperties(): array
    {
        return self::$properties;
    }
}
