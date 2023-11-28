<?php

use core\Router;

// Router::add('^admin/?$', ['controller' => 'Main', 'action' => 'index', 'admin_prefix' => 'admin']);
// Router::add('^admin/(?P<controller>[a-z-]+)/?(?P<action>[a-z-]+)?$', ['admin_prefix' => 'admin']);

Router::add('^(?P<lang>[a-z]+)?/?language/?$', ['controller' => 'Language', 'action' => 'index']);

Router::add('^compiler/@(?P<username>[a-z-0-9A-Z]+)/(?P<slug>[a-z-0-9A-Z]+)/?$', ['controller' => 'Compiler', 'action' => 'index']);
Router::add('^compiler/@(?P<username>[a-z-0-9A-Z]+)/(?P<slug>[a-z-0-9A-Z]+)/(?P<action>[a-z-]+)/?$', ['controller' => 'Compiler']);

Router::add('^(?P<lang>[a-z]+)?/?blog/?$', ['controller' => 'Blog', 'action' => 'index']); // Главная страница со статьями
Router::add('^(?P<lang>[a-z]+)?/?blog/(?P<slug>[a-z0-9-]+)/?$', ['controller' => 'Blog', 'action' => 'view']); // Страница статьи

Router::add('^(?P<lang>[a-z]+)?/?course/?$', ['controller' => 'Course', 'action' => 'index']); // Главная страница с кусами
Router::add('^(?P<lang>[a-z]+)?/?course/(?P<slug>[a-z0-9-]+)/?$', ['controller' => 'Course', 'action' => 'view']); // Страница курса

Router::add('^(?P<lang>[a-z]+)?/?project/add/?$', ['controller' => 'User', 'action' => 'add']); // Страница с добавлением проекта
Router::add('^(?P<lang>[a-z]+)?/?project/save/?$', ['controller' => 'User', 'action' => 'save']);

Router::add('^(?P<lang>[a-z]+)?/?project/add/new-files/?$', ['controller' => 'User', 'action' => 'addNewFiles']);

Router::add('^(?P<lang>[a-z]+)?/?project/add/get-project-in-cache/?$', ['controller' => 'User', 'action' => 'getProjectInCache']);

Router::add('^(?P<lang>[a-z]+)?/?@(?P<username>[a-z-0-9A-Z]+)/project/(?P<slug>[a-z-0-9A-Z]+)/(?P<secondaryPath>[a-z-0-9A-Z/.]+)/?$', ['controller' => 'User', 'action' => 'project']); // Страница с проектом пользователя
Router::add('^(?P<lang>[a-z]+)?/?@(?P<username>[a-z-0-9A-Z]+)/project/(?P<slug>[a-z-0-9A-Z]+)/?$', ['controller' => 'User', 'action' => 'project']); // Страница с файлом или директорией
Router::add('^(?P<lang>[a-z]+)?/?@(?P<username>[a-z-0-9A-Z]+)/project/?$', ['controller' => 'User', 'action' => 'projectList']); // Страница со всеми проектами пользователя
Router::add('^(?P<lang>[a-z]+)?/?@(?P<username>[a-z-0-9A-Z]+)/?$', ['controller' => 'User', 'action' => 'profile']); // Страница профиля пользователя

Router::add('^user/(?P<action>[a-z-]+)?$', ['controller' => 'User']); // Запрос проверки авторизации пользователя

Router::add('^(?P<lang>[a-z]+)?/?$', ['controller' => 'Main', 'action' => 'index']); // Главная страница

// Router::add('^(?P<controller>[a-z-]+)/?(?P<action>[a-z-]+)?$');
// Router::add('^(?P<lang>[a-z]+)/(?P<controller>[a-z-]+)/(?P<action>[a-z-]+)/?$');


// Router::add('^(?P<lang>[a-z]+)?/?product/(?P<slug>[a-z0-9-]+)/?$', ['controller' => 'Product', 'action' => 'view']);
// Router::add('^(?P<lang>[a-z]+)?/?category/(?P<slug>[a-z0-9-]+)/?$', ['controller' => 'Category', 'action' => 'view']);

// Router::add('^(?P<controller>[a-z-]+)/(?P<action>[a-z-]+)/?$');