import { useEffect, useState } from "react";
import BlogCard from "./BlogCard";
import BlogFilter from "./BlogFilter";
import axiosClient from "../../axiosClient";

const AllArticles = () => {
  const [items, setItems] = useState([]);
  const [activeFilter, setActiveFilter] = useState(false);

  useEffect(() => {
    axiosClient.post("/blog").then(({ data }) => {
      console.log(setItems(data.allBlogs));
      setItems(data.allBlogs);
    });
  }, []);

  const blogs = items.map((item) => <BlogCard key={item.id} {...item} />);

  return (
    <>
      <div>
        <div className="maincontent_maintext">
          <div className="maincontent_maintitle">
            <h4 className="maincontent_category"> &gt; Все статьи</h4>
            <button type="button"
                    onClick={() => setActiveFilter(true)}
                    className="maincontent_filter">Фильтр
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
              </svg>
            </button>
          </div>
        </div>
        <div className="maincontent_allarticle">{blogs}</div>
      </div>
      <BlogFilter currentFilter={activeFilter} activeFilter={(state) => setActiveFilter(state)}/>
    </>
  );
};

export default AllArticles;
