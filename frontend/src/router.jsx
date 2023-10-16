import {createBrowserRouter} from "react-router-dom"
import MainLayout from "./layouts/MainLayout"
import BlogMain from "./components/Blog/BlogMain"
import ProjectMain from "./components/Project/ProjectMain";

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout/>,
        children: [
            {
                path: '/blog',
                element: <BlogMain/>
            },
            {
                path: '/project',
                element: <ProjectMain/>
            }
        ]
    }
]);

export default router;