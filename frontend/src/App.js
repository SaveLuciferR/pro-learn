// import logo from './logo.svg';
import "./App.css";

import "./scss/app.scss"; // Подключение стилей

import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import BlogPage from "./pages/BlogPage";

const App = () => {

  return (
    <>
      <Header />
      <Sidebar />
      <BlogPage />
    </>
  );
};

export default App;
