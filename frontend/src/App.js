// import logo from './logo.svg';
import axios from "axios";

import "./App.css";

import "./scss/app.scss"; // Подключение стилей

import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import BlogPage from "./pages/BlogPage";

const axiosClient = axios.create({
  baseURL: `http://pro-learn`,
});

const App = () => {
  function testGet() {
    axiosClient
      .post("/savelucifer/project/sss")
      .then(({ data }) => {
        console.log(data);
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

  return (
    <>
      <Header />
      <Sidebar />
      <BlogPage />
    </>
  );
};

export default App;
