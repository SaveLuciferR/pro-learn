<?php

namespace core;


/** Создание одиночного класса (чтобы не создавалось несколько экземпляров класса) */

trait TSingleton
{
    private static self|null $instance = null;

    private function __construct()
    {
    }


    /** Функция, которая возвращает новый объект класса, если он не создан. Если создан, то возвращается тот же объект класса */

    public static function getInstance(): static {
        return static::$instance ?? static::$instance = new static();
    }
}
