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
import CoursesPage from './pages/CoursesPage';
import CoursePage from './pages/CoursePage';
import LessonOneOption from './components/CourseLessons/LessonOneOption';
import CourseLessonPage from './pages/CourseLessonPage';
import LessonSeveralOption from './components/CourseLessons/LessonSeveralOption';
import LessonFillGaps from './components/CourseLessons/LessonFillGaps';
import ProfileSettingsUserPage from './pages/ProfileSettingsUserPage';
import ProfileSettingsPage from './pages/ProfileSettingsPage';
import ProfileSettingsSecurity from './components/Profile/ProfileSettings/ProfileSettingsSecurity';
import ProfileSettingsSessions from './components/Profile/ProfileSettings/ProfileSettingsSessions';
import ProfileSettingsPrivacy from './components/Profile/ProfileSettings/ProfileSettingsPrivacy';
import AdminLayout from './layouts/AdminLayout';
import CourseCreatePage from './pages/CourseCreatePage';

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
        path: 'user/feedback',
        element: <Feedback />,
      },
      {
        path: 'blog',
        element: <BlogPage />,
      },
      {
        path: 'compiler/:username/:project',
        element: <CompilerPage isActiveSidebar={true} isCompiler={true} />,
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
        element: <CourseCreatePage/>
      },
      {
        path: 'profile/:username/course-edit/:slug',
        element: <CourseCreatePage type={'edit'}/>
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
        path: 'courses',
        element: <CoursesPage />,
      },
      {
        path: 'courses/name-course',
        element: <CoursePage />,
      },
      {
        path: 'courses/lessons',
        element: <CourseLessonPage />,
        children: [
          {
            path: 'one-option',
            element: <LessonOneOption />,
          },
          {
            path: 'several-option',
            element: <LessonSeveralOption />,
          },
          {
            path: 'fill-gaps',
            element: <LessonFillGaps />,
          },
        ],
      },
    ],
  },
]);

export default router;
