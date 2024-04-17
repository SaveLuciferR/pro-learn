import CourseCard from './CourseCard';

const StartedCourses = () => {
  return (
    <div className="courses-started">
      <p className="courses-started-title">_Начатые курсы</p>
      <div className="courses-started-main">
        <CourseCard status={'started'} />
        <CourseCard />
      </div>
      <div className="courses-started-bottom">
        <div className="courses-slider">(слайдер)</div>
      </div>
    </div>
  );
};
export default StartedCourses;
