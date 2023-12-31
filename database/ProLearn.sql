-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3306
-- Время создания: Дек 11 2023 г., 16:47
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
-- Структура таблицы `blog`
--

CREATE TABLE `blog` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `slug` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `img` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '/public/uploads/no_image.jpg',
  `status` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `popular` tinyint(1) NOT NULL DEFAULT 0,
  `date_of_publication` date DEFAULT NULL,
  `views` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `blog`
--

INSERT INTO `blog` (`id`, `user_id`, `slug`, `img`, `status`, `popular`, `date_of_publication`, `views`) VALUES
(1, 1, 'hello-world', '/public/assets/img/blog/plug_img_blog.jpg', 'Опубликован', 0, '2023-06-23', 0),
(2, 1, 'hello-var', '/public/assets/img/blog/plug_img_blog.jpg', 'Опубликован', 0, '2023-08-27', 0),
(3, 1, 'hello-func', '/public/assets/img/blog/plug_img_blog.jpg', 'Опубликован', 1, '2023-06-20', 0),
(4, 2, 'hello-proc', '/public/assets/img/blog/plug_img_blog.jpg', 'В обработке', 0, NULL, 0),
(5, 3, 'admin2blog-1', '/public/assets/img/blog/plug_img_blog.jpg', 'Опубликован', 1, '2023-06-20', 0),
(6, 4, 'admin3blog-1', '/public/assets/img/blog/plug_img_blog.jpg', 'В обработке', 0, NULL, 0),
(7, 3, 'admin2blog-2', '/public/assets/img/blog/plug_img_blog.jpg', 'В обработке', 0, NULL, 0),
(8, 1, 'admin1blog-1', '/public/assets/img/blog/plug_img_blog.jpg', 'В обработке', 0, NULL, 0),
(9, 1, 'testdelete', '/public/assets/img/blog/plug_img_blog.jpg', 'В обработке', 0, NULL, 0),
(21, 1, 'dsadsaf', '/public/assets/img/blog/plug_img_blog.jpg', 'Опубликован', 1, '2023-06-22', 0),
(22, 1, 'peremennye-v-c', '/public/assets/img/blog/plug_img_blog.jpg', 'Опубликован', 0, '2023-06-24', 0),
(23, 1, 'konsol-nyy-vvod-vyvod-v-c', '/public/assets/img/blog/plug_img_blog.jpg', 'Опубликован', 1, '2023-06-24', 0);

--
-- Триггеры `blog`
--
DELIMITER $$
CREATE TRIGGER `CascadeDeleteBlog` BEFORE DELETE ON `blog` FOR EACH ROW BEGIN 
	DELETE FROM BlogResponse 
    WHERE Blog_ID = OLD.ID;
    
   	DELETE FROM Blog_BlogCategory WHERE Blog_ID = OLD.ID;
   	DELETE FROM Blog_Description WHERE Blog_ID = OLD.ID;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Структура таблицы `blogcategory`
--

