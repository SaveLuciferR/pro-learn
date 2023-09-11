// import logo from './logo.svg';
import "./App.css";
import axios from "axios";

import "./scss/app.scss"; // Подключение стилей

import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

const axiosClient = axios.create({
  baseURL: `http://pro-learn`,
});

const App = () => {
  function testGet() {
    axiosClient
      .post("/blog/hello-world")
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
    <div>
      <Header />
      <Sidebar />
    </div>
  );
};

export default App;
