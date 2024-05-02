import TaskSinglePage from "../../../pages/TaskSinglePage";
import LoadingElement from "../../LoadingElement";


const CourseLessonTask = ({lesson, slug}) => {

    return (
        <>
            {
                Object.keys(lesson).length === 0 ?
                    <LoadingElement/>
                    :
                    <div>
                        <div dangerouslySetInnerHTML={{__html: lesson.description}}/>
                        <TaskSinglePage courseSlug={slug} forCourse={true} courseTask={lesson.task}/>
                    </div>
            }
        </>

    );
}

export default CourseLessonTask;