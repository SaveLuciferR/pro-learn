import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";
import TaskCreateTab from "./TaskCreateTab";
import TaskCreateDataTab from "./TaskCreateDataTab";
import ModalWindowTask from "../../Modal/ModalWindowTask";
import {setCurrentCourseStatus} from "../../../redux/Course/slice";
import axiosClient from "../../../axiosClient";
import {setTaskSlug, setTaskStatus} from "../../../redux/Task/slice";
import {useNavigate, useParams} from "react-router-dom";


const TaskCreateMain = ({type}) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {lang, username} = useParams();

    const languages = useSelector(state => state.mainLayout.languages);
    const task = useSelector(state => state.task.currentTaskEdit);

    const [currentLang, setCurrentLang] = useState('1');
    const [isInputTab, setIsInputTab] = useState(true);

    const onClickPublishTask = () => {

    }

    const onClickSaveTask = () => {
        dispatch(setTaskStatus({status: "draft"}));
        axiosClient.post(`@${username}/creation/task`, {task})
            .then(({data}) => {
                console.log(data);

                if (data.result.slug) {
                    navigate(`${lang === undefined ? "/" : '/' + lang + "/"}profile/${username}/task-edit/${data.result.slug}`);
                }
            })
            .catch((response) => {
                console.log(response);
            });
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

            <div className="course-create-tabs">
                <span onClick={() => setIsInputTab(true)}
                      className={`course-create-tabs ${isInputTab ? 'active' : ''}`}>
                    Входные данные
                </span>
                <span onClick={() => setIsInputTab(false)}
                      className={`course-create-tabs ${!isInputTab ? 'active' : ''}`}>
                           Выходные данные
                </span>
            </div>

            {isInputTab ?
                <TaskCreateDataTab title={"Входные данные"} activeInput={isInputTab}/>
                :
                <TaskCreateDataTab title={"Выходные данные"} activeInput={isInputTab}/>
            }

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
                <button onClick={() => onClickSaveTask()} className="btn secondary-blue big">Сохранить задачу</button>
            </div>
        </div>
    );
}

export default TaskCreateMain;