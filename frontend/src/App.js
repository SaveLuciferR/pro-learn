// import logo from './logo.svg';
import "./App.css";
import axios from "axios";
import React, {useState, useEffect} from "react";

import "./scss/app.scss"; // Подключение стилей

import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import AllArticlesMain from "./components/All_Articles/AllArticlesMain";
import TestGet from "./axios";

const axiosClient = axios.create({
  baseURL: `http://pro-learn`,
});

const App = () => {
  
  const [articles, setArticles] = useState([]);
  
  useEffect(() => {
    axiosClient
      .get(axiosClient.baseURL)
      .then(data => {
        setArticles(data.allBlogs);
      })
  }, []);

  function testGet() {
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
  }

  testGet();
const datatest = () => {
  
}

  return (
    <div>
      <TestGet/>
      {/* {articles.map(article => {
        return (
          
        )
      })} */}
      {/* <Header />
      <Sidebar />
      <AllArticlesMain /> */}
    </div>
  );
};

export default App;
