import {createBrowserRouter} from "react-router-dom"
import MainLayout from "./layouts/MainLayout"
import BlogPage from "./pages/BlogPage"
import ProjectPage from "./pages/ProjectPage";
import ProjectAddPage from "./pages/ProjectAddPage";
import Login from "./components/Forms/Login";
import CompilerPage from "./pages/CompilerPage";
import AdminLayout from "./layouts/AdminLayout";


const router = createBrowserRouter([
    {
        path: '/admin-panel',
        element: <AdminLayout/>,
        children: [
            {
                path: 'login',
                element: <Login/>
            }
        ]
    },
    {
        path: '/:lang?',
        element: <MainLayout isActiveSidebar={true} isCompiler={false}/>,
        children: [
            {
                path: 'user/login',
                element: <Login isActiveSidebar={false}/>
            },
            {
                path: 'blog',
                element: <BlogPage/>
            },
            {
                path: ':username/project/:project',
                element: <ProjectPage isActiveSidebar={false}/>
            },
            {
                path: ':username/project/add',
                element: <ProjectAddPage isActiveSidebar={false}/>
            },
            {
                path: 'compiler/:username/:project',
                element: <CompilerPage isActiveSidebar={true} isCompiler={true}/>
            }
        ]
    },
]);

export default router;