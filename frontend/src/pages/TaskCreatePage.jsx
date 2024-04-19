import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link, useNavigate, useParams} from "react-router-dom";
import ProfileSidebarMain from "../components/Profile/ProfileSidebarMain";
import img from "../header_bg.png";
import TaskCreateMain from "../components/Task/TaskCreate/TaskCreateMain";
import DropdownCheckbox from "../components/DropdownCheckbox";
import axiosClient from "../axiosClient";
import {setTaskMainInfo, setTaskProject} from "../redux/Task/slice";
import ModalWindowTask from "../components/Modal/ModalWindowTask";


const TaskCreatePage = ({type}) => {

    const testLang = [
        {
            id: 1,
            title: 'C#',
        },
        {
            id: 3,
            title: 'Java'
        },
        {
            id: 2,
            title: 'Python'
        },
    ]

    const testCategory = [
        {
            id: 1,
            title: 'web',
        },
        {
            id: 2,
            title: 'tes2',
        },
        {
            id: 3,
            title: 'trt3',
        },
    ]

    const [checkContent1, setCheckContent1] = useState([]);
    const [checkContent2, setCheckContent2] = useState([]);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {slug, username, lang} = useParams();

    const currentTask = useSelector(state => state.task.currentTaskEdit);

    const [openModalTask, setOpenModalTask] = useState(false);
    const [slugBindProject, setSlugBindProject] = useState(null);
    const [difficultyAmount, setDifficultyAmount] = useState([false, false, false, false, false]);
    const [allCategoryProg, setAllCategoryProg] = useState([]);
    const [allLangProg, setAllLangProg] = useState([]);

    const [difficulty, setDifficulty] = useState(1);
    const [forCourse, setForCourse] = useState(false);
    const [numOfInputData, setNumOfInputData] = useState(0);

    const updateProjectID = (id, slugProject) => {
        if (id === currentTask.project_id) {
            dispatch(setTaskProject(null));
            setSlugBindProject(null);
        } else {
            dispatch(setTaskProject(id));
            setSlugBindProject(slugProject);
        }
    }

    useEffect(() => {
        if (type === 'edit') {

        } else {
            dispatch(setTaskMainInfo({
                difficulty: "1",
                project_id: null,
                template_id: null,
                num_of_input_data: 0,
                for_course: true,
            }))
        }
    }, [])

    useEffect(() => {
        setDifficultyAmount(prevState => prevState.map((item, i) => difficulty > i));
    }, [difficulty])

    useEffect(() => {
        dispatch(setTaskMainInfo({
            difficulty,
            num_of_input_data: numOfInputData,
            for_course: forCourse
        }))
    }, [difficulty, numOfInputData, forCourse]);

    useEffect(() => {
        console.log(currentTask);
    }, [currentTask])

    return (
        <div className="profile-section">
            <ProfileSidebarMain/>
            <div className="profile-section-main">
                <h1 className="profile-settings-title big text-center-create">{type === 'edit' ? "_Изменить задачу" : "_Создать задачу"}</h1>
                <div className="course-create-header">
                    <div className="course-create-second_header task-second_header">
                        <div className="course-create-top">
                            <span>_Сложность: </span>
                            <div className="inline-block">
                                <ul className="profile-difficulty-range inline">


                                    {difficultyAmount.map((item, i) =>
                                        <li onClick={() => setDifficulty(i + 1)}
                                            className={`hover profile-difficulty-range-item ${item ? 'active' : ''}`}></li>)}

                                </ul>
                            </div>
                        </div>
                        <div className="course-create-down">

                            <DropdownCheckbox title={"Категория"} content={testCategory} checkContent={checkContent1}
                                              setCheckContent={setCheckContent1}/>
                            <DropdownCheckbox title={"Языки программирования"} content={testLang}
                                              checkContent={checkContent2} setCheckContent={setCheckContent2}/>
                            <Link className={'btn secondary-blue big'}
                                  style={{pointerEvents: slugBindProject === null ? 'none' : 'auto'}}
                                  to={`${lang === undefined ? "/" : '/' + lang + '/'}profile/${username}/project/${slugBindProject}`}
                                  target={'_blank'}>Перейти к проекту</Link>
                            <button onClick={() => setOpenModalTask(true)} className={'btn underline-hover'}>Привязать
                                проект
                            </button>

                        </div>
                    </div>
                </div>
                <TaskCreateMain type={type}/>
            </div>

            <ModalWindowTask
                isOpen={openModalTask}
                setIsOpen={(e) => setOpenModalTask(e)}
                bindData={currentTask.project_id}
                setBindData={(id, slugProject) => updateProjectID(id, slugProject)}
                isProject={true}
            />
        </div>
    );
}

export default TaskCreatePage;