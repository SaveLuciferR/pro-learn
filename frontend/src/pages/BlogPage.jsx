import { useEffect } from "react";
import AllArticles from "../components/Blog/BlogMain";
import BestArticles from "../components/Blog/BestBlogCard";
import axiosClient from "../axiosClient";

const BlogPage = () => {
  useEffect(() => {
    axiosClient.post("/blog").then(({ data }) => {
      console.log(data.allBlogs);
    });
  }, []);
  
  return (
    <>
      <div className="maincontent">
        <div className="maincontent_container">
          <div className="maincontent_maintext">
            <h1 className="maincontent__title">Статьи</h1>
            <h4 className="maincontent_category">
              &gt; Лучшие статьи на этой неделе
            </h4>
          </div>
          <BestArticles />
        </div>
        <AllArticles />
      </div>
    </>
  );
};

export default BlogPage;
