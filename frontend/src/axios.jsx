import axios from "axios";
import { useState, useEffect } from "react";

const axiosClient = axios.create({
  baseURL: `http://pro-learn`,
});

function TestGet() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    axiosClient.post("/blog").then(({data}) => {
      console.log(data.allBlogs);
      // setArticles(data.allBlogs);
    });
  }, []);

  axiosClient
    .post("/blog/hello-world")
    .then(({ data }) => {
      // console.log(data);
      // console.log(data.allBlogs);
      // data.allBlogs.map(element => {
      //   if (element.popular == 1) console.log(element);
      // })
    })
    .catch((err) => {
      console.log(err);
    });
  return <></>;
}

export default TestGet;
