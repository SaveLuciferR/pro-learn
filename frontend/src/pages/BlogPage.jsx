import { useEffect } from 'react'; //Подключение хука для соединения с беком
import BlogMain from '../components/Blog/BlogMain'; //Подключение компонента со всеми статьями
// import BestBlogCard from "../components/Blog/BestBlogSlider/BestBlogCard";//Подключение компонента с лучшими статьями
import axiosClient from '../axiosClient';
import BestBlogSlider from '../components/Blog/BestBlogSlider/BestBlogSlider';
//Клиент соединения с беком

const BlogPage = () => {
  useEffect(() => {
    //Проверка на то, работает ли бек
    axiosClient.post('/blog').then(({ data }) => {
      // console.log(data.allBlogs);
    });
  }, []);

  return (
    <>
      <div className="maincontent">
        <div className="maincontent_container">
          {' '}
          {/* Контейнер */}
          <div className="maincontent_maintext">
            {' '}
            {/* Главный текст страницы */}
            <h1 className="maincontent__title">Статьи</h1>
            <h4 className="maincontent_category">&gt; Лучшие статьи на этой неделе</h4>
          </div>
          <BestBlogSlider autoPlay={true} autoPlayTime={10000} />{' '}
          {/* Вызов компонента с лучшими статьями */}
        </div>
        <BlogMain />
        {/* Вызов компонента со всеми статьями */}
      </div>
    </>
  );
};

export default BlogPage;
