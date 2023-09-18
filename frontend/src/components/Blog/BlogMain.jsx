import { useEffect, useState } from "react";
import BlogCard from "./BlogCard";
import axiosClient from "../../axoisClient";

const AllArticles = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axiosClient.post("/blog").then(({data}) => {
      console.log(setItems(data.allBlogs));
      setItems(data.allBlogs);
    });
  }, [])

  const blogs = items.map((item) => <BlogCard key ={item.id} {...item} />)
  return (
    <div>
      <div className="maincontent_maintext">
      <div className="maincontent_maintitle">
        <h4 className="maincontent_category"> &gt; Все статьи</h4>
        <div className="maincontent_filter">
          <p className="maincontent_filtertext">Фильтр</p>
          {/* <img className="maincontent_filtericon" src="img/filter.svg"> */}
        </div>
      </div>
    </div>
    <div className="maincontent_allarticle">
      {blogs}
      {/* <BlogCard/>
      <BlogCard/>
      <BlogCard/>
      <BlogCard/>
      <BlogCard/>
      <BlogCard/> */}
    </div>
    </div>
  );
};

export default AllArticles;
