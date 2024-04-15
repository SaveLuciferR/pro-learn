import {useState} from "react";
import TextEditor from "../../TextEditor/TextEditor";


const TaskCreateTab = ({type, currentLang, active}) => {

    const [titleTask, setTitleTask] = useState('');
    const [contentTask, setContentTask] = useState('');
    const [descriptionTask, setDescriptionTask] = useState('');
    const [keywordsTask, setKeywordsTask] = useState('');

    return (
        <div className={`course-create-main-info ${active ? 'active' : ''}`}>
            <input className="input width1200" type="text" name="courseName" id="courseName"
                   placeholder="Название курса" value={titleTask}
                   onChange={(e) => setTitleTask(e.target.value)}/>


            <input className="input width1200" type="text" name="courseName" id="courseName"
                   placeholder="Мета-описание курса" value={descriptionTask}
                   onChange={(e) => setDescriptionTask(e.target.value)}/>

            <input className="input width1200" type="text" name="courseName" id="courseName"
                   placeholder="Ключевые слова курса" value={keywordsTask}
                   onChange={(e) => setKeywordsTask(e.target.value)}/>

            <TextEditor content={contentTask} setHTML={(e) => setContentTask(e)}/>
        </div>
    );
}

export default TaskCreateTab;