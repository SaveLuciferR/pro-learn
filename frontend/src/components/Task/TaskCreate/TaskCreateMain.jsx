import {useSelector} from "react-redux";
import {useState} from "react";
import TaskCreateTab from "./TaskCreateTab";


const TaskCreateMain  = ({type}) => {

    const languages = useSelector(state => state.mainLayout.languages);

    const [currentLang, setCurrentLang] = useState('1');

    const onClickPublishTask = () => {

    }

    const onClickSaveCourse = () => {

    }

    return (
        <div className="course-create-main">
            <div className="course-create-tabs">
                {Object.keys(languages).map((item, i) =>
                    <span key={i}
                          onClick={() => setCurrentLang(languages[item].id)}
                          className={`course-create-tabs ${currentLang === languages[item].id ? 'active' : ''}`}>
                        {languages[item].title}
                    </span>
                )}
            </div>

            {Object.keys(languages).map((item) => <TaskCreateTab type={type} currentLang={languages[item].id}
                                                                   active={currentLang === languages[item].id}/>)}

            <div className="course-create-buttons">
                <button className="project__action-links-item btn-red">
                    <svg width="21" height="21" viewBox="0 0 21 21" fill="none"
                         xmlns="http://www.w3.org/2000/svg">
                        <circle cx="10.5" cy="10.5" r="8.75" stroke="#DB5B42"/>
                        <path d="M12.6875 8.31249L8.3125 12.6875M8.31248 8.31247L12.6875 12.6875"
                              stroke="#DB5B42"
                              strokeLinecap="round"/>
                    </svg>
                    <span>Удалить задачу</span>
                </button>
                <button onClick={() => onClickPublishTask()} className="btn primary big">Опубликовать</button>
                <button onClick={() => onClickSaveCourse()} className="btn secondary-blue big">Сохранить задачу</button>
            </div>
        </div>
    );
}

export default TaskCreateMain;