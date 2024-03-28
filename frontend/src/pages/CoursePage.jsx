import CourseBlocks from '../components/Courses/CourseItem/CourseBlocks';
import CourseInfo from '../components/Courses/CourseItem/CourseInfo';

const CoursePage = () => {
  return (
    <div className="course">
      <CourseInfo />
      <CourseBlocks />
    </div>
  );
};

export default CoursePage;
