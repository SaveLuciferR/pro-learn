import CourseBlockItem from './CourseBlockItem';

const CourseBlocks = ({blocks}) => {
    return (
        <div className="course-blocks">
            <p className="course-blocks-title">_Блоки</p>
            <div className="course-blocks-main">
                {blocks.map((item, i) => <CourseBlockItem key={i} obj={item}/>)}
            </div>
        </div>
    );
};

export default CourseBlocks;
