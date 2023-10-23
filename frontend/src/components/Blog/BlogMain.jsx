import { useEffect, useState } from "react";//Подключение хуков
import BlogCard from "./BlogCard";//Карточка статьи
import BlogFilter from "./BlogFilter";//Фильтр для страницы со статьями
import axiosClient from "../../axiosClient";//Соединение с беком

const BlogMain = () => {//Страница со всеми статьями
  const [items, setItems] = useState([]);//State для основного контента с бека
  const [activeFilter, setActiveFilter] = useState(false);//State для работы фильтра

  useEffect(() => {//Effect, который получает данные с бека
    axiosClient.post("/blog").then(({ data }) => {
      // console.log(setItems(data.allBlogs));
      setItems(data.allBlogs);
    });
  }, []);

  const blogs = items.map((item) => <BlogCard key={item.id} {...item} />);//Прогонка по каждому массиву данных

  return (
    <>
      <div>
        <div className="maincontent_maintext">
          <div className="maincontent_maintitle">
            <h4 className="maincontent_category"> &gt; Все статьи</h4>
            <button type="button"
                    onClick={() => setActiveFilter(true)}
                    className="maincontent_filter">Фильтр{/* При клике меняется state */}
              <svg
                width="22"
                height="20"
                viewBox="0 0 22 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21 1H1L9 10.46V17L13 19V10.46L21 1Z"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>{/* Иконка фильтра */}
            </button>
          </div>
        </div>
        <div className="maincontent_allarticle">{blogs}</div>
      </div>
      <BlogFilter currentFilter={activeFilter} activeFilter={(state) => setActiveFilter(state)}/>
      {/* Пояснение: в компонент передаются параметры в виде переменной и функции в которой
      находятся state и setState, которые уже используются в другом компоненте, но под видом простых
      перемменных\функций */}
    </>
  );
};

export default BlogMain;
