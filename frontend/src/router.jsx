import {createBrowserRouter} from "react-router-dom"
import MainLayout from "./layouts/MainLayout"
import BlogPage from "./pages/BlogPage"
import ProjectPage from "./pages/ProjectPage";

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout/>,
        children: [
            {
                path: '/blog',
                element: <BlogPage/>
            },
            {
                path: '/project',
                element: <ProjectPage/>
            }
        ]
    }
]);

export default router;