<?php

namespace core;


/** Класс для кеширования */

class Cache
{
    use TSingleton;


    /** Функция для записи кеша
     * @param string $key Ключ, по которому в будущем можно получить кеш
     * @param mixed $data Данные для кеширования
     * @param int $seconds Время жизни кеша (в секундах)
     * @return bool Возвращает true, если успешно. false, если нет
     */

    public function setCache($key, $data, $seconds = 3600): bool
    {
        $content['data'] = $data;
        $content['endTime'] = time() + $seconds;

        if (file_put_contents(CACHE . '/' . md5($key) . '.txt', serialize($content))) {
            return true;
        } else {
            return false;
        }
    }


    /** Функция для получения кеша
     * @param string $key Ключ, по которому нужно получить кеш
     * @return mixed|false Возвращает данные, если нашлись по ключу и/или не вышло время жизни кеша, иначе false
     */

    public function getCache($key)
    {
        $file = CACHE . '/' . md5($key) . '.txt';

        if (file_exists($file)) {
            $content = unserialize(file_get_contents($file));

            if (time() <= $content['endTime']) {
                return $content['data'];
            }

            unlink($file);
        }

        return false;
    }


    /** Функция для удаления кеша
     * @param string $key Ключ, по которому нужно удалить кеш
     */

    public function deleteCache($key)
    {
        $file = CACHE . '/' . md5($key) . '.txt';

        if (file_exists($file)) {
            unlink($file);
        }
    }
}
