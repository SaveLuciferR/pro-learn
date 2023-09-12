<?php

use core\Router;

// Router::add('^admin/?$', ['controller' => 'Main', 'action' => 'index', 'admin_prefix' => 'admin']);
// Router::add('^admin/(?P<controller>[a-z-]+)/?(?P<action>[a-z-]+)?$', ['admin_prefix' => 'admin']);

Router::add('^(?P<lang>[a-z]+)?/?course/?$', ['controller' => 'Course', 'action' => 'index']); // Главная страница с кусами
Router::add('^(?P<lang>[a-z]+)?/?course/(?P<slug>[a-z0-9-]+)/?$', ['controller' => 'Course', 'action' => 'view']); // Страница курса

Router::add('^(?P<lang>[a-z]+)?/?blog/?$', ['controller' => 'Blog', 'action' => 'index']); // Главная страница со статьями
Router::add('^(?P<lang>[a-z]+)?/?blog/(?P<slug>[a-z0-9-]+)/?$', ['controller' => 'Blog', 'action' => 'view']); // Страница статьи


Router::add('^user/(?P<action>[a-z0-9-]+)/?$', ['controller' => 'User']); // Запрос проверки авторизации пользователя

Router::add('^(?P<lang>[a-z]+)?/?(?P<username>[a-z-0-9A-Z]+)/project/(?P<nameProject>[a-z-0-9A-Z])/?$', ['controller' => 'User', 'action' => 'project']); // Главная страница с кусами
Router::add('^(?P<lang>[a-z]+)?/?(?P<username>[a-z-0-9A-Z]+)/project/?$', ['controller' => 'User', 'action' => 'projectList']); // Главная страница с кусами
Router::add('^(?P<lang>[a-z]+)?/?(?P<username>[a-z-0-9A-Z]+)/?$', ['controller' => 'User', 'action' => 'profile']); // Главная страница с кусами

Router::add('^(?P<lang>[a-z]+)?/?$', ['controller' => 'Main', 'action' => 'index']); // Главная страница

// Router::add('^(?P<controller>[a-z-]+)/?(?P<action>[a-z-]+)?$');
// Router::add('^(?P<lang>[a-z]+)/(?P<controller>[a-z-]+)/(?P<action>[a-z-]+)/?$');


// Router::add('^(?P<lang>[a-z]+)?/?product/(?P<slug>[a-z0-9-]+)/?$', ['controller' => 'Product', 'action' => 'view']);
// Router::add('^(?P<lang>[a-z]+)?/?category/(?P<slug>[a-z0-9-]+)/?$', ['controller' => 'Category', 'action' => 'view']);

// Router::add('^(?P<controller>[a-z-]+)/(?P<action>[a-z-]+)/?$');