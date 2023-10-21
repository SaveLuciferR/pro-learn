
import {createBrowserRouter} from "react-router-dom"
import MainLayout from "./layouts/MainLayout"
import BlogPage from "./pages/BlogPage"
import ProjectPage from "./pages/ProjectPage";

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout activeSidebar={true}/>,
        children: [
            {
                path: '/blog',
                element: <BlogPage/>
            },
            {
                path: '/:username/project/:project/',
                element: <ProjectPage activeSidebar={false}/>
            }
        ]
    }
]);

export default router;