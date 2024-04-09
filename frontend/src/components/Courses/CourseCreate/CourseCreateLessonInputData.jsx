import TextEditor from "../../TextEditor/TextEditor";


const CourseCreateLessonInputData = ({setDescription, description}) => {
    return (
        <TextEditor type={"input-data"} content={description} setHTML={setDescription}/>
    );
}

export default CourseCreateLessonInputData;