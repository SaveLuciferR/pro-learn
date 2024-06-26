-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Хост: MariaDB-10.5
-- Время создания: Май 28 2024 г., 13:24
-- Версия сервера: 10.5.23-MariaDB
-- Версия PHP: 8.1.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `prolearn`
--

-- --------------------------------------------------------

--
-- Структура таблицы `blog`
--

CREATE TABLE `blog` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `status_id` int(10) UNSIGNED NOT NULL,
  `slug` varchar(255) NOT NULL,
  `img` varchar(255) NOT NULL DEFAULT '/public/uploads/no_image.jpg',
  `popular` tinyint(1) NOT NULL DEFAULT 0,
  `date_of_publication` date DEFAULT NULL,
  `views` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `blog`
--

INSERT INTO `blog` (`id`, `user_id`, `status_id`, `slug`, `img`, `popular`, `date_of_publication`, `views`) VALUES
(1, 1, 1, 'hello-world', '/public/assets/img/blog/plug_img_blog.jpg', 0, '2023-06-23', 0),
(2, 1, 1, 'hello-var', '/public/assets/img/blog/plug_img_blog.jpg', 1, '2023-08-27', 0),
(3, 1, 1, 'hello-func', '/public/assets/img/blog/plug_img_blog.jpg', 1, '2023-06-20', 0),
(4, 2, 4, 'hello-proc', '/public/assets/img/blog/plug_img_blog.jpg', 0, NULL, 0),
(5, 3, 1, 'admin2blog-1', '/public/assets/img/blog/plug_img_blog.jpg', 1, '2023-06-20', 0),
(6, 4, 4, 'admin3blog-1', '/public/assets/img/blog/plug_img_blog.jpg', 0, NULL, 0),
(7, 3, 3, 'admin2blog-2', '/public/assets/img/blog/plug_img_blog.jpg', 0, NULL, 0),
(8, 1, 4, 'admin1blog-1', '/public/assets/img/blog/plug_img_blog.jpg', 0, NULL, 0),
(9, 1, 2, 'testdelete', '/public/assets/img/blog/plug_img_blog.jpg', 0, NULL, 0),
(21, 1, 1, 'dsadsaf', '/public/assets/img/blog/plug_img_blog.jpg', 1, '2023-06-22', 0),
(22, 1, 2, 'peremennye-v-c', '/public/assets/img/blog/plug_img_blog.jpg', 0, '2023-06-24', 0),
(23, 1, 1, 'konsol-nyy-vvod-vyvod-v-c', '/public/assets/img/blog/plug_img_blog.jpg', 1, '2023-06-24', 0);

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
  `title` varchar(255) NOT NULL
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
  `content` text NOT NULL,
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
  `Title` varchar(255) NOT NULL
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
  `heading` varchar(255) NOT NULL,
  `excerpt` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `keywords` varchar(255) DEFAULT NULL
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
  `code` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `categoryprog`
--

INSERT INTO `categoryprog` (`id`, `parent_id`, `code`) VALUES
(1, 0, 'web-dev'),
(2, 0, 'mob-dev'),
(3, 1, 'front-dev'),
(4, 1, 'back-dev'),
(5, 2, 'android-dev');

-- --------------------------------------------------------

--
-- Структура таблицы `categoryprog_description`
--

