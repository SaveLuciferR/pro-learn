import CourseBlockItem from './CourseBlockItem';

const CourseBlocks = () => {
  return (
    <div className="course-blocks">
      <p className="course-blocks-title">_Блоки</p>
      <div className="course-blocks-main">
        <CourseBlockItem />
        <CourseBlockItem />
        <CourseBlockItem />
      </div>
    </div>
  );
};

export default CourseBlocks;
