import TextEditor from "../../TextEditor/TextEditor";


const CourseCreateLessonTheory = ({setDescription, description}) => {
    return (
        <TextEditor setHTML={setDescription} content={description}/>
    );
}

export default CourseCreateLessonTheory;