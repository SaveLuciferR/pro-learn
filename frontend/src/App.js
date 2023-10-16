// import logo from './logo.svg';
import axiosClient from "./axiosClient";

import "./App.css";

import "./scss/app.scss"; // Подключение стилей

import {RouterProvider} from "react-router-dom"
import router from "./router"

const App = () => {

  return (
    <>
      <RouterProvider router={router}/>
    </>
  );
};

export default App;
