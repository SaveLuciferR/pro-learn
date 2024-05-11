<?php

use core\Router;

Router::add('^admin/?$', ['controller' => 'Main', 'action' => 'index', 'admin_prefix' => 'admin']); // Главная страница админки
Router::add('^admin/course/edit/(?P<slug>[a-z-0-9]+)/?$', ['controller' => 'Course', 'action' => 'edit', 'admin_prefix' => 'admin']); // Страницы админки
Router::add('^admin/task/edit/(?P<slug>[a-z-0-9]+)/?$', ['controller' => 'Task', 'action' => 'edit', 'admin_prefix' => 'admin']); // Страницы админки
Router::add('^admin/feedback/(?P<id>[0-9]+)/?$', ['controller' => 'Feedback', 'action' => 'view', 'admin_prefix' => 'admin']); // Страницы админки


Router::add('^admin/(?P<controller>[a-z-]+)/?(?P<action>[a-z-]+)?/?$', ['admin_prefix' => 'admin']); // Страницы админки



Router::add('^(?P<lang>[a-z]+)?/?language/?$', ['controller' => 'Language', 'action' => 'index']);

Router::add('^compiler/@(?P<username>[a-z-0-9A-Z]+)/(?P<slug>[a-z-0-9A-Z]+)/?$', ['controller' => 'Compiler', 'action' => 'index']); // загрузка редактора
Router::add('^compiler/@(?P<username>[a-z-0-9A-Z]+)/(?P<slug>[a-z-0-9A-Z]+)/(?P<action>[a-z-]+)/?$', ['controller' => 'Compiler']); // сохранение, удаление и тд для редактора
Router::add('^compiler/@(?P<username>[a-z-0-9A-Z]+)/(?P<slug>[a-z-0-9A-Z]+)/start-task/?$', ['controller' => 'Compiler', 'action' => 'startTask']); // сохранение, удаление и тд для редактора
Router::add('^compiler/@(?P<username>[a-z-0-9A-Z]+)/(?P<slugProject>[a-z-0-9A-Z]+)/(?P<slugTask>[a-z-0-9A-Z]+)/check-solution-task/?$', ['controller' => 'Compiler', 'action' => 'checkSolutionTask']); // загрузка задачи
Router::add('^compiler/solve-task/?$', ['controller' => 'Compiler', 'action' => 'solveTask']); // загрузка задачи

Router::add('^(?P<lang>[a-z]+)?/?template/?$', ['controller' => 'Template', 'action' => 'index']); // Главная страница со статьями

Router::add('^(?P<lang>[a-z]+)?/?blog/?$', ['controller' => 'Blog', 'action' => 'index']); // Главная страница со статьями
Router::add('^(?P<lang>[a-z]+)?/?blog/(?P<slug>[a-z0-9-]+)/?$', ['controller' => 'Blog', 'action' => 'view']); // Страница статьи

Router::add('^(?P<lang>[a-z]+)?/?course/?$', ['controller' => 'Course', 'action' => 'index']); // Главная страница с кусами
Router::add('^(?P<lang>[a-z]+)?/?course/(?P<slug>[a-z0-9-]+)/?$', ['controller' => 'Course', 'action' => 'view']); // Страница курса
Router::add('^(?P<lang>[a-z]+)?/?course/(?P<slug>[a-z0-9-]+)/lessons/?$', ['controller' => 'Course', 'action' => 'study']); // Страница урока
Router::add('^(?P<lang>[a-z]+)?/?course/(?P<slug>[a-z0-9-]+)/lessons/study-check/?$', ['controller' => 'Course', 'action' => 'studyCheck']); // Проверка прохождения курса

Router::add('^(?P<lang>[a-z]+)?/?task/?$', ['controller' => 'Task', 'action' => 'index']); // Главная страница задач
Router::add('^(?P<lang>[a-z]+)?/?task/(?P<slug>[a-z0-9-]+)/?$', ['controller' => 'Task', 'action' => 'view']); // Страница задачи
Router::add('^(?P<lang>[a-z]+)?/?task/(?P<slug>[a-z0-9-]+)/solve/?$', ['controller' => 'Task', 'action' => 'solveTask']); // Запрос на начало или продолжение решения задачи

