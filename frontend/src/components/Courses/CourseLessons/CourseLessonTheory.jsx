const CourseLessonTheory = ({lesson}) => {
    return (
        <div className="lessons-oneoption">
            <div className="lessons-oneoption-info" dangerouslySetInnerHTML={{__html: lesson.description}}/>
        </div>
    );
}

export default CourseLessonTheory;