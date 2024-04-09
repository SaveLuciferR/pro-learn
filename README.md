# Установка проекта
Перед запуском данного проекта, первым делом нужно установить:
1. NodeJS
2. OpenServer (или любой другой локальный сервер)

## Настройка клиента
Для того, чтобы корректно работали сессии и куки (например, авторизация пользователей), нужно сделать:
1. Запись в hosts файле (для Windows C:/Windows/System32/drivers/ets/hosts) 127.0.0.1 домен_клиента (для примера установлен pro-learn.my).
2. Запись в frontend/.env HOST=домен_клиента
3. Можно изменить в frontend/.env PORT на любой другой
4. Запись в frontend/.env SERVER=http(s)://домен_сервера (**ВАЖНО**, домен сервера и домен клиента должны иметь одинаковые первую и вторую часть домена, например, api.pro-learn.my (домен сервера) и pro-learn.my (домен клиента))
5. В папке frontend прописать команду npm i (npm install), чтобы установить все зависимости
6. В папке frontend прописать команду npm run start, чтобы запустить клиент по домену, что был написан в .env

## Настройка базы данных
Для того, чтобы настроить базу данных, необходимо использовать sql файлик для импорта всей базы данных в СУБД.
1. В папке backend/config/config_db.php сделать значение для ключа 'dsn' равным 'mysql:host=localhost;dbname=ProLearn;charset=utf8', где 
   1. mysql ваша СУБД (более подробное описание можно найти в документации RedbeanPHP), 
   2. localhost = IP или домен сервера, где хранится база данных, 
   3. ProLean - название базы данных
2. В папке backend/config/config_db.php сделать значение для ключа 'user' равным администратору базы данных (для openServer -- 'root')
3. В папке backend/config/config_db.php сделать значение для ключа 'password' равным паролю равным администратора базы данных (для openServer -- 'root' или '')

## Настройка сервера
Для того, чтобы корректно работал сервер для запросов клиента, нужно
1. Если OpenServer, установить в настройки/домены управление доменами ручное управление
2. в OpenServer (или ином локальном сервере) сделать домен: домен_сервера => pro-learn/backend, где
   1. домен_сервера - домен сервера, указанный в .env для клиента с ключом SERVER,
   2. pro-learn/backend - путь до сервера на локальном диске (относительно локального сервера)
2.