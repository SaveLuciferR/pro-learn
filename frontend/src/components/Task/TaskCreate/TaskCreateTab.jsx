import {useEffect, useState} from "react";
import TextEditor from "../../TextEditor/TextEditor";
import {useDispatch, useSelector} from "react-redux";
import {setTaskContentInfoLang, setTaskMainInfoLang} from "../../../redux/Task/slice";


const TaskCreateTab = ({type, currentLang, active}) => {

    const dispatch = useDispatch();

    const task = useSelector(state => state.task.currentTaskEdit);

    const [titleTask, setTitleTask] = useState('');
    const [contentTask, setContentTask] = useState('');
    const [descriptionTask, setDescriptionTask] = useState('');
    const [keywordsTask, setKeywordsTask] = useState('');
    const [canBeUpdate, setCanBeUpdate] = useState(false);

    useEffect(() => {
        if (type === 'edit') {
            console.log(task.main[currentLang]);
            setTitleTask(task.main[currentLang].title);
            setDescriptionTask(task.main[currentLang].description);
            setKeywordsTask(task.main[currentLang].keywords);
            setContentTask(task.main[currentLang].content);
        }
        else {
            setContentTask('');
        }
        setCanBeUpdate(true);
    }, []);

    useEffect(() => {
        if (canBeUpdate) {
            dispatch(setTaskMainInfoLang({
                lang: currentLang,
                title: titleTask,
                keywords: keywordsTask,
                description: descriptionTask
            }))
        }
    }, [titleTask, descriptionTask, keywordsTask]);

    useEffect(() => {
        if (canBeUpdate) {
            console.log(contentTask)
            dispatch(setTaskContentInfoLang({
                lang: currentLang,
                content: contentTask,
            }))
        }
    }, [contentTask])

    return (
        <div className={`course-create-main-info ${active ? 'active' : ''}`}>
            <input className="input width1200" type="text" name="titleTask" id="courseName"
                   placeholder="Название задачи" value={titleTask}
                   onChange={(e) => setTitleTask(e.target.value)}/>


            <input className="input width1200" type="text" name="descriptionTask" id="courseName"
                   placeholder="Мета-описание задачи" value={descriptionTask}
                   onChange={(e) => setDescriptionTask(e.target.value)}/>

            <input className="input width1200" type="text" name="keywordsTask" id="courseName"
                   placeholder="Ключевые слова задачи" value={keywordsTask}
                   onChange={(e) => setKeywordsTask(e.target.value)}/>

            {!canBeUpdate ? <></> :
                <TextEditor type={'input-data'} content={contentTask} setHTML={(e) => setContentTask(e)}/>
            }
        </div>
    );
}

export default TaskCreateTab;