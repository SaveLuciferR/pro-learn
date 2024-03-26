import CourseBlocks from '../components/CourseItem/CourseBlocks';
import CourseInfo from '../components/CourseItem/CourseInfo';

const CoursePage = () => {
  return (
    <div className="course">
      <CourseInfo />
      <CourseBlocks />
    </div>
  );
};

export default CoursePage;
