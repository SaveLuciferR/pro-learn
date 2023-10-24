
import {createBrowserRouter} from "react-router-dom"
import MainLayout from "./layouts/MainLayout"
import BlogPage from "./pages/BlogPage"
import ProjectPage from "./pages/ProjectPage";
import ProjectAddPage from "./pages/ProjectAddPage";
import CompilerPage from "./pages/CompilerPage";

const router = createBrowserRouter([
    {
        path: '/:lang?',
        element: <MainLayout activeSidebar={true}/>,
        children: [
            {
                path: 'blog',
                element: <BlogPage/>
            },
            {
                path: ':username/project/:project',
                element: <ProjectPage activeSidebar={false}/>
            },
            {
                path: ':username/project/add',
                element: <ProjectAddPage activeSidebar={false}/>
            },
            {
                path: 'compiler',
                element: <CompilerPage />
            }
        ]
    }
]);

export default router;