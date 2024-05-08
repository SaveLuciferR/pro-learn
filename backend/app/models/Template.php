<?php

namespace app\models;

use RedBeanPHP\R;

class Template extends AppModel
{
    public function getAllTemplates($lang, $search)
    {
        return R::getAll("SELECT t.id, td.title, td.description, t.slug, u.username, u.role
                                FROM projecttemplate t JOIN projecttemplate_description td ON td.projecttemplate_id = t.id
                                JOIN user u ON u.id = t.user_id
                                WHERE t.private = 0 AND t.for_project = 1 AND td.language_id = ? AND (td.title LIKE ? OR td.description LIKE ?)", [$lang, $search, $search]);
    }

    public function getAllAdminTemplates($lang, $search)
    {
        return R::getAll("SELECT t.id, td.title, td.description, t.slug, u.username, u.role
                                FROM projecttemplate t JOIN projecttemplate_description td ON td.projecttemplate_id = t.id
                                JOIN user u ON u.id = t.user_id
                                WHERE t.private = 0 AND t.for_project = 1 AND td.language_id = ? AND (td.title LIKE ? OR td.description LIKE ?) AND u.role LIKE 'admin'", [$lang, $search, $search]);
    }

    public function getAllUserTemplates($lang, $search)
    {
        return R::getAll("SELECT t.id, td.title, td.description, t.slug, u.username, u.role
                                FROM projecttemplate t JOIN projecttemplate_description td ON td.projecttemplate_id = t.id
                                JOIN user u ON u.id = t.user_id
                                WHERE t.private = 0 AND t.for_project = 1 AND td.language_id = ? AND (td.title LIKE ? OR td.description LIKE ?) AND u.role LIKE  'user'", [$lang, $search, $search]);
    }
}