<?php

namespace app\models;

use RedBeanPHP\R;


/** Модель статей клиентской части */

class Blog extends AppModel
{


    /** Получение всех статей на сайте со статусом "Опубликован" на передаваемом языке.
     * @param int $lang ID языка из базы данных
     */

    public function getAllBlogs($lang)
    {
        return R::getAll(
            "SELECT b.slug, bd.excerpt, b.img, b.date_of_publication, 
                            b.views, u.role, u.username, bd.title, bd.content, 
                            (SELECT COUNT(bm.user_id)
                            FROM blogmark bm
                            WHERE bm.mark = 1 AND bm.blog_id = b.id) AS 'like',
                            (SELECT COUNT(br.user_id)
                            FROM blogresponse br
                            WHERE br.blog_id = b.id) AS 'comments'
                        FROM blog b JOIN blog_description bd ON b.id = bd.blog_id
                        JOIN user u ON u.id = b.user_id
                        WHERE bd.language_id = ? AND b.status = 'Опубликован' AND b.popular = 0
                        ORDER BY b.date_of_publication DESC",
            [$lang]
        );
    }


    /***/

    public  function getPopularBlogs($lang) {
        return R::getAll("SELECT b.slug, bd.excerpt, b.img, b.date_of_publication, 
                            b.views, u.role, u.username, bd.title, bd.content, 
                            (SELECT COUNT(bm.user_id)
                            FROM blogmark bm
                            WHERE bm.mark = 1 AND bm.blog_id = b.id) AS 'like',
                            (SELECT COUNT(br.user_id)
                            FROM blogresponse br
                            WHERE br.blog_id = b.id) AS 'comments'
                        FROM blog b JOIN blog_description bd ON b.id = bd.blog_id
                        JOIN user u ON u.id = b.user_id
                        WHERE bd.language_id = ? AND b.status = 'Опубликован' AND b.popular = 1
                        ORDER BY b.date_of_publication DESC",
            [$lang]);
    }


    /** Получение статьи по url-адресу и языку, если статус "Опубликован".
     * @param int $lang ID языка из базы данных
     * @param string $slug url-адрес статьи
     */

    public function getBlog($lang, $slug)
    {
        return R::getRow(
            "SELECT b.id, b.slug, b.img, b.date_of_publication, b.views, b.status, bd.heading, bd.content, bd.title, bd.description, bd.keywords, u.username, u.role,
                            (SELECT COUNT(bm.user_id)
                            FROM blogmark bm
                            WHERE bm.mark = 1 AND bm.blog_id = b.id) AS 'like',
                            (SELECT COUNT(bm.user_id)
                            FROM blogmark bm
                            WHERE bm.mark = 0 AND bm.blog_id = b.id) AS 'dislike',
                            (SELECT COUNT(br.user_id)
                            FROM blogresponse br
                            WHERE br.blog_id = b.id) AS 'comments'
                        FROM blog b JOIN blog_description bd ON bd.blog_id = b.id
                        JOIN user u ON u.id = b.user_id
                        WHERE bd.language_id = ? AND b.slug = ? AND b.status = 'Опубликован'",
            [$lang, $slug]
        );
    }


    /** Получение всех комментариев статьи и постройка их в виде дерева.
     * @param int $id ID статьи в базе данных
     */

    public function getResponseByBlog($id)
    {
        // лайки и дизлайки в запросе нужны
        $tree = [];
        $temp = R::getAssoc("SELECT br.id, u.username, u.role, br.parent_id, br.content, br.date_of_publication
                                   FROM blogresponse br JOIN user u ON u.id = br.user_id
                                   WHERE br.blog_id = ?
                                   ORDER BY br.date_of_publication DESC", [$id]);

        // Создание дерева с комментариями
        foreach ($temp as $id => &$response) {
            if (!$response['parent_id']) {
                $tree[$id] = &$response;
            } else {
                $temp[$response['parent_id']]['children'][$id] = &$response;
            }
        }

        // Переворачивание дочерних элементов (если есть) массива
        foreach ($tree as &$treeChild) {
            if (array_key_exists('children', $treeChild)) {
                $treeChild['children'] = array_reverse($treeChild['children']);
            }
        }

        return $tree;
    }
}
