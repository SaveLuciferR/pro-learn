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
import CoursesPage from './pages/CoursePage';
import CourseSinglePage from './pages/CourseSinglePage';
import CourseStudyPage from './pages/CourseStudyPage';
import ProfileSettingsUserPage from './pages/ProfileSettingsUserPage';
import ProfileSettingsPage from './pages/ProfileSettingsPage';
import ProfileSettingsSecurity from './components/Profile/ProfileSettings/ProfileSettingsSecurity';
import ProfileSettingsSessions from './components/Profile/ProfileSettings/ProfileSettingsSessions';
import ProfileSettingsPrivacy from './components/Profile/ProfileSettings/ProfileSettingsPrivacy';
import AdminLayout from './layouts/AdminLayout';
import CourseCreatePage from './pages/CourseCreatePage';
import NotFoundPage from './components/NotFoundPage';
import TaskCreatePage from "./pages/TaskCreatePage";
import TaskSinglePage from "./pages/TaskSinglePage";
import Register from './components/Forms/Register';
import ForgotPassword from './components/Forms/ForgotPassword';
import ConfirmAccount from './components/Forms/ConfirmAccount';


const router = createBrowserRouter([
  {
    path: '/admin-panel',
    element: <AdminLayout />,
    children: [
      {
        path: 'login',
        element: <Login />,
      },
    ],
  },
  {
    path: '/:lang?',
    element: <MainLayout isActiveSidebar={true} isCompiler={false} />,
    children: [
      {
        path: 'user/login',
        element: <Login isActiveSidebar={false} />,
      },
      {
        path: 'user/register',
        element: <Register isActiveSidebar={false} />
      },
      {
        path: 'user/forgot-password',
        element: <ForgotPassword isActiveSidebar={false}/>
      },
      {
        path: 'user/confirm-account',
        element: <ConfirmAccount isActiveSidebar={false}/>
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
        element: <CourseCreatePage />
      },
      {
        path: 'profile/:username/course-edit/:slug',
        element: <CourseCreatePage type={'edit'} />
      },
      {
        path: 'profile/:username/task-creation',
        element: <TaskCreatePage />
      },
      {
        path: 'profile/:username/task-edit/:slug',
        element: <TaskCreatePage type={'edit'} />
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
        element: <ProjectPage isActiveSidebar={false} isTemplate={true} />,
      },
      {
        path: 'profile/:username/template-creation',
        element: <ProjectAddPage isActiveSidebar={false} isTemplate={true} />,
      },
      {
        path: 'profile/:username/template-edit/:slug',
        element: <ProjectAddPage isActiveSidebar={false} type={'edit'} isTemplate={true} />,
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
        element: <CourseStudyPage />
      },
      {
        path: 'task',
        element: <></>
      },
      {
        path: 'task/:slug',
        element: <TaskSinglePage />
      },
      {
        path: 'compiler/:username/:project',
        element: <CompilerPage isSolve={false} isCompiler={true} isActiveSidebar={true} />
      },
      {
        path: 'compiler-task/:username/:project/:task',
        element: <CompilerPage isSolve={true} isCompiler={true} isActiveSidebar={true} />
      },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);

export default router;
