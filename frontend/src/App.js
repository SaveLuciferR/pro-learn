import { RouterProvider } from "react-router-dom"
import './scss/app.scss'
import router from "./router"

const App = () => {

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