CREATE TABLE `blogcategory` (
  `id` int(10) UNSIGNED NOT NULL,
  `parent_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `blogcategory`
--

INSERT INTO `blogcategory` (`id`, `parent_id`) VALUES
(1, 0),
(2, 1),
(3, 0),
(4, 0),
(5, 0);

-- --------------------------------------------------------

--
-- Структура таблицы `blogcategory_description`
--

CREATE TABLE `blogcategory_description` (
  `language_id` int(10) UNSIGNED NOT NULL,
  `blog_category_id` int(10) UNSIGNED NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `blogcategory_description`
--

INSERT INTO `blogcategory_description` (`language_id`, `blog_category_id`, `title`) VALUES
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
-- Структура таблицы `blogmark`
--

CREATE TABLE `blogmark` (
  `blog_id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `mark` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `blogmark`
--

INSERT INTO `blogmark` (`blog_id`, `user_id`, `mark`) VALUES
(1, 1, 0);

-- --------------------------------------------------------

--
-- Структура таблицы `blogresponse`
--

CREATE TABLE `blogresponse` (
  `id` int(10) UNSIGNED NOT NULL,
  `blog_id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `parent_id` int(11) NOT NULL DEFAULT 0,
  `content` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `date_of_publication` date NOT NULL DEFAULT current_timestamp(),
  `like_mark` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `blogresponse`
--

INSERT INTO `blogresponse` (`id`, `blog_id`, `user_id`, `parent_id`, `content`, `date_of_publication`, `like_mark`) VALUES
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
-- Структура таблицы `blogresponse_mark`
--

CREATE TABLE `blogresponse_mark` (
  `blogresponse_id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `mark` tinyint(3) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `blogtag`
--

CREATE TABLE `blogtag` (
  `id` int(10) UNSIGNED NOT NULL,
  `Title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `blog_blogcategory`
--

CREATE TABLE `blog_blogcategory` (
  `blog_id` int(10) UNSIGNED NOT NULL,
  `blog_category_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `blog_blogcategory`
--

INSERT INTO `blog_blogcategory` (`blog_id`, `blog_category_id`) VALUES
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
-- Структура таблицы `blog_blogtag`
--

CREATE TABLE `blog_blogtag` (
  `blog_id` int(10) UNSIGNED NOT NULL,
  `blogtag_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `blog_description`
--

CREATE TABLE `blog_description` (
  `language_id` int(10) UNSIGNED NOT NULL,
  `blog_id` int(10) UNSIGNED NOT NULL,
  `heading` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `excerpt` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `content` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `keywords` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `blog_description`
--

INSERT INTO `blog_description` (`language_id`, `blog_id`, `heading`, `excerpt`, `content`, `title`, `description`, `keywords`) VALUES
(1, 1, 'Привет, Мир!', 'Чтобы программа могла оперировать данными, данные должны находиться в оперативной памяти компьютера. Переменная - это область памяти, в которой находятся', '<p>Это тестовый блог, так что Привет, <strong>Мир</strong>!<img src=\"/public/uploads/images/coffi.png\"></p><p><a href=\"https://youtube\">https://youtube</a></p><p>А это конец блога</p>', 'Привет, Мир', 'Привет, Мир! - описание', 'Привет, Мир! - ключевые'),
(1, 2, 'Переменные', 'Тестовый блог о переменных', '<h2>Тестовый блог о переменных</h2>', 'Переменные', 'Переменные - описание', 'Переменные - ключевые'),
(1, 3, 'Привет функции', 'Контент с блогом о функция', '<p>Контент с блогом о функция</p>', 'Привет функции', 'Привет функции-описание', 'Привет функции-ключевые'),
(1, 4, 'Привет процедуры', 'Контент с блогом о процедурах', 'Контент с блогом о процедурах', 'Привет процедуры', 'Привет процедуры-описание', 'Привет процедуры-ключевые'),
(1, 5, 'Админ 2 Блог 1', 'контент Админ 2 Блог 1', '<p>контент Админ 2 Блог 1</p>', 'Админ 2 Блог 1', 'Админ 2 Блог 1 - описание', 'Админ 2 Блог 1 - ключевые'),
(1, 6, 'Админ 3 Блог 1', 'контент Админ 3 Блог 1', 'контент Админ 3 Блог 1', 'Админ 3 Блог 1', 'Админ 3 Блог 1 - описание', 'Админ 3 Блог 1 - ключевые'),
(1, 7, 'Админ 2 Блог 2', 'контент Админ 2 Блог 2', 'контент Админ 2 Блог 2', 'Админ 2 Блог 2', 'Админ 2 Блог 2 - описание', 'Админ 2 Блог 2 - ключевые'),
(1, 8, 'Админ 1 Блог 1', 'контент Админ 1 Блог 1', 'контент Админ 1 Блог 1', 'Админ 1 Блог 1', 'Админ 1 Блог 1 - описание', 'Админ 1 Блог 1 - ключевые'),
(1, 21, 'ssddsad', 'nklgfdnlkgfd', '<p>nklgfdnlkgfd</p>', 'dsadsaf', 'dsfdmlm', 'mkfdfk'),
(1, 22, 'Переменные в C#', 'Чтобы программа могла оперировать ', '<p>Чтобы программа могла оперировать данными, данные должны находиться в оперативной памяти компьютера. Переменная - это область памяти, в которой находятся данные.</p><figure class=\"image image-style-align-center\"><img src=\"https://avatars.dzeninfra.ru/get-zen_doc/4585608/pub_6068a943b207860379e02710_6068b93d741adc251dfc88eb/scale_2400\"></figure><p>Разрабатывая программу, программист должен объявить необходимые для решения задачи переменные. В программе доступ к данным (переменным) осуществляется по имени. В качестве имени переменной можно использовать последовательность символов, состоящую из букв латинского алфавита, цифр, а также символов тире и подчеркивание. Первым символом в имени переменной должна быть буква или символ “подчеркивание”. Пробелы в именах переменных использовать нельзя.</p><p>Следует обратить внимание, на то, что компилятор С# <strong>различает</strong> прописные и строчные буквы, поэтому, например, имена (идентификаторы) Name, name и NAME обозначают разные объекты (переменные).</p><p>В соответствие с правилами хорошего стиля программирования, имя переменной должно быть логически связано с ее назначением. Например, если переменные предназначены для хранения коэффициентов квадратного уравнения, то вполне логично присвоить им имена A, B и C, а переменным, предназначенным для хранения значений корней уравнения, — имена X1 и X2. Другой пример. Если в программе переменные предназначены для хранения суммы покупки и величины скидки, то этим переменным можно присвоить имена Sum и Discount.</p><p>Программа может оперировать с данными различных типов: с целыми и вещественными числами, со строками, с отдельными символами и с логическими величинами. Объявляя переменную, программист должен указать ее тип и тем самым указать (определить), для хранения данных какого типа переменная предназначена.</p><p>К основным типам C # можно отнести следующие типы данных:</p><ul><li>int (целый)</li><li>double (вещественный)</li><li>char (символьный)</li><li>bool ( логический)</li><li>string (строковый)</li></ul><h3><strong>int</strong></h3><p>Значением переменной типа int может быть положительное или отрицательное целое число, а также ноль. Диапазон изменения значения переменных типа int от -2147483648 до 2147483647. Помимо типа int для представления целых данных можно использовать типы Int16, Int32 (эквивалентен int ), Int64 (long ), а также беззнаковые типы UInt 16, UInt 32 и UInt 64.</p><p><img src=\"https://avatars.dzeninfra.ru/get-zen_doc/4281215/pub_6068a943b207860379e02710_6068bc1d8f567a4bcf8b97e5/scale_1200\" alt=\"Чтобы программа могла оперировать данными, данные должны находиться в оперативной памяти компьютера. Переменная - это область памяти, в которой находятся данные (рис. 1.19).-2\"></p><h3><strong>double</strong></h3><p>Характеристики вещественных типов приведены в следующей таблице.</p><p><img src=\"https://avatars.dzeninfra.ru/get-zen_doc/1857554/pub_6068a943b207860379e02710_6068bdd845570e1e43207865/scale_1200\" alt=\"Чтобы программа могла оперировать данными, данные должны находиться в оперативной памяти компьютера. Переменная - это область памяти, в которой находятся данные (рис. 1.19).-3\"></p><p>Выбирая тип данных для переменных, следует учитывать, что переменная типа double занимает в оперативной памяти в два раза больше места, чем переменная типа single (float) . Это важно, тем более, когда речь идет о выборе типа элементов для массива.</p><p>Также следует понимать, что несмотря на широкий диапазон значений переменных вещественного типа, количество значащих цифр мантиссы (точность) для значений single – 7-8, а для double – не более 15.</p><h3><strong>char</strong></h3><p>Значением переменной типа char может быть любой символ в том числе, цифра, знак препинания, буква русского и латинских алфавитов, символ валюты и другие одиночные символы. Помимо обычных, т.е. отображаемых в окне консоли символов, значением переменной типа char может быть специальный (управляющий) символ. Управляющие символы на экране консоли не отображаются, но их отправка на консоль приводит к выполнению определенных действий. Например, символ Новая строка переводит курсор в начало следующей строки. В тексте программы специальные символы записывают особым образом. Например, символ новая строка записывается двумя символами \\n.</p><h3><strong>string</strong></h3><p>Значением переменной типа string может быть любая строка –последовательность символов, состоящая из букв, цифр, знаков препинания, пробелов, а также специальных символов.</p><h3><strong>bool</strong></h3><p>Переменная типа bool может принимать одно из двух логических значений: true (истина) или false (ложь).</p><h2><strong>Объявление переменных</strong></h2><p>Каждая переменная программы должна быть объявлена. С помощью объявления устанавливается не только факт существования переменной, но и задается ее тип, тем самым определяется диапазон допустимых значений.</p><p>Инструкция объявления переменной в общем виде выглядит так:</p><p><i>Тип Имя;</i></p><p>Например:</p><p><strong>double </strong>weight;<br><strong>int </strong>k;<br><strong>string </strong>name ;</p><p>Несколько переменных одного типа можно объявить в одной инструкции, например, так:</p><p><strong>double</strong> r1, r2, r;</p><p>Считается хорошим тоном после инструкции объявления переменной добавить комментарий, пояснить, для чего используется переменная.</p><p><strong>double </strong>r1, r2; // сопротивления, Ом<br><strong>int </strong>t; // способ соединения: 1 - посл., 2 - пар.<br><strong>double </strong>u; // напряжение, вольт<br><strong>double </strong>r; // сопротивление цепи, Ом<br><strong>double </strong>i; // ток, ампер</p><p>C # позволяет объявить переменную практически в любом месте программы, там, где она нужна (единственное условие – переменная должна быть объявлена до первой инструкции, в которой она используется). Вместе с тем, переменные обычно объявляют в начале той функции, в которой они используются. Исключение составляют счетчики циклов, которые принято объявлять непосредственно в инструкции for.</p><p>Если в начале программы переменная должна иметь определенное значение, то присвоить ей это значение (выполнить инициализацию переменной) можно непосредственно в инструкции объявления переменной,</p><p>Например:</p><p><strong>double</strong> discount = 0.25; // скидка<br><strong>int </strong>n = 0; // количество совпадений<br><strong>string </strong>address = \"\" ;</p><h2><strong>Инструкция присваивания</strong></h2><p>Инструкция присваивания это - основная вычислительная инструкция. В результате ее выполнения переменная получает значение.</p><p>В общем виде инструкция присваивания записывается так:</p><p><i>Имя </i>= <i>Выражение</i>;</p><p>Выражение состоит из <strong>операндов</strong> и <strong>операторов</strong> и в общем виде выглядит так:<br><i>оп1</i> оп <i>оп2</i><br>где:<br><i>оп1</i> и <i>оп2</i> – операнды;<br>оп – оператор.</p><p>Операнды обозначают <strong>объекты</strong>, над которыми выполняется операция, оператор – выполняемое действие. В качестве операндов выражения могут выступать константы, переменные, функции и выражения.</p><p>Операторы - символы, обозначающие действия над операторами.</p><p>Примеры выражений:</p><p>i + 1<br>sum * 0.05<br>x + dx<br>x * sin (a )<br>gr / 454.0<br>d % 100</p><p>Операторы имеют разный приоритет. Так операторы *, /, % имеют более высокий приоритет, чем операторы + и -. Приоритет операторов влияет на порядок их выполнения. При вычислении значения выражения сначала выполняются операторы с более высоким приоритетом, т.е. умножение и деление, затем – с более низким (сложение и вычитание). Если приоритет операторов в выражении одинаковый, то сначала выполняется тот оператор, который находится левее.</p><p>Для задания нужного порядка выполнения операций следует использовать скобки. Например, выражение вычисления сопротивления двух резисторов, соединенных параллельно, записывается так:</p><p>(r1+r2)/(r1*r2)</p><p>Выражение, заключенное в скобки, трактуется как один операнд. Это значит, что операции, стоящие в скобках, будут выполняться в обычном порядке, но раньше, чем операции, находящиеся за скобками. При записи выражений, содержащих скобки, должна соблюдаться парность скобок, т. е. число открывающих скобок должно быть равно числу закрывающих скобок. Нарушение парности скобок — наиболее распространенная ошибка при записи выражений.</p><p>Инструкция присваивания выполняется следующим образом. Сначала вычисляется значение выражения, стоящего справа от символа присваивания, затем это значение записывается в переменную, имя которой указано слева от символа присваивания.</p><p>Например, в результате выполнения инструкции<br>a = b + c<br>значением переменной a будет число, равное сумме значений переменных b и c.</p><p>В результате выполнения инструкции<br>j = j + 1<br>значение переменной j будет увеличено на единицу.</p><p>В инструкции присваивания тип переменной должен соответствовать типу выражения. Если это не так, то значение выражения преобразуется к типу переменной. При преобразовании целого в дробное проблем нет: преобразование выполняется путем добавления нулевой дробной части. При преобразовании дробного к целому преобразование выполняется путем отбрасывания дробной части, что может привести к потере точности вычислений и даже к неправильному результату.</p><p>Значение переменной можно изменить не только при помощи инструкции присваивания, но и при помощи унарных операторов: ++ , -- и др.</p><p>Оператор ++ (инкремент, увеличение) увеличивает значение на единицу. Например, чтобы увеличить на единицу значение переменной i вместо инструкции i=i+1 можно записать i++. Аналогичным образом используется оператор -- (декремент, уменьшение).</p><h3><strong>Тип выражения и преобразование типов</strong></h3><p>Корректное выполнение операций +, -, * и / предполагает, что объекты, над которыми эти операции выполняются, одного типа. Если это не так, то выполняется преобразование типов по следующим правилам. Тип float преобразуется к double. Если один из операндов вещественного типа, а другой - целого, то целое значение преобразуется в вещественное.</p><p>Тип выражения определяется типом операндов (с учетом приведенных выше правил преобразования типов), т.е. если оба операнда целого типа, то тип выражения – целый, а, если, хотя бы один из операндов вещественный, то тип выражения – вещественный.</p><p>Особое внимание следует обратить на операцию деления. Если оба операнда целого типа, то результат, в соответствии с приведенными выше правилами, преобразуется к целому, причем преобразование выполняется путем отбрасывания дробной части. Например, выражение 5/2 целого типа и, поэтому, его значение 2, а не 2.5.</p><p>Приведенная ниже программа пересчета веса из граммов в фунты демонстрирует особенности выполнения операции деления. Обратите внимание, если в инструкции пересчета вещественную константу 459.0 заменить целой константу 459, то программа будет работать неправильно – будет \"теряться \" дробная часть результата.</p><p><strong>static void</strong> Main(string [] args)<br>{<br><strong>int </strong>gr; // вес в граммах<br><strong>double </strong>funt; // вес в фунтах<br><br><strong>Console</strong>.Write( \"Вес в граммах &gt;\" );<br>gr = System. <strong>Convert </strong>.ToInt32( Console .ReadLine());<br><br>funt = gr / 459.0;<br><br><strong>Console </strong>.WriteLine(\"{0} гр = {1} ф .\", gr, funt);<br><br><strong>Console </strong>.Write( \"Press any key to continue\" );<br><strong>Console </strong>. ReadKey();<br>}</p><h3><strong>Контрольные вопросы</strong></h3><ol><li>Перечислите целые типы данных</li><li>Перечислите вещественные типы данных</li><li>Что такое \"операнд\"?</li><li>Что такое \"оператор\"?</li><li>Что можно использовать в качестве операнда выражения?</li><li>Какой тип выражения R * 3.14 ?</li><li>Какой тип и значение выражения U/R, если переменные U и R целого типа и имеют значения 15 и 6 соответственно?</li><li>Какого типа должны быть переменные I, U и R, чтобы значение выражения I = U/R было правильным?</li></ol><h3><strong>Заданиe</strong></h3><p>По аналогии с программой Конвертер, приведенной в этом уроке, напишите программу, при помощи которой можно посчитать ток в простой электрической цепи (закон Ома).<br>&nbsp;</p><h3>Источник информации:&nbsp;</h3><p><a href=\"https://dzen.ru/a/YGipQ7IHhgN54CcQ\">https://dzen.ru/a/YGipQ7IHhgN54CcQ</a>&nbsp;</p>', 'Переменные в C#', 'Переменные в C# - описание', 'Переменные в C# - ключевые слова'),
(1, 23, 'Консольный ввод/вывод в C#', 'Вывод на консоль', '<h2><strong>Вывод на консоль</strong></h2><p>Метод WriteLine позволяет выводить на экран сообщения и значения переменных.</p><p>В простейшем случае в качестве параметра метода WriteLine можно указать строковую константу или имя переменной:</p><p>Console.WriteLine( \"Hello, World!\" );<br>Console.WriteLine(m);</p><p>В общем виде инструкция вызова метода WriteLine выглядит так:</p><p>Console .WriteLine(<i>УправляющаяСтрока</i>, <i>СписокПеременных</i> );</p><p>Параметр <i>УправляющаяСтрока</i> представляет собой строковую константу и может содержать: текст, спецификаторы формата и управляющие последовательности.</p><p>Параметр <i>СписокПеременных</i>, который может отсутствовать, если в управляющей строке нет спецификаторов формата, - это разделенные запятыми имена переменных, значения которых надо вывести в окно консоли.</p><p>Спецификатор формата, заключенный в фигурные скобки, задает переменную из списка переменных и формат ее вывода. Переменная задается путем указания ее номера в списке переменных (<strong>переменные в списке нумеруются с нуля</strong>).</p><p>Например:</p><p>инструкция</p><p><strong>Console</strong>.WriteLine ( \"{0}\", x1);</p><p>выводит на экран значение переменной x1;</p><p>инструкция</p><p><strong>Console</strong>.WriteLine ( \"{0: n } g = {1: n } lb\" , gr , fnt );</p><p>выводит значения переменных gr и fnt . Последовательности символов {0:n} и {1:n} внутри строковой константы это - спецификаторы формата. В строке, выводимой на экран, они заменяются, соответственно на значения переменных gr и fnt . Символ n указывает, что значения переменных должны быть выведены в числовом формате Numeric (при стандартной настройке Windows – с двумя цифрами после десятичного разделителя). Вид числа в формате Numeric (Числовой) определяют настройки операционной системы.</p><p>Так, например, если значение переменной gr равно 500, а значение переменной gr равно 1,10023, то на экран будет выведена строка</p><p>500,00 g = 1,10 lb</p><p>Ниже приведены некоторые, наиболее часто используемые спецификаторы форматов (параметр k задает номер переменной в списке вывода, параметр w – ширину поля вывода).</p><p><img src=\"https://avatars.dzeninfra.ru/get-zen_doc/3644947/pub_6069f045a773600090746f59_6069f45809a6b71702fcca7b/scale_1200\" alt=\"Вывод на консоль Метод WriteLine  позволяет выводить на экран сообщения и значения переменных.\"></p><p>Следует обратить внимание, компилятор не проверяет правильность строки форматирования, в том числе соответствие номеров переменных количеству переменных в списке. Ошибки в строке форматирования (например, неверная запись формата), несоответствие формата и списка переменных проявляются во время работы программы и могут приводить к возникновению исключений.</p><p>Если в строку вывода надо поместить символ, который не может быть помещен в строковую константу путем набора на клавиатуре, например символ новой строки или двойная кавычка, которая используется для ограничения в тексте программы строковых констант, то вместо этого символа следует поместить специальную последовательность символов. Специальная последовательность начинается символом обратной наклонной черты. Во время работы программы символы специальной последовательности на экран не выводятся, а выполняется действие, обозначаемое этой последовательностью.</p><p>Например, в результате выполнения инструкции</p><p><strong>Console</strong>.WriteLine (\"Microsoft\\nVisual Studio\" );</p><p>на экран будут выведены две строки текста: в первой будет написано Microsoft, во второй – Visual Studio. Последовательность символов \\n, находящаяся внутри строковой константы, это – <i>управляющая последовательность</i> , на экран она не выводиться, функция WriteLine интерпретирует ее как команду \"перевести курсор в начало следующей строки\".</p><p>Метод Write также позволяет вывести на экран строку, но в отличие от метода WritrLine после вывода строки курсор не переходит в начало следующей строки.</p><p>Метод Write удобно использовать для вывода подсказок, например:</p><p><strong>Console</strong>.Write( \"Вес в граммах &gt;\" );</p><p>По умолчанию фон экрана консоли черный, а текст, выводимый методами Write и WriteLine , – белый. Программа может, присвоив значения свойствам BackgroundColor и ForegroundColor задать, соответственно, цвет фона консоли и цвет текста. Приведенные ниже инструкции показывают, как это сделать.</p><p><strong>Console</strong>.BackgroundColor = <strong>ConsoleColor</strong>.White ;<br><strong>Console</strong>.ForegroundColor = <strong>ConsoleColor</strong>.DarkBlue;<br><strong>Console</strong>.Clear();</p><p>Обратите внимание, чтобы в начале работы программы экран окрасился установленным цветом, необходимо вызвать метод Clear().</p><h2><strong>Ввод с консоли</strong></h2><p>Наиболее просто ввести с консоли строку. Сделать это можно вызвав метод ReadLine() , например, так:</p><p>string st = <strong>Console</strong>.ReadLine();</p><p>В результате выполнения приведенной инструкции в переменную st записывается строка, набранная пользователем на клавиатуре.</p><p>Метод ReadLine работает так. Программа приостанавливает работу и ждет, пока пользователь наберет на клавиатуре строку символов и нажмет клавишу Enter. До нажатия Enter можно редактировать вводимую строку, например, нажав Backspace можно удалить последний введенный символ. После нажатия клавиши Enter метод ReadLine возвращает строку, набранную пользователем на клавиатуре.</p><p>Если надо ввести с клавиатуры численное значение, то сначала надо ввести строку, затем введенную строку при помощи соответствующей функции преобразовать строку в число. Преобразование строк в численные значения выполняют методы пространства имен System.Convert : методы ToInt 32, ToInt 64 преобразует строку, указанную в качестве параметра, в целое значение соответствующего типа; методы ToSingle и ToDouble преобразуют строку, соответственно, в значения типа Single (float ) и double .</p><p>Примеры:</p><p>// ввод вещественного значения<br><strong>Console </strong>.Write( \"Цена &gt;\" );<br>st = <strong>Console </strong>.ReadLine();<br>double price = System. <strong>Convert </strong>.ToDouble(st);</p><p>// ввод целого значения<br><strong>Console </strong>.Write( \"Количество &gt;\" );<br>st = <strong>Console </strong>.ReadLine();<br>int n = System. <strong>Convert </strong>.ToInt32(st);</p><p>Приведенные инструкции ввода можно записать и так:</p><p>// ввод вещественного значения<br><strong>Console </strong>.Write( \"Цена &gt;\" );<br>double price = System. <strong>Convert</strong> .ToDouble( <strong>Console </strong>.ReadLine());</p><p>// ввод целого значения<br><strong>Console </strong>.Write( \"Количество &gt;\" );<br>int n = System. <strong>Convert </strong>.ToInt32( <strong>Console </strong>.ReadLine());</p><p>Метод преобразования строки в численное значения возвращают результат (значение, соответствующего типа) только в том случае, <strong>если строка, указанная в качестве параметра метода, является правильным изображением числа соответствующего типа.</strong> Правильным изображением целого числа является строка, состоящая только из цифр (перед первой цифрой может быть минус), вещественного – строка, состоящая из цифр и содержащая правильный десятичный разделитель – запятую (при стандартной для России настройке операционной системы).</p><p><strong>Если в строке, указанной в качестве параметра метода преобразования, есть \"запрещенные\" символы или, если, строка пустая, то возникает исключение FormatException и, если в программе не предусмотрена обработка этого исключения, программа завершает работу.</strong></p><h2><strong>Контрольные вопросы</strong></h2><ol><li>В чем различие между методами Write и WriteLine?</li><li>Является ли инструкция<br>Console.WriteLine(\"a={1:n}\" b={2:n}, a , b);<br>правильной? Если нет, то почему?</li><li>Запишите инструкцию, которая выведет значение вещественной переменной mass с тремя знаками после десятичного разделителя.</li><li>Какой метод следует использовать для преобразования строки в целое значение?</li><li>Какой метод следует использовать для преобразования строки в вещественное значение?</li><li>Какой символ следует использовать в качестве десятичного разделителя при вводе с клавиатуры вещественного значения?</li><li>Что произойдет, если во время работы программы в ответ на запрос числа пользователь не введет число, а просто нажмет клавишу Enter?</li></ol><h2><strong>Задание</strong></h2><p>Напишите программу, которая вычисляет массу стержня (цилиндра). Размеры стержня (мм) и плотность материала (гр./см куб.) должны вводиться во время работы программы. Результат расчета - объем (в см. куб. ) и масса стержня (кг.) должны быть выведены с тремя знаками после десятичного разделителя. После численных значений должны быть указаны единицы измерения.</p><h3>Источник информации:</h3><p><a href=\"https://dzen.ru/media/id/5bbee6a6ee52f700afef1453/c-urok-4-konsolnyi-vvodvyvod-6069f045a773600090746f59?utm_referer=dzen.ru\">https://dzen.ru/media/id/5bbee6a6ee52f700afef1453/c-urok-4-konsolnyi-vvodvyvod-6069f045a773600090746f59?utm_referer=dzen.ru</a></p>', 'Консольный ввод/вывод в C#', 'Консольный ввод/вывод в C# -- описание', 'Консольный ввод/вывод в C# -- ключевые'),
(2, 1, 'Hello World!', 'his is a test blog, so Hello World!', '<p>This is a test blog, so Hello World!</p>', ' Hello World', ' Hello World - desc', ' Hello World - keywords'),
(2, 2, 'Variables', 'Test blog about variables', '<p>Test blog about variables</p>', 'Variables', 'Variables - desc', 'Variables - keywords'),
(2, 3, 'Hello function', 'Content about function', '<p>Content about function</p>', 'Hello function', 'Hello function-desc', 'Hello function-keywords'),
(2, 4, 'Hello procedure', 'Content about procedure', 'Content about procedure', 'Hello procedure', 'Hello procedure-desc', 'Hello procedure-keywords'),
(2, 5, 'Admin 2 Blog 1', 'content Admin 2 Blog 1', '<p>content Admin 2 Blog 1</p>', 'Admin 2 Blog 1', 'Admin 2 Blog 1 - desc', 'Admin 2 Blog 1 - keywords'),
(2, 6, 'Admin 3 Blog 1', 'content Admin 3 Blog 1', 'content Admin 3 Blog 1', 'Admin 3 Blog 1', 'Admin 3 Blog 1 - desc', 'Admin 3 Blog 1 - keywords'),
(2, 7, 'Admin 2 Blog 2', 'content Admin 2 Blog 2', 'content Admin 2 Blog 2', 'Admin 2 Blog 2', 'Admin 2 Blog 2 - desc', 'Admin 2 Blog 2 - keywords'),
(2, 8, 'Admin 1 Blog 1', 'content Admin 1 Blog 1', 'content Admin 1 Blog 1', 'Admin 1 Blog 1', 'Admin 1 Blog 1 - desc', 'Admin 1 Blog 1 - keywords'),
(2, 21, 'fdmsfm;kdsm', 'nkfldsd', '<p>nkfldsd</p>', 'nkdfsfnlkdsn', 'nfldslkfnk', 'fndslkn'),
(2, 22, 'Variables in C#', 'sss', '<p>sss</p>', 'Variables in C#', 'Variables in C# -- desc', 'Variables in C# -- keywords'),
(2, 23, 'Console in/out in C#', 'Console in/out in C# – content', '<p>Console in/out in C# – content</p>', 'Console in/out in C#', 'Console in/out in C# -- desc', 'Console in/out in C# -- keywords');

-- --------------------------------------------------------

--
-- Структура таблицы `categoryprog`
--

CREATE TABLE `categoryprog` (
  `id` int(10) UNSIGNED NOT NULL,
  `parent_id` int(11) NOT NULL DEFAULT 0,
  `color` varchar(7) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `categoryprog`
--

INSERT INTO `categoryprog` (`id`, `parent_id`, `color`) VALUES
(1, 0, '#ffffff'),
(2, 0, '#777777'),
(3, 1, '#999999'),
(4, 1, '#888888'),
(5, 2, '#222222');

-- --------------------------------------------------------

--
-- Структура таблицы `categoryprog_description`
--

CREATE TABLE `categoryprog_description` (
  `language_id` int(10) UNSIGNED NOT NULL,
  `category_prog_id` int(10) UNSIGNED NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `categoryprog_description`
--

INSERT INTO `categoryprog_description` (`language_id`, `category_prog_id`, `title`) VALUES
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
-- Структура таблицы `challenge`
--

CREATE TABLE `challenge` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `slug` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `path_code` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `num_of_input_data` int(10) UNSIGNED NOT NULL,
  `date_of_publication` date NOT NULL,
  `Status` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `for_course` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `challenge`
--

INSERT INTO `challenge` (`id`, `user_id`, `slug`, `path_code`, `num_of_input_data`, `date_of_publication`, `Status`, `for_course`) VALUES
(1, 1, 'find-the-area-of-the-triangle', '/public/project/challenge/find-the-area-of-the-triangle', 2, '2023-05-10', 'Опубликован', 0);

-- --------------------------------------------------------

--
-- Структура таблицы `challenge_categorylangprog`
--

CREATE TABLE `challenge_categorylangprog` (
  `category_prog_ID` int(10) UNSIGNED NOT NULL,
  `lang_prog_id` int(10) UNSIGNED NOT NULL,
  `challenge_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `challenge_categorylangprog`
--

INSERT INTO `challenge_categorylangprog` (`category_prog_ID`, `lang_prog_id`, `challenge_id`) VALUES
(3, 2, 1);

-- --------------------------------------------------------

--
-- Структура таблицы `challenge_description`
--

CREATE TABLE `challenge_description` (
  `language_id` int(10) UNSIGNED NOT NULL,
  `challenge_id` int(10) UNSIGNED NOT NULL,
  `heading` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `content` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `keywords` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `challenge_description`
--

INSERT INTO `challenge_description` (`language_id`, `challenge_id`, `heading`, `content`, `title`, `description`, `keywords`) VALUES
(1, 1, 'Найти площадь треугольника', 'найти площадь треугольника по высоте и его основанию', 'Найти площадь треугольника', 'найти площадь треугольника - описание', 'найти площадь треугольника - ключевые'),
(2, 1, 'Find the area of the triangle', 'find the area of the triangle in height and its base', 'Find the area of the triangle', 'Find the area of the triangle - desc', 'Find the area of the triangle - keywords');

-- --------------------------------------------------------

--
-- Структура таблицы `course`
--

CREATE TABLE `course` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `slug` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `icon` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `difficulty` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `date_of_publication` date DEFAULT NULL,
  `status` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `course`
--

INSERT INTO `course` (`id`, `user_id`, `slug`, `icon`, `difficulty`, `date_of_publication`, `status`) VALUES
(1, 1, 'getting-started-in-javascript', '/public/uploads/course/getting-started-in-javascript.svg', 'junior', '2023-05-12', 'Опубликован');

-- --------------------------------------------------------

--
-- Структура таблицы `course_categorylangprog`
--

CREATE TABLE `course_categorylangprog` (
  `course_id` int(10) UNSIGNED NOT NULL,
  `lang_Prog_id` int(10) UNSIGNED NOT NULL,
  `category_prog_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `course_categorylangprog`
--

INSERT INTO `course_categorylangprog` (`course_id`, `lang_Prog_id`, `category_prog_id`) VALUES
(1, 2, 3);

-- --------------------------------------------------------

--
-- Структура таблицы `course_challenge`
--

CREATE TABLE `course_challenge` (
  `course_id` int(10) UNSIGNED NOT NULL,
  `challenge_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `course_challenge`
--

INSERT INTO `course_challenge` (`course_id`, `challenge_id`) VALUES
(1, 1);

-- --------------------------------------------------------

--
-- Структура таблицы `course_description`
--

CREATE TABLE `course_description` (
  `language_id` int(10) UNSIGNED NOT NULL,
  `course_id` int(10) UNSIGNED NOT NULL,
  `heading` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `excerpt` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `keywords` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `course_description`
--

INSERT INTO `course_description` (`language_id`, `course_id`, `heading`, `excerpt`, `title`, `description`, `keywords`) VALUES
(1, 1, 'Начало работы в javascript', 'Сделайте свои первые шаги в javascript', 'Начало работы в javascript', 'Начало работы в javascript - описание', 'Начало работы в javascript - ключевые'),
(2, 1, 'Getting started in javascript', 'Take your first steps in javascript', 'Getting started in javascript', 'Getting started in javascript - desc', 'Getting started in javascript - keywords');

-- --------------------------------------------------------

--
-- Структура таблицы `course_mark`
--

CREATE TABLE `course_mark` (
  `course_id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `mark` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `documentation`
--

CREATE TABLE `documentation` (
  `id` int(10) UNSIGNED NOT NULL,
  `lang_prog_ID` int(10) UNSIGNED NOT NULL,
  `parent_ID` int(11) NOT NULL DEFAULT 0,
  `slug` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `date_of_publication` date DEFAULT NULL,
  `status` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `documentation`
--

INSERT INTO `documentation` (`id`, `lang_prog_ID`, `parent_ID`, `slug`, `date_of_publication`, `status`) VALUES
(3, 2, 0, 'about-js', '2023-05-12', 'Опубликован'),
(4, 2, 1, 'variables-in-js', '2023-05-11', 'Опубликован');

-- --------------------------------------------------------

--
-- Структура таблицы `documentation_description`
--

CREATE TABLE `documentation_description` (
  `language_id` int(10) UNSIGNED NOT NULL,
  `documentation_id` int(10) UNSIGNED NOT NULL,
  `heading` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `content` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `category_title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `keywords` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `documentation_description`
--

INSERT INTO `documentation_description` (`language_id`, `documentation_id`, `heading`, `content`, `category_title`, `title`, `description`, `keywords`) VALUES
(1, 3, 'Расскажем о JavaScript', 'Текст, где рассказывается про JavaScript', 'Начало работы', 'Начало работы', 'Начало работы - описание', 'Начало работы - ключевые'),
(2, 3, 'Let\'s talk about JavaScript', 'The text that tells about JavaScript', 'Getting started', 'Getting started', 'Getting started - desc', 'Getting started - keywords');

-- --------------------------------------------------------

--
-- Структура таблицы `Feedback`
--

CREATE TABLE `Feedback` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `feedbackcategory_id` int(10) UNSIGNED NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `text` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `Feedbackcategory`
--

CREATE TABLE `Feedbackcategory` (
  `id` int(10) UNSIGNED NOT NULL,
  `code` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `Feedbackcategory_description`
--

CREATE TABLE `Feedbackcategory_description` (
  `language_id` int(10) UNSIGNED NOT NULL,
  `feedbackcategory_id` int(10) UNSIGNED NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `forum`
--

CREATE TABLE `forum` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `slug` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `heading` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `content` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `date_of_publication` date NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `keywords` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `forum`
--

INSERT INTO `forum` (`id`, `user_id`, `slug`, `heading`, `content`, `status`, `date_of_publication`, `title`, `description`, `keywords`) VALUES
(1, 2, 'how-to-find-the-area-of-a-triangle', 'Как найти площадь треугольника', 'Нужна помощь!!! Не понимаю как найти площадь треугольника по основанию и его высоте', 'Опубликован', '2023-05-12', 'Как найти площадь треугольника', 'Как найти площадь треугольника - описание', 'Как найти площадь треугольника - ключевые');

-- --------------------------------------------------------

--
-- Структура таблицы `forumcategory`
--

CREATE TABLE `forumcategory` (
  `id` int(10) UNSIGNED NOT NULL,
  `parent_id` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `forumcategory`
--

INSERT INTO `forumcategory` (`id`, `parent_id`) VALUES
(1, 0),
(2, 1),
(3, 0);

-- --------------------------------------------------------

--
-- Структура таблицы `forumcategory_description`
--

CREATE TABLE `forumcategory_description` (
  `language_id` int(10) UNSIGNED NOT NULL,
  `forum_category_id` int(10) UNSIGNED NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `forumcategory_description`
--

INSERT INTO `forumcategory_description` (`language_id`, `forum_category_id`, `title`) VALUES
(1, 1, 'JavaScript'),
(1, 2, 'JavaScript для начинающих'),
(2, 1, 'JavaScript'),
(2, 2, 'JavaScript for beginners');

-- --------------------------------------------------------

--
-- Структура таблицы `forumresponse`
--

CREATE TABLE `forumresponse` (
  `id` int(10) UNSIGNED NOT NULL,
  `forum_id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `parent_id` int(11) NOT NULL DEFAULT 0,
  `content` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `date_of_publication` date NOT NULL,
  `like_mark` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `forumresponse`
--

INSERT INTO `forumresponse` (`id`, `forum_id`, `user_id`, `parent_id`, `content`, `date_of_publication`, `like_mark`) VALUES
(1, 1, 1, 0, 'Чтобы найти площадь треугольника, нужно его основание умножить на высоту и разделить на 2 (либо умножить на 0,5)', '2023-05-11', 1),
(2, 1, 2, 1, 'Сработало! Спасибо!', '2023-05-12', 0);

-- --------------------------------------------------------

--
-- Структура таблицы `forumresponse_mark`
--

CREATE TABLE `forumresponse_mark` (
  `forumresponse_id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `mark` tinyint(3) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `forum_forumcategory`
--

CREATE TABLE `forum_forumcategory` (
  `forum_category_id` int(10) UNSIGNED NOT NULL,
  `forum_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `forum_forumcategory`
--

INSERT INTO `forum_forumcategory` (`forum_category_id`, `forum_id`) VALUES
(2, 1);

-- --------------------------------------------------------

--
-- Структура таблицы `inputoutputdata_challenge`
--

CREATE TABLE `inputoutputdata_challenge` (
  `id` int(10) UNSIGNED NOT NULL,
  `challenge_id` int(10) UNSIGNED NOT NULL,
  `input_data` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `output_data` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `inputoutputdata_challenge`
--

INSERT INTO `inputoutputdata_challenge` (`id`, `challenge_id`, `input_data`, `output_data`) VALUES
(1, 1, '{\"a\": 10,\"b\": 2}', 10),
(2, 1, '{\"a\": 20, \"b\": 10}', 100);

-- --------------------------------------------------------

--
-- Структура таблицы `langprog`
--

CREATE TABLE `langprog` (
  `id` int(10) UNSIGNED NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `icon_img` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `code` varchar(15) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `langprog`
--

INSERT INTO `langprog` (`id`, `title`, `icon_img`, `code`) VALUES
(1, 'Java', '/public/uploads/java.svg', 'java'),
(2, 'JavaScript', '/public/uploads/js.svg', 'javascript'),
(3, 'C#', 'public/uploads/c#.svg', 'csharp'),
(4, 'C++', 'public/uploads/c++.svg', 'cpp'),
(5, 'PHP', 'public/uploads/php.svg', 'php');

-- --------------------------------------------------------

--
-- Структура таблицы `language`
--

CREATE TABLE `language` (
  `id` int(10) UNSIGNED NOT NULL,
  `title` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `code` varchar(4) COLLATE utf8mb4_unicode_ci NOT NULL,
  `base` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `language`
--

INSERT INTO `language` (`id`, `title`, `code`, `base`) VALUES
(1, 'Русский', 'ru', 1),
(2, 'English', 'en', 0),
(3, 'Franch', 'fr', 0);

-- --------------------------------------------------------

--
-- Структура таблицы `project`
--

CREATE TABLE `project` (
  `id` int(11) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `slug` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `path_project` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `date_of_publication` date NOT NULL DEFAULT current_timestamp(),
  `private` tinyint(1) NOT NULL DEFAULT 1,
  `description` text COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `project`
--

INSERT INTO `project` (`id`, `user_id`, `slug`, `title`, `path_project`, `date_of_publication`, `private`, `description`) VALUES
(1, 2, 'find-square-triangle', 'Найти площадь треугольника', '/public/projects/user1/find-square-triangle', '2023-05-12', 0, 'Программа для поиска площади треугольника по основанию и его высоте.'),
(44, 2, 'sayt-dlya-transportnoy-kompanii', 'Сайт для транспортной компании', '/public/projects/user1/sayt-dlya-transportnoy-kompanii', '2023-11-23', 0, 'Данный сайт был создан в момент практики над верстой, с использованием jquery для анимации и прочего');

-- --------------------------------------------------------

--
-- Структура таблицы `project_langprog`
--

CREATE TABLE `project_langprog` (
  `lang_prog_id` int(10) UNSIGNED NOT NULL,
  `project_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `project_langprog`
--

INSERT INTO `project_langprog` (`lang_prog_id`, `project_id`) VALUES
(2, 1),
(5, 1);

-- --------------------------------------------------------

--
-- Структура таблицы `session`
--

CREATE TABLE `session` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `type_device` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `country_address` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `city_address` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `date_of_last_session` date NOT NULL,
  `ip-address` varchar(15) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `session`
--

INSERT INTO `session` (`id`, `user_id`, `type_device`, `country_address`, `city_address`, `date_of_last_session`, `ip-address`) VALUES
(1, 2, 'Opera GX, Laptop', 'Russia', 'Moskow', '2023-05-12', '20.100.26.200');

-- --------------------------------------------------------

--
-- Структура таблицы `stagecourse`
--

CREATE TABLE `stagecourse` (
  `id` int(10) UNSIGNED NOT NULL,
  `course_id` int(10) UNSIGNED NOT NULL,
  `num_stage` int(10) UNSIGNED NOT NULL,
  `icon` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `stagecourse`
--

INSERT INTO `stagecourse` (`id`, `course_id`, `num_stage`, `icon`) VALUES
(1, 1, 1, '/public/uploads/course/js1.svg'),
(2, 1, 2, '/public/uploads/course/js2.svg');

-- --------------------------------------------------------

--
-- Структура таблицы `stagecourse_description`
--

CREATE TABLE `stagecourse_description` (
  `language_id` int(10) UNSIGNED NOT NULL,
  `stage_course_id` int(10) UNSIGNED NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `stagecourse_description`
--

INSERT INTO `stagecourse_description` (`language_id`, `stage_course_id`, `title`) VALUES
(1, 1, 'Начало работы в js'),
(1, 2, 'Переменные в js'),
(2, 1, 'Getting started in js'),
(2, 2, 'Variables in js');

-- --------------------------------------------------------

--
-- Структура таблицы `stepcourse`
--

CREATE TABLE `stepcourse` (
  `id` int(10) UNSIGNED NOT NULL,
  `stage_course_id` int(10) UNSIGNED NOT NULL,
  `num_step` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `stepcourse`
--

INSERT INTO `stepcourse` (`id`, `stage_course_id`, `num_step`) VALUES
(1, 1, 1),
(2, 1, 2),
(3, 2, 1),
(4, 2, 2);

-- --------------------------------------------------------

--
-- Структура таблицы `stepcourse_description`
--

CREATE TABLE `stepcourse_description` (
  `language_id` int(10) UNSIGNED NOT NULL,
  `step_course_id` int(10) UNSIGNED NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `stepcourse_description`
--

INSERT INTO `stepcourse_description` (`language_id`, `step_course_id`, `title`) VALUES
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
-- Структура таблицы `typestepcourse`
--

CREATE TABLE `typestepcourse` (
  `id` int(10) UNSIGNED NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `code` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `typestepcourse`
--

INSERT INTO `typestepcourse` (`id`, `title`, `code`) VALUES
(1, 'Теория', 'theory'),
(2, 'Ввод данных', 'input-data'),
(3, 'Несколько правильных ответов из многих', 'few-answer'),
(4, 'Один правильный ответ из многих', 'one-answer');

-- --------------------------------------------------------

--
-- Структура таблицы `typestepcourse_description`
--

CREATE TABLE `typestepcourse_description` (
  `type_step_course_id` int(10) UNSIGNED NOT NULL,
  `language_id` int(10) UNSIGNED NOT NULL,
  `course_id` int(10) UNSIGNED NOT NULL,
  `stage_course_id` int(10) UNSIGNED NOT NULL,
  `step_course_id` int(10) UNSIGNED NOT NULL,
  `answer_option` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `rigth_answer` text COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `typestepcourse_description`
--

INSERT INTO `typestepcourse_description` (`type_step_course_id`, `language_id`, `course_id`, `stage_course_id`, `step_course_id`, `answer_option`, `rigth_answer`) VALUES
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
-- Структура таблицы `user`
--

CREATE TABLE `user` (
  `id` int(10) UNSIGNED NOT NULL,
  `username` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `mail` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `second_mail` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `avatar_img` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `heading_img` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `about_user` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `last_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `first_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `country_address` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `date_of_registration` date NOT NULL DEFAULT current_timestamp(),
  `mb_for_project` int(10) UNSIGNED NOT NULL DEFAULT 50,
  `consecutive_days` int(10) UNSIGNED NOT NULL DEFAULT 1,
  `all_profile_private` tinyint(1) NOT NULL DEFAULT 0,
  `personal_info_private` tinyint(1) NOT NULL DEFAULT 0,
  `look_current_course_private` tinyint(1) NOT NULL DEFAULT 0,
  `role` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'user'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `user`
--

INSERT INTO `user` (`id`, `username`, `mail`, `second_mail`, `password`, `avatar_img`, `heading_img`, `about_user`, `last_name`, `first_name`, `country_address`, `date_of_registration`, `mb_for_project`, `consecutive_days`, `all_profile_private`, `personal_info_private`, `look_current_course_private`, `role`) VALUES
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
-- Структура таблицы `user_challenge`
--

CREATE TABLE `user_challenge` (
  `user_id` int(10) UNSIGNED NOT NULL,
  `challenge_id` int(10) UNSIGNED NOT NULL,
  `success` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `user_challenge`
--

INSERT INTO `user_challenge` (`user_id`, `challenge_id`, `success`) VALUES
(2, 1, 0);

-- --------------------------------------------------------

--
-- Структура таблицы `user_course`
--

CREATE TABLE `user_course` (
  `user_id` int(10) UNSIGNED NOT NULL,
  `course_id` int(10) UNSIGNED NOT NULL,
  `success` tinyint(1) NOT NULL DEFAULT 0,
  `current_step` int(11) NOT NULL,
  `current_stage` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `user_course`
--

INSERT INTO `user_course` (`user_id`, `course_id`, `success`, `current_step`, `current_stage`) VALUES
(2, 1, 0, 2, 2);

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `blog`
--
ALTER TABLE `blog`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UniqueSlug` (`slug`),
  ADD KEY `blog_user` (`user_id`);

--
-- Индексы таблицы `blogcategory`
--
ALTER TABLE `blogcategory`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `blogcategory_description`
--
ALTER TABLE `blogcategory_description`
  ADD PRIMARY KEY (`language_id`,`blog_category_id`),
  ADD KEY `BlogCategory_ID` (`blog_category_id`);

--
-- Индексы таблицы `blogmark`
--
ALTER TABLE `blogmark`
  ADD PRIMARY KEY (`blog_id`,`user_id`),
  ADD KEY `user_mark` (`user_id`);

--
-- Индексы таблицы `blogresponse`
--
ALTER TABLE `blogresponse`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Blog_ID` (`blog_id`),
  ADD KEY `User_ID` (`user_id`);

--
-- Индексы таблицы `blogresponse_mark`
--
ALTER TABLE `blogresponse_mark`
  ADD KEY `br_id` (`blogresponse_id`),
  ADD KEY `u_id` (`user_id`);

--
-- Индексы таблицы `blogtag`
--
ALTER TABLE `blogtag`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `blog_blogcategory`
--
ALTER TABLE `blog_blogcategory`
  ADD PRIMARY KEY (`blog_id`,`blog_category_id`),
  ADD KEY `BlogCategory_ID` (`blog_category_id`);

--
-- Индексы таблицы `blog_blogtag`
--
ALTER TABLE `blog_blogtag`
  ADD KEY `blogtag_id` (`blogtag_id`),
  ADD KEY `blog_id` (`blog_id`);

--
-- Индексы таблицы `blog_description`
--
ALTER TABLE `blog_description`
  ADD PRIMARY KEY (`language_id`,`blog_id`),
  ADD KEY `blog_description_ibfk_2` (`blog_id`);

--
-- Индексы таблицы `categoryprog`
--
ALTER TABLE `categoryprog`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `categoryprog_description`
--
ALTER TABLE `categoryprog_description`
  ADD PRIMARY KEY (`language_id`,`category_prog_id`),
  ADD KEY `CategoryProg_ID` (`category_prog_id`);

--
-- Индексы таблицы `challenge`
--
ALTER TABLE `challenge`
  ADD PRIMARY KEY (`id`),
  ADD KEY `User_ID` (`user_id`);

--
-- Индексы таблицы `challenge_categorylangprog`
--
ALTER TABLE `challenge_categorylangprog`
  ADD PRIMARY KEY (`category_prog_ID`,`lang_prog_id`,`challenge_id`),
  ADD KEY `Challenge_ID` (`challenge_id`),
  ADD KEY `LangProg_ID` (`lang_prog_id`);

--
-- Индексы таблицы `challenge_description`
--
ALTER TABLE `challenge_description`
  ADD PRIMARY KEY (`language_id`,`challenge_id`),
  ADD KEY `Challenge_ID` (`challenge_id`);

--
-- Индексы таблицы `course`
--
ALTER TABLE `course`
  ADD PRIMARY KEY (`id`),
  ADD KEY `User_ID` (`user_id`);

--
-- Индексы таблицы `course_categorylangprog`
--
ALTER TABLE `course_categorylangprog`
  ADD PRIMARY KEY (`course_id`,`lang_Prog_id`,`category_prog_id`),
  ADD KEY `CategoryProg_ID` (`category_prog_id`),
  ADD KEY `LangProg_ID` (`lang_Prog_id`);

--
-- Индексы таблицы `course_challenge`
--
ALTER TABLE `course_challenge`
  ADD PRIMARY KEY (`course_id`,`challenge_id`),
  ADD KEY `Challenge_ID` (`challenge_id`);

--
-- Индексы таблицы `course_description`
--
ALTER TABLE `course_description`
  ADD PRIMARY KEY (`language_id`,`course_id`),
  ADD KEY `Course_ID` (`course_id`);

--
-- Индексы таблицы `course_mark`
--
ALTER TABLE `course_mark`
  ADD KEY `course_id` (`course_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Индексы таблицы `documentation`
--
ALTER TABLE `documentation`
  ADD PRIMARY KEY (`id`),
  ADD KEY `LangProg_ID` (`lang_prog_ID`);

--
-- Индексы таблицы `documentation_description`
--
ALTER TABLE `documentation_description`
  ADD PRIMARY KEY (`language_id`,`documentation_id`),
  ADD KEY `Documentation_ID` (`documentation_id`);

--
-- Индексы таблицы `Feedback`
--
ALTER TABLE `Feedback`
  ADD PRIMARY KEY (`id`),
  ADD KEY `category_id` (`feedbackcategory_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Индексы таблицы `Feedbackcategory`
--
ALTER TABLE `Feedbackcategory`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `Feedbackcategory_description`
--
ALTER TABLE `Feedbackcategory_description`
  ADD KEY `language_id` (`language_id`),
  ADD KEY `feedbackcategory_id` (`feedbackcategory_id`);

--
-- Индексы таблицы `forum`
--
ALTER TABLE `forum`
  ADD PRIMARY KEY (`id`),
  ADD KEY `User_ID` (`user_id`);

--
-- Индексы таблицы `forumcategory`
--
ALTER TABLE `forumcategory`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `forumcategory_description`
--
ALTER TABLE `forumcategory_description`
  ADD PRIMARY KEY (`language_id`,`forum_category_id`),
  ADD KEY `ForumCategory_ID` (`forum_category_id`);

--
-- Индексы таблицы `forumresponse`
--
ALTER TABLE `forumresponse`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Forum_ID` (`forum_id`),
  ADD KEY `User_ID` (`user_id`);

--
-- Индексы таблицы `forumresponse_mark`
--
ALTER TABLE `forumresponse_mark`
  ADD KEY `forumresponse_id` (`forumresponse_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Индексы таблицы `forum_forumcategory`
--
ALTER TABLE `forum_forumcategory`
  ADD PRIMARY KEY (`forum_category_id`,`forum_id`),
  ADD KEY `Forum_ID` (`forum_id`);

--
-- Индексы таблицы `inputoutputdata_challenge`
--
ALTER TABLE `inputoutputdata_challenge`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Challenge_ID` (`challenge_id`);

--
-- Индексы таблицы `langprog`
--
ALTER TABLE `langprog`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `language`
--
ALTER TABLE `language`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `project`
--
ALTER TABLE `project`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `slugProject` (`slug`),
  ADD KEY `User_ID` (`user_id`);

--
-- Индексы таблицы `project_langprog`
--
ALTER TABLE `project_langprog`
  ADD PRIMARY KEY (`lang_prog_id`,`project_id`),
  ADD KEY `Project_ID` (`project_id`);

--
-- Индексы таблицы `session`
--
ALTER TABLE `session`
  ADD PRIMARY KEY (`id`),
  ADD KEY `User_ID` (`user_id`);

--
-- Индексы таблицы `stagecourse`
--
ALTER TABLE `stagecourse`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Course_ID` (`course_id`);

--
-- Индексы таблицы `stagecourse_description`
--
ALTER TABLE `stagecourse_description`
  ADD PRIMARY KEY (`language_id`,`stage_course_id`),
  ADD KEY `StageCourse_ID` (`stage_course_id`);

--
-- Индексы таблицы `stepcourse`
--
ALTER TABLE `stepcourse`
  ADD PRIMARY KEY (`id`),
  ADD KEY `StageCourse_ID` (`stage_course_id`);

--
-- Индексы таблицы `stepcourse_description`
--
ALTER TABLE `stepcourse_description`
  ADD PRIMARY KEY (`language_id`,`step_course_id`),
  ADD KEY `StepCourse_ID` (`step_course_id`);

--
-- Индексы таблицы `typestepcourse`
--
ALTER TABLE `typestepcourse`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `typestepcourse_description`
--
ALTER TABLE `typestepcourse_description`
  ADD PRIMARY KEY (`language_id`,`course_id`,`stage_course_id`,`step_course_id`),
  ADD KEY `Course_ID` (`course_id`),
  ADD KEY `StageCourse_ID` (`stage_course_id`),
  ADD KEY `StepCourse_ID` (`step_course_id`),
  ADD KEY `typestepcourse_description_ibfk_5` (`type_step_course_id`);

--
-- Индексы таблицы `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UniqueMail` (`mail`) USING BTREE;

--
-- Индексы таблицы `user_challenge`
--
ALTER TABLE `user_challenge`
  ADD PRIMARY KEY (`user_id`,`challenge_id`),
  ADD KEY `Challenge_ID` (`challenge_id`);

--
-- Индексы таблицы `user_course`
--
ALTER TABLE `user_course`
  ADD PRIMARY KEY (`user_id`,`course_id`),
  ADD KEY `Course_ID` (`course_id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `blog`
--
ALTER TABLE `blog`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT для таблицы `blogcategory`
--
ALTER TABLE `blogcategory`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT для таблицы `blogresponse`
--
ALTER TABLE `blogresponse`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT для таблицы `blogtag`
--
ALTER TABLE `blogtag`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `categoryprog`
--
ALTER TABLE `categoryprog`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT для таблицы `challenge`
--
ALTER TABLE `challenge`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT для таблицы `course`
--
ALTER TABLE `course`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT для таблицы `documentation`
--
ALTER TABLE `documentation`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT для таблицы `Feedback`
--
ALTER TABLE `Feedback`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `Feedbackcategory`
--
ALTER TABLE `Feedbackcategory`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `forum`
--
ALTER TABLE `forum`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT для таблицы `forumcategory`
--
ALTER TABLE `forumcategory`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT для таблицы `forumresponse`
--
ALTER TABLE `forumresponse`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT для таблицы `inputoutputdata_challenge`
--
ALTER TABLE `inputoutputdata_challenge`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT для таблицы `language`
--
ALTER TABLE `language`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT для таблицы `project`
--
ALTER TABLE `project`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- AUTO_INCREMENT для таблицы `session`
--
ALTER TABLE `session`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT для таблицы `stagecourse`
--
ALTER TABLE `stagecourse`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT для таблицы `stepcourse`
--
ALTER TABLE `stepcourse`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT для таблицы `typestepcourse`
--
ALTER TABLE `typestepcourse`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT для таблицы `user`
--
ALTER TABLE `user`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `blog`
--
ALTER TABLE `blog`
  ADD CONSTRAINT `blog_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `blog_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE;

--
-- Ограничения внешнего ключа таблицы `blogcategory_description`
--
ALTER TABLE `blogcategory_description`
  ADD CONSTRAINT `blogcategory_description_ibfk_1` FOREIGN KEY (`blog_category_id`) REFERENCES `blogcategory` (`id`),
  ADD CONSTRAINT `blogcategory_description_ibfk_2` FOREIGN KEY (`language_id`) REFERENCES `language` (`id`);

--
-- Ограничения внешнего ключа таблицы `blogmark`
--
ALTER TABLE `blogmark`
  ADD CONSTRAINT `blog_mark` FOREIGN KEY (`blog_id`) REFERENCES `blog` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `user_mark` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE;

--
-- Ограничения внешнего ключа таблицы `blogresponse`
--
ALTER TABLE `blogresponse`
  ADD CONSTRAINT `blogresponse_ibfk_1` FOREIGN KEY (`blog_id`) REFERENCES `blog` (`id`),
  ADD CONSTRAINT `blogresponse_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

--
-- Ограничения внешнего ключа таблицы `blogresponse_mark`
--
ALTER TABLE `blogresponse_mark`
  ADD CONSTRAINT `br_id` FOREIGN KEY (`blogresponse_id`) REFERENCES `blogresponse` (`id`),
  ADD CONSTRAINT `u_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

--
-- Ограничения внешнего ключа таблицы `blog_blogcategory`
--
ALTER TABLE `blog_blogcategory`
  ADD CONSTRAINT `blog_blogcategory_ibfk_1` FOREIGN KEY (`blog_id`) REFERENCES `blog` (`id`),
  ADD CONSTRAINT `blog_blogcategory_ibfk_2` FOREIGN KEY (`blog_category_id`) REFERENCES `blogcategory` (`id`);

--
-- Ограничения внешнего ключа таблицы `blog_blogtag`
--
ALTER TABLE `blog_blogtag`
  ADD CONSTRAINT `blog_blogtag_ibfk_1` FOREIGN KEY (`blogtag_id`) REFERENCES `blogtag` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `blog_blogtag_ibfk_2` FOREIGN KEY (`blog_id`) REFERENCES `blog` (`id`) ON DELETE CASCADE;

--
-- Ограничения внешнего ключа таблицы `blog_description`
--
ALTER TABLE `blog_description`
  ADD CONSTRAINT `blog_description_ibfk_1` FOREIGN KEY (`language_id`) REFERENCES `language` (`id`),
  ADD CONSTRAINT `blog_description_ibfk_2` FOREIGN KEY (`blog_id`) REFERENCES `blog` (`id`) ON DELETE CASCADE;

--
-- Ограничения внешнего ключа таблицы `categoryprog_description`
--
ALTER TABLE `categoryprog_description`
  ADD CONSTRAINT `categoryprog_description_ibfk_1` FOREIGN KEY (`category_prog_id`) REFERENCES `categoryprog` (`id`),
  ADD CONSTRAINT `categoryprog_description_ibfk_2` FOREIGN KEY (`language_id`) REFERENCES `language` (`id`);

--
-- Ограничения внешнего ключа таблицы `challenge`
--
ALTER TABLE `challenge`
  ADD CONSTRAINT `challenge_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

--
-- Ограничения внешнего ключа таблицы `challenge_categorylangprog`
--
ALTER TABLE `challenge_categorylangprog`
  ADD CONSTRAINT `challenge_categorylangprog_ibfk_1` FOREIGN KEY (`category_prog_ID`) REFERENCES `categoryprog` (`id`),
  ADD CONSTRAINT `challenge_categorylangprog_ibfk_2` FOREIGN KEY (`challenge_id`) REFERENCES `challenge` (`id`),
  ADD CONSTRAINT `challenge_categorylangprog_ibfk_3` FOREIGN KEY (`lang_prog_id`) REFERENCES `langprog` (`id`);

--
-- Ограничения внешнего ключа таблицы `challenge_description`
--
ALTER TABLE `challenge_description`
  ADD CONSTRAINT `challenge_description_ibfk_1` FOREIGN KEY (`language_id`) REFERENCES `language` (`id`),
  ADD CONSTRAINT `challenge_description_ibfk_2` FOREIGN KEY (`challenge_id`) REFERENCES `challenge` (`id`);

--
-- Ограничения внешнего ключа таблицы `course`
--
ALTER TABLE `course`
  ADD CONSTRAINT `course_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

--
-- Ограничения внешнего ключа таблицы `course_categorylangprog`
--
ALTER TABLE `course_categorylangprog`
  ADD CONSTRAINT `course_categorylangprog_ibfk_1` FOREIGN KEY (`category_prog_id`) REFERENCES `categoryprog` (`id`),
  ADD CONSTRAINT `course_categorylangprog_ibfk_2` FOREIGN KEY (`course_id`) REFERENCES `course` (`id`),
  ADD CONSTRAINT `course_categorylangprog_ibfk_3` FOREIGN KEY (`lang_Prog_id`) REFERENCES `langprog` (`id`);

--
-- Ограничения внешнего ключа таблицы `course_challenge`
--
ALTER TABLE `course_challenge`
  ADD CONSTRAINT `course_challenge_ibfk_1` FOREIGN KEY (`challenge_id`) REFERENCES `challenge` (`id`),
  ADD CONSTRAINT `course_challenge_ibfk_2` FOREIGN KEY (`course_id`) REFERENCES `course` (`id`);

--
-- Ограничения внешнего ключа таблицы `course_description`
--
ALTER TABLE `course_description`
  ADD CONSTRAINT `course_description_ibfk_1` FOREIGN KEY (`course_id`) REFERENCES `course` (`id`),
  ADD CONSTRAINT `course_description_ibfk_2` FOREIGN KEY (`language_id`) REFERENCES `language` (`id`);

--
-- Ограничения внешнего ключа таблицы `course_mark`
--
ALTER TABLE `course_mark`
  ADD CONSTRAINT `course_mark_ibfk_1` FOREIGN KEY (`course_id`) REFERENCES `course` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `course_mark_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE;

--
-- Ограничения внешнего ключа таблицы `documentation`
--
ALTER TABLE `documentation`
  ADD CONSTRAINT `documentation_ibfk_1` FOREIGN KEY (`lang_prog_ID`) REFERENCES `langprog` (`id`);

--
-- Ограничения внешнего ключа таблицы `documentation_description`
--
ALTER TABLE `documentation_description`
  ADD CONSTRAINT `documentation_description_ibfk_1` FOREIGN KEY (`language_id`) REFERENCES `language` (`id`),
  ADD CONSTRAINT `documentation_description_ibfk_2` FOREIGN KEY (`documentation_id`) REFERENCES `documentation` (`id`);

--
-- Ограничения внешнего ключа таблицы `Feedback`
--
ALTER TABLE `Feedback`
  ADD CONSTRAINT `feedback_ibfk_1` FOREIGN KEY (`feedbackcategory_id`) REFERENCES `Feedbackcategory` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `feedback_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE;

--
-- Ограничения внешнего ключа таблицы `Feedbackcategory_description`
--
ALTER TABLE `Feedbackcategory_description`
  ADD CONSTRAINT `feedbackcategory_description_ibfk_1` FOREIGN KEY (`language_id`) REFERENCES `language` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `feedbackcategory_description_ibfk_2` FOREIGN KEY (`feedbackcategory_id`) REFERENCES `Feedbackcategory` (`id`) ON DELETE CASCADE;

--
-- Ограничения внешнего ключа таблицы `forum`
--
ALTER TABLE `forum`
  ADD CONSTRAINT `forum_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

--
-- Ограничения внешнего ключа таблицы `forumcategory_description`
--
ALTER TABLE `forumcategory_description`
  ADD CONSTRAINT `forumcategory_description_ibfk_1` FOREIGN KEY (`forum_category_id`) REFERENCES `forumcategory` (`id`),
  ADD CONSTRAINT `forumcategory_description_ibfk_2` FOREIGN KEY (`language_id`) REFERENCES `language` (`id`);

--
-- Ограничения внешнего ключа таблицы `forumresponse`
--
ALTER TABLE `forumresponse`
  ADD CONSTRAINT `forumresponse_ibfk_1` FOREIGN KEY (`forum_id`) REFERENCES `forum` (`id`),
  ADD CONSTRAINT `forumresponse_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

--
-- Ограничения внешнего ключа таблицы `forumresponse_mark`
--
ALTER TABLE `forumresponse_mark`
  ADD CONSTRAINT `forumresponse_mark_ibfk_1` FOREIGN KEY (`forumresponse_id`) REFERENCES `forumresponse` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `forumresponse_mark_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE;

--
-- Ограничения внешнего ключа таблицы `forum_forumcategory`
--
ALTER TABLE `forum_forumcategory`
  ADD CONSTRAINT `forum_forumcategory_ibfk_1` FOREIGN KEY (`forum_category_id`) REFERENCES `forumcategory` (`id`),
  ADD CONSTRAINT `forum_forumcategory_ibfk_2` FOREIGN KEY (`forum_id`) REFERENCES `forum` (`id`);

--
-- Ограничения внешнего ключа таблицы `inputoutputdata_challenge`
--
ALTER TABLE `inputoutputdata_challenge`
  ADD CONSTRAINT `inputoutputdata_challenge_ibfk_1` FOREIGN KEY (`challenge_id`) REFERENCES `challenge` (`id`);

--
-- Ограничения внешнего ключа таблицы `project`
--
ALTER TABLE `project`
  ADD CONSTRAINT `project_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

--
-- Ограничения внешнего ключа таблицы `project_langprog`
--
ALTER TABLE `project_langprog`
  ADD CONSTRAINT `project_langprog_ibfk_1` FOREIGN KEY (`lang_prog_id`) REFERENCES `langprog` (`id`),
  ADD CONSTRAINT `project_langprog_ibfk_2` FOREIGN KEY (`project_id`) REFERENCES `project` (`id`);

--
-- Ограничения внешнего ключа таблицы `session`
--
ALTER TABLE `session`
  ADD CONSTRAINT `session_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

--
-- Ограничения внешнего ключа таблицы `stagecourse`
--
ALTER TABLE `stagecourse`
  ADD CONSTRAINT `stagecourse_ibfk_1` FOREIGN KEY (`course_id`) REFERENCES `course` (`id`);

--
-- Ограничения внешнего ключа таблицы `stagecourse_description`
--
ALTER TABLE `stagecourse_description`
  ADD CONSTRAINT `stagecourse_description_ibfk_1` FOREIGN KEY (`language_id`) REFERENCES `language` (`id`),
  ADD CONSTRAINT `stagecourse_description_ibfk_2` FOREIGN KEY (`stage_course_id`) REFERENCES `stagecourse` (`id`);

--
-- Ограничения внешнего ключа таблицы `stepcourse`
--
ALTER TABLE `stepcourse`
  ADD CONSTRAINT `stepcourse_ibfk_1` FOREIGN KEY (`stage_course_id`) REFERENCES `stagecourse` (`id`);

--
-- Ограничения внешнего ключа таблицы `stepcourse_description`
--
ALTER TABLE `stepcourse_description`
  ADD CONSTRAINT `stepcourse_description_ibfk_1` FOREIGN KEY (`language_id`) REFERENCES `language` (`id`),
  ADD CONSTRAINT `stepcourse_description_ibfk_2` FOREIGN KEY (`step_course_id`) REFERENCES `stepcourse` (`id`);

--
-- Ограничения внешнего ключа таблицы `typestepcourse_description`
--
ALTER TABLE `typestepcourse_description`
  ADD CONSTRAINT `typestepcourse_description_ibfk_1` FOREIGN KEY (`course_id`) REFERENCES `course` (`id`),
  ADD CONSTRAINT `typestepcourse_description_ibfk_2` FOREIGN KEY (`language_id`) REFERENCES `language` (`id`),
  ADD CONSTRAINT `typestepcourse_description_ibfk_3` FOREIGN KEY (`stage_course_id`) REFERENCES `stagecourse` (`id`),
  ADD CONSTRAINT `typestepcourse_description_ibfk_4` FOREIGN KEY (`step_course_id`) REFERENCES `stepcourse` (`id`),
  ADD CONSTRAINT `typestepcourse_description_ibfk_5` FOREIGN KEY (`type_step_course_id`) REFERENCES `typestepcourse` (`id`);

--
-- Ограничения внешнего ключа таблицы `user_challenge`
--
ALTER TABLE `user_challenge`
  ADD CONSTRAINT `user_challenge_ibfk_1` FOREIGN KEY (`challenge_id`) REFERENCES `challenge` (`id`),
  ADD CONSTRAINT `user_challenge_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

--
-- Ограничения внешнего ключа таблицы `user_course`
--
ALTER TABLE `user_course`
  ADD CONSTRAINT `user_course_ibfk_1` FOREIGN KEY (`course_id`) REFERENCES `course` (`id`),
  ADD CONSTRAINT `user_course_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
