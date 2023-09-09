<?php

namespace app\models;

use RedBeanPHP\R;

class Blog extends AppModel
{
    public function getAllBlogs($lang)
    {
        return R::getAll("SELECT b.slug, b.popular, b.dateofpublication, b.views, u.role, u.username, bd.title, bd.content, 
                            (SELECT COUNT(bm.user_id)
                            FROM blogmark bm
                            WHERE bm.mark = 1 AND bm.blog_id = b.id) AS 'like',
                            (SELECT COUNT(br.user_id)
                            FROM blogresponse br
                            WHERE br.blog_id = b.id) AS 'comments'
                        FROM blog b JOIN blog_description bd ON b.id = bd.blog_id
                        JOIN user u ON u.id = b.user_id
                        WHERE bd.language_id = ? AND b.status = 'Опубликован'
                        ORDER BY b.dateofpublication DESC", [$lang]);
    }

    public function getBlog($lang, $slug)
    {
        return R::getRow("SELECT b.*, bd.*
                        FROM blog b JOIN blog_description bd ON bd.blog_id = b.id
                        WHERE bd.language_id = ? AND b.slug = ?", [$lang, $slug]);
    }
}