Router::add('^(?P<lang>[a-z]+)?/?@(?P<username>[a-z-0-9A-Z]+)/project-add/?$', ['controller' => 'User', 'action' => 'addProject']); // Страница с добавлением проекта
Router::add('^(?P<lang>[a-z]+)?/?@(?P<username>[a-z-0-9A-Z]+)/project-save-new/?$', ['controller' => 'User', 'action' => 'saveNewProject']); // Запрос с сохранением проекта
Router::add('^(?P<lang>[a-z]+)?/?@(?P<username>[a-z-0-9A-Z]+)/project-save-edit/(?P<slug>[a-z-0-9A-Z]+)/?$', ['controller' => 'User', 'action' => 'saveEditProject']); // Запрос с сохранением проекта
Router::add('^(?P<lang>[a-z]+)?/?@(?P<username>[a-z-0-9A-Z]+)/project-add/new-files/?$', ['controller' => 'User', 'action' => 'addNewFiles']); // Запрос с добавлением нового файла
Router::add('^(?P<lang>[a-z]+)?/?@(?P<username>[a-z-0-9A-Z]+)/project-add/get-project-in-cache/?$', ['controller' => 'User', 'action' => 'getProjectInCache']); // Запрос для получения проекта из кеша
Router::add('^(?P<lang>[a-z]+)?/?@(?P<username>[a-z-0-9A-Z]+)/project-add/delete-file/?$', ['controller' => 'User', 'action' => 'deleteFile']); // Запрос для получения проекта из кеша
Router::add('^(?P<lang>[a-z]+)?/?@(?P<username>[a-z-0-9A-Z]+)/project-edit/(?P<slug>[a-z-0-9A-Z]+)/?$', ['controller' => 'User', 'action' => 'projectForEdit']); // Запрос для получения проекта из кеша
Router::add('^(?P<lang>[a-z]+)?/?@(?P<username>[a-z-0-9A-Z]+)/project-download/(?P<slug>[a-z-0-9A-Z]+)/?$', ['controller' => 'User', 'action' => 'projectDownload']); // Страница с проектом
Router::add('^(?P<lang>[a-z]+)?/?@(?P<username>[a-z-0-9A-Z]+)/project-delete/(?P<slug>[a-z-0-9A-Z]+)/?$', ['controller' => 'User', 'action' => 'projectDelete']); // Страница с проектом

Router::add('^(?P<lang>[a-z]+)?/?@(?P<username>[a-z-0-9A-Z]+)/template-save-new/?$', ['controller' => 'User', 'action' => 'saveNewTemplate']); // Запрос с сохранением проекта
Router::add('^(?P<lang>[a-z]+)?/?@(?P<username>[a-z-0-9A-Z]+)/template-save-edit/(?P<slug>[a-z-0-9A-Z]+)/?$', ['controller' => 'User', 'action' => 'saveEditTemplate']); // Запрос с сохранением проекта
Router::add('^(?P<lang>[a-z]+)?/?@(?P<username>[a-z-0-9A-Z]+)/template-edit/(?P<slug>[a-z-0-9A-Z]+)/?$', ['controller' => 'User', 'action' => 'templateForEdit']); // Запрос для получения проекта из кеша
Router::add('^(?P<lang>[a-z]+)?/?@(?P<username>[a-z-0-9A-Z]+)/template-download/(?P<slug>[a-z-0-9A-Z]+)/?$', ['controller' => 'User', 'action' => 'projectDownload']); // Страница с проектом
Router::add('^(?P<lang>[a-z]+)?/?@(?P<username>[a-z-0-9A-Z]+)/template-delete/(?P<slug>[a-z-0-9A-Z]+)/?$', ['controller' => 'User', 'action' => 'projectDelete']); // Страница с проектом

Router::add('^(?P<lang>[a-z]+)?/?@(?P<username>[a-z-0-9A-Z]+)/template-to-project/?$', ['controller' => 'User', 'action' => 'templateToProject']); // Страница с вложенными папками проекта или файлом

Router::add('^(?P<lang>[a-z]+)?/?@(?P<username>[a-z-0-9A-Z]+)/project/(?P<slug>[a-z-0-9A-Z]+)/(?P<secondaryPath>[a-z-0-9A-Z/.]+)/?$', ['controller' => 'User', 'action' => 'project']); // Страница с вложенными папками проекта или файлом
Router::add('^(?P<lang>[a-z]+)?/?@(?P<username>[a-z-0-9A-Z]+)/project/(?P<slug>[a-z-0-9A-Z]+)/?$', ['controller' => 'User', 'action' => 'project']); // Страница с проектом
Router::add('^(?P<lang>[a-z]+)?/?@(?P<username>[a-z-0-9A-Z]+)/template/(?P<slug>[a-z-0-9A-Z]+)/(?P<secondaryPath>[a-z-0-9A-Z/.]+)/?$', ['controller' => 'User', 'action' => 'template']); // Страница с вложенными папками проекта или файлом
Router::add('^(?P<lang>[a-z]+)?/?@(?P<username>[a-z-0-9A-Z]+)/template/(?P<slug>[a-z-0-9A-Z]+)/?$', ['controller' => 'User', 'action' => 'template']); // Страница с проектом

Router::add('^(?P<lang>[a-z]+)?/?@(?P<username>[a-z-0-9A-Z]+)/project-list/?$', ['controller' => 'User', 'action' => 'projectList']); // Страница со всеми проектами пользователя
Router::add('^(?P<lang>[a-z]+)?/?@(?P<username>[a-z-0-9A-Z]+)/template-list/?$', ['controller' => 'User', 'action' => 'templateList']); // Страница со всеми шаблонами пользователя + опубликованные
Router::add('^(?P<lang>[a-z]+)?/?@(?P<username>[a-z-0-9A-Z]+)/course-list/?$', ['controller' => 'User', 'action' => 'courseList']); // Страница со всеми курсами пользователя
Router::add('^(?P<lang>[a-z]+)?/?@(?P<username>[a-z-0-9A-Z]+)/course-from-user/?$', ['controller' => 'User', 'action' => 'courseFromUser']); // Страница со всеми созданными курсами
Router::add('^(?P<lang>[a-z]+)?/?@(?P<username>[a-z-0-9A-Z]+)/task-from-user/?$', ['controller' => 'User', 'action' => 'taskFromUser']); // Страница со всеми задачами пользователя
Router::add('^(?P<lang>[a-z]+)?/?@(?P<username>[a-z-0-9A-Z]+)/task-list/?$', ['controller' => 'User', 'action' => 'taskList']); // Страница со всеми созданными задачами

