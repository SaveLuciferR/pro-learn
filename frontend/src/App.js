
import "./App.css";

//Recharts, React Trend -- диаграммы
import "./scss/app.scss"; // Подключение стилей

import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
// import BlogPage from "./pages/BlogPage";
import Compiler from "./pages/CompilerPage";

const App = () => {
  return (
    <>
      <Header />
      <Sidebar />
      <Compiler />
    </>
  );
};

export default App;
