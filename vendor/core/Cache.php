<?php

namespace core;

class Cache
{
    use TSingleton;

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

    public function deleteCache($key)
    {
        $file = CACHE . '/' . md5($key) . '.txt';

        if (file_exists($file)) {
            unlink($file);
        }
    }
}
