import { useOutletContext } from 'react-router-dom';
import AllCourses from '../components/Courses/AllCourses';
import CompletedCourses from '../components/Courses/CompletedCourses';
import StartedCourses from '../components/Courses/StartedCourses';

const CoursePage = ({ isActiveSidebar, isCompiler }) => {
  const { activeSidebar, activeCompiler } = useOutletContext();
  activeSidebar[0](isActiveSidebar);
  activeCompiler[0](isCompiler);
  return (
    <div className="courses">
      <div className="courses-header">
        <p className="courses-header-title">_Курсы</p>
        <p className="courses-header-desc">
          // Цель этого раздела - предоставить как можно более грамотную и структурированную
          информацию для обучения языков программирования и смежным технологиям.
        </p>
      </div>
      <StartedCourses />
      <CompletedCourses />
      <AllCourses />
    </div>
  );
};

export default CoursePage;
