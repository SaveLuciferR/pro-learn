import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link, useNavigate, useParams} from "react-router-dom";
import ProfileSidebarMain from "../components/Profile/ProfileSidebarMain";
import img from "../header_bg.png";
import TaskCreateMain from "../components/Task/TaskCreate/TaskCreateMain";
import DropdownCheckbox from "../components/DropdownCheckbox";
import axiosClient from "../axiosClient";
import {setTask, setTaskForCourse, setTaskMainInfo, setTaskProject, setTaskTemplate} from "../redux/Task/slice";
import ModalWindowTask from "../components/Modal/ModalWindowTask";
import Switch from "../components/Component/Switch";
import LoadingElement from "../components/LoadingElement";


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

    const [openModalTaskProject, setOpenModalTaskProject] = useState(false);
    const [openModalTaskTemplate, setOpenModalTaskTemplate] = useState(false);
    const [slugBindProject, setSlugBindProject] = useState(null);
    const [slugBindTemplate, setSlugBindTemplate] = useState(null);
    const [difficultyAmount, setDifficultyAmount] = useState([false, false, false, false, false]);
    const [allCategoryProg, setAllCategoryProg] = useState([]);
    const [allLangProg, setAllLangProg] = useState([]);

    const [difficulty, setDifficulty] = useState(1);
    const [numOfInputData, setNumOfInputData] = useState(0);

    const [modalDataProject, setModalDataProject] = useState([]);
    const [modalDataTemplate, setModalDataTemplate] = useState([]);

    const [successToGetTask, setSuccessToGetTask] = useState(false);

    const updateProjectID = (id, slugProject) => {
        if (id === currentTask.project_id) {
            dispatch(setTaskProject(null));
            setSlugBindProject(null);
        } else {
            dispatch(setTaskProject(id));
            setSlugBindProject(slugProject);
        }
    }

    const updateTemplateID = (id, slugTemplate) => {
        console.log(id, slugTemplate)
        if (id === currentTask.template_id) {
            dispatch(setTaskTemplate(null));
            setSlugBindTemplate(null);
        } else {
            dispatch(setTaskTemplate(id));
            setSlugBindTemplate(slugTemplate);
        }
    }

    const updateProjectData = () => {
        axiosClient.get(`/@${username}/project-list`)
            .then(({data}) => {
                setModalDataProject(data.projects);
            })
            .catch((response) => {
                console.log(response)
            })
    }

    const updateTemplateData = () => {
        axiosClient.get(`${lang === undefined ? '/' : '/' + lang + '/'}@${username}/template-list?type=all`)
            .then(({data}) => {
                setModalDataTemplate(data.templates);
            })
            .catch((response) => {
                console.log(response)
            })
    }

    const canBeViewDataProject = (item, i) => {
        return item.private === '0';
        return true;
    }

    const canBeViewDataTemplate = (item, i) => {
        return true;
    }

    useEffect(() => {
        if (type === 'edit') {
            axiosClient.get(`/@${username}/creation/edit-task/${slug}`)
                .then(({data}) => {
                    dispatch(setTask({task: data.result.task}));
                    console.log(data.result.task)
                    setSuccessToGetTask(true);
                })
                .catch((res) => {
                    console.log(res);
                })
        } else {
            dispatch(setTaskMainInfo({
                difficulty: "1",
                project_id: null,
                template_id: null,
                num_of_input_data: 0,
                for_course: true,
            }))
            setSuccessToGetTask(true);
        }
        updateProjectData();
        updateTemplateData();
    }, [])

    useEffect(() => {
        setDifficultyAmount(prevState => prevState.map((item, i) => difficulty > i));
    }, [difficulty])

    useEffect(() => {
        dispatch(setTaskMainInfo({
            difficulty,
            num_of_input_data: numOfInputData,
        }))
    }, [difficulty, numOfInputData]);

    useEffect(() => {
        console.log(currentTask);
    }, [currentTask])

    return (
        <>
            {!successToGetTask ?
                <LoadingElement/>
                :
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

                                    <DropdownCheckbox title={"Категория"} content={testCategory}
                                                      checkContent={checkContent1}
                                                      setCheckContent={setCheckContent1}/>
                                    <DropdownCheckbox title={"Языки программирования"} content={testLang}
                                                      checkContent={checkContent2} setCheckContent={setCheckContent2}/>
                                    <Link className={'btn secondary-blue big'}
                                          style={{pointerEvents: slugBindProject === null ? 'none' : 'auto'}}
                                          to={`${lang === undefined ? "/" : '/' + lang + '/'}profile/${username}/project/${slugBindProject}`}
                                          target={'_blank'}>Перейти к проекту</Link>
                                    <button onClick={() => setOpenModalTaskProject(true)}
                                            className={'btn underline-hover'}>Привязать
                                        проект
                                    </button>

                                    <Link className={'btn secondary-blue big'}
                                          style={{pointerEvents: slugBindProject === null ? 'none' : 'auto'}}
                                          to={`${lang === undefined ? "/" : '/' + lang + '/'}profile/${username}/project/${slugBindProject}`} // TODO страница с шаблоном
                                          target={'_blank'}>Перейти к шаблону</Link>
                                    <button onClick={() => setOpenModalTaskTemplate(true)}
                                            className={'btn underline-hover'}>Привязать
                                        шаблон
                                    </button>

                                </div>
                                <div>
                                    <Switch text={"Задача только для курса"} isToggle={currentTask.for_course}
                                            onToggle={() => dispatch(setTaskForCourse(!currentTask.for_course))}/>
                                </div>
                            </div>
                        </div>
                        <TaskCreateMain type={type}/>
                    </div>

                    <ModalWindowTask
                        isOpen={openModalTaskProject}
                        setIsOpen={(e) => setOpenModalTaskProject(e)}
                        bindData={currentTask.project_id}
                        setBindData={(id, slugProject) => updateProjectID(id, slugProject)}
                        data={modalDataProject}
                        updateData={() => updateProjectData()}
                        canBeViewData={(item, i) => canBeViewDataProject(item, i)}
                        linkToData={`profile/${username}/project`}
                        linkToNewData={`profile/${username}/project-creation`}
                        bindText={'Привязать проект'}
                        unBindText={'Отвязать проект'}
                        titleText={'Привязка проекта к задаче'}
                        rejectLoadText={'Ошибка загрузки'}
                        successBindText={'Проект успешно привязан'}
                        rejectBindText={'Проект не привязан'}
                        updateText={'Обновить'}
                        newDataText={'Создать новый проект'}
                    />
                    <ModalWindowTask
                        isOpen={openModalTaskTemplate}
                        setIsOpen={(e) => setOpenModalTaskTemplate(e)}
                        bindData={currentTask.template_id}
                        setBindData={(id, slugTemplate) => updateTemplateID(id, slugTemplate)}
                        data={modalDataTemplate}
                        updateData={() => updateTemplateData()}
                        canBeViewData={(item, i) => canBeViewDataTemplate(item, i)}
                        linkToData={`profile/${username}/template`}
                        linkToNewData={`profile/${username}/template-creation`}
                        bindText={'Привязать шаблон'}
                        unBindText={'Отвязать шаблон'}
                        titleText={'Привязка шаблона к задаче'}
                        rejectLoadText={'Ошибка загрузки'}
                        successBindText={'Шаблон успешно привязан'}
                        rejectBindText={'Шаблон не привязан'}
                        updateText={'Обновить'}
                        newDataText={'Создать новый шаблон'}
                    />
                </div>
            }
        </>
    );
}

export default TaskCreatePage;