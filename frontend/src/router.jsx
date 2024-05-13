import { createBrowserRouter } from 'react-router-dom';
import Login from './components/Forms/Login';
import Register from './components/Forms/Register.jsx';
import ForgotPassword from './components/Forms/ForgotPassword';
import ConfirmAccount from './components/Forms/ConfirmAccount';
import MainLayout from './layouts/MainLayout';
import AdminLayout from './layouts/AdminLayout';
import BlogPage from './pages/BlogPage';
import ProjectPage from './pages/ProjectPage';
import ProjectAddPage from './pages/ProjectAddPage';
import CompilerPage from './pages/CompilerPage';
import Feedback from './components/Forms/Feedback';
import ProfilePage from './pages/ProfilePage';
import ProfileCreatedCourses from './components/Profile/CreatedCourses/CreatedCourses';
import ProfileMainPage from './components/Profile/MainPage/ProfileMainPage';
import ProfileQuestionsMain from './components/Profile/Questions/ProfileQuestionsMain';
import ProfileUserTasks from './components/Profile/UserTasks/ProfileUserTasks';
import ProfileTasks from './components/Profile/UserTasks/ProfileTasks';
import ProfileProjects from './components/Profile/Projects/ProfileProjects';
import ProfileCompletedCourses from './components/Profile/CompletedCourses/CompletedCourses';
import ProfileCurrentCourses from './components/Profile/CurrentCourses/ProfileCurrentCourses';
import ProfileSettingsUserPage from './pages/ProfileSettingsUserPage';
import ProfileSettingsPage from './pages/ProfileSettingsPage';
import ProfileSettingsSecurity from './components/Profile/ProfileSettings/ProfileSettingsSecurity';
import ProfileSettingsSessions from './components/Profile/ProfileSettings/ProfileSettingsSessions';
import ProfileSettingsPrivacy from './components/Profile/ProfileSettings/ProfileSettingsPrivacy';
import ProfileSettingsMadeByUser from './components/Profile/ProfileSettings/ProfileSettingsMadeByUser.jsx';
import CoursesPage from './pages/CoursePage';
import CourseSinglePage from './pages/CourseSinglePage';
import CourseStudyPage from './pages/CourseStudyPage';
import CourseCreatePage from './pages/CourseCreatePage';
import TaskPage from './pages/TaskPage';
import TaskCreatePage from './pages/TaskCreatePage';
import TaskSinglePage from './pages/TaskSinglePage';
import AdminPage from './pages/AdminPage';
import AdminBlog from './components/Admin/AdminBlog';
import AdminCourses from './components/Admin/AdminCourses';
import AdminTasks from './components/Admin/AdminTasks.jsx';
import AdminProjects from './components/Admin/AdminProjects.jsx';
import AdminUsers from './components/Admin/AdminUsers.jsx';
import AdminFeedback from './components/Admin/AdminFeedback.jsx';
import NotFoundPage from './components/NotFoundPage';
import MainMenu from './components/MainMenu.jsx';
import TemplateAddPage from "./pages/TemplateAddPage";
import TemplatePage from "./pages/TemplatePage";
import AdminMain from "./components/Admin/AdminMain";
import AdminUserSingle from "./components/Admin/AdminUserSingle";

const router = createBrowserRouter([
  {
    path: '/admin-panel',
    element: <AdminLayout />,
    children: [
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: '',
        element: <AdminPage />,
        children: [
          {
            path: '',
            element: <AdminMain/>
          },
          {
            path: 'blog',
            element: <AdminBlog />,
          },
          {
            path: 'courses',
            element: <AdminCourses />,
          },
          {
            path: 'tasks',
            element: <AdminTasks />,
          },
          {
            path: 'projects',
            element: <AdminProjects />,
          },
          {
            path: 'users',
            children: [
              {
                path: '',
                element: <AdminUsers />,
              },
              {
                path: ':username',
                element: <AdminUserSingle/>
              }
            ]
          },
          {
            path: 'feedback',
            element: <AdminFeedback />,
          },
        ],
      },
      {
        path: 'course-creation',
        element: <CourseCreatePage />,
      },
      {
        path: 'task-creation',
        element: <TaskCreatePage />,
      },
    ],
  },

  {
    path: '/:lang?',
    element: <MainLayout isActiveSidebar={true} isCompiler={false} />,
    children: [
      {
        path: '',
        element: <MainMenu isActiveSidebar={false} />,
      },
      {
        path: 'user/login',
        element: <Login isActiveSidebar={false} />,
      },
      {
        path: 'user/register',
        element: <Register isActiveSidebar={false} />,
      },
      {
        path: 'user/forgot-password',
        element: <ForgotPassword isActiveSidebar={false} />,
      },
      {
        path: 'user/confirm-account',
        element: <ConfirmAccount isActiveSidebar={false} />,
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
        path: 'profile/:username',
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
            path: 'templates',
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
      {
        path: 'profile/:username/course-creation',
        element: <CourseCreatePage />,
      },
      {
        path: 'profile/:username/course-edit/:slug',
        element: <CourseCreatePage type={'edit'} />,
      },
      {
        path: 'profile/:username/task-creation',
        element: <TaskCreatePage />,
      },
      {
        path: 'profile/:username/task-edit/:slug',
        element: <TaskCreatePage type={'edit'} />,
      },
      {
        path: 'profile/:username/project/:project',
        element: <ProjectPage isActiveSidebar={false} />,
      },
      {
        path: 'profile/:username/project-creation',
        element: <ProjectAddPage isActiveSidebar={false} />,
      },
      {
        path: 'profile/:username/project-edit/:slug',
        element: <ProjectAddPage isActiveSidebar={false} type={'edit'} />,
      },
      {
        path: 'profile/:username/template/:template',
        element: <TemplatePage isActiveSidebar={false}/>,
      },
      {
        path: 'profile/:username/template-creation',
        element: <TemplateAddPage isActiveSidebar={false}/>,
      },
      {
        path: 'profile/:username/template-edit/:slug',
        element: <TemplateAddPage isActiveSidebar={false} type={'edit'}/>,
      },
      {
        path: 'profile/:username/settings/general',
        element: <ProfileSettingsUserPage />,
      },
      {
        path: 'profile/:username/settings',
        element: <ProfileSettingsPage />,
        children: [
          {
            path: 'security',
            element: <ProfileSettingsSecurity />,
          },
          {
            path: 'sessions',
            element: <ProfileSettingsSessions />,
          },
          {
            path: 'privacy',
            element: <ProfileSettingsPrivacy />,
          },
          {
            path: 'creations',
            element: <ProfileSettingsMadeByUser />,
          },
        ],
      },
      {
        path: 'course',
        element: <CoursesPage />,
      },
      {
        path: 'course/:slug',
        element: <CourseSinglePage />,
      },
      {
        path: 'course/:slug/study',
        element: <CourseStudyPage />,
      },
      {
        path: 'task',
        element: <TaskPage isActiveSidebar={true} isCompiler={false} />,
      },
      {
        path: 'task/:slug',
        element: <TaskSinglePage />,
      },
      {
        path: 'compiler/:username/:project',
        element: <CompilerPage isSolve={false} isCompiler={true} isActiveSidebar={true} />,
      },
      {
        path: 'compiler-task/:username/:project/:task',
        element: <CompilerPage isSolve={true} isCompiler={true} isActiveSidebar={true} />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);

export default router;
