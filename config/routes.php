<?php

use core\Router;

// Router::add('^admin/?$', ['controller' => 'Main', 'action' => 'index', 'admin_prefix' => 'admin']);
// Router::add('^admin/(?P<controller>[a-z-]+)/?(?P<action>[a-z-]+)?$', ['admin_prefix' => 'admin']);

Router::add('^(?P<lang>[a-z]+)?/?blog/?$', ['controller' => 'Blog', 'action' => 'index']); // Главная страница со статьями
Router::add('^(?P<lang>[a-z]+)?/?blog/(?P<slug>[a-z0-9-]+)/?$', ['controller' => 'Blog', 'action' => 'view']); // Страница статей

Router::add('^(?P<lang>[a-z]+)?/?$', ['controller' => 'Main', 'action' => 'index']); // Главная страница

// Router::add('^(?P<controller>[a-z-]+)/?(?P<action>[a-z-]+)?$');
// Router::add('^(?P<lang>[a-z]+)/(?P<controller>[a-z-]+)/(?P<action>[a-z-]+)/?$');


// Router::add('^(?P<lang>[a-z]+)?/?product/(?P<slug>[a-z0-9-]+)/?$', ['controller' => 'Product', 'action' => 'view']);
// Router::add('^(?P<lang>[a-z]+)?/?category/(?P<slug>[a-z0-9-]+)/?$', ['controller' => 'Category', 'action' => 'view']);

// Router::add('^(?P<controller>[a-z-]+)/(?P<action>[a-z-]+)/?$');