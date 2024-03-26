import CourseCard from './CourseCard';

const CompletedCourses = () => {
  return (
    <div className="courses-completed">
      <p className="courses-completed-title">_Пройденные курсы</p>
      <div className="courses-completed-main">
        <CourseCard />
        <CourseCard />
      </div>
      <div className="courses-completed-bottom">
        <div className="courses-slider">(слайдер)</div>
      </div>
    </div>
  );
};

export default CompletedCourses;
