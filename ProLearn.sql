-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3306
-- Время создания: Сен 11 2023 г., 20:06
-- Версия сервера: 10.8.4-MariaDB
-- Версия PHP: 8.1.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `ProLearn`
--

-- --------------------------------------------------------

--
-- Структура таблицы `Achievement`
--

CREATE TABLE `Achievement` (
  `ID` int(10) UNSIGNED NOT NULL,
  `Parent_ID` int(11) NOT NULL DEFAULT 0,
  `Icon_img` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `Achievement`
--

INSERT INTO `Achievement` (`ID`, `Parent_ID`, `Icon_img`) VALUES
(1, 0, '/public/uploads/ach.jpg'),
(2, 0, '/public/uploads/ach.jpg'),
(3, 1, '/public/uploads/ach.jpg'),
(4, 3, '/public/uploads/ach.jpg');

-- --------------------------------------------------------

--
-- Структура таблицы `Achievement_Description`
--

CREATE TABLE `Achievement_Description` (
  `Language_ID` int(10) UNSIGNED NOT NULL,
  `Achievement_ID` int(10) UNSIGNED NOT NULL,
  `Title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `Achievement_Description`
--

INSERT INTO `Achievement_Description` (`Language_ID`, `Achievement_ID`, `Title`) VALUES
(1, 1, 'Зарегистрироваться на сайте'),
(1, 2, 'Пройти первый курс'),
(1, 3, 'Провести на сайте 1 день'),
(1, 4, 'Провести на сайте 2 дня'),
(2, 1, 'Register on the website'),
(2, 2, 'Take the first course'),
(2, 3, 'Spend 1 day on the site'),
(2, 4, 'Spend 2 days on the site');

-- --------------------------------------------------------

--
-- Структура таблицы `Blog`
--

CREATE TABLE `Blog` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `slug` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `img` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '/public/uploads/no_image.jpg',
  `status` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `popular` tinyint(1) NOT NULL DEFAULT 0,
  `dateofpublication` date DEFAULT NULL,
  `views` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `Blog`
--

INSERT INTO `Blog` (`id`, `user_id`, `slug`, `img`, `status`, `popular`, `dateofpublication`, `views`) VALUES
(1, 1, 'hello-world', '/public/assets/img/blog/plug_img_blog.jpg', 'Опубликован', 0, '2023-06-23', 0),
(2, 1, 'hello-var', '/public/assets/img/blog/plug_img_blog.jpg', 'Опубликован', 0, '2023-08-27', 0),
(3, 1, 'hello-func', '/public/assets/img/blog/plug_img_blog.jpg', 'Опубликован', 0, '2023-06-20', 0),
(4, 2, 'hello-proc', '/public/assets/img/blog/plug_img_blog.jpg', 'В обработке', 0, NULL, 0),
(5, 3, 'admin2blog-1', '/public/assets/img/blog/plug_img_blog.jpg', 'Опубликован', 0, '2023-06-20', 0),
(6, 4, 'admin3blog-1', '/public/assets/img/blog/plug_img_blog.jpg', 'В обработке', 0, NULL, 0),
(7, 3, 'admin2blog-2', '/public/assets/img/blog/plug_img_blog.jpg', 'В обработке', 0, NULL, 0),
(8, 1, 'admin1blog-1', '/public/assets/img/blog/plug_img_blog.jpg', 'В обработке', 0, NULL, 0),
(9, 1, 'testdelete', '/public/assets/img/blog/plug_img_blog.jpg', 'В обработке', 0, NULL, 0),
(21, 1, 'dsadsaf', '/public/assets/img/blog/plug_img_blog.jpg', 'Опубликован', 0, '2023-06-22', 0),
(22, 1, 'peremennye-v-c', '/public/assets/img/blog/plug_img_blog.jpg', 'Опубликован', 1, '2023-06-24', 0),
(23, 1, 'konsol-nyy-vvod-vyvod-v-c', '/public/assets/img/blog/plug_img_blog.jpg', 'Опубликован', 1, '2023-06-24', 0);

--
-- Триггеры `Blog`
--
DELIMITER $$
CREATE TRIGGER `CascadeDeleteBlog` BEFORE DELETE ON `Blog` FOR EACH ROW BEGIN 
	DELETE FROM BlogResponse 
    WHERE Blog_ID = OLD.ID;
    
   	DELETE FROM Blog_BlogCategory WHERE Blog_ID = OLD.ID;
   	DELETE FROM Blog_Description WHERE Blog_ID = OLD.ID;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Структура таблицы `BlogCategory`
--

CREATE TABLE `BlogCategory` (
  `ID` int(10) UNSIGNED NOT NULL,
  `Parent_ID` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `BlogCategory`
--

INSERT INTO `BlogCategory` (`ID`, `Parent_ID`) VALUES
(1, 0),
(2, 1),
(3, 0),
(4, 0),
(5, 0);

-- --------------------------------------------------------

--
-- Структура таблицы `BlogCategory_Description`
--

CREATE TABLE `BlogCategory_Description` (
  `Language_ID` int(10) UNSIGNED NOT NULL,
  `BlogCategory_ID` int(10) UNSIGNED NOT NULL,
  `Title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `BlogCategory_Description`
--

INSERT INTO `BlogCategory_Description` (`Language_ID`, `BlogCategory_ID`, `Title`) VALUES
(1, 1, 'Языки программирования21'),
(1, 2, 'Переменные'),
(1, 3, 'Язык SQL'),
(1, 4, 'Блоги от пользователей'),
(1, 5, 'Блоги от админов'),
(2, 1, 'Programing language'),
(2, 2, 'Variables'),
(2, 3, 'Language SQL'),
(2, 4, 'Blog from users'),
(2, 5, 'Blog from admins');

-- --------------------------------------------------------

--
-- Структура таблицы `BlogMark`
--

CREATE TABLE `BlogMark` (
  `blog_id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `mark` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `BlogMark`
--

INSERT INTO `BlogMark` (`blog_id`, `user_id`, `mark`) VALUES
(1, 1, 0);

-- --------------------------------------------------------

--
-- Структура таблицы `BlogResponse`
--

CREATE TABLE `BlogResponse` (
  `ID` int(10) UNSIGNED NOT NULL,
  `Blog_ID` int(10) UNSIGNED NOT NULL,
  `User_ID` int(10) UNSIGNED NOT NULL,
  `Parent_ID` int(11) NOT NULL DEFAULT 0,
  `Content` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `DateOfPublication` date NOT NULL DEFAULT current_timestamp(),
  `Like_Mark` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `BlogResponse`
--

INSERT INTO `BlogResponse` (`ID`, `Blog_ID`, `User_ID`, `Parent_ID`, `Content`, `DateOfPublication`, `Like_Mark`) VALUES
(1, 1, 2, 0, 'Неплохой блог', '2023-05-11', 1),
(2, 1, 1, 1, 'Рады стараться!', '2023-05-11', 0),
(3, 3, 6, 0, 'Комментарий к функциям', '2023-05-26', 0),
(4, 4, 4, 0, 'Комментарий к процедурам', '2023-05-25', 0),
(5, 5, 7, 0, 'Комментарий к блогу 1 админа 2', '2023-05-24', 1),
(6, 6, 6, 0, 'Комментарий к блогу 1 админа 3', '2023-05-30', 0),
(7, 7, 5, 0, 'Комментарий к блогу 2 админа 2', '2023-05-22', 0),
(8, 8, 1, 0, 'Комментарий админа 1 на блог 1', '2023-05-17', 5),
(9, 1, 3, 0, 'Very good blog!', '2023-06-01', 0),
(16, 3, 1, 3, 'Проверка ответов для функций', '2023-06-17', 0),
(17, 5, 1, 0, 'Проверка комментариев к блогу через сайт', '2023-06-17', 0),
(18, 1, 1, 1, 'очень рады', '2023-06-20', 0);

-- --------------------------------------------------------

--
-- Структура таблицы `Blog_BlogCategory`
--

CREATE TABLE `Blog_BlogCategory` (
  `Blog_ID` int(10) UNSIGNED NOT NULL,
  `BlogCategory_ID` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `Blog_BlogCategory`
--

INSERT INTO `Blog_BlogCategory` (`Blog_ID`, `BlogCategory_ID`) VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 3),
(5, 5),
(6, 5),
(7, 5),
(8, 5),
(21, 1),
(22, 1),
(23, 1);

-- --------------------------------------------------------

--
-- Структура таблицы `Blog_Description`
--

CREATE TABLE `Blog_Description` (
  `Language_ID` int(10) UNSIGNED NOT NULL,
  `Blog_ID` int(10) UNSIGNED NOT NULL,
  `Heading` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Content` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `Title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Description` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Keywords` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `Blog_Description`
--

INSERT INTO `Blog_Description` (`Language_ID`, `Blog_ID`, `Heading`, `Content`, `Title`, `Description`, `Keywords`) VALUES
(1, 1, 'Привет, Мир!', '<p>Это тестовый блог, так что Привет, <strong>Мир</strong>!<img src=\"/public/uploads/images/coffi.png\"></p><p><a href=\"https://youtube\">https://youtube</a></p><p>А это конец блога</p>', 'Привет, Мир', 'Привет, Мир! - описание', 'Привет, Мир! - ключевые'),
(1, 2, 'Переменные', '<h2>Тестовый блог о переменных</h2>', 'Переменные', 'Переменные - описание', 'Переменные - ключевые'),
(1, 3, 'Привет функции', '<p>Контент с блогом о функция</p>', 'Привет функции', 'Привет функции-описание', 'Привет функции-ключевые'),
(1, 4, 'Привет процедуры', 'Контент с блогом о процедурах', 'Привет процедуры', 'Привет процедуры-описание', 'Привет процедуры-ключевые'),
(1, 5, 'Админ 2 Блог 1', '<p>контент Админ 2 Блог 1</p>', 'Админ 2 Блог 1', 'Админ 2 Блог 1 - описание', 'Админ 2 Блог 1 - ключевые'),
(1, 6, 'Админ 3 Блог 1', 'контент Админ 3 Блог 1', 'Админ 3 Блог 1', 'Админ 3 Блог 1 - описание', 'Админ 3 Блог 1 - ключевые'),
(1, 7, 'Админ 2 Блог 2', 'контент Админ 2 Блог 2', 'Админ 2 Блог 2', 'Админ 2 Блог 2 - описание', 'Админ 2 Блог 2 - ключевые'),
(1, 8, 'Админ 1 Блог 1', 'контент Админ 1 Блог 1', 'Админ 1 Блог 1', 'Админ 1 Блог 1 - описание', 'Админ 1 Блог 1 - ключевые'),
(1, 21, 'ssddsad', '<p>nklgfdnlkgfd</p>', 'dsadsaf', 'dsfdmlm', 'mkfdfk'),
(1, 22, 'Переменные в C#', '<p>Чтобы программа могла оперировать данными, данные должны находиться в оперативной памяти компьютера. Переменная - это область памяти, в которой находятся данные.</p><figure class=\"image image-style-align-center\"><img src=\"https://avatars.dzeninfra.ru/get-zen_doc/4585608/pub_6068a943b207860379e02710_6068b93d741adc251dfc88eb/scale_2400\"></figure><p>Разрабатывая программу, программист должен объявить необходимые для решения задачи переменные. В программе доступ к данным (переменным) осуществляется по имени. В качестве имени переменной можно использовать последовательность символов, состоящую из букв латинского алфавита, цифр, а также символов тире и подчеркивание. Первым символом в имени переменной должна быть буква или символ “подчеркивание”. Пробелы в именах переменных использовать нельзя.</p><p>Следует обратить внимание, на то, что компилятор С# <strong>различает</strong> прописные и строчные буквы, поэтому, например, имена (идентификаторы) Name, name и NAME обозначают разные объекты (переменные).</p><p>В соответствие с правилами хорошего стиля программирования, имя переменной должно быть логически связано с ее назначением. Например, если переменные предназначены для хранения коэффициентов квадратного уравнения, то вполне логично присвоить им имена A, B и C, а переменным, предназначенным для хранения значений корней уравнения, — имена X1 и X2. Другой пример. Если в программе переменные предназначены для хранения суммы покупки и величины скидки, то этим переменным можно присвоить имена Sum и Discount.</p><p>Программа может оперировать с данными различных типов: с целыми и вещественными числами, со строками, с отдельными символами и с логическими величинами. Объявляя переменную, программист должен указать ее тип и тем самым указать (определить), для хранения данных какого типа переменная предназначена.</p><p>К основным типам C # можно отнести следующие типы данных:</p><ul><li>int (целый)</li><li>double (вещественный)</li><li>char (символьный)</li><li>bool ( логический)</li><li>string (строковый)</li></ul><h3><strong>int</strong></h3><p>Значением переменной типа int может быть положительное или отрицательное целое число, а также ноль. Диапазон изменения значения переменных типа int от -2147483648 до 2147483647. Помимо типа int для представления целых данных можно использовать типы Int16, Int32 (эквивалентен int ), Int64 (long ), а также беззнаковые типы UInt 16, UInt 32 и UInt 64.</p><p><img src=\"https://avatars.dzeninfra.ru/get-zen_doc/4281215/pub_6068a943b207860379e02710_6068bc1d8f567a4bcf8b97e5/scale_1200\" alt=\"Чтобы программа могла оперировать данными, данные должны находиться в оперативной памяти компьютера. Переменная - это область памяти, в которой находятся данные (рис. 1.19).-2\"></p><h3><strong>double</strong></h3><p>Характеристики вещественных типов приведены в следующей таблице.</p><p><img src=\"https://avatars.dzeninfra.ru/get-zen_doc/1857554/pub_6068a943b207860379e02710_6068bdd845570e1e43207865/scale_1200\" alt=\"Чтобы программа могла оперировать данными, данные должны находиться в оперативной памяти компьютера. Переменная - это область памяти, в которой находятся данные (рис. 1.19).-3\"></p><p>Выбирая тип данных для переменных, следует учитывать, что переменная типа double занимает в оперативной памяти в два раза больше места, чем переменная типа single (float) . Это важно, тем более, когда речь идет о выборе типа элементов для массива.</p><p>Также следует понимать, что несмотря на широкий диапазон значений переменных вещественного типа, количество значащих цифр мантиссы (точность) для значений single – 7-8, а для double – не более 15.</p><h3><strong>char</strong></h3><p>Значением переменной типа char может быть любой символ в том числе, цифра, знак препинания, буква русского и латинских алфавитов, символ валюты и другие одиночные символы. Помимо обычных, т.е. отображаемых в окне консоли символов, значением переменной типа char может быть специальный (управляющий) символ. Управляющие символы на экране консоли не отображаются, но их отправка на консоль приводит к выполнению определенных действий. Например, символ Новая строка переводит курсор в начало следующей строки. В тексте программы специальные символы записывают особым образом. Например, символ новая строка записывается двумя символами \\n.</p><h3><strong>string</strong></h3><p>Значением переменной типа string может быть любая строка –последовательность символов, состоящая из букв, цифр, знаков препинания, пробелов, а также специальных символов.</p><h3><strong>bool</strong></h3><p>Переменная типа bool может принимать одно из двух логических значений: true (истина) или false (ложь).</p><h2><strong>Объявление переменных</strong></h2><p>Каждая переменная программы должна быть объявлена. С помощью объявления устанавливается не только факт существования переменной, но и задается ее тип, тем самым определяется диапазон допустимых значений.</p><p>Инструкция объявления переменной в общем виде выглядит так:</p><p><i>Тип Имя;</i></p><p>Например:</p><p><strong>double </strong>weight;<br><strong>int </strong>k;<br><strong>string </strong>name ;</p><p>Несколько переменных одного типа можно объявить в одной инструкции, например, так:</p><p><strong>double</strong> r1, r2, r;</p><p>Считается хорошим тоном после инструкции объявления переменной добавить комментарий, пояснить, для чего используется переменная.</p><p><strong>double </strong>r1, r2; // сопротивления, Ом<br><strong>int </strong>t; // способ соединения: 1 - посл., 2 - пар.<br><strong>double </strong>u; // напряжение, вольт<br><strong>double </strong>r; // сопротивление цепи, Ом<br><strong>double </strong>i; // ток, ампер</p><p>C # позволяет объявить переменную практически в любом месте программы, там, где она нужна (единственное условие – переменная должна быть объявлена до первой инструкции, в которой она используется). Вместе с тем, переменные обычно объявляют в начале той функции, в которой они используются. Исключение составляют счетчики циклов, которые принято объявлять непосредственно в инструкции for.</p><p>Если в начале программы переменная должна иметь определенное значение, то присвоить ей это значение (выполнить инициализацию переменной) можно непосредственно в инструкции объявления переменной,</p><p>Например:</p><p><strong>double</strong> discount = 0.25; // скидка<br><strong>int </strong>n = 0; // количество совпадений<br><strong>string </strong>address = \"\" ;</p><h2><strong>Инструкция присваивания</strong></h2><p>Инструкция присваивания это - основная вычислительная инструкция. В результате ее выполнения переменная получает значение.</p><p>В общем виде инструкция присваивания записывается так:</p><p><i>Имя </i>= <i>Выражение</i>;</p><p>Выражение состоит из <strong>операндов</strong> и <strong>операторов</strong> и в общем виде выглядит так:<br><i>оп1</i> оп <i>оп2</i><br>где:<br><i>оп1</i> и <i>оп2</i> – операнды;<br>оп – оператор.</p><p>Операнды обозначают <strong>объекты</strong>, над которыми выполняется операция, оператор – выполняемое действие. В качестве операндов выражения могут выступать константы, переменные, функции и выражения.</p><p>Операторы - символы, обозначающие действия над операторами.</p><p>Примеры выражений:</p><p>i + 1<br>sum * 0.05<br>x + dx<br>x * sin (a )<br>gr / 454.0<br>d % 100</p><p>Операторы имеют разный приоритет. Так операторы *, /, % имеют более высокий приоритет, чем операторы + и -. Приоритет операторов влияет на порядок их выполнения. При вычислении значения выражения сначала выполняются операторы с более высоким приоритетом, т.е. умножение и деление, затем – с более низким (сложение и вычитание). Если приоритет операторов в выражении одинаковый, то сначала выполняется тот оператор, который находится левее.</p><p>Для задания нужного порядка выполнения операций следует использовать скобки. Например, выражение вычисления сопротивления двух резисторов, соединенных параллельно, записывается так:</p><p>(r1+r2)/(r1*r2)</p><p>Выражение, заключенное в скобки, трактуется как один операнд. Это значит, что операции, стоящие в скобках, будут выполняться в обычном порядке, но раньше, чем операции, находящиеся за скобками. При записи выражений, содержащих скобки, должна соблюдаться парность скобок, т. е. число открывающих скобок должно быть равно числу закрывающих скобок. Нарушение парности скобок — наиболее распространенная ошибка при записи выражений.</p><p>Инструкция присваивания выполняется следующим образом. Сначала вычисляется значение выражения, стоящего справа от символа присваивания, затем это значение записывается в переменную, имя которой указано слева от символа присваивания.</p><p>Например, в результате выполнения инструкции<br>a = b + c<br>значением переменной a будет число, равное сумме значений переменных b и c.</p><p>В результате выполнения инструкции<br>j = j + 1<br>значение переменной j будет увеличено на единицу.</p><p>В инструкции присваивания тип переменной должен соответствовать типу выражения. Если это не так, то значение выражения преобразуется к типу переменной. При преобразовании целого в дробное проблем нет: преобразование выполняется путем добавления нулевой дробной части. При преобразовании дробного к целому преобразование выполняется путем отбрасывания дробной части, что может привести к потере точности вычислений и даже к неправильному результату.</p><p>Значение переменной можно изменить не только при помощи инструкции присваивания, но и при помощи унарных операторов: ++ , -- и др.</p><p>Оператор ++ (инкремент, увеличение) увеличивает значение на единицу. Например, чтобы увеличить на единицу значение переменной i вместо инструкции i=i+1 можно записать i++. Аналогичным образом используется оператор -- (декремент, уменьшение).</p><h3><strong>Тип выражения и преобразование типов</strong></h3><p>Корректное выполнение операций +, -, * и / предполагает, что объекты, над которыми эти операции выполняются, одного типа. Если это не так, то выполняется преобразование типов по следующим правилам. Тип float преобразуется к double. Если один из операндов вещественного типа, а другой - целого, то целое значение преобразуется в вещественное.</p><p>Тип выражения определяется типом операндов (с учетом приведенных выше правил преобразования типов), т.е. если оба операнда целого типа, то тип выражения – целый, а, если, хотя бы один из операндов вещественный, то тип выражения – вещественный.</p><p>Особое внимание следует обратить на операцию деления. Если оба операнда целого типа, то результат, в соответствии с приведенными выше правилами, преобразуется к целому, причем преобразование выполняется путем отбрасывания дробной части. Например, выражение 5/2 целого типа и, поэтому, его значение 2, а не 2.5.</p><p>Приведенная ниже программа пересчета веса из граммов в фунты демонстрирует особенности выполнения операции деления. Обратите внимание, если в инструкции пересчета вещественную константу 459.0 заменить целой константу 459, то программа будет работать неправильно – будет \"теряться \" дробная часть результата.</p><p><strong>static void</strong> Main(string [] args)<br>{<br><strong>int </strong>gr; // вес в граммах<br><strong>double </strong>funt; // вес в фунтах<br><br><strong>Console</strong>.Write( \"Вес в граммах &gt;\" );<br>gr = System. <strong>Convert </strong>.ToInt32( Console .ReadLine());<br><br>funt = gr / 459.0;<br><br><strong>Console </strong>.WriteLine(\"{0} гр = {1} ф .\", gr, funt);<br><br><strong>Console </strong>.Write( \"Press any key to continue\" );<br><strong>Console </strong>. ReadKey();<br>}</p><h3><strong>Контрольные вопросы</strong></h3><ol><li>Перечислите целые типы данных</li><li>Перечислите вещественные типы данных</li><li>Что такое \"операнд\"?</li><li>Что такое \"оператор\"?</li><li>Что можно использовать в качестве операнда выражения?</li><li>Какой тип выражения R * 3.14 ?</li><li>Какой тип и значение выражения U/R, если переменные U и R целого типа и имеют значения 15 и 6 соответственно?</li><li>Какого типа должны быть переменные I, U и R, чтобы значение выражения I = U/R было правильным?</li></ol><h3><strong>Заданиe</strong></h3><p>По аналогии с программой Конвертер, приведенной в этом уроке, напишите программу, при помощи которой можно посчитать ток в простой электрической цепи (закон Ома).<br>&nbsp;</p><h3>Источник информации:&nbsp;</h3><p><a href=\"https://dzen.ru/a/YGipQ7IHhgN54CcQ\">https://dzen.ru/a/YGipQ7IHhgN54CcQ</a>&nbsp;</p>', 'Переменные в C#', 'Переменные в C# - описание', 'Переменные в C# - ключевые слова'),
(1, 23, 'Консольный ввод/вывод в C#', '<h2><strong>Вывод на консоль</strong></h2><p>Метод WriteLine позволяет выводить на экран сообщения и значения переменных.</p><p>В простейшем случае в качестве параметра метода WriteLine можно указать строковую константу или имя переменной:</p><p>Console.WriteLine( \"Hello, World!\" );<br>Console.WriteLine(m);</p><p>В общем виде инструкция вызова метода WriteLine выглядит так:</p><p>Console .WriteLine(<i>УправляющаяСтрока</i>, <i>СписокПеременных</i> );</p><p>Параметр <i>УправляющаяСтрока</i> представляет собой строковую константу и может содержать: текст, спецификаторы формата и управляющие последовательности.</p><p>Параметр <i>СписокПеременных</i>, который может отсутствовать, если в управляющей строке нет спецификаторов формата, - это разделенные запятыми имена переменных, значения которых надо вывести в окно консоли.</p><p>Спецификатор формата, заключенный в фигурные скобки, задает переменную из списка переменных и формат ее вывода. Переменная задается путем указания ее номера в списке переменных (<strong>переменные в списке нумеруются с нуля</strong>).</p><p>Например:</p><p>инструкция</p><p><strong>Console</strong>.WriteLine ( \"{0}\", x1);</p><p>выводит на экран значение переменной x1;</p><p>инструкция</p><p><strong>Console</strong>.WriteLine ( \"{0: n } g = {1: n } lb\" , gr , fnt );</p><p>выводит значения переменных gr и fnt . Последовательности символов {0:n} и {1:n} внутри строковой константы это - спецификаторы формата. В строке, выводимой на экран, они заменяются, соответственно на значения переменных gr и fnt . Символ n указывает, что значения переменных должны быть выведены в числовом формате Numeric (при стандартной настройке Windows – с двумя цифрами после десятичного разделителя). Вид числа в формате Numeric (Числовой) определяют настройки операционной системы.</p><p>Так, например, если значение переменной gr равно 500, а значение переменной gr равно 1,10023, то на экран будет выведена строка</p><p>500,00 g = 1,10 lb</p><p>Ниже приведены некоторые, наиболее часто используемые спецификаторы форматов (параметр k задает номер переменной в списке вывода, параметр w – ширину поля вывода).</p><p><img src=\"https://avatars.dzeninfra.ru/get-zen_doc/3644947/pub_6069f045a773600090746f59_6069f45809a6b71702fcca7b/scale_1200\" alt=\"Вывод на консоль Метод WriteLine  позволяет выводить на экран сообщения и значения переменных.\"></p><p>Следует обратить внимание, компилятор не проверяет правильность строки форматирования, в том числе соответствие номеров переменных количеству переменных в списке. Ошибки в строке форматирования (например, неверная запись формата), несоответствие формата и списка переменных проявляются во время работы программы и могут приводить к возникновению исключений.</p><p>Если в строку вывода надо поместить символ, который не может быть помещен в строковую константу путем набора на клавиатуре, например символ новой строки или двойная кавычка, которая используется для ограничения в тексте программы строковых констант, то вместо этого символа следует поместить специальную последовательность символов. Специальная последовательность начинается символом обратной наклонной черты. Во время работы программы символы специальной последовательности на экран не выводятся, а выполняется действие, обозначаемое этой последовательностью.</p><p>Например, в результате выполнения инструкции</p><p><strong>Console</strong>.WriteLine (\"Microsoft\\nVisual Studio\" );</p><p>на экран будут выведены две строки текста: в первой будет написано Microsoft, во второй – Visual Studio. Последовательность символов \\n, находящаяся внутри строковой константы, это – <i>управляющая последовательность</i> , на экран она не выводиться, функция WriteLine интерпретирует ее как команду \"перевести курсор в начало следующей строки\".</p><p>Метод Write также позволяет вывести на экран строку, но в отличие от метода WritrLine после вывода строки курсор не переходит в начало следующей строки.</p><p>Метод Write удобно использовать для вывода подсказок, например:</p><p><strong>Console</strong>.Write( \"Вес в граммах &gt;\" );</p><p>По умолчанию фон экрана консоли черный, а текст, выводимый методами Write и WriteLine , – белый. Программа может, присвоив значения свойствам BackgroundColor и ForegroundColor задать, соответственно, цвет фона консоли и цвет текста. Приведенные ниже инструкции показывают, как это сделать.</p><p><strong>Console</strong>.BackgroundColor = <strong>ConsoleColor</strong>.White ;<br><strong>Console</strong>.ForegroundColor = <strong>ConsoleColor</strong>.DarkBlue;<br><strong>Console</strong>.Clear();</p><p>Обратите внимание, чтобы в начале работы программы экран окрасился установленным цветом, необходимо вызвать метод Clear().</p><h2><strong>Ввод с консоли</strong></h2><p>Наиболее просто ввести с консоли строку. Сделать это можно вызвав метод ReadLine() , например, так:</p><p>string st = <strong>Console</strong>.ReadLine();</p><p>В результате выполнения приведенной инструкции в переменную st записывается строка, набранная пользователем на клавиатуре.</p><p>Метод ReadLine работает так. Программа приостанавливает работу и ждет, пока пользователь наберет на клавиатуре строку символов и нажмет клавишу Enter. До нажатия Enter можно редактировать вводимую строку, например, нажав Backspace можно удалить последний введенный символ. После нажатия клавиши Enter метод ReadLine возвращает строку, набранную пользователем на клавиатуре.</p><p>Если надо ввести с клавиатуры численное значение, то сначала надо ввести строку, затем введенную строку при помощи соответствующей функции преобразовать строку в число. Преобразование строк в численные значения выполняют методы пространства имен System.Convert : методы ToInt 32, ToInt 64 преобразует строку, указанную в качестве параметра, в целое значение соответствующего типа; методы ToSingle и ToDouble преобразуют строку, соответственно, в значения типа Single (float ) и double .</p><p>Примеры:</p><p>// ввод вещественного значения<br><strong>Console </strong>.Write( \"Цена &gt;\" );<br>st = <strong>Console </strong>.ReadLine();<br>double price = System. <strong>Convert </strong>.ToDouble(st);</p><p>// ввод целого значения<br><strong>Console </strong>.Write( \"Количество &gt;\" );<br>st = <strong>Console </strong>.ReadLine();<br>int n = System. <strong>Convert </strong>.ToInt32(st);</p><p>Приведенные инструкции ввода можно записать и так:</p><p>// ввод вещественного значения<br><strong>Console </strong>.Write( \"Цена &gt;\" );<br>double price = System. <strong>Convert</strong> .ToDouble( <strong>Console </strong>.ReadLine());</p><p>// ввод целого значения<br><strong>Console </strong>.Write( \"Количество &gt;\" );<br>int n = System. <strong>Convert </strong>.ToInt32( <strong>Console </strong>.ReadLine());</p><p>Метод преобразования строки в численное значения возвращают результат (значение, соответствующего типа) только в том случае, <strong>если строка, указанная в качестве параметра метода, является правильным изображением числа соответствующего типа.</strong> Правильным изображением целого числа является строка, состоящая только из цифр (перед первой цифрой может быть минус), вещественного – строка, состоящая из цифр и содержащая правильный десятичный разделитель – запятую (при стандартной для России настройке операционной системы).</p><p><strong>Если в строке, указанной в качестве параметра метода преобразования, есть \"запрещенные\" символы или, если, строка пустая, то возникает исключение FormatException и, если в программе не предусмотрена обработка этого исключения, программа завершает работу.</strong></p><h2><strong>Контрольные вопросы</strong></h2><ol><li>В чем различие между методами Write и WriteLine?</li><li>Является ли инструкция<br>Console.WriteLine(\"a={1:n}\" b={2:n}, a , b);<br>правильной? Если нет, то почему?</li><li>Запишите инструкцию, которая выведет значение вещественной переменной mass с тремя знаками после десятичного разделителя.</li><li>Какой метод следует использовать для преобразования строки в целое значение?</li><li>Какой метод следует использовать для преобразования строки в вещественное значение?</li><li>Какой символ следует использовать в качестве десятичного разделителя при вводе с клавиатуры вещественного значения?</li><li>Что произойдет, если во время работы программы в ответ на запрос числа пользователь не введет число, а просто нажмет клавишу Enter?</li></ol><h2><strong>Задание</strong></h2><p>Напишите программу, которая вычисляет массу стержня (цилиндра). Размеры стержня (мм) и плотность материала (гр./см куб.) должны вводиться во время работы программы. Результат расчета - объем (в см. куб. ) и масса стержня (кг.) должны быть выведены с тремя знаками после десятичного разделителя. После численных значений должны быть указаны единицы измерения.</p><h3>Источник информации:</h3><p><a href=\"https://dzen.ru/media/id/5bbee6a6ee52f700afef1453/c-urok-4-konsolnyi-vvodvyvod-6069f045a773600090746f59?utm_referer=dzen.ru\">https://dzen.ru/media/id/5bbee6a6ee52f700afef1453/c-urok-4-konsolnyi-vvodvyvod-6069f045a773600090746f59?utm_referer=dzen.ru</a></p>', 'Консольный ввод/вывод в C#', 'Консольный ввод/вывод в C# -- описание', 'Консольный ввод/вывод в C# -- ключевые'),
(2, 1, 'Hello World!', '<p>This is a test blog, so Hello World!</p>', ' Hello World', ' Hello World - desc', ' Hello World - keywords'),
(2, 2, 'Variables', '<p>Test blog about variables</p>', 'Variables', 'Variables - desc', 'Variables - keywords'),
(2, 3, 'Hello function', '<p>Content about function</p>', 'Hello function', 'Hello function-desc', 'Hello function-keywords'),
(2, 4, 'Hello procedure', 'Content about procedure', 'Hello procedure', 'Hello procedure-desc', 'Hello procedure-keywords'),
(2, 5, 'Admin 2 Blog 1', '<p>content Admin 2 Blog 1</p>', 'Admin 2 Blog 1', 'Admin 2 Blog 1 - desc', 'Admin 2 Blog 1 - keywords'),
(2, 6, 'Admin 3 Blog 1', 'content Admin 3 Blog 1', 'Admin 3 Blog 1', 'Admin 3 Blog 1 - desc', 'Admin 3 Blog 1 - keywords'),
(2, 7, 'Admin 2 Blog 2', 'content Admin 2 Blog 2', 'Admin 2 Blog 2', 'Admin 2 Blog 2 - desc', 'Admin 2 Blog 2 - keywords'),
(2, 8, 'Admin 1 Blog 1', 'content Admin 1 Blog 1', 'Admin 1 Blog 1', 'Admin 1 Blog 1 - desc', 'Admin 1 Blog 1 - keywords'),
(2, 21, 'fdmsfm;kdsm', '<p>nkfldsd</p>', 'nkdfsfnlkdsn', 'nfldslkfnk', 'fndslkn'),
(2, 22, 'Variables in C#', '<p>sss</p>', 'Variables in C#', 'Variables in C# -- desc', 'Variables in C# -- keywords'),
(2, 23, 'Console in/out in C#', '<p>Console in/out in C# – content</p>', 'Console in/out in C#', 'Console in/out in C# -- desc', 'Console in/out in C# -- keywords');

-- --------------------------------------------------------

--
-- Структура таблицы `CategoryProg`
--

CREATE TABLE `CategoryProg` (
  `ID` int(10) UNSIGNED NOT NULL,
  `Parent_ID` int(11) NOT NULL DEFAULT 0,
  `Color` varchar(7) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `CategoryProg`
--

INSERT INTO `CategoryProg` (`ID`, `Parent_ID`, `Color`) VALUES
(1, 0, '#ffffff'),
(2, 0, '#777777'),
(3, 1, '#999999'),
(4, 1, '#888888'),
(5, 2, '#222222');

-- --------------------------------------------------------

--
-- Структура таблицы `CategoryProg_Description`
--

CREATE TABLE `CategoryProg_Description` (
  `Language_ID` int(10) UNSIGNED NOT NULL,
  `CategoryProg_ID` int(10) UNSIGNED NOT NULL,
  `Title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `CategoryProg_Description`
--

INSERT INTO `CategoryProg_Description` (`Language_ID`, `CategoryProg_ID`, `Title`) VALUES
(1, 1, 'Веб разработчик'),
(1, 2, 'Мобильный разработчик'),
(1, 3, 'Frontend разработчик'),
(1, 4, 'Backend разработчик'),
(1, 5, 'Android разработчик'),
(2, 1, 'Web developer'),
(2, 2, 'Mobile developer'),
(2, 3, 'Frontend developer'),
(2, 4, 'Backend developer'),
(2, 5, 'Android developer');

-- --------------------------------------------------------

--
-- Структура таблицы `Challenge`
--

CREATE TABLE `Challenge` (
  `ID` int(10) UNSIGNED NOT NULL,
  `User_ID` int(10) UNSIGNED NOT NULL,
  `Slug` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `PathCode` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `NumOfInputData` int(10) UNSIGNED NOT NULL,
  `DateOfPublication` date NOT NULL,
  `Status` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ForCourse` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `Challenge`
--

INSERT INTO `Challenge` (`ID`, `User_ID`, `Slug`, `PathCode`, `NumOfInputData`, `DateOfPublication`, `Status`, `ForCourse`) VALUES
(1, 1, 'find-the-area-of-the-triangle', '/public/project/challenge/find-the-area-of-the-triangle', 2, '2023-05-10', 'Опубликован', 0);

-- --------------------------------------------------------

--
-- Структура таблицы `Challenge_CategoryLangProg`
--

CREATE TABLE `Challenge_CategoryLangProg` (
  `CategoryProg_ID` int(10) UNSIGNED NOT NULL,
  `LangProg_ID` int(10) UNSIGNED NOT NULL,
  `Challenge_ID` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `Challenge_CategoryLangProg`
--

INSERT INTO `Challenge_CategoryLangProg` (`CategoryProg_ID`, `LangProg_ID`, `Challenge_ID`) VALUES
(3, 2, 1);

-- --------------------------------------------------------

--
-- Структура таблицы `Challenge_Description`
--

CREATE TABLE `Challenge_Description` (
  `Language_ID` int(10) UNSIGNED NOT NULL,
  `Challenge_ID` int(10) UNSIGNED NOT NULL,
  `Heading` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Content` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `Title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Description` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Keywords` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `Challenge_Description`
--

INSERT INTO `Challenge_Description` (`Language_ID`, `Challenge_ID`, `Heading`, `Content`, `Title`, `Description`, `Keywords`) VALUES
(1, 1, 'Найти площадь треугольника', 'найти площадь треугольника по высоте и его основанию', 'Найти площадь треугольника', 'найти площадь треугольника - описание', 'найти площадь треугольника - ключевые'),
(2, 1, 'Find the area of the triangle', 'find the area of the triangle in height and its base', 'Find the area of the triangle', 'Find the area of the triangle - desc', 'Find the area of the triangle - keywords');

-- --------------------------------------------------------

--
-- Структура таблицы `Course`
--

CREATE TABLE `Course` (
  `ID` int(10) UNSIGNED NOT NULL,
  `User_ID` int(10) UNSIGNED NOT NULL,
  `Slug` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Icon` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Difficulty` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `DateOfPublication` date DEFAULT NULL,
  `Status` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `Course`
--

INSERT INTO `Course` (`ID`, `User_ID`, `Slug`, `Icon`, `Difficulty`, `DateOfPublication`, `Status`) VALUES
(1, 1, 'getting-started-in-javascript', '/public/uploads/course/getting-started-in-javascript.svg', 'junior', '2023-05-12', 'Опубликован');

-- --------------------------------------------------------

--
-- Структура таблицы `Course_CategoryLangProg`
--

CREATE TABLE `Course_CategoryLangProg` (
  `Course_ID` int(10) UNSIGNED NOT NULL,
  `LangProg_ID` int(10) UNSIGNED NOT NULL,
  `CategoryProg_ID` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `Course_CategoryLangProg`
--

INSERT INTO `Course_CategoryLangProg` (`Course_ID`, `LangProg_ID`, `CategoryProg_ID`) VALUES
(1, 2, 3);

-- --------------------------------------------------------

--
-- Структура таблицы `Course_Challenge`
--

CREATE TABLE `Course_Challenge` (
  `Course_ID` int(10) UNSIGNED NOT NULL,
  `Challenge_ID` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `Course_Challenge`
--

INSERT INTO `Course_Challenge` (`Course_ID`, `Challenge_ID`) VALUES
(1, 1);

-- --------------------------------------------------------

--
-- Структура таблицы `Course_Description`
--

CREATE TABLE `Course_Description` (
  `Language_ID` int(10) UNSIGNED NOT NULL,
  `Course_ID` int(10) UNSIGNED NOT NULL,
  `Heading` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Excerpt` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Description` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Keywords` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `Course_Description`
--

INSERT INTO `Course_Description` (`Language_ID`, `Course_ID`, `Heading`, `Excerpt`, `Title`, `Description`, `Keywords`) VALUES
(1, 1, 'Начало работы в javascript', 'Сделайте свои первые шаги в javascript', 'Начало работы в javascript', 'Начало работы в javascript - описание', 'Начало работы в javascript - ключевые'),
(2, 1, 'Getting started in javascript', 'Take your first steps in javascript', 'Getting started in javascript', 'Getting started in javascript - desc', 'Getting started in javascript - keywords');

-- --------------------------------------------------------

--
-- Структура таблицы `Documentation`
--

CREATE TABLE `Documentation` (
  `ID` int(10) UNSIGNED NOT NULL,
  `LangProg_ID` int(10) UNSIGNED NOT NULL,
  `Parent_ID` int(11) NOT NULL DEFAULT 0,
  `Slug` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `DateOfPublication` date DEFAULT NULL,
  `Status` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `Documentation`
--

INSERT INTO `Documentation` (`ID`, `LangProg_ID`, `Parent_ID`, `Slug`, `DateOfPublication`, `Status`) VALUES
(3, 2, 0, 'about-js', '2023-05-12', 'Опубликован'),
(4, 2, 1, 'variables-in-js', '2023-05-11', 'Опубликован');

-- --------------------------------------------------------

--
-- Структура таблицы `Documentation_Description`
--

CREATE TABLE `Documentation_Description` (
  `Language_ID` int(10) UNSIGNED NOT NULL,
  `Documentation_ID` int(10) UNSIGNED NOT NULL,
  `Heading` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Content` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `CategoryTitle` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Description` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Keywords` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `Documentation_Description`
--

INSERT INTO `Documentation_Description` (`Language_ID`, `Documentation_ID`, `Heading`, `Content`, `CategoryTitle`, `Title`, `Description`, `Keywords`) VALUES
(1, 3, 'Расскажем о JavaScript', 'Текст, где рассказывается про JavaScript', 'Начало работы', 'Начало работы', 'Начало работы - описание', 'Начало работы - ключевые'),
(2, 3, 'Let\'s talk about JavaScript', 'The text that tells about JavaScript', 'Getting started', 'Getting started', 'Getting started - desc', 'Getting started - keywords');

-- --------------------------------------------------------

--
-- Структура таблицы `Forum`
--

CREATE TABLE `Forum` (
  `ID` int(10) UNSIGNED NOT NULL,
  `User_ID` int(10) UNSIGNED NOT NULL,
  `Slug` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Heading` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Content` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `Status` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `DateOfPublication` date NOT NULL,
  `Title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Description` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Keywords` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `Forum`
--

INSERT INTO `Forum` (`ID`, `User_ID`, `Slug`, `Heading`, `Content`, `Status`, `DateOfPublication`, `Title`, `Description`, `Keywords`) VALUES
(1, 2, 'how-to-find-the-area-of-a-triangle', 'Как найти площадь треугольника', 'Нужна помощь!!! Не понимаю как найти площадь треугольника по основанию и его высоте', 'Опубликован', '2023-05-12', 'Как найти площадь треугольника', 'Как найти площадь треугольника - описание', 'Как найти площадь треугольника - ключевые');

-- --------------------------------------------------------

--
-- Структура таблицы `ForumCategory`
--

CREATE TABLE `ForumCategory` (
  `ID` int(10) UNSIGNED NOT NULL,
  `Parent_ID` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `ForumCategory`
--

INSERT INTO `ForumCategory` (`ID`, `Parent_ID`) VALUES
(1, 0),
(2, 1),
(3, 0);

-- --------------------------------------------------------

--
-- Структура таблицы `ForumCategory_Description`
--

CREATE TABLE `ForumCategory_Description` (
  `Language_ID` int(10) UNSIGNED NOT NULL,
  `ForumCategory_ID` int(10) UNSIGNED NOT NULL,
  `Title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `ForumCategory_Description`
--

INSERT INTO `ForumCategory_Description` (`Language_ID`, `ForumCategory_ID`, `Title`) VALUES
(1, 1, 'JavaScript'),
(1, 2, 'JavaScript для начинающих'),
(2, 1, 'JavaScript'),
(2, 2, 'JavaScript for beginners');

-- --------------------------------------------------------

--
-- Структура таблицы `ForumResponse`
--

CREATE TABLE `ForumResponse` (
  `ID` int(10) UNSIGNED NOT NULL,
  `Forum_ID` int(10) UNSIGNED NOT NULL,
  `User_ID` int(10) UNSIGNED NOT NULL,
  `Parent_ID` int(11) NOT NULL DEFAULT 0,
  `Content` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `DateOfPublication` date NOT NULL,
  `Like_Mark` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `ForumResponse`
--

INSERT INTO `ForumResponse` (`ID`, `Forum_ID`, `User_ID`, `Parent_ID`, `Content`, `DateOfPublication`, `Like_Mark`) VALUES
(1, 1, 1, 0, 'Чтобы найти площадь треугольника, нужно его основание умножить на высоту и разделить на 2 (либо умножить на 0,5)', '2023-05-11', 1),
(2, 1, 2, 1, 'Сработало! Спасибо!', '2023-05-12', 0);

-- --------------------------------------------------------

--
-- Структура таблицы `Forum_ForumCategory`
--

CREATE TABLE `Forum_ForumCategory` (
  `ForumCategory_ID` int(10) UNSIGNED NOT NULL,
  `Forum_ID` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `Forum_ForumCategory`
--

INSERT INTO `Forum_ForumCategory` (`ForumCategory_ID`, `Forum_ID`) VALUES
(2, 1);

-- --------------------------------------------------------

--
-- Структура таблицы `InputOutputData_Challenge`
--

CREATE TABLE `InputOutputData_Challenge` (
  `ID` int(10) UNSIGNED NOT NULL,
  `Challenge_ID` int(10) UNSIGNED NOT NULL,
  `InputData` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`InputData`)),
  `OutputData` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `InputOutputData_Challenge`
--

INSERT INTO `InputOutputData_Challenge` (`ID`, `Challenge_ID`, `InputData`, `OutputData`) VALUES
(1, 1, '{\"a\": 10,\"b\": 2}', 10),
(2, 1, '{\"a\": 20, \"b\": 10}', 100);

-- --------------------------------------------------------

--
-- Структура таблицы `LangProg`
--

CREATE TABLE `LangProg` (
  `ID` int(10) UNSIGNED NOT NULL,
  `Title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Icon` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Color` varchar(7) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `LangProg`
--

INSERT INTO `LangProg` (`ID`, `Title`, `Icon`, `Color`) VALUES
(1, 'Java', '/public/uploads/java.svg', '#444444'),
(2, 'JS', '/public/uploads/js.svg', '#888888'),
(3, 'C#', 'public/uploads/c#.svg', '#ffffff'),
(4, 'C++', 'public/uploads/c++.svg', '#ffffff'),
(5, 'PHP', 'public/uploads/php.svg', '#ffffff');

-- --------------------------------------------------------

--
-- Структура таблицы `Language`
--

CREATE TABLE `Language` (
  `ID` int(10) UNSIGNED NOT NULL,
  `Title` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Code` varchar(4) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Base` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `Language`
--

INSERT INTO `Language` (`ID`, `Title`, `Code`, `Base`) VALUES
(1, 'Русский', 'ru', 1),
(2, 'English', 'en', 0);

-- --------------------------------------------------------

--
-- Структура таблицы `Project`
--

CREATE TABLE `Project` (
  `ID` int(11) UNSIGNED NOT NULL,
  `User_ID` int(10) UNSIGNED NOT NULL,
  `Title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `PathProject` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `DateOfPublication` date NOT NULL,
  `Private` tinyint(1) NOT NULL DEFAULT 1,
  `Description` text COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `Project`
--

INSERT INTO `Project` (`ID`, `User_ID`, `Title`, `PathProject`, `DateOfPublication`, `Private`, `Description`) VALUES
(1, 2, 'Найти площадь треугольника', '/public/project/user/find-the-area-of-the-triangle', '2023-05-12', 0, 'Программа для поиска площади треугольника по основанию и его высоте.');

-- --------------------------------------------------------

--
-- Структура таблицы `Project_LangProg`
--

CREATE TABLE `Project_LangProg` (
  `LangProg_ID` int(10) UNSIGNED NOT NULL,
  `Project_ID` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `Project_LangProg`
--

INSERT INTO `Project_LangProg` (`LangProg_ID`, `Project_ID`) VALUES
(2, 1);

-- --------------------------------------------------------

--
-- Структура таблицы `Session`
--

CREATE TABLE `Session` (
  `ID` int(10) UNSIGNED NOT NULL,
  `User_ID` int(10) UNSIGNED NOT NULL,
  `TypeDevice` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Country_Address` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `City_Address` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `DateOfLastSession` date NOT NULL,
  `IP-Address` varchar(15) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `Session`
--

INSERT INTO `Session` (`ID`, `User_ID`, `TypeDevice`, `Country_Address`, `City_Address`, `DateOfLastSession`, `IP-Address`) VALUES
(1, 2, 'Opera GX, Laptop', 'Russia', 'Moskow', '2023-05-12', '20.100.26.200');

-- --------------------------------------------------------

--
-- Структура таблицы `StageCourse`
--

CREATE TABLE `StageCourse` (
  `ID` int(10) UNSIGNED NOT NULL,
  `Course_ID` int(10) UNSIGNED NOT NULL,
  `NumStage` int(10) UNSIGNED NOT NULL,
  `Icon` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `StageCourse`
--

INSERT INTO `StageCourse` (`ID`, `Course_ID`, `NumStage`, `Icon`) VALUES
(1, 1, 1, '/public/uploads/course/js1.svg'),
(2, 1, 2, '/public/uploads/course/js2.svg');

-- --------------------------------------------------------

--
-- Структура таблицы `StageCourse_Description`
--

CREATE TABLE `StageCourse_Description` (
  `Language_ID` int(10) UNSIGNED NOT NULL,
  `StageCourse_ID` int(10) UNSIGNED NOT NULL,
  `Title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `StageCourse_Description`
--

INSERT INTO `StageCourse_Description` (`Language_ID`, `StageCourse_ID`, `Title`) VALUES
(1, 1, 'Начало работы в js'),
(1, 2, 'Переменные в js'),
(2, 1, 'Getting started in js'),
(2, 2, 'Variables in js');

-- --------------------------------------------------------

--
-- Структура таблицы `StepCourse`
--

CREATE TABLE `StepCourse` (
  `ID` int(10) UNSIGNED NOT NULL,
  `StageCourse_ID` int(10) UNSIGNED NOT NULL,
  `NumStep` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `StepCourse`
--

INSERT INTO `StepCourse` (`ID`, `StageCourse_ID`, `NumStep`) VALUES
(1, 1, 1),
(2, 1, 2),
(3, 2, 1),
(4, 2, 2);

-- --------------------------------------------------------

--
-- Структура таблицы `StepCourse_Description`
--

CREATE TABLE `StepCourse_Description` (
  `Language_ID` int(10) UNSIGNED NOT NULL,
  `StepCourse_ID` int(10) UNSIGNED NOT NULL,
  `Title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `StepCourse_Description`
--

INSERT INTO `StepCourse_Description` (`Language_ID`, `StepCourse_ID`, `Title`) VALUES
(1, 1, 'Чем является JavaScript?'),
(1, 2, 'Чем является JavaScript?'),
(1, 3, 'Переменные в js'),
(1, 4, 'Какие переменные в JavaScript?'),
(2, 1, 'What is JavaScript?'),
(2, 2, 'What is JavaScript?'),
(2, 3, 'Variables in js'),
(2, 4, 'Variables in JSK What variables in JavaScript?');

-- --------------------------------------------------------

--
-- Структура таблицы `TypeStepCourse`
--

CREATE TABLE `TypeStepCourse` (
  `ID` int(10) UNSIGNED NOT NULL,
  `Title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Code` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `TypeStepCourse`
--

INSERT INTO `TypeStepCourse` (`ID`, `Title`, `Code`) VALUES
(1, 'Теория', 'theory'),
(2, 'Ввод данных', 'input-data'),
(3, 'Несколько правильных ответов из многих', 'few-answer'),
(4, 'Один правильный ответ из многих', 'one-answer');

-- --------------------------------------------------------

--
-- Структура таблицы `TypeStepCourse_Description`
--

CREATE TABLE `TypeStepCourse_Description` (
  `TypeStepCourse_ID` int(10) UNSIGNED NOT NULL,
  `Language_ID` int(10) UNSIGNED NOT NULL,
  `Course_ID` int(10) UNSIGNED NOT NULL,
  `StageCourse_ID` int(10) UNSIGNED NOT NULL,
  `StepCourse_ID` int(10) UNSIGNED NOT NULL,
  `AnswerOption` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`AnswerOption`)),
  `RigthAnswer` text COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `TypeStepCourse_Description`
--

INSERT INTO `TypeStepCourse_Description` (`TypeStepCourse_ID`, `Language_ID`, `Course_ID`, `StageCourse_ID`, `StepCourse_ID`, `AnswerOption`, `RigthAnswer`) VALUES
(1, 1, 1, 1, 1, NULL, 'JavaScript - это язык программирования, который в первую очередь применяют в вебе. С его помощью сайты делают интерактивными: добавляют всплывающие окна, анимацию, кнопки лайков и формы для отправки информации. Его ещё называют главным языком фронтенда — «лицевой» стороны сайта, с которой взаимодействуют пользователи.'),
(4, 1, 1, 1, 2, '{\"1\": \"Скриптовый язык\",\"2\": \"Язык программирования\",\"3\": \"Язык разметки\"}', '2'),
(1, 1, 1, 2, 3, NULL, 'В JavaScript переменные создаются через ключевое слово let или var. В нынешнем времени и стандарте ES6 используется let, так как var имеет несколько недочетов.'),
(3, 1, 1, 2, 4, '{\"1\": \"let a = 8\",\"2\": \"var b = 10\",\"3\": \"b int = 20\",\"4\": \"js var = 4\"}', '1,2'),
(1, 2, 1, 1, 1, NULL, 'JavaScript is a programming language that is primarily used on the web. With its help, websites are made interactive: pop-ups, animations, like buttons and forms for sending information are added. It is also called the main language of the frontend — the \"front\" side of the site with which users interact.'),
(4, 2, 1, 1, 2, '{\"1\": \"Scripting language\",\"2\": \"Programming Language\",\"3\": \"Markup Language\"}', '2'),
(1, 2, 1, 2, 3, NULL, 'In JavaScript, variables are created using the let or var keyword. In the current time and the ES6 standard, let is used, since var has several shortcomings.'),
(3, 2, 1, 2, 4, '{\"1\": \"let a = 8\",\"2\": \"var b = 10\",\"3\": \"b int = 20\",\"4\": \"js var = 4\"}', '1,2');

-- --------------------------------------------------------

--
-- Структура таблицы `User`
--

CREATE TABLE `User` (
  `id` int(10) UNSIGNED NOT NULL,
  `Username` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Mail` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `SecondMail` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Avatar_img` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Heading_img` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `AboutUser` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `LastName` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `FirstName` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Country_Address` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `DateOfRegistration` date NOT NULL DEFAULT current_timestamp(),
  `MBForProject` int(10) UNSIGNED NOT NULL DEFAULT 50,
  `ConsecutiveDays` int(10) UNSIGNED NOT NULL DEFAULT 1,
  `AllProfile_Private` tinyint(1) NOT NULL DEFAULT 0,
  `PersonalInfo_Private` tinyint(1) NOT NULL DEFAULT 0,
  `LookCurrentCourse_Private` tinyint(1) NOT NULL DEFAULT 0,
  `Role` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'user'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `User`
--

INSERT INTO `User` (`id`, `Username`, `Mail`, `SecondMail`, `password`, `Avatar_img`, `Heading_img`, `AboutUser`, `LastName`, `FirstName`, `Country_Address`, `DateOfRegistration`, `MBForProject`, `ConsecutiveDays`, `AllProfile_Private`, `PersonalInfo_Private`, `LookCurrentCourse_Private`, `Role`) VALUES
(1, 'admin1', 'admin1@mail.ru', 'admin1@second.ru', '12345', '/public/uploads/ava1.jpg', '/public/uploads/head1.jpg', 'Первый админ', 'First', 'Admin', 'Россия', '2023-02-01', 50, 1, 1, 1, 1, 'admin'),
(2, 'user1', 'user1@mail.ru', 'user1@second.ru', '12345', '/public/uploads/ava1.jpg', '/public/uploads/head1.jpg', 'Первый пользователь', 'First', 'User', 'Россия', '2023-05-10', 50, 1, 0, 0, 0, 'user'),
(3, 'admin2', 'admin2@mail.ru', 'admin2@secondmail.ru', '12345', '/public/uploads/ava2.jpg', '/public/uploads/heading2.jpg', 'это второй админ', 'второй', 'админ', 'Россия', '2023-05-17', 50, 5, 1, 1, 1, 'admin'),
(4, 'admin3\r\n', 'admin3@mail.ru', 'admin3@secondmail.ru', '12345', '/public/uploads/ava2.jpg', '/public/uploads/heading2.jpg', 'это третий админ\r\n', 'третий', 'админ', 'Россия', '2023-05-17', 50, 1, 1, 1, 1, 'admin'),
(5, 'user2', 'user2@mail.ru', 'user2@secondmail.ru', '12345', '/public/uploads/ava2.jpg', '/public/uploads/heading2.jpg', 'это второй пользователь', 'второй', 'пользователь', 'Россия', '2023-05-12', 50, 10, 1, 1, 0, 'user'),
(6, 'user3', 'user3@mail.ru', 'user3@secondmail.ru', '12345', '/public/uploads/ava2.jpg', '/public/uploads/heading2.jpg', 'это третий пользователь\r\n', 'третий', 'пользователь', 'Россия', '2023-05-15', 200, 2, 0, 1, 0, 'user'),
(7, 'user4', 'user4@mail.ru', 'user4@secondmail.ru', '12345', '/public/uploads/ava2.jpg', '/public/uploads/heading2.jpg', 'это четвертый пользователь', 'четвертый', 'пользователь', 'Россия', '2023-05-20', 50, 2, 0, 1, 0, 'user'),
(9, 's', 's@mail.ru', 's@mail.ru', 's', 's', NULL, 's', 's', 's', 's', '2023-06-21', 50, 1, 1, 0, 0, 'user');

-- --------------------------------------------------------

--
-- Структура таблицы `User_Achievement`
--

CREATE TABLE `User_Achievement` (
  `User_ID` int(11) UNSIGNED NOT NULL,
  `Achievement_ID` int(11) UNSIGNED NOT NULL,
  `Progress` int(11) NOT NULL DEFAULT 0,
  `MaxProgress` int(10) UNSIGNED NOT NULL,
  `DateOfReciept` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `User_Achievement`
--

INSERT INTO `User_Achievement` (`User_ID`, `Achievement_ID`, `Progress`, `MaxProgress`, `DateOfReciept`) VALUES
(2, 1, 1, 1, '2023-05-10'),
(2, 2, 2, 3, NULL);

-- --------------------------------------------------------

--
-- Структура таблицы `User_Challenge`
--

CREATE TABLE `User_Challenge` (
  `User_ID` int(10) UNSIGNED NOT NULL,
  `Challenge_ID` int(10) UNSIGNED NOT NULL,
  `Success` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `User_Challenge`
--

INSERT INTO `User_Challenge` (`User_ID`, `Challenge_ID`, `Success`) VALUES
(2, 1, 0);

-- --------------------------------------------------------

--
-- Структура таблицы `User_Course`
--

CREATE TABLE `User_Course` (
  `User_ID` int(10) UNSIGNED NOT NULL,
  `Course_ID` int(10) UNSIGNED NOT NULL,
  `Success` tinyint(1) NOT NULL DEFAULT 0,
  `CurrentStep` int(11) NOT NULL,
  `CurrentStage` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `User_Course`
--

INSERT INTO `User_Course` (`User_ID`, `Course_ID`, `Success`, `CurrentStep`, `CurrentStage`) VALUES
(2, 1, 0, 2, 2);

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `Achievement`
--
ALTER TABLE `Achievement`
  ADD PRIMARY KEY (`ID`);

--
-- Индексы таблицы `Achievement_Description`
--
ALTER TABLE `Achievement_Description`
  ADD PRIMARY KEY (`Language_ID`,`Achievement_ID`),
  ADD KEY `Achievement_ID` (`Achievement_ID`);

--
-- Индексы таблицы `Blog`
--
ALTER TABLE `Blog`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UniqueSlug` (`slug`),
  ADD KEY `blog_user` (`user_id`);

--
-- Индексы таблицы `BlogCategory`
--
ALTER TABLE `BlogCategory`
  ADD PRIMARY KEY (`ID`);

--
-- Индексы таблицы `BlogCategory_Description`
--
ALTER TABLE `BlogCategory_Description`
  ADD PRIMARY KEY (`Language_ID`,`BlogCategory_ID`),
  ADD KEY `BlogCategory_ID` (`BlogCategory_ID`);

--
-- Индексы таблицы `BlogMark`
--
ALTER TABLE `BlogMark`
  ADD PRIMARY KEY (`blog_id`,`user_id`),
  ADD KEY `user_mark` (`user_id`);

--
-- Индексы таблицы `BlogResponse`
--
ALTER TABLE `BlogResponse`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `Blog_ID` (`Blog_ID`),
  ADD KEY `User_ID` (`User_ID`);

--
-- Индексы таблицы `Blog_BlogCategory`
--
ALTER TABLE `Blog_BlogCategory`
  ADD PRIMARY KEY (`Blog_ID`,`BlogCategory_ID`),
  ADD KEY `BlogCategory_ID` (`BlogCategory_ID`);

--
-- Индексы таблицы `Blog_Description`
--
ALTER TABLE `Blog_Description`
  ADD PRIMARY KEY (`Language_ID`,`Blog_ID`),
  ADD KEY `blog_description_ibfk_2` (`Blog_ID`);

--
-- Индексы таблицы `CategoryProg`
--
ALTER TABLE `CategoryProg`
  ADD PRIMARY KEY (`ID`);

--
-- Индексы таблицы `CategoryProg_Description`
--
ALTER TABLE `CategoryProg_Description`
  ADD PRIMARY KEY (`Language_ID`,`CategoryProg_ID`),
  ADD KEY `CategoryProg_ID` (`CategoryProg_ID`);

--
-- Индексы таблицы `Challenge`
--
ALTER TABLE `Challenge`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `User_ID` (`User_ID`);

--
-- Индексы таблицы `Challenge_CategoryLangProg`
--
ALTER TABLE `Challenge_CategoryLangProg`
  ADD PRIMARY KEY (`CategoryProg_ID`,`LangProg_ID`,`Challenge_ID`),
  ADD KEY `Challenge_ID` (`Challenge_ID`),
  ADD KEY `LangProg_ID` (`LangProg_ID`);

--
-- Индексы таблицы `Challenge_Description`
--
ALTER TABLE `Challenge_Description`
  ADD PRIMARY KEY (`Language_ID`,`Challenge_ID`),
  ADD KEY `Challenge_ID` (`Challenge_ID`);

--
-- Индексы таблицы `Course`
--
ALTER TABLE `Course`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `User_ID` (`User_ID`);

--
-- Индексы таблицы `Course_CategoryLangProg`
--
ALTER TABLE `Course_CategoryLangProg`
  ADD PRIMARY KEY (`Course_ID`,`LangProg_ID`,`CategoryProg_ID`),
  ADD KEY `CategoryProg_ID` (`CategoryProg_ID`),
  ADD KEY `LangProg_ID` (`LangProg_ID`);

--
-- Индексы таблицы `Course_Challenge`
--
ALTER TABLE `Course_Challenge`
  ADD PRIMARY KEY (`Course_ID`,`Challenge_ID`),
  ADD KEY `Challenge_ID` (`Challenge_ID`);

--
-- Индексы таблицы `Course_Description`
--
ALTER TABLE `Course_Description`
  ADD PRIMARY KEY (`Language_ID`,`Course_ID`),
  ADD KEY `Course_ID` (`Course_ID`);

--
-- Индексы таблицы `Documentation`
--
ALTER TABLE `Documentation`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `LangProg_ID` (`LangProg_ID`);

--
-- Индексы таблицы `Documentation_Description`
--
ALTER TABLE `Documentation_Description`
  ADD PRIMARY KEY (`Language_ID`,`Documentation_ID`),
  ADD KEY `Documentation_ID` (`Documentation_ID`);

--
-- Индексы таблицы `Forum`
--
ALTER TABLE `Forum`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `User_ID` (`User_ID`);

--
-- Индексы таблицы `ForumCategory`
--
ALTER TABLE `ForumCategory`
  ADD PRIMARY KEY (`ID`);

--
-- Индексы таблицы `ForumCategory_Description`
--
ALTER TABLE `ForumCategory_Description`
  ADD PRIMARY KEY (`Language_ID`,`ForumCategory_ID`),
  ADD KEY `ForumCategory_ID` (`ForumCategory_ID`);

--
-- Индексы таблицы `ForumResponse`
--
ALTER TABLE `ForumResponse`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `Forum_ID` (`Forum_ID`),
  ADD KEY `User_ID` (`User_ID`);

--
-- Индексы таблицы `Forum_ForumCategory`
--
ALTER TABLE `Forum_ForumCategory`
  ADD PRIMARY KEY (`ForumCategory_ID`,`Forum_ID`),
  ADD KEY `Forum_ID` (`Forum_ID`);

--
-- Индексы таблицы `InputOutputData_Challenge`
--
ALTER TABLE `InputOutputData_Challenge`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `Challenge_ID` (`Challenge_ID`);

--
-- Индексы таблицы `LangProg`
--
ALTER TABLE `LangProg`
  ADD PRIMARY KEY (`ID`);

--
-- Индексы таблицы `Language`
--
ALTER TABLE `Language`
  ADD PRIMARY KEY (`ID`);

--
-- Индексы таблицы `Project`
--
ALTER TABLE `Project`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `User_ID` (`User_ID`);

--
-- Индексы таблицы `Project_LangProg`
--
ALTER TABLE `Project_LangProg`
  ADD PRIMARY KEY (`LangProg_ID`,`Project_ID`),
  ADD KEY `Project_ID` (`Project_ID`);

--
-- Индексы таблицы `Session`
--
ALTER TABLE `Session`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `User_ID` (`User_ID`);

--
-- Индексы таблицы `StageCourse`
--
ALTER TABLE `StageCourse`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `Course_ID` (`Course_ID`);

--
-- Индексы таблицы `StageCourse_Description`
--
ALTER TABLE `StageCourse_Description`
  ADD PRIMARY KEY (`Language_ID`,`StageCourse_ID`),
  ADD KEY `StageCourse_ID` (`StageCourse_ID`);

--
-- Индексы таблицы `StepCourse`
--
ALTER TABLE `StepCourse`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `StageCourse_ID` (`StageCourse_ID`);

--
-- Индексы таблицы `StepCourse_Description`
--
ALTER TABLE `StepCourse_Description`
  ADD PRIMARY KEY (`Language_ID`,`StepCourse_ID`),
  ADD KEY `StepCourse_ID` (`StepCourse_ID`);

--
-- Индексы таблицы `TypeStepCourse`
--
ALTER TABLE `TypeStepCourse`
  ADD PRIMARY KEY (`ID`);

--
-- Индексы таблицы `TypeStepCourse_Description`
--
ALTER TABLE `TypeStepCourse_Description`
  ADD PRIMARY KEY (`Language_ID`,`Course_ID`,`StageCourse_ID`,`StepCourse_ID`),
  ADD KEY `Course_ID` (`Course_ID`),
  ADD KEY `StageCourse_ID` (`StageCourse_ID`),
  ADD KEY `StepCourse_ID` (`StepCourse_ID`);

--
-- Индексы таблицы `User`
--
ALTER TABLE `User`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UniqueMail` (`Mail`) USING BTREE;

--
-- Индексы таблицы `User_Achievement`
--
ALTER TABLE `User_Achievement`
  ADD PRIMARY KEY (`User_ID`,`Achievement_ID`),
  ADD KEY `Achievement_ID` (`Achievement_ID`);

--
-- Индексы таблицы `User_Challenge`
--
ALTER TABLE `User_Challenge`
  ADD PRIMARY KEY (`User_ID`,`Challenge_ID`),
  ADD KEY `Challenge_ID` (`Challenge_ID`);

--
-- Индексы таблицы `User_Course`
--
ALTER TABLE `User_Course`
  ADD PRIMARY KEY (`User_ID`,`Course_ID`),
  ADD KEY `Course_ID` (`Course_ID`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `Achievement`
--
ALTER TABLE `Achievement`
  MODIFY `ID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT для таблицы `Blog`
--
ALTER TABLE `Blog`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT для таблицы `BlogCategory`
--
ALTER TABLE `BlogCategory`
  MODIFY `ID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT для таблицы `BlogResponse`
--
ALTER TABLE `BlogResponse`
  MODIFY `ID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT для таблицы `CategoryProg`
--
ALTER TABLE `CategoryProg`
  MODIFY `ID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT для таблицы `Challenge`
--
ALTER TABLE `Challenge`
  MODIFY `ID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT для таблицы `Course`
--
ALTER TABLE `Course`
  MODIFY `ID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT для таблицы `Documentation`
--
ALTER TABLE `Documentation`
  MODIFY `ID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT для таблицы `Forum`
--
ALTER TABLE `Forum`
  MODIFY `ID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT для таблицы `ForumCategory`
--
ALTER TABLE `ForumCategory`
  MODIFY `ID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT для таблицы `ForumResponse`
--
ALTER TABLE `ForumResponse`
  MODIFY `ID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT для таблицы `InputOutputData_Challenge`
--
ALTER TABLE `InputOutputData_Challenge`
  MODIFY `ID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT для таблицы `Language`
--
ALTER TABLE `Language`
  MODIFY `ID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT для таблицы `Project`
--
ALTER TABLE `Project`
  MODIFY `ID` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT для таблицы `Session`
--
ALTER TABLE `Session`
  MODIFY `ID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT для таблицы `StageCourse`
--
ALTER TABLE `StageCourse`
  MODIFY `ID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT для таблицы `StepCourse`
--
ALTER TABLE `StepCourse`
  MODIFY `ID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT для таблицы `TypeStepCourse`
--
ALTER TABLE `TypeStepCourse`
  MODIFY `ID` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT для таблицы `User`
--
ALTER TABLE `User`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `Achievement_Description`
--
ALTER TABLE `Achievement_Description`
  ADD CONSTRAINT `achievement_description_ibfk_1` FOREIGN KEY (`Language_ID`) REFERENCES `Language` (`ID`),
  ADD CONSTRAINT `achievement_description_ibfk_2` FOREIGN KEY (`Achievement_ID`) REFERENCES `Achievement` (`ID`);

--
-- Ограничения внешнего ключа таблицы `Blog`
--
ALTER TABLE `Blog`
  ADD CONSTRAINT `blog_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `User` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `blog_user` FOREIGN KEY (`user_id`) REFERENCES `User` (`id`) ON DELETE CASCADE;

--
-- Ограничения внешнего ключа таблицы `BlogCategory_Description`
--
ALTER TABLE `BlogCategory_Description`
  ADD CONSTRAINT `blogcategory_description_ibfk_1` FOREIGN KEY (`BlogCategory_ID`) REFERENCES `BlogCategory` (`ID`),
  ADD CONSTRAINT `blogcategory_description_ibfk_2` FOREIGN KEY (`Language_ID`) REFERENCES `Language` (`ID`);

--
-- Ограничения внешнего ключа таблицы `BlogMark`
--
ALTER TABLE `BlogMark`
  ADD CONSTRAINT `blog_mark` FOREIGN KEY (`blog_id`) REFERENCES `Blog` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `user_mark` FOREIGN KEY (`user_id`) REFERENCES `User` (`id`) ON DELETE CASCADE;

--
-- Ограничения внешнего ключа таблицы `BlogResponse`
--
ALTER TABLE `BlogResponse`
  ADD CONSTRAINT `blogresponse_ibfk_1` FOREIGN KEY (`Blog_ID`) REFERENCES `Blog` (`id`),
  ADD CONSTRAINT `blogresponse_ibfk_2` FOREIGN KEY (`User_ID`) REFERENCES `User` (`id`);

--
-- Ограничения внешнего ключа таблицы `Blog_BlogCategory`
--
ALTER TABLE `Blog_BlogCategory`
  ADD CONSTRAINT `blog_blogcategory_ibfk_1` FOREIGN KEY (`Blog_ID`) REFERENCES `Blog` (`id`),
  ADD CONSTRAINT `blog_blogcategory_ibfk_2` FOREIGN KEY (`BlogCategory_ID`) REFERENCES `BlogCategory` (`ID`);

--
-- Ограничения внешнего ключа таблицы `Blog_Description`
--
ALTER TABLE `Blog_Description`
  ADD CONSTRAINT `blog_description_ibfk_1` FOREIGN KEY (`Language_ID`) REFERENCES `Language` (`ID`),
  ADD CONSTRAINT `blog_description_ibfk_2` FOREIGN KEY (`Blog_ID`) REFERENCES `Blog` (`id`) ON DELETE CASCADE;

--
-- Ограничения внешнего ключа таблицы `CategoryProg_Description`
--
ALTER TABLE `CategoryProg_Description`
  ADD CONSTRAINT `categoryprog_description_ibfk_1` FOREIGN KEY (`CategoryProg_ID`) REFERENCES `CategoryProg` (`ID`),
  ADD CONSTRAINT `categoryprog_description_ibfk_2` FOREIGN KEY (`Language_ID`) REFERENCES `Language` (`ID`);

--
-- Ограничения внешнего ключа таблицы `Challenge`
--
ALTER TABLE `Challenge`
  ADD CONSTRAINT `challenge_ibfk_1` FOREIGN KEY (`User_ID`) REFERENCES `User` (`id`);

--
-- Ограничения внешнего ключа таблицы `Challenge_CategoryLangProg`
--
ALTER TABLE `Challenge_CategoryLangProg`
  ADD CONSTRAINT `challenge_categorylangprog_ibfk_1` FOREIGN KEY (`CategoryProg_ID`) REFERENCES `CategoryProg` (`ID`),
  ADD CONSTRAINT `challenge_categorylangprog_ibfk_2` FOREIGN KEY (`Challenge_ID`) REFERENCES `Challenge` (`ID`),
  ADD CONSTRAINT `challenge_categorylangprog_ibfk_3` FOREIGN KEY (`LangProg_ID`) REFERENCES `LangProg` (`ID`);

--
-- Ограничения внешнего ключа таблицы `Challenge_Description`
--
ALTER TABLE `Challenge_Description`
  ADD CONSTRAINT `challenge_description_ibfk_1` FOREIGN KEY (`Language_ID`) REFERENCES `Language` (`ID`),
  ADD CONSTRAINT `challenge_description_ibfk_2` FOREIGN KEY (`Challenge_ID`) REFERENCES `Challenge` (`ID`);

--
-- Ограничения внешнего ключа таблицы `Course`
--
ALTER TABLE `Course`
  ADD CONSTRAINT `course_ibfk_1` FOREIGN KEY (`User_ID`) REFERENCES `User` (`id`);

--
-- Ограничения внешнего ключа таблицы `Course_CategoryLangProg`
--
ALTER TABLE `Course_CategoryLangProg`
  ADD CONSTRAINT `course_categorylangprog_ibfk_1` FOREIGN KEY (`CategoryProg_ID`) REFERENCES `CategoryProg` (`ID`),
  ADD CONSTRAINT `course_categorylangprog_ibfk_2` FOREIGN KEY (`Course_ID`) REFERENCES `Course` (`ID`),
  ADD CONSTRAINT `course_categorylangprog_ibfk_3` FOREIGN KEY (`LangProg_ID`) REFERENCES `LangProg` (`ID`);

--
-- Ограничения внешнего ключа таблицы `Course_Challenge`
--
ALTER TABLE `Course_Challenge`
  ADD CONSTRAINT `course_challenge_ibfk_1` FOREIGN KEY (`Challenge_ID`) REFERENCES `Challenge` (`ID`),
  ADD CONSTRAINT `course_challenge_ibfk_2` FOREIGN KEY (`Course_ID`) REFERENCES `Course` (`ID`);

--
-- Ограничения внешнего ключа таблицы `Course_Description`
--
ALTER TABLE `Course_Description`
  ADD CONSTRAINT `course_description_ibfk_1` FOREIGN KEY (`Course_ID`) REFERENCES `Course` (`ID`),
  ADD CONSTRAINT `course_description_ibfk_2` FOREIGN KEY (`Language_ID`) REFERENCES `Language` (`ID`);

--
-- Ограничения внешнего ключа таблицы `Documentation`
--
ALTER TABLE `Documentation`
  ADD CONSTRAINT `documentation_ibfk_1` FOREIGN KEY (`LangProg_ID`) REFERENCES `LangProg` (`ID`);

--
-- Ограничения внешнего ключа таблицы `Documentation_Description`
--
ALTER TABLE `Documentation_Description`
  ADD CONSTRAINT `documentation_description_ibfk_1` FOREIGN KEY (`Language_ID`) REFERENCES `Language` (`ID`),
  ADD CONSTRAINT `documentation_description_ibfk_2` FOREIGN KEY (`Documentation_ID`) REFERENCES `Documentation` (`ID`);

--
-- Ограничения внешнего ключа таблицы `Forum`
--
ALTER TABLE `Forum`
  ADD CONSTRAINT `forum_ibfk_1` FOREIGN KEY (`User_ID`) REFERENCES `User` (`id`);

--
-- Ограничения внешнего ключа таблицы `ForumCategory_Description`
--
ALTER TABLE `ForumCategory_Description`
  ADD CONSTRAINT `forumcategory_description_ibfk_1` FOREIGN KEY (`ForumCategory_ID`) REFERENCES `ForumCategory` (`ID`),
  ADD CONSTRAINT `forumcategory_description_ibfk_2` FOREIGN KEY (`Language_ID`) REFERENCES `Language` (`ID`);

--
-- Ограничения внешнего ключа таблицы `ForumResponse`
--
ALTER TABLE `ForumResponse`
  ADD CONSTRAINT `forumresponse_ibfk_1` FOREIGN KEY (`Forum_ID`) REFERENCES `Forum` (`ID`),
  ADD CONSTRAINT `forumresponse_ibfk_2` FOREIGN KEY (`User_ID`) REFERENCES `User` (`id`);

--
-- Ограничения внешнего ключа таблицы `Forum_ForumCategory`
--
ALTER TABLE `Forum_ForumCategory`
  ADD CONSTRAINT `forum_forumcategory_ibfk_1` FOREIGN KEY (`ForumCategory_ID`) REFERENCES `ForumCategory` (`ID`),
  ADD CONSTRAINT `forum_forumcategory_ibfk_2` FOREIGN KEY (`Forum_ID`) REFERENCES `Forum` (`ID`);

--
-- Ограничения внешнего ключа таблицы `InputOutputData_Challenge`
--
ALTER TABLE `InputOutputData_Challenge`
  ADD CONSTRAINT `inputoutputdata_challenge_ibfk_1` FOREIGN KEY (`Challenge_ID`) REFERENCES `Challenge` (`ID`);

--
-- Ограничения внешнего ключа таблицы `Project`
--
ALTER TABLE `Project`
  ADD CONSTRAINT `project_ibfk_1` FOREIGN KEY (`User_ID`) REFERENCES `User` (`id`);

--
-- Ограничения внешнего ключа таблицы `Project_LangProg`
--
ALTER TABLE `Project_LangProg`
  ADD CONSTRAINT `project_langprog_ibfk_1` FOREIGN KEY (`LangProg_ID`) REFERENCES `LangProg` (`ID`),
  ADD CONSTRAINT `project_langprog_ibfk_2` FOREIGN KEY (`Project_ID`) REFERENCES `Project` (`ID`);

--
-- Ограничения внешнего ключа таблицы `Session`
--
ALTER TABLE `Session`
  ADD CONSTRAINT `session_ibfk_1` FOREIGN KEY (`User_ID`) REFERENCES `User` (`id`);

--
-- Ограничения внешнего ключа таблицы `StageCourse`
--
ALTER TABLE `StageCourse`
  ADD CONSTRAINT `stagecourse_ibfk_1` FOREIGN KEY (`Course_ID`) REFERENCES `Course` (`ID`);

--
-- Ограничения внешнего ключа таблицы `StageCourse_Description`
--
ALTER TABLE `StageCourse_Description`
  ADD CONSTRAINT `stagecourse_description_ibfk_1` FOREIGN KEY (`Language_ID`) REFERENCES `Language` (`ID`),
  ADD CONSTRAINT `stagecourse_description_ibfk_2` FOREIGN KEY (`StageCourse_ID`) REFERENCES `StageCourse` (`ID`);

--
-- Ограничения внешнего ключа таблицы `StepCourse`
--
ALTER TABLE `StepCourse`
  ADD CONSTRAINT `stepcourse_ibfk_1` FOREIGN KEY (`StageCourse_ID`) REFERENCES `StageCourse` (`ID`);

--
-- Ограничения внешнего ключа таблицы `StepCourse_Description`
--
ALTER TABLE `StepCourse_Description`
  ADD CONSTRAINT `stepcourse_description_ibfk_1` FOREIGN KEY (`Language_ID`) REFERENCES `Language` (`ID`),
  ADD CONSTRAINT `stepcourse_description_ibfk_2` FOREIGN KEY (`StepCourse_ID`) REFERENCES `StepCourse` (`ID`);

--
-- Ограничения внешнего ключа таблицы `TypeStepCourse_Description`
--
ALTER TABLE `TypeStepCourse_Description`
  ADD CONSTRAINT `typestepcourse_description_ibfk_1` FOREIGN KEY (`Course_ID`) REFERENCES `Course` (`ID`),
  ADD CONSTRAINT `typestepcourse_description_ibfk_2` FOREIGN KEY (`Language_ID`) REFERENCES `Language` (`ID`),
  ADD CONSTRAINT `typestepcourse_description_ibfk_3` FOREIGN KEY (`StageCourse_ID`) REFERENCES `StageCourse` (`ID`),
  ADD CONSTRAINT `typestepcourse_description_ibfk_4` FOREIGN KEY (`StepCourse_ID`) REFERENCES `StepCourse` (`ID`),
  ADD CONSTRAINT `typestepcourse_description_ibfk_5` FOREIGN KEY (`TypeStepCourse_ID`) REFERENCES `TypeStepCourse` (`ID`);

--
-- Ограничения внешнего ключа таблицы `User_Achievement`
--
ALTER TABLE `User_Achievement`
  ADD CONSTRAINT `user_achievement_ibfk_1` FOREIGN KEY (`Achievement_ID`) REFERENCES `Achievement` (`ID`),
  ADD CONSTRAINT `user_achievement_ibfk_2` FOREIGN KEY (`User_ID`) REFERENCES `User` (`id`);

--
-- Ограничения внешнего ключа таблицы `User_Challenge`
--
ALTER TABLE `User_Challenge`
  ADD CONSTRAINT `user_challenge_ibfk_1` FOREIGN KEY (`Challenge_ID`) REFERENCES `Challenge` (`ID`),
  ADD CONSTRAINT `user_challenge_ibfk_2` FOREIGN KEY (`User_ID`) REFERENCES `User` (`id`);

--
-- Ограничения внешнего ключа таблицы `User_Course`
--
ALTER TABLE `User_Course`
  ADD CONSTRAINT `user_course_ibfk_1` FOREIGN KEY (`Course_ID`) REFERENCES `Course` (`ID`),
  ADD CONSTRAINT `user_course_ibfk_2` FOREIGN KEY (`User_ID`) REFERENCES `User` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