CREATE TABLE `categoryprog_description` (
  `language_id` int(10) UNSIGNED NOT NULL,
  `category_prog_id` int(10) UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL
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
  `project_id` int(10) UNSIGNED DEFAULT NULL,
  `template_id` int(10) UNSIGNED DEFAULT NULL,
  `status_id` int(10) UNSIGNED NOT NULL,
  `slug` varchar(255) DEFAULT NULL,
  `difficulty` int(10) UNSIGNED NOT NULL,
  `num_of_input_data` int(10) UNSIGNED NOT NULL,
  `date_of_publication` date DEFAULT NULL,
  `views` int(10) UNSIGNED NOT NULL,
  `for_course` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `challenge`
--

INSERT INTO `challenge` (`id`, `user_id`, `project_id`, `template_id`, `status_id`, `slug`, `difficulty`, `num_of_input_data`, `date_of_publication`, `views`, `for_course`) VALUES
(1, 2, 1, 1, 1, 'find-the-area-of-the-triangle', 3, 2, '2023-05-10', 0, 0),
(27, 2, 78, 2, 1, 'pervyy-klass-na-c', 2, 0, '2023-05-10', 0, 0),
(28, 2, NULL, 2, 1, 'vasha-pervaya-programma-na-c', 1, 0, '2024-04-26', 0, 0);

-- --------------------------------------------------------

--
-- Структура таблицы `challengetag`
--

CREATE TABLE `challengetag` (
  `id` int(10) UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `challengetag`
--

INSERT INTO `challengetag` (`id`, `title`) VALUES
(1, 'Python');

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
(2, 1, 1),
(2, 4, 1),
(3, 2, 1);

-- --------------------------------------------------------

--
-- Структура таблицы `challenge_challengetag`
--

CREATE TABLE `challenge_challengetag` (
  `challenge_id` int(10) UNSIGNED NOT NULL,
  `challengetag_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `challenge_challengetag`
--

INSERT INTO `challenge_challengetag` (`challenge_id`, `challengetag_id`) VALUES
(1, 1);

-- --------------------------------------------------------

--
-- Структура таблицы `challenge_description`
--

CREATE TABLE `challenge_description` (
  `language_id` int(10) UNSIGNED NOT NULL,
  `challenge_id` int(10) UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `keywords` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `challenge_description`
--

INSERT INTO `challenge_description` (`language_id`, `challenge_id`, `title`, `content`, `description`, `keywords`) VALUES
(1, 1, 'Найти площадь треугольника23', 'найти площадь треугольника по высоте и его основанию', 'найти площадь треугольника - описание', 'найти площадь треугольника - ключевые'),
(1, 27, 'Первый класс на C++', '<h3 class=\"markdown-h3\">Создай свой первый класс!!!</h3><p class=\"markdown-p\">Создать класс <code class=\"markdown-inline-block-code\">Tiles</code>, который будет содержать поля с открытым доступом: <code class=\"markdown-inline-block-code\">brand</code>, <code class=\"markdown-inline-block-code\">size_h</code>, <code class=\"markdown-inline-block-code\">size_w</code>, <code class=\"markdown-inline-block-code\">price</code> и метод класса <code class=\"markdown-inline-block-code\">getData()</code>. </p><p class=\"markdown-p\">В главной функции объявить пару объектов класса и внести в поля. Затем отобразить их, вызвав метод <code class=\"markdown-inline-block-code\">getData()</code>.</p>', NULL, ''),
(1, 28, 'Ваша первая программа на C++', '<p class=\"markdown-p\">Напишите программу для вывода <code class=\"markdown-inline-block-code\">C++ is cool</code>. Обратите внимание, что предложение начинается с заглавной буквы.</p><blockquote class=\"markdown-blockquote\"><p class=\"markdown-p\">Подсказка:</p><p class=\"markdown-p\">Используйте <code class=\"markdown-inline-block-code\">cout</code> и <strong>оператор вывода</strong> <code class=\"markdown-inline-block-code\">&lt;&lt;</code>, чтобы вывести текст.</p></blockquote><blockquote class=\"markdown-blockquote\"><p class=\"markdown-p\">Не забудьте заключить текст в <strong>двойные кавычки</strong> и поставить <strong>точку с запятой (;)</strong> в конце выражения.</p></blockquote>', 'ьаваьвы', 'рпрпарпав'),
(2, 1, 'Find the area of the triangle', 'find the area of the triangle in height and its base', 'Find the area of the triangle - desc', 'Find the area of the triangle - keywords'),
(2, 27, 'First class in C++', '<h3 class=\"markdown-h3\">Create your first class!!!</h3><p class=\"markdown-p\">Create the Tiles class, which will contain the fields with open access: <code class=\"markdown-inline-block-code\">brand</code>, <code class=\"markdown-inline-block-code\">size_h</code>, <code class=\"markdown-inline-block-code\">size_w</code>, <code class=\"markdown-inline-block-code\">price</code> and the method of the <code class=\"markdown-inline-block-code\">getData()</code> class. </p><p class=\"markdown-p\">In the main function, declare a pair of class objects and add them to the fields. Then display them by calling the <code class=\"markdown-inline-block-code\">getData()</code> method.</p>', '', ''),
(2, 28, 'Your first C++ program', '<p class=\"markdown-p\">Write a program to output <code class=\"markdown-inline-block-code\">C++ is cool</code>. Please note that the sentence begins with a capital letter.</p><blockquote class=\"markdown-blockquote\"><p class=\"markdown-p\">Hint:</p><p class=\"markdown-p\">Use <code class=\"markdown-inline-block-code\">cout</code> and the <strong>output operator</strong> <code class=\"markdown-inline-block-code\">&lt;&lt;</code> to output the text.</p></blockquote><blockquote class=\"markdown-blockquote\"><p class=\"markdown-p\">Don\'t forget to enclose the text in <strong>double quotes</strong> and <strong>put a semicolon</strong> (;) at the end of the expression.</p></blockquote>', '', '');

-- --------------------------------------------------------

--
-- Структура таблицы `challenge_mark`
--

CREATE TABLE `challenge_mark` (
  `challenge_id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `mark` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `challenge_mark`
--

INSERT INTO `challenge_mark` (`challenge_id`, `user_id`, `mark`) VALUES
(1, 1, 1),
(1, 3, 1),
(1, 5, 0);

-- --------------------------------------------------------

--
-- Структура таблицы `course`
--

CREATE TABLE `course` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `status_id` int(10) UNSIGNED NOT NULL,
  `slug` varchar(255) DEFAULT NULL,
  `icon` varchar(255) NOT NULL,
  `difficulty` int(10) UNSIGNED NOT NULL,
  `date_of_publication` date DEFAULT NULL,
  `views` int(10) UNSIGNED NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `course`
--

INSERT INTO `course` (`id`, `user_id`, `status_id`, `slug`, `icon`, `difficulty`, `date_of_publication`, `views`) VALUES
(1, 1, 1, 'getting-started-in-javascript', '/public/uploads/course/getting-started-in-javascript.svg', 1, '2023-05-12', 0),
(25, 2, 1, 'osnovy-fullstack-razrabotki', '/tmp/', 5, '2024-04-23', 0),
(26, 2, 3, 'osnovy-fullstack-razrabotki-26', '/tmp/', 3, NULL, 0),
(28, 2, 3, '33', '', 1, NULL, 0),
(29, 2, 3, 'osnovy-fullstack-razrabotkid', '/tmp/', 4, NULL, 0),
(45, 2, 1, 'testovyy-kurs', '/tmp/', 2, '2024-04-17', 0),
(47, 2, 1, 'nachalo-v-c', '', 1, '2024-04-26', 0);

-- --------------------------------------------------------

--
-- Структура таблицы `coursetag`
--

CREATE TABLE `coursetag` (
  `id` int(10) UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `coursetag`
--

INSERT INTO `coursetag` (`id`, `title`) VALUES
(1, 'Python'),
(2, 'Начинающим'),
(3, 'Fullstack');

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
-- Структура таблицы `course_coursetag`
--

CREATE TABLE `course_coursetag` (
  `course_id` int(10) UNSIGNED NOT NULL,
  `coursetag_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `course_coursetag`
--

INSERT INTO `course_coursetag` (`course_id`, `coursetag_id`) VALUES
(1, 1),
(1, 2),
(25, 3);

-- --------------------------------------------------------

--
-- Структура таблицы `course_description`
--

CREATE TABLE `course_description` (
  `language_id` int(10) UNSIGNED NOT NULL,
  `course_id` int(10) UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL,
  `excerpt` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `keywords` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `course_description`
--

INSERT INTO `course_description` (`language_id`, `course_id`, `title`, `excerpt`, `description`, `keywords`) VALUES
(1, 1, 'Тест 1', 'Описание тест 1', 'clear desc', 'clear keywords'),
(1, 25, 'Основы Fullstack-разработки', 'В этом курсе вы познаете основные этапы разработки фуллстак сайтов с использованием html, css, js и php', 'clear desc', 'clear keywords'),
(1, 26, 'Тест 2', 'Описание тест 2', 'clear desc', 'clear keywords'),
(1, 28, 'Тест 3', 'Описание тест 3', 'clear desc', 'clear keywords'),
(1, 29, 'Тест 4', 'Описание тест 4', 'clear desc', 'clear keywords'),
(1, 45, 'Тестовый курс', 'этот курс создается для теста', 'мета-описание тестового курса', ''),
(1, 47, 'Начало в C++', 'Наш курс по C++ охватывает основные понятия, типы данных, массивы, указатели, условные операторы, циклы, функции, классы, объекты, наследование и полиморфизм.', '', ''),
(2, 1, 'Test 1', 'Test desc 1', 'clear desc', 'clear keywords'),
(2, 25, 'The basics of Fullstack development', 'In this course, you will learn the main stages of developing full-stack websites using html, css, js and php', 'clear desc', 'clear keywords'),
(2, 26, 'Test 2', 'Test desc 2', 'clear desc', 'clear keywords'),
(2, 28, 'Test 3', 'Test desc 3', 'clear desc', 'clear keywords'),
(2, 29, 'Test 4', 'Test desc 4', 'clear desc', 'clear keywords'),
(2, 45, 'Test course', 'Description for test course', 'meta-desc for test course', ''),
(2, 47, 'Getting started in C++', 'Getting started in C++Our C++ course covers basic concepts, data types, arrays, pointers, conditional operators, loops, functions, classes, objects, inheritance and polymorphism.', '', '');

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
  `slug` varchar(255) NOT NULL,
  `date_of_publication` date DEFAULT NULL,
  `status` varchar(255) NOT NULL
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
  `heading` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `category_title` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `keywords` varchar(255) DEFAULT NULL
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
  `user_id` int(10) UNSIGNED DEFAULT NULL,
  `feedbackcategory_id` int(10) UNSIGNED NOT NULL,
  `status_id` int(10) UNSIGNED NOT NULL DEFAULT 6,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `text` text NOT NULL,
  `date_of_departure` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `Feedback`
--

INSERT INTO `Feedback` (`id`, `user_id`, `feedbackcategory_id`, `status_id`, `name`, `email`, `text`, `date_of_departure`) VALUES
(3, 1, 1, 5, 'Вася', 'vasya@gmail.com', 'Пользователь Игорь оскорбил меня.', '2024-04-10'),
(9, NULL, 2, 6, 'dsads', 'user@mail.ru', 'ff;dsf\'kdsa', '2024-05-03');

-- --------------------------------------------------------

--
-- Структура таблицы `Feedbackcategory`
--

CREATE TABLE `Feedbackcategory` (
  `id` int(10) UNSIGNED NOT NULL,
  `code` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `Feedbackcategory`
--

INSERT INTO `Feedbackcategory` (`id`, `code`) VALUES
(1, 'idea'),
(2, 'bug'),
(3, 'report');

-- --------------------------------------------------------

--
-- Структура таблицы `Feedbackcategory_description`
--

CREATE TABLE `Feedbackcategory_description` (
  `language_id` int(10) UNSIGNED NOT NULL,
  `feedbackcategory_id` int(10) UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `Feedbackcategory_description`
--

INSERT INTO `Feedbackcategory_description` (`language_id`, `feedbackcategory_id`, `title`) VALUES
(2, 1, 'I want to provide an idea'),
(1, 1, 'Я хочу предоставить идею'),
(2, 2, 'I found an error on the website'),
(1, 2, 'Я нашел ошибку на сайте'),
(2, 3, 'I want to complain'),
(1, 3, 'Я хочу пожаловаться');

-- --------------------------------------------------------

--
-- Структура таблицы `forum`
--

CREATE TABLE `forum` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `slug` varchar(255) NOT NULL,
  `heading` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `status` varchar(255) NOT NULL,
  `date_of_publication` date NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `keywords` varchar(255) DEFAULT NULL
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
  `title` varchar(255) NOT NULL
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
  `content` text NOT NULL,
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
-- Структура таблицы `inputoutputdata`
--

CREATE TABLE `inputoutputdata` (
  `id` int(10) UNSIGNED NOT NULL,
  `challenge_id` int(10) UNSIGNED NOT NULL,
  `input_data` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `output_data` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`output_data`))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `inputoutputdata`
--

INSERT INTO `inputoutputdata` (`id`, `challenge_id`, `input_data`, `output_data`) VALUES
(8, 27, '[\"10\",\"10\",\"Cosmetic\",\"30\"]', '[\"Brand: Cosmetic, Heigth: 10, Wight: 10, Price: 30\"]'),
(9, 27, '[\"10\",\"20\",\"Cosmetic\",\"50\"]', '[\"Brand: Cosmetic, Heigth: 20, Wight: 10, Price: 50\"]'),
(10, 27, '[\"20\",\"20\",\"TileWind\",\"20\"]', '[\"Brand: TileWind, Heigth: 20, Wight: 20, Price: 20\"]'),
(21, 28, '[]', '[\"C++ is cool\"]');

-- --------------------------------------------------------

--
-- Структура таблицы `langprog`
--

CREATE TABLE `langprog` (
  `id` int(10) UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL,
  `icon_img` varchar(255) NOT NULL,
  `code` varchar(15) NOT NULL,
  `extension` varchar(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `langprog`
--

INSERT INTO `langprog` (`id`, `title`, `icon_img`, `code`, `extension`) VALUES
(1, 'Java', '/public/uploads/java.svg', 'java', 'java'),
(2, 'JavaScript', '/public/uploads/js.svg', 'javascript', 'js'),
(3, 'C#', 'public/uploads/c#.svg', 'csharp', 'cs'),
(4, 'C++', 'public/uploads/c++.svg', 'cpp', 'cpp'),
(5, 'PHP', 'public/uploads/php.svg', 'php', 'php'),
(6, 'Python', '/tmp/', 'python', 'py'),
(7, 'Markdown', '/tmp/', 'markdown', 'md');

-- --------------------------------------------------------

--
-- Структура таблицы `language`
--

CREATE TABLE `language` (
  `id` int(10) UNSIGNED NOT NULL,
  `title` varchar(50) NOT NULL,
  `code` varchar(4) NOT NULL,
  `base` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `language`
--

INSERT INTO `language` (`id`, `title`, `code`, `base`) VALUES
(1, 'Русский', 'ru', 1),
(2, 'English', 'en', 0);

-- --------------------------------------------------------

--
-- Структура таблицы `project`
--

CREATE TABLE `project` (
  `id` int(11) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `slug` varchar(255) DEFAULT NULL,
  `title` varchar(255) NOT NULL,
  `path_project` varchar(255) DEFAULT NULL,
  `date_of_publication` date NOT NULL DEFAULT current_timestamp(),
  `private` tinyint(1) NOT NULL DEFAULT 1,
  `description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `project`
--

INSERT INTO `project` (`id`, `user_id`, `slug`, `title`, `path_project`, `date_of_publication`, `private`, `description`) VALUES
(1, 2, 'find-square-triangle', 'Найти площадь треугольника', '/public/projects/user1/find-square-triangle', '2023-05-12', 0, 'Программа для поиска площади треугольника по основанию и его высоте.'),
(44, 2, 'sayt-dlya-transportnoy-kompanii', 'Сайт для транспортной компании', '/public/projects/user1/sayt-dlya-transportnoy-kompanii', '2023-11-23', 1, 'Данный сайт был создан в момент практики над верстой, с использованием jquery для анимации и прочего'),
(46, 2, 'new', 'new', '/public/projects/user1/new', '2024-03-08', 1, ''),
(47, 2, 'testovyy-proekt', 'тестовый проект ', '/public/projects/user1/testovyy-proekt', '2024-04-10', 1, 'этот проект был создан для теста'),
(48, 2, 'testovyy-proekt-215', 'Тестовый проект 215', '/public/projects/user1/testovyy-proekt-215', '2024-04-10', 0, 'Описание '),
(68, 1, 'testsolve', 'testsolve', NULL, '2024-04-18', 1, NULL),
(71, 1, 'testsolve-71', 'testsolve', NULL, '2024-04-18', 1, NULL),
(72, 2, 'dsa', 'dsa', '/public/projects/user1/dsa', '2024-04-22', 1, 'dsa'),
(73, 1, 'testsolve-cpp', 'testSolve-cpp', NULL, '2024-04-22', 0, NULL),
(75, 2, 'gfgfd', 'gfgfd', NULL, '2024-04-26', 1, NULL),
(77, 2, 'pervyy-proekt-na-c', 'Первый проект на C++', NULL, '2024-04-29', 1, NULL),
(78, 2, 'generator-zakaza', 'Генератор заказа', '/public/projects/user1/generator-zakaza', '2024-05-01', 0, 'Данный проект был создан на реакте и представляет собой генератор заказа, который можно будет скачать'),
(79, 2, 'sssssss', 'sssssss', NULL, '2024-05-01', 0, NULL),
(80, 2, 'pouihukjfgdh', 'pouihukjfgdh', NULL, '2024-05-20', 1, NULL),
(81, 2, 'jjj', 'jjj', NULL, '2024-05-20', 1, NULL);

-- --------------------------------------------------------

--
-- Структура таблицы `projecttemplate`
--

CREATE TABLE `projecttemplate` (
  `id` int(11) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `slug` varchar(255) NOT NULL,
  `icon` varchar(255) DEFAULT NULL,
  `private` tinyint(1) NOT NULL,
  `for_project` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `projecttemplate`
--

INSERT INTO `projecttemplate` (`id`, `user_id`, `slug`, `icon`, `private`, `for_project`) VALUES
(1, 2, 'testtemplate1', '', 0, 1),
(2, 1, 'docker-for-cplusplus', '', 0, 0);

-- --------------------------------------------------------

--
-- Структура таблицы `projecttemplate_description`
--

CREATE TABLE `projecttemplate_description` (
  `language_id` int(10) UNSIGNED NOT NULL,
  `projecttemplate_id` int(10) UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `projecttemplate_description`
--

INSERT INTO `projecttemplate_description` (`language_id`, `projecttemplate_id`, `title`, `description`) VALUES
(1, 1, 'тест', 'тест'),
(1, 2, 'Консольное приложение на C++', 'Данный шаблон используется для консольного приложения на языке программирования С++'),
(2, 1, 'test', 'test'),
(2, 2, 'Console application in C++', 'This template is used for a console application in the C++ programming language');

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
  `type_device` varchar(255) NOT NULL,
  `country_address` varchar(255) NOT NULL,
  `city_address` varchar(255) NOT NULL,
  `date_of_last_session` date NOT NULL,
  `ip_address` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `session`
--

INSERT INTO `session` (`id`, `user_id`, `type_device`, `country_address`, `city_address`, `date_of_last_session`, `ip_address`) VALUES
(2, 1, 'desktop', 'Colombia', 'Cartagena', '2024-04-02', '200.0.3.1'),
(3, 2, 'unknown', 'Colombia', 'Cartagena', '2024-04-09', '200.0.3.1'),
(4, 2, 'unknown', 'United States', 'Montgomery', '2024-05-19', '132.3.200.1'),
(5, 1, 'desktop', 'United States', 'Montgomery', '2024-05-18', '132.3.200.1'),
(6, 3, 'unknown', 'United States', 'Montgomery', '2024-04-17', '132.3.200.1'),
(7, 13, 'desktop', 'United States', 'Montgomery', '2024-05-18', '132.3.200.1'),
(8, 14, 'desktop', 'United States', 'Montgomery', '2024-05-03', '132.3.200.1'),
(9, 16, 'desktop', 'United States', 'Montgomery', '2024-05-18', '132.3.200.1');

-- --------------------------------------------------------

--
-- Структура таблицы `stagecourse`
--

CREATE TABLE `stagecourse` (
  `id` int(10) UNSIGNED NOT NULL,
  `course_id` int(10) UNSIGNED NOT NULL,
  `num_stage` int(10) UNSIGNED NOT NULL,
  `icon` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `stagecourse`
--

INSERT INTO `stagecourse` (`id`, `course_id`, `num_stage`, `icon`) VALUES
(46, 25, 1, '/tmp/'),
(68, 45, 1, '/tmp/'),
(70, 25, 2, '/tmp/'),
(71, 25, 3, '/tmp/'),
(72, 47, 1, '/tmp/'),
(74, 47, 2, '/tmp/');

-- --------------------------------------------------------

--
-- Структура таблицы `stagecourse_description`
--

CREATE TABLE `stagecourse_description` (
  `language_id` int(10) UNSIGNED NOT NULL,
  `stage_course_id` int(10) UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `stagecourse_description`
--

INSERT INTO `stagecourse_description` (`language_id`, `stage_course_id`, `title`) VALUES
(1, 46, 'Введение в верстку'),
(1, 68, 'Тестовый блок 1'),
(1, 70, 'апьаьпы'),
(1, 71, 'лавыа'),
(1, 72, 'Основные понятия'),
(1, 74, 'Заголовки и пространства имен'),
(2, 46, 'Getting start layout'),
(2, 68, 'Test bock 1'),
(2, 70, 'jfdkgkfds'),
(2, 71, 'flds;lf;l'),
(2, 72, 'Basic concepts'),
(2, 74, 'Headers and namespaces');

-- --------------------------------------------------------

--
-- Структура таблицы `status`
--

CREATE TABLE `status` (
  `id` int(10) UNSIGNED NOT NULL,
  `code` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `status`
--

INSERT INTO `status` (`id`, `code`) VALUES
(1, 'public'),
(2, 'reject'),
(3, 'draft'),
(4, 'moderation'),
(5, 'check'),
(6, 'uncheck');

-- --------------------------------------------------------

--
-- Структура таблицы `status_description`
--

CREATE TABLE `status_description` (
  `language_id` int(10) UNSIGNED NOT NULL,
  `status_id` int(10) UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `status_description`
--

INSERT INTO `status_description` (`language_id`, `status_id`, `title`) VALUES
(1, 1, 'Опубликовано'),
(2, 1, 'Published'),
(1, 2, 'Отклонено'),
(2, 2, 'Rejected'),
(1, 3, 'Черновик'),
(2, 3, 'Draft'),
(1, 4, 'На модерации'),
(2, 4, 'On moderation'),
(1, 5, 'Просмотрено'),
(2, 5, 'Viewed'),
(1, 6, 'Не просмотрено'),
(2, 6, 'Not viewed');

-- --------------------------------------------------------

--
-- Структура таблицы `stepcourse`
--

CREATE TABLE `stepcourse` (
  `id` int(10) UNSIGNED NOT NULL,
  `stage_course_id` int(10) UNSIGNED NOT NULL,
  `typestepcourse_id` int(10) UNSIGNED NOT NULL,
  `challenge_id` int(10) UNSIGNED DEFAULT NULL,
  `num_step` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `stepcourse`
--

INSERT INTO `stepcourse` (`id`, `stage_course_id`, `typestepcourse_id`, `challenge_id`, `num_step`) VALUES
(138, 46, 4, NULL, 1),
(145, 68, 1, NULL, 1),
(146, 68, 2, NULL, 2),
(148, 70, 5, 1, 1),
(149, 72, 1, NULL, 1),
(150, 72, 4, NULL, 2),
(151, 72, 1, NULL, 3),
(152, 72, 4, NULL, 4),
(153, 72, 1, NULL, 5),
(154, 72, 2, NULL, 6),
(155, 72, 5, 28, 7),
(156, 72, 4, NULL, 8),
(159, 74, 1, NULL, 1),
(160, 74, 2, NULL, 2),
(161, 74, 1, NULL, 3),
(162, 74, 4, NULL, 4);

-- --------------------------------------------------------

--
-- Структура таблицы `stepcourse_description`
--

CREATE TABLE `stepcourse_description` (
  `language_id` int(10) UNSIGNED NOT NULL,
  `step_course_id` int(10) UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `answer_option` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `right_answer` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `stepcourse_description`
--

INSERT INTO `stepcourse_description` (`language_id`, `step_course_id`, `title`, `description`, `answer_option`, `right_answer`) VALUES
(1, 138, 'авыавы', '<p class=\"markdown-p\">авыавыф3</p>', '{\"1\":\",lt;l,h;lgdh\",\"2\":\"jgfdjhgj\"}', '1'),
(1, 145, 'Тестовый урок 1 блока 1.', 'Контент первого заголовка. Текстовая часть', '{\"1\": \"вывы}', ''),
(1, 146, 'Текстовый урок 2 блока 1', 'let a <code>=</code> 10; ', '[]', ''),
(1, 148, 'лдааджы', '', '[]', ''),
(1, 149, 'Добро пожаловать в мир C++', '<p class=\"markdown-p\"><script>alert(\'sdsds\');</script>C++ - популярный кроссплатформенный язык программирования, который используется для создания высокопроизводительных программ - операционные системы, браузеры, видеоигры, графические приложения и т.д.</p><blockquote class=\"markdown-blockquote\"><p class=\"markdown-p\">C++ наследован от языка программирования C, и во многих аспектах основан на нем.</p></blockquote>', '[]', ''),
(1, 150, 'Что такое С++', '<p class=\"markdown-p\"><span style=\"color: rgb(225, 227, 230)\">C++ - это...</span></p>', '{\"1\":\"Сценарный язык программирования на стороне клиента\",\"2\":\"Язык программирования общего назначения\",\"3\":\"Программа для создания видео\"}', '2'),
(1, 151, 'Шаблон проекта', '<p class=\"markdown-p\"><span style=\"color: rgb(225, 227, 230)\">Программа на языке C++ является набором <strong>команд</strong> и <strong>выражений</strong>. Ниже представлен простой шаблон программы C++:</span></p><pre class=\"project__file-code tiptap-code-editor scroll \"><code class=\"language-cpp\">#include &lt;iostream&gt;\nusing namespace std;\n\nint main()\n\n{\n\n  return 0;\n\n}</code></pre><p class=\"markdown-p\">Вы изучите, что делает каждое выражение в последующих уроках. Пока запомните, точкой входа каждой программы на языке C++ является функция <strong>main()</strong>, независимо от того, что делает программа.</p>', '[]', ''),
(1, 152, 'Какая точка входа в программу', '<p class=\"markdown-p\">Какой вариант является входной точкой каждой C++ программы?</p>', '{\"1\":\"int main()\",\"2\":\"using namespace std;\",\"3\":\"#include <iostream>\"}', '1'),
(1, 153, 'Ваша первая программа на C++', '<p class=\"markdown-p\">Давайте выведем \"Hello world\" на экран!</p><p class=\"markdown-p\">Для этого мы добавим строку cout &lt;&lt; \"Hello world!\"; в тело нашей функции main():</p><pre class=\"project__file-code tiptap-code-editor scroll \"><code class=\"language-cpp\">#include &lt;iostream&gt; \nusing namespace std;  \nint main() {\n   cout &lt;&lt; \"Hello world!\";\n   cout &lt;&lt; \" This \" &lt;&lt; \"is \" &lt;&lt; \"awesome!\";\n   return 0;\n}</code></pre><p class=\"markdown-p\">Результатом же программы будет: </p><pre class=\"project__file-code tiptap-code-editor scroll \"><code class=\"language-textplain\">Hello world! This is awesome!</code></pre><p class=\"markdown-p\">В большинстве программных сред стандартный вывод по умолчанию выводится на экран. В C++ объект cout используется для доступа к потоку вывода.</p><p class=\"markdown-p\">cout используется в комбинации с оператором вставки &lt;&lt;.</p><p class=\"markdown-p\">Вы можете добавить множество операторов вставки после cout.</p><blockquote class=\"markdown-blockquote\"><p class=\"markdown-p\">В языке C++, точка с запятой используется для завершения выражения. Каждое выражение должно заканчиваться точкой с запятой. Это указывает на конец логического выражения.</p></blockquote>', '[]', ''),
(1, 154, 'Выведи Hello World', '<p class=\"markdown-p\">Перетащите из вариантов, указанных ниже, чтобы вывести \"Hello, world!\" на экран:</p><p class=\"markdown-p\"><code class=\"markdown-inline-block-code\">cout</code><strong> </strong><code class=\"markdown-inline-block-code\">&lt;&lt;</code><strong> \"Hello, world!\"</strong><code class=\"markdown-inline-block-code\">;</code></p>', '[]', ''),
(1, 155, 'Практика - ключ к успеху', '<p class=\"markdown-p\"><span style=\"color: rgb(225, 227, 230)\">Попробуйте наш Код Коуч, чтобы попрактиковаться и написать реальный код.</span></p>', '[]', ''),
(1, 156, 'Как заканчивается каждое выражение?', '<p class=\"markdown-p\"><span style=\"color: rgb(225, 227, 230)\">Каждое выражение должно заканчиваться:</span></p>', '{\"1\":\"точка с запятой ( ; )\",\"2\":\"двоеточие ( : )\",\"3\":\"точка ( . )\",\"4\":\"запятая ( , )\"}', '1'),
(1, 159, 'Заголовки', '<p class=\"markdown-p\">C++ предлагает различные заголовки, каждый из которых содержит необходимую информацию для корректной работы программ.</p><p class=\"markdown-p\">Мы уже встречали стандартный заголовок &lt;iostream&gt; в нашей первой C++ программе:</p><pre class=\"project__file-code tiptap-code-editor scroll \"><code class=\"language-cpp\">#include &lt;iostream&gt;\nusing namespace std;\n\nint main()\n{\ncout &lt;&lt; \"Hello world!\";\nreturn 0;\n}</code></pre><p class=\"markdown-p\">#include используется для добавления стандартных или пользовательских заголовков в программу.</p><blockquote class=\"markdown-blockquote\"><p class=\"markdown-p\"><span style=\"color: rgb(225, 227, 230)\">Заголовочный файл &lt;iostream&gt; управляет стандартным потоком ввода-вывода информации.</span></p></blockquote>', '[]', ''),
(1, 160, 'Как правильно?', '<p class=\"markdown-p\"><span style=\"color: rgb(225, 227, 230)\">Перетащите из вариантов, указанных ниже, чтобы включить заголовок &lt;iostream&gt;:</span></p><p class=\"markdown-p\"><span style=\"color: rgb(225, 227, 230)\">#</span><code class=\"markdown-inline-block-code\">include</code><span style=\"color: rgb(225, 227, 230)\"> &lt;</span><code class=\"markdown-inline-block-code\">iostream</code><span style=\"color: rgb(225, 227, 230)\">&gt;</span></p>', '[]', ''),
(1, 161, 'Пространства имен', '<p class=\"markdown-p\"><span style=\"color: rgb(225, 227, 230)\">Пространство имен (namespace) это декларативная область которая предостовляет пространсво для идентификаторов (имен элементов) внутри него.</span><br><span style=\"color: rgb(225, 227, 230)\">В нашей программе строка using namespace std; говорит компилятору использовать std (Стандартное) пространство имен.</span></p><pre class=\"project__file-code tiptap-code-editor scroll \"><code class=\"language-cpp\">#include &lt;iostream&gt;\nusing namespace std;\n\nint main()\n{\ncout &lt;&lt; \"Hello world!\";\nreturn 0;\n}</code></pre><blockquote class=\"markdown-blockquote\"><p class=\"markdown-p\"><span style=\"color: rgb(225, 227, 230)\">Пространство имен std включает особенности Стандартной Библиотеки C++.</span></p></blockquote>', '[]', ''),
(1, 162, 'Стандартная библиотека C++', '<p class=\"markdown-p\"><span style=\"color: rgb(225, 227, 230)\">Какой вариант является пространством имен, который включает в себя стандартную библиотеку C++.</span></p>', '{\"1\":\"std\",\"2\":\"stdlib\",\"3\":\"standard\"}', '1'),
(2, 138, 'klgfl;gmfdsg;fdsm;gds', '<p class=\"markdown-p\">kgfmg;fdms;lgfds</p>', '{\"1\":\",glfdm\'lgfds\'lmgfds\",\"2\":\"gfkng,fdsgnfds\"}', '2'),
(2, 145, 'Test lesson 1 of the block 1', 'Content h1. Content text', '[]', ''),
(2, 146, 'Test lesson 2 of the block 1', 'let a <code>=</code> 10;', '[]', ''),
(2, 148, 'aasjds', '', '[]', ''),
(2, 149, 'Welcome to the world of C++', '<p class=\"markdown-p\">C++ is a popular cross-platform programming language that is used to create high-performance programs - operating systems, browsers, video games, graphical applications, etc.</p><blockquote class=\"markdown-blockquote\"><p class=\"markdown-p\"><span style=\"color: rgb(255, 255, 255)\">C++ is inherited from the C programming language, and is based on it in many aspects.</span></p></blockquote>', '[]', ''),
(2, 150, 'What is C++?', '<p class=\"markdown-p\">C++ is...</p>', '{\"1\":\"Client-side scripting programming language\",\"2\":\"General purpose programming language\",\"3\":\"Video creation program\"}', '2'),
(2, 151, 'Project Template', '<p class=\"markdown-p\">A C++ program is a set of <strong>commands</strong> and <strong>expressions</strong>. Below is a simple C++ program template:</p><pre class=\"project__file-code tiptap-code-editor scroll \"><code class=\"language-cpp\">#include &lt;iostream&gt;\nusing namespace std;\n\nint main()\n\n{\n\n  return 0;\n\n}</code></pre><p class=\"markdown-p\">You will learn what each expression does in the following lessons. For now, remember, the entry point of every C++ program is the <strong>main()</strong> function, regardless of what the program does.</p>', '[]', ''),
(2, 152, 'What is the entry point to the program', '<p class=\"markdown-p\">Which option is the entry point of each C++ program?</p>', '{\"1\":\"int main()\",\"2\":\"using namespace std;\",\"3\":\"#include <iostream>\"}', '1'),
(2, 153, 'Your first C++ program', '<p class=\"markdown-p\">Let\'s put \"Hello world\" on the screen!</p><p class=\"markdown-p\">To do this, we will add the string cout &lt;&lt; \"Hello world!\"; to the body of our main() function:</p><pre class=\"project__file-code tiptap-code-editor scroll \"><code class=\"language-cpp\">#include &lt;iostream&gt; \nusing namespace std;  \nint main() {\n   cout &lt;&lt; \"Hello world!\";\n   cout &lt;&lt; \" This \" &lt;&lt; \"is \" &lt;&lt; \"awesome!\";\n   return 0;\n}</code></pre><p class=\"markdown-p\">The result of the program will be: </p><pre class=\"project__file-code tiptap-code-editor scroll \"><code class=\"language-textplain\">Hello world! This is awesome!</code></pre><p class=\"markdown-p\">In most software environments, standard output is displayed by default. In C++, the cout object is used to access the output stream.</p><p class=\"markdown-p\">cout is used in combination with the insert operator &lt;&lt;.</p><p class=\"markdown-p\">You can add many insertion statements after cout.</p><blockquote class=\"markdown-blockquote\"><p class=\"markdown-p\">In C++, a semicolon is used to complete an expression. Each expression must end with a semicolon. This indicates the end of the logical expression.</p></blockquote>', '[]', ''),
(2, 154, 'Print Hello World', '<p class=\"markdown-p\">Drag and drop from the options listed below to output \"Hello, world!\" on the screen:</p><p class=\"markdown-p\"><code class=\"markdown-inline-block-code\">cout</code> <code class=\"markdown-inline-block-code\">&lt;&lt;</code> \"Hello, world!\";</p>', '[]', ''),
(2, 155, 'Practice is the key to success', '', '[]', ''),
(2, 156, 'How does each expression end?', '<p class=\"markdown-p\"><span style=\"color: rgb(225, 227, 230)\">Each expression must end with:</span></p>', '{\"1\":\"colon ( : )\",\"2\":\"dot ( . )\",\"3\":\"semicolon ( ; )\",\"4\":\"comma ( , )\"}', '3'),
(2, 159, 'Headlines', '<p class=\"markdown-p\">C++ offers various headers, each of which contains the necessary information for the correct operation of programs.</p><p class=\"markdown-p\">We have already encountered the standard &lt;iostream&gt; header in our first C++ program:</p><pre class=\"project__file-code tiptap-code-editor scroll \"><code class=\"language-cpp\">#include &lt;iostream&gt;\nusing namespace std;\n\nint main()\n{\ncout &lt;&lt; \"Hello world!\";\nreturn 0;\n}</code></pre><p class=\"markdown-p\">#include is used to add standard or custom headers to the program.</p><blockquote class=\"markdown-blockquote\"><p class=\"markdown-p\">The &lt;iostream&gt; header file controls the standard I/O flow of information.</p></blockquote>', '[]', ''),
(2, 160, 'What is the right way?', '<p class=\"markdown-p\"><span style=\"color: rgb(225, 227, 230)\">Drag and drop from the options listed below to include the &lt;iostream&gt; header:</span></p><p class=\"markdown-p\"><span style=\"color: rgb(225, 227, 230)\">#</span><code class=\"markdown-inline-block-code\">include</code><span style=\"color: rgb(225, 227, 230)\"> &lt;</span><code class=\"markdown-inline-block-code\">iostream</code><span style=\"color: rgb(225, 227, 230)\">&gt;</span></p>', '[]', ''),
(2, 161, 'Namespaces', '<p class=\"markdown-p\">A namespace is a declarative area that provides a space for identifiers (element names) inside it.</p><p class=\"markdown-p\">In our program, the string using namespace std; tells the compiler to use the std (Standard) namespace.</p><pre class=\"project__file-code tiptap-code-editor scroll \"><code class=\"language-cpp\">#include &lt;iostream&gt;\nusing namespace std;\n\nint main() {\n\n    cout &lt;&lt; \"Hello world!\";\n    return 0;\n}</code></pre><blockquote class=\"markdown-blockquote\"><p class=\"markdown-p\">The std namespace includes features of the C++ Standard Library.</p></blockquote>', '[]', ''),
(2, 162, 'Стандартная библиотека C++', '<p class=\"markdown-p\">Which option is a namespace that includes the standard C++ library.</p>', '{\"1\":\"standard\",\"2\":\"std\",\"3\":\"stdlib\"}', '2');

-- --------------------------------------------------------

--
-- Структура таблицы `typestepcourse`
--

CREATE TABLE `typestepcourse` (
  `id` int(10) UNSIGNED NOT NULL,
  `code` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `typestepcourse`
--

INSERT INTO `typestepcourse` (`id`, `code`) VALUES
(1, 'theory'),
(2, 'input-data'),
(3, 'few-answer'),
(4, 'one-answer'),
(5, 'task');

-- --------------------------------------------------------

--
-- Структура таблицы `typestepcourse_description`
--

CREATE TABLE `typestepcourse_description` (
  `language_id` int(10) UNSIGNED NOT NULL,
  `typestepcourse_id` int(10) UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `typestepcourse_description`
--

INSERT INTO `typestepcourse_description` (`language_id`, `typestepcourse_id`, `title`) VALUES
(2, 1, 'Theory'),
(1, 1, 'Теория'),
(2, 2, 'Input data'),
(1, 2, 'Ввод данных'),
(2, 3, 'Choosing multiple options'),
(1, 3, 'Выбор нескольких вариантов'),
(2, 4, 'Choosing one option'),
(1, 4, 'Выбор одного варианта'),
(2, 5, 'Task binding'),
(1, 5, 'Привязка задачи');

-- --------------------------------------------------------

--
-- Структура таблицы `user`
--

CREATE TABLE `user` (
  `id` int(10) UNSIGNED NOT NULL,
  `username` varchar(255) NOT NULL,
  `mail` varchar(255) NOT NULL,
  `second_mail` varchar(255) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `avatar_img` varchar(255) DEFAULT NULL,
  `heading_img` varchar(255) DEFAULT NULL,
  `about_user` text DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `country_address` varchar(255) DEFAULT NULL,
  `date_of_registration` date NOT NULL DEFAULT current_timestamp(),
  `mb_for_project` int(10) UNSIGNED NOT NULL DEFAULT 50,
  `all_profile_private` tinyint(1) NOT NULL DEFAULT 0,
  `personal_info_private` tinyint(1) NOT NULL DEFAULT 0,
  `look_current_course_private` tinyint(1) NOT NULL DEFAULT 0,
  `role` varchar(255) NOT NULL DEFAULT 'user',
  `activation_code` varchar(255) DEFAULT NULL,
  `change_code` varchar(255) DEFAULT NULL,
  `is_activated` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `user`
--

INSERT INTO `user` (`id`, `username`, `mail`, `second_mail`, `password`, `avatar_img`, `heading_img`, `about_user`, `last_name`, `first_name`, `country_address`, `date_of_registration`, `mb_for_project`, `all_profile_private`, `personal_info_private`, `look_current_course_private`, `role`, `activation_code`, `change_code`, `is_activated`) VALUES
(1, 'admin1', 'admin1@mail.ru', 'admin@second.ru', '$2y$10$bmsbwRyKiHqGhsao1NKS0.3zNBmeSholPNPs6dzRbt9ngrEud5D4.', '/public/uploads/ava5.jpg', '/public/uploads/head1.jpg', 'Первый админ на сайте', 'First', 'Admin', 'Россия', '2023-02-01', 50, 0, 0, 1, 'admin', NULL, NULL, 1),
(2, 'user1', 'user1@mail.ru', 'admin@second.ru', '$2y$10$gWzhNmoueqVcAjR7xxE6pey1b8E0ibMcoiON6LnjQ27AuGcUNZglq', 'http://api.pro-learn.my/public/uploads/profile/user1/2024/05/plug_img_blog.jpg', '', 'Первый пользователь', 'First', 'User32', 'Россия', '2023-05-10', 50, 0, 1, 1, 'user', NULL, NULL, 1),
(3, 'admin2', 'admin2@mail.ru', 'admin2@secondmail.ru', '$2y$10$l5LGx0FR2SIMPZca8fjfquZSRjGDS1Dc/BAmqmYWoQTAvqImhF.p6', '/public/uploads/ava2.jpg', '/public/uploads/heading2.jpg', 'это второй админ', 'второй', 'админ', 'Россия', '2023-05-17', 50, 1, 1, 1, 'admin', NULL, NULL, 0),
(4, 'admin3\r\n', 'admin3@mail.ru', 'admin3@secondmail.ru', '$2y$10$bNgYXU/KOi6kRuf8jDD1segXKQXlSa8YGC5tIydQ.qunDOzW8jfHO', '/public/uploads/ava2.jpg', '/public/uploads/heading2.jpg', 'это третий админ\r\n', 'третий', 'админ', 'Россия', '2023-05-17', 50, 1, 1, 1, 'admin', NULL, NULL, 0),
(5, 'user2', 'user2@mail.ru', 'user2@secondmail.ru', '$2y$10$bNgYXU/KOi6kRuf8jDD1segXKQXlSa8YGC5tIydQ.qunDOzW8jfHO', '/public/uploads/ava2.jpg', '/public/uploads/heading2.jpg', 'это второй пользователь', 'второй', 'пользователь', 'Россия', '2023-05-12', 50, 1, 1, 0, 'user', NULL, NULL, 0),
(6, 'user3', 'user3@mail.ru', 'user3@secondmail.ru', '$2y$10$bNgYXU/KOi6kRuf8jDD1segXKQXlSa8YGC5tIydQ.qunDOzW8jfHO', '/public/uploads/ava2.jpg', '/public/uploads/heading2.jpg', 'это третий пользователь\r\n', 'третий', 'пользователь', 'Россия', '2023-05-15', 200, 0, 1, 0, 'user', NULL, NULL, 0),
(7, 'user4', 'user4@mail.ru', 'user4@secondmail.ru', '$2y$10$bNgYXU/KOi6kRuf8jDD1segXKQXlSa8YGC5tIydQ.qunDOzW8jfHO', '/public/uploads/ava2.jpg', '/public/uploads/heading2.jpg', 'это четвертый пользователь', 'четвертый', 'пользователь', 'Россия', '2023-05-20', 50, 0, 0, 0, 'user', NULL, NULL, 0),
(9, 's', 's@mail.ru', 's@mail.ru', 's', 's', NULL, 's', 's', 's', 's', '2023-06-21', 50, 1, 0, 0, 'user', NULL, NULL, 0),
(13, 'SaveLuciferR', 'cmudrec@mail.ru', NULL, '$2y$10$Xhc7UzRhhAN8JeCS/bZuy.sP9Ekyet1o.285hNHoqZ2BBhTAktnjK', '', '', 'Изучаю Fullstack-разработку на PHP и ReactJS', 'Моисеев', 'Дмитрий', 'Россия', '2024-05-03', 50, 0, 0, 0, 'user', NULL, NULL, 1),
(14, 'LowQwQRoby', 'eltiobvs@gmail.com', NULL, '$2y$10$sTMzdJWs/xJMpLiRIsCVAON0BrYGvJqyxOy0/Z/wBzm6CvHGRDJnq', '', '', 'все что я умею в этой жизни это дышать.', 'Мокеева', 'Дарья', 'Россия', '2024-05-03', 50, 0, 0, 0, 'user', NULL, NULL, 1),
(16, 'save', 'cmudrec@bk.ru', NULL, '$2y$10$Bd0xyYCoFuwbYwsNyg0hB.wvayKLOsm7PaMQ8rYzejTaqcoy7xjL6', NULL, NULL, NULL, NULL, NULL, NULL, '2024-05-18', 50, 0, 0, 0, 'user', NULL, NULL, 1);

-- --------------------------------------------------------

--
-- Структура таблицы `user_challenge`
--

CREATE TABLE `user_challenge` (
  `user_id` int(10) UNSIGNED NOT NULL,
  `challenge_id` int(10) UNSIGNED NOT NULL,
  `project_id` int(11) UNSIGNED DEFAULT NULL,
  `success` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `user_challenge`
--

INSERT INTO `user_challenge` (`user_id`, `challenge_id`, `project_id`, `success`) VALUES
(1, 1, 68, 0),
(1, 27, 73, 1),
(2, 27, NULL, 0),
(2, 28, 80, 0);

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
(1, 47, 0, 7, 1),
(2, 1, 0, 2, 2),
(2, 25, 0, 0, 0),
(2, 45, 0, 0, 0),
(2, 47, 0, 7, 1);

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `blog`
--
ALTER TABLE `blog`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UniqueSlug` (`slug`),
  ADD KEY `blog_user` (`user_id`),
  ADD KEY `status_id` (`status_id`);

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
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `code` (`code`);

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
  ADD KEY `User_ID` (`user_id`),
  ADD KEY `challenge_ibfk_2` (`project_id`),
  ADD KEY `status_id` (`status_id`),
  ADD KEY `template_id` (`template_id`);

--
-- Индексы таблицы `challengetag`
--
ALTER TABLE `challengetag`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `challenge_categorylangprog`
--
ALTER TABLE `challenge_categorylangprog`
  ADD PRIMARY KEY (`category_prog_ID`,`lang_prog_id`,`challenge_id`),
  ADD KEY `Challenge_ID` (`challenge_id`),
  ADD KEY `LangProg_ID` (`lang_prog_id`);

--
-- Индексы таблицы `challenge_challengetag`
--
ALTER TABLE `challenge_challengetag`
  ADD KEY `challenge_id` (`challenge_id`),
  ADD KEY `challengetag_id` (`challengetag_id`);

--
-- Индексы таблицы `challenge_description`
--
ALTER TABLE `challenge_description`
  ADD PRIMARY KEY (`language_id`,`challenge_id`),
  ADD KEY `Challenge_ID` (`challenge_id`);

--
-- Индексы таблицы `challenge_mark`
--
ALTER TABLE `challenge_mark`
  ADD KEY `challenge_id` (`challenge_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Индексы таблицы `course`
--
ALTER TABLE `course`
  ADD PRIMARY KEY (`id`),
  ADD KEY `User_ID` (`user_id`),
  ADD KEY `status_id` (`status_id`);

--
-- Индексы таблицы `coursetag`
--
ALTER TABLE `coursetag`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `course_categorylangprog`
--
ALTER TABLE `course_categorylangprog`
  ADD PRIMARY KEY (`course_id`,`lang_Prog_id`,`category_prog_id`),
  ADD KEY `CategoryProg_ID` (`category_prog_id`),
  ADD KEY `LangProg_ID` (`lang_Prog_id`);

--
-- Индексы таблицы `course_coursetag`
--
ALTER TABLE `course_coursetag`
  ADD KEY `course_id` (`course_id`),
  ADD KEY `coursetag_id` (`coursetag_id`);

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
  ADD KEY `user_id` (`user_id`),
  ADD KEY `status_id` (`status_id`);

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
-- Индексы таблицы `inputoutputdata`
--
ALTER TABLE `inputoutputdata`
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
-- Индексы таблицы `projecttemplate`
--
ALTER TABLE `projecttemplate`
  ADD PRIMARY KEY (`id`),
  ADD KEY `projecttemplate_ibfk_1` (`user_id`);

--
-- Индексы таблицы `projecttemplate_description`
--
ALTER TABLE `projecttemplate_description`
  ADD PRIMARY KEY (`language_id`,`projecttemplate_id`),
  ADD KEY `projecttemplate_description_ibfk_2` (`projecttemplate_id`);

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
  ADD UNIQUE KEY `user_id_2` (`user_id`,`ip_address`),
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
-- Индексы таблицы `status`
--
ALTER TABLE `status`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `status_description`
--
ALTER TABLE `status_description`
  ADD KEY `language_id` (`language_id`),
  ADD KEY `status_id` (`status_id`);

--
-- Индексы таблицы `stepcourse`
--
ALTER TABLE `stepcourse`
  ADD PRIMARY KEY (`id`),
  ADD KEY `StageCourse_ID` (`stage_course_id`),
  ADD KEY `challenge_id` (`challenge_id`),
  ADD KEY `stepcourse_ibfk_2` (`typestepcourse_id`);

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
  ADD KEY `language_id` (`language_id`),
  ADD KEY `typestepcourse_id` (`typestepcourse_id`);

--
-- Индексы таблицы `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UniqueMail` (`mail`) USING BTREE,
  ADD UNIQUE KEY `UniqueUsername` (`username`);

--
-- Индексы таблицы `user_challenge`
--
ALTER TABLE `user_challenge`
  ADD PRIMARY KEY (`user_id`,`challenge_id`),
  ADD KEY `Challenge_ID` (`challenge_id`),
  ADD KEY `project_id` (`project_id`);

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
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT для таблицы `challengetag`
--
ALTER TABLE `challengetag`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT для таблицы `course`
--
ALTER TABLE `course`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;

--
-- AUTO_INCREMENT для таблицы `coursetag`
--
ALTER TABLE `coursetag`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT для таблицы `documentation`
--
ALTER TABLE `documentation`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT для таблицы `Feedback`
--
ALTER TABLE `Feedback`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT для таблицы `Feedbackcategory`
--
ALTER TABLE `Feedbackcategory`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

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
-- AUTO_INCREMENT для таблицы `inputoutputdata`
--
ALTER TABLE `inputoutputdata`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT для таблицы `language`
--
ALTER TABLE `language`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT для таблицы `project`
--
ALTER TABLE `project`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=82;

--
-- AUTO_INCREMENT для таблицы `projecttemplate`
--
ALTER TABLE `projecttemplate`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT для таблицы `session`
--
ALTER TABLE `session`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT для таблицы `stagecourse`
--
ALTER TABLE `stagecourse`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=75;

--
-- AUTO_INCREMENT для таблицы `status`
--
ALTER TABLE `status`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT для таблицы `stepcourse`
--
ALTER TABLE `stepcourse`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=182;

--
-- AUTO_INCREMENT для таблицы `typestepcourse`
--
ALTER TABLE `typestepcourse`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT для таблицы `user`
--
ALTER TABLE `user`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `blog`
--
ALTER TABLE `blog`
  ADD CONSTRAINT `blog_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `blog_ibfk_2` FOREIGN KEY (`status_id`) REFERENCES `status` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
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
  ADD CONSTRAINT `challenge_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `challenge_ibfk_2` FOREIGN KEY (`project_id`) REFERENCES `project` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `challenge_ibfk_3` FOREIGN KEY (`status_id`) REFERENCES `status` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `challenge_ibfk_4` FOREIGN KEY (`template_id`) REFERENCES `projecttemplate` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `challenge_categorylangprog`
--
ALTER TABLE `challenge_categorylangprog`
  ADD CONSTRAINT `challenge_categorylangprog_ibfk_1` FOREIGN KEY (`category_prog_ID`) REFERENCES `categoryprog` (`id`),
  ADD CONSTRAINT `challenge_categorylangprog_ibfk_2` FOREIGN KEY (`challenge_id`) REFERENCES `challenge` (`id`),
  ADD CONSTRAINT `challenge_categorylangprog_ibfk_3` FOREIGN KEY (`lang_prog_id`) REFERENCES `langprog` (`id`);

--
-- Ограничения внешнего ключа таблицы `challenge_challengetag`
--
ALTER TABLE `challenge_challengetag`
  ADD CONSTRAINT `challenge_challengetag_ibfk_1` FOREIGN KEY (`challenge_id`) REFERENCES `challenge` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `challenge_challengetag_ibfk_2` FOREIGN KEY (`challengetag_id`) REFERENCES `challengetag` (`id`);

--
-- Ограничения внешнего ключа таблицы `challenge_description`
--
ALTER TABLE `challenge_description`
  ADD CONSTRAINT `challenge_description_ibfk_1` FOREIGN KEY (`language_id`) REFERENCES `language` (`id`),
  ADD CONSTRAINT `challenge_description_ibfk_2` FOREIGN KEY (`challenge_id`) REFERENCES `challenge` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `challenge_mark`
--
ALTER TABLE `challenge_mark`
  ADD CONSTRAINT `challenge_id` FOREIGN KEY (`challenge_id`) REFERENCES `challenge` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `course`
--
ALTER TABLE `course`
  ADD CONSTRAINT `course_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `course_ibfk_2` FOREIGN KEY (`status_id`) REFERENCES `status` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `course_categorylangprog`
--
ALTER TABLE `course_categorylangprog`
  ADD CONSTRAINT `course_categorylangprog_ibfk_1` FOREIGN KEY (`category_prog_id`) REFERENCES `categoryprog` (`id`),
  ADD CONSTRAINT `course_categorylangprog_ibfk_2` FOREIGN KEY (`course_id`) REFERENCES `course` (`id`),
  ADD CONSTRAINT `course_categorylangprog_ibfk_3` FOREIGN KEY (`lang_Prog_id`) REFERENCES `langprog` (`id`);

--
-- Ограничения внешнего ключа таблицы `course_coursetag`
--
ALTER TABLE `course_coursetag`
  ADD CONSTRAINT `course_id` FOREIGN KEY (`course_id`) REFERENCES `course` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `coursetag_id` FOREIGN KEY (`coursetag_id`) REFERENCES `coursetag` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `course_description`
--
ALTER TABLE `course_description`
  ADD CONSTRAINT `course_description_ibfk_1` FOREIGN KEY (`course_id`) REFERENCES `course` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
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
  ADD CONSTRAINT `feedback_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `feedback_ibfk_3` FOREIGN KEY (`status_id`) REFERENCES `status` (`id`);

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
-- Ограничения внешнего ключа таблицы `inputoutputdata`
--
ALTER TABLE `inputoutputdata`
  ADD CONSTRAINT `inputoutputdata_ibfk_1` FOREIGN KEY (`challenge_id`) REFERENCES `challenge` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `project`
--
ALTER TABLE `project`
  ADD CONSTRAINT `project_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

--
-- Ограничения внешнего ключа таблицы `projecttemplate`
--
ALTER TABLE `projecttemplate`
  ADD CONSTRAINT `projecttemplate_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

--
-- Ограничения внешнего ключа таблицы `projecttemplate_description`
--
ALTER TABLE `projecttemplate_description`
  ADD CONSTRAINT `projecttemplate_description_ibfk_1` FOREIGN KEY (`language_id`) REFERENCES `language` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `projecttemplate_description_ibfk_2` FOREIGN KEY (`projecttemplate_id`) REFERENCES `projecttemplate` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

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
  ADD CONSTRAINT `stagecourse_ibfk_1` FOREIGN KEY (`course_id`) REFERENCES `course` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `stagecourse_description`
--
ALTER TABLE `stagecourse_description`
  ADD CONSTRAINT `stagecourse_description_ibfk_1` FOREIGN KEY (`language_id`) REFERENCES `language` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `stagecourse_description_ibfk_2` FOREIGN KEY (`stage_course_id`) REFERENCES `stagecourse` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `status_description`
--
ALTER TABLE `status_description`
  ADD CONSTRAINT `status_description_ibfk_1` FOREIGN KEY (`language_id`) REFERENCES `language` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `status_description_ibfk_2` FOREIGN KEY (`status_id`) REFERENCES `status` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `stepcourse`
--
ALTER TABLE `stepcourse`
  ADD CONSTRAINT `stepcourse_ibfk_1` FOREIGN KEY (`stage_course_id`) REFERENCES `stagecourse` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `stepcourse_ibfk_2` FOREIGN KEY (`typestepcourse_id`) REFERENCES `typestepcourse` (`id`),
  ADD CONSTRAINT `stepcourse_ibfk_3` FOREIGN KEY (`challenge_id`) REFERENCES `challenge` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `stepcourse_description`
--
ALTER TABLE `stepcourse_description`
  ADD CONSTRAINT `stepcourse_description_ibfk_1` FOREIGN KEY (`language_id`) REFERENCES `language` (`id`),
  ADD CONSTRAINT `stepcourse_description_ibfk_2` FOREIGN KEY (`step_course_id`) REFERENCES `stepcourse` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `typestepcourse_description`
--
ALTER TABLE `typestepcourse_description`
  ADD CONSTRAINT `typestepcourse_description_ibfk_1` FOREIGN KEY (`language_id`) REFERENCES `language` (`id`),
  ADD CONSTRAINT `typestepcourse_description_ibfk_2` FOREIGN KEY (`typestepcourse_id`) REFERENCES `typestepcourse` (`id`);

--
-- Ограничения внешнего ключа таблицы `user_challenge`
--
ALTER TABLE `user_challenge`
  ADD CONSTRAINT `user_challenge_ibfk_1` FOREIGN KEY (`challenge_id`) REFERENCES `challenge` (`id`),
  ADD CONSTRAINT `user_challenge_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `user_challenge_ibfk_3` FOREIGN KEY (`project_id`) REFERENCES `project` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

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