Router::add('^(?P<lang>[a-z]+)?/?@(?P<username>[a-z-0-9A-Z]+)/settings/general/?$', ['controller' => 'User', 'action' => 'general']); // Страница с настройками профиля
Router::add('^(?P<lang>[a-z]+)?/?@(?P<username>[a-z-0-9A-Z]+)/settings/general/upload-avatar?$', ['controller' => 'User', 'action' => 'uploadAvatar']); // Страница с настройками профиля
Router::add('^(?P<lang>[a-z]+)?/?@(?P<username>[a-z-0-9A-Z]+)/settings/security/?$', ['controller' => 'User', 'action' => 'security']); // Страница с настройками безопасности
Router::add('^(?P<lang>[a-z]+)?/?@(?P<username>[a-z-0-9A-Z]+)/settings/session/?$', ['controller' => 'User', 'action' => 'session']); // Страница с созданными задачами, курсами пользователя
Router::add('^(?P<lang>[a-z]+)?/?@(?P<username>[a-z-0-9A-Z]+)/settings/created-by-user/?$', ['controller' => 'User', 'action' => 'createdByUser']); // Страница со всеми созданными задачами
Router::add('^(?P<lang>[a-z]+)?/?@(?P<username>[a-z-0-9A-Z]+)/settings/privacy/?$', ['controller' => 'User', 'action' => 'privacy']); // Страница с настройками приватности

Router::add('^(?P<lang>[a-z]+)?/?@(?P<username>[a-z-0-9A-Z]+)/creation/course/?$', ['controller' => 'User', 'action' => 'createCourse']); // Страница с созданием курса
Router::add('^(?P<lang>[a-z]+)?/?@(?P<username>[a-z-0-9A-Z]+)/creation/edit-course/(?P<slug>[a-z0-9-]+)/?$', ['controller' => 'User', 'action' => 'editCourse']); // Страница с редактированием курса
Router::add('^(?P<lang>[a-z]+)?/?@(?P<username>[a-z-0-9A-Z]+)/creation/course/type-lesson?$', ['controller' => 'User', 'action' => 'typeLesson']); // Запрос для получения всех видов курса
Router::add('^(?P<lang>[a-z]+)?/?@(?P<username>[a-z-0-9A-Z]+)/creation/course/category-lang-prog?$', ['controller' => 'User', 'action' => 'categoryLangProg']); // Запрос для получения всех категорий и языков
Router::add('^(?P<lang>[a-z]+)?/?@(?P<username>[a-z-0-9A-Z]+)/creation/course/save-icon?$', ['controller' => 'User', 'action' => 'saveIcon']); // Запрос для сохранения иконки

Router::add('^(?P<lang>[a-z]+)?/?@(?P<username>[a-z-0-9A-Z]+)/creation/task/?$', ['controller' => 'User', 'action' => 'createTask']); // Страница с созданием задачи
Router::add('^(?P<lang>[a-z]+)?/?@(?P<username>[a-z-0-9A-Z]+)/creation/edit-task/(?P<slug>[a-z0-9-]+)/?$', ['controller' => 'User', 'action' => 'editTask']); // Страница с созданием задачи

Router::add('^(?P<lang>[a-z]+)?/?@(?P<username>[a-z-0-9A-Z]+)/?$', ['controller' => 'User', 'action' => 'profile']); // Страница профиля пользователя


Router::add('^(?P<lang>[a-z]+)?/?user/(?P<action>[a-z-]+)?$', ['controller' => 'User']); // Запрос авторизации, регистрации и проверки на авторизацию пользователя

Router::add('^(?P<lang>[a-z]+)?/?$', ['controller' => 'Main', 'action' => 'index']); // Главная страница

// Router::add('^(?P<controller>[a-z-]+)/?(?P<action>[a-z-]+)?$');
// Router::add('^(?P<lang>[a-z]+)/(?P<controller>[a-z-]+)/(?P<action>[a-z-]+)/?$');


// Router::add('^(?P<lang>[a-z]+)?/?product/(?P<slug>[a-z0-9-]+)/?$', ['controller' => 'Product', 'action' => 'view']);
// Router::add('^(?P<lang>[a-z]+)?/?category/(?P<slug>[a-z0-9-]+)/?$', ['controller' => 'Category', 'action' => 'view']);

// Router::add('^(?P<controller>[a-z-]+)/(?P<action>[a-z-]+)/?$');