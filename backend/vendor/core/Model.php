<?php

namespace core;

use RedBeanPHP\R;


/** Абстрактный класс модели. Здесь описана работа сохранения, загрузки и обновления данных */

abstract class Model
{
    public array $attributes = [];
    public array $errors = [];
    public array $rules = [];
    public array $labels = [];

    public function __construct()
    {
        DataBase::getInstance();
    }

    public function load($post = true) {
        $data = $post ? $_POST : $_GET;

        foreach ($this->attributes as $name => $value) {
            if (isset($data[$name])) {
                $this->attributes[$name] = $data[$name];
            }
        }
    }

    public function save ($table) {
        // debug($table, 1);
        $tbl = R::dispense($table);

        if ($table == 'user') {
            $this->attributes['allprofile_private'] = post('allprofile_private') ? 1 : 0;
            $this->attributes['personalinfo_private'] = post('personalinfo_private') ? 1 : 0;
            $this->attributes['lookcurrentcourse_private'] = post('lookcurrentcourse_private') ? 1 : 0;
        }

        // debug($attributes, 1);

        foreach ($this->attributes as $name => $value) {
            if ($value != '') {
                $tbl->$name = $value;
            }
        }

        // debug($tbl, 1);

        return R::store($tbl);
    }

    public function update($table, $id): int|string
    {
        $tbl = R::load($table, $id);

        if ($table == 'user') {
            $this->attributes['allprofile_private'] = post('allprofile_private') ? 1 : 0;
            $this->attributes['personalinfo_private'] = post('personalinfo_private') ? 1 : 0;
            $this->attributes['lookcurrentcourse_private'] = post('lookcurrentcourse_private') ? 1 : 0;
        }

        // debug($attributes, 1);

//        foreach ($this->attributes as $name => $value) {
//            if ($value != '') {
//                debug($name);
//                debug($value);
//                $tbl->$name = $value;
//            }
//        }
        return R::store($tbl);
    }
}
