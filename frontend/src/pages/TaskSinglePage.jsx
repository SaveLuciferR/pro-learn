import {useEffect, useState} from "react";
import axiosClient from "../axiosClient";
import {Link, useNavigate, useParams} from "react-router-dom";
import LoadingElement from "../components/LoadingElement";
import {useSelector} from "react-redux";
import ModalWindowInput from "../components/Modal/ModalWindowInput";

const TaskSinglePage = () => {

    const {lang, slug} = useParams();
    const navigate = useNavigate();

    const user = useSelector(state => state.mainLayout.user);

    const [task, setTask] = useState({});
    const [difficultyAmount, setDifficultyAmount] = useState([false, false, false, false, false]);
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [contentModal, setContentModal] = useState('');
    const [errorModal, setErrorModal] = useState('');

    const getLanguageForTask = () => {
        let temp = '';
        // console.log(task.lang)
        task.lang.map((item, i) => temp += item.title + ', ');
        return temp.replace(/, $/, '');
    }

    const handleSolveTask = () => {
        if (contentModal.length !== 0) {
            axiosClient.post(`/task/${slug}/solve`, {title: contentModal}) // изменить title на динамическое добавление
                .then((res) => {
                    console.log(res);
                    setIsOpenModal(false);
                    if (res.status === 200) {
                        navigate(`${lang === undefined ? "/" : '/' + lang + '/'}compiler-task/${user.username}/${res.data.result.projectSlug}/${slug}`)
                    }
                })
                .catch((res) => {
                    console.log(res);
                })
        }
        else {
            setErrorModal("Введите название проекта");
        }
    }

    useEffect(() => {
        axiosClient.get(`${lang === undefined ? "/" : '/' + lang + '/'}task/${slug}`)
            .then(({data}) => {
                setTask(data.task);
                setDifficultyAmount(prevState => prevState.map((item, i) => i < data.task.difficulty))
            })
            .catch((res) => {
                // console.log(res);
                if (res.response.status === 404) {
                    navigate('/page/not-found');
                }
            })
    }, [lang, slug])

    return (
        <>
            {Object.keys(task).length === 0 ? <LoadingElement/>
                :
                <>
                    <div className={"task-single-main"}>
                        <ul className="created-course-header-tags">
                            {task.tags.map((item, i) => <li key={i}
                                                            className="created-course-header-tag">#{item.title}</li>)}
                        </ul>
                        <div className="profile-difficulty">
                            <p>_Сложность: </p>
                            <ul className="profile-difficulty-range">
                                {difficultyAmount.map((item, i) => <li key={i}
                                                                       className={`profile-difficulty-range-item ${item ? 'active' : ''}`}></li>)}
                            </ul>
                        </div>
                        <p className="profile-task-title">_{task.title}</p>
                        <div className="profile-task-desc" dangerouslySetInnerHTML={{__html: task.content}}>
                            {/*{console.log(task.content)}*/}
                        </div>
                        {task.template.length === 0 ?
                            <></>
                            :
                            <div className={"task-single-middle"}>
                                <button onClick={() => setIsOpenModal(true)} type={"button"}
                                        className={"btn primary big"}>Решить задачу
                                </button>
                            </div>
                        }
                        <div className="created-course-bottom">
                            <p className="created-course-bottom-date">&#62; {task.username}, {task.role === 'admin' ?
                                'Администратор' : 'Пользователь'}, {task.date_of_publication}</p>
                            <p className="created-course-bottom-lang">// Язык: {getLanguageForTask()}</p>
                        </div>
                    </div>
                    {task.project.length === 0 ?
                        <></>
                        :
                        <div className={"task-single-bottom"}>
                            <Link
                                to={`${lang === undefined ? "/" : '/' + lang + '/'}profile/${task.username}/project/${task.project.slug}`}
                                target={'_blank'}
                                className={"btn big secondary-white"}>Посмотреть ответ</Link>
                        </div>
                    }

                    <ModalWindowInput
                        isOpen={isOpenModal}
                        setIsOpen={(e) => setIsOpenModal(e)}
                        onClickButton={() => handleSolveTask()}
                        content={contentModal}
                        setContent={(e) => setContentModal(e)}
                        errorText={errorModal}
                        placeholderText={"Введите название проекта"}
                        titleText={"Создание нового проекта"}
                        buttonText={"Создать проект"}
                    />
                </>
            }
        </>
    );
}

export default TaskSinglePage;