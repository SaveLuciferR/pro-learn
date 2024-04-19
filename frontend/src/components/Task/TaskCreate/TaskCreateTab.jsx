import {useEffect, useState} from "react";
import TextEditor from "../../TextEditor/TextEditor";
import {useDispatch, useSelector} from "react-redux";
import {setTaskMainInfoLang} from "../../../redux/Task/slice";


const TaskCreateTab = ({type, currentLang, active}) => {

    const dispatch = useDispatch();

    const task = useSelector(state => state.task.currentTaskEdit);

    const [titleTask, setTitleTask] = useState('');
    const [contentTask, setContentTask] = useState('');
    const [descriptionTask, setDescriptionTask] = useState('');
    const [keywordsTask, setKeywordsTask] = useState('');

    useEffect(() => {
        dispatch(setTaskMainInfoLang({
            lang: currentLang,
            content: contentTask,
            title: titleTask,
            keywords: keywordsTask,
            description: descriptionTask
        }))
    }, [titleTask, contentTask, descriptionTask, keywordsTask])

    return (
        <div className={`course-create-main-info ${active ? 'active' : ''}`}>
            <input className="input width1200" type="text" name="courseName" id="courseName"
                   placeholder="Название задачи" value={titleTask}
                   onChange={(e) => setTitleTask(e.target.value)}/>


            <input className="input width1200" type="text" name="courseName" id="courseName"
                   placeholder="Мета-описание задачи" value={descriptionTask}
                   onChange={(e) => setDescriptionTask(e.target.value)}/>

            <input className="input width1200" type="text" name="courseName" id="courseName"
                   placeholder="Ключевые слова задачи" value={keywordsTask}
                   onChange={(e) => setKeywordsTask(e.target.value)}/>

            <TextEditor type={'input-data'} content={contentTask} setHTML={(e) => setContentTask(e)}/>
        </div>
    );
}

export default TaskCreateTab;