import { createBrowserRouter } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import BlogPage from './pages/BlogPage';
import ProjectPage from './pages/ProjectPage';
import ProjectAddPage from './pages/ProjectAddPage';
import Login from './components/Forms/Login';
import CompilerPage from './pages/CompilerPage';
import ProfilePage from './pages/ProfilePage';
import ProfileCreatedCourses from './components/Profile/CreatedCourses/CreatedCourses';
import Feedback from './components/Forms/Feedback';
import ProfileMainPage from './components/Profile/MainPage/MainPage';
import ProfileQuestionsMain from './components/Profile/Questions/ProfileQuestionsMain';
import ProfileUserTasks from './components/Profile/UserTasks/ProfileUserTasks';
import ProfileTasks from './components/Profile/UserTasks/ProfileTasks';
import ProfileProjects from './components/Profile/Projects/ProfileProjects';
import ProfileCompletedCourses from './components/Profile/CompletedCourses/CompletedCourses';
import ProfileCurrentCourses from './components/Profile/CurrentCourses/ProfileCurrentCourses';

const router = createBrowserRouter([
  {
    path: '/:lang?',
    element: <MainLayout isActiveSidebar={true} isCompiler={false} />,
    children: [
      {
        path: 'user/login',
        element: <Login isActiveSidebar={false} />,
      },
      {
        path: 'user/feedback',
        element: <Feedback />,
      },
      {
        path: 'blog',
        element: <BlogPage />,
      },
      {
        path: ':username/project/:project',
        element: <ProjectPage isActiveSidebar={false} />,
      },
      {
        path: ':username/project/add',
        element: <ProjectAddPage isActiveSidebar={false} />,
      },
      {
        path: 'compiler/:username/:project',
        element: <CompilerPage isActiveSidebar={true} isCompiler={true} />,
      },
      {
        path: 'profile',
        element: <ProfilePage isActiveSidebar={false} isCompiler={false} />,
        children: [
          {
            path: '',
            element: <ProfileMainPage />,
          },
          {
            path: 'created-courses',
            element: <ProfileCreatedCourses />,
          },
          {
            path: 'questions',
            element: <ProfileQuestionsMain />,
          },
          {
            path: 'user-tasks',
            element: <ProfileUserTasks />,
          },
          {
            path: 'tasks',
            element: <ProfileTasks />,
          },
          {
            path: 'projects',
            element: <ProfileProjects />,
          },
          {
            path: 'completed-courses',
            element: <ProfileCompletedCourses />,
          },
          {
            path: 'current-courses',
            element: <ProfileCurrentCourses />,
          },
        ],
      },
    ],
  },
]);

export default router;
