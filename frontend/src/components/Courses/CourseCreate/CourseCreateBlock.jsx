import {Link} from "react-router-dom";
import {useState, useEffect} from "react";
import CourseCreateLesson from "./CourseCreateLesson";
import {
    addCurrentCourseMainLesson, deleteCurrentCourseMainBlock, deleteCurrentCourseMainLesson,
    editCurrentCourseMainBlock,
    openCurrentCourseMainBlock
} from "../../../redux/Course/slice";
import {useDispatch, useSelector} from "react-redux";

const CourseCreateBlock = ({type, deleteBlock, currentLang, obj, index}) => {

    const dispatch = useDispatch();
    const languages = useSelector(state => state.mainLayout.languages);
    const currentCourse = useSelector(state => state.course.currentCourseEdit);

    const [title, setTitle] = useState("");
    const [currentNumStep, setCurrentNumStep] = useState(0);
    const [activeSlideUp, setActiveSlideUp] = useState(false);
    const [activeSlideDown, setActiveSlideDown] = useState(false);
    const [currentOpenLesson, setCurrentOpenLesson] = useState(0);
    const [lessonsInBlock, setLessonsInBlock] = useState([]);


    useEffect(() => {
        if (type === 'edit') {
            setTitle(currentCourse.main[currentLang].block[index].title);

            setCurrentNumStep(Object.keys(currentCourse.main[currentLang].block[index].lesson).length);
            setCurrentOpenLesson(Object.keys(currentCourse.main[currentLang].block[index].lesson).length);
        }
    }, [])

    useEffect(() => {
        setCurrentNumStep(Object.keys(currentCourse.main[currentLang].block[index].lesson).length);
    }, [currentCourse])

    const onClickNewLesson = () => {
        const temp = {
            code: "theory",
            title: "",
            description: "",
            answer_option: {},
            right_answer: ""
        }

        dispatch(addCurrentCourseMainLesson({
            languages: languages,
            num_stage: index,
            num_step: currentNumStep + 1,
            lesson: temp
        }));
        setCurrentOpenLesson(currentNumStep + 1);
        setCurrentNumStep(prevState => prevState + 1);
    }

    useEffect(() => {
        dispatch(editCurrentCourseMainBlock({lang: currentLang, title: title, num_stage: index}));
    }, [title])

    useEffect(() => {
        setActiveSlideUp(Object.keys(currentCourse.main[currentLang].block[index].lesson).length > currentOpenLesson);
        setActiveSlideDown(currentOpenLesson > 1);
    }, [currentCourse, currentOpenLesson]);

    const onSetOpenBlock = (id) => {
        dispatch(openCurrentCourseMainBlock({lang: currentLang, num_stage: id}))
    }

    const onClickDeleteLesson = (id) => {
        dispatch(deleteCurrentCourseMainLesson({
            num_step: id,
            num_stage: index,
            languages: languages,
            lang: currentLang
        }));
        if (id > 1) {
            setCurrentOpenLesson(prevState => prevState - 1);
        }
    }

    const handleSlideData = (to) => {
        if (to === -1 && !activeSlideDown || to === 1 && !activeSlideUp) return;
        setCurrentOpenLesson(prevState => prevState + to);
    }

    useEffect(() => {
        setLesson();
    }, [currentOpenLesson, currentCourse, activeSlideDown, activeSlideUp])

    const setLesson = () => {
        setLessonsInBlock(
            Object.keys(currentCourse.main[currentLang].block[index].lesson).map((item) => {
                // console.log(currentCourse.main[currentLang].block[index].lesson[item]);
                    return <CourseCreateLesson
                        active={Number(item) === currentOpenLesson}
                        type={type}
                        deleteLesson={() => onClickDeleteLesson(item)}
                        key={item}
                        obj={currentCourse.main[currentLang].block[index].lesson[item]}
                        index={item}
                        numStage={index}
                        currentLang={currentLang}
                        handleSlideData={(to) => handleSlideData(to)}
                        activeSlideDown={activeSlideDown}
                        activeSlideUp={activeSlideUp}
                    />
                }
            )
        );
    }

    return (
        <>
            {obj === undefined ? <div>Удален</div> :
                <div>
                    <div className="course-create-hr active">
                        <hr className="course-create-hr"/>
                        <svg onClick={() => onSetOpenBlock(index)} className={obj.open ? 'down' : ''} width="24"
                             height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="12" cy="12" r="10" stroke="white"/>
                            <path d="M15 13.5L12 10.5L9 13.5" stroke="white" strokeLinecap="round"
                                  strokeLinejoin="round"/>
                        </svg>
                    </div>

                    {obj.open ?
                        <>
                            <div className="course-create-block active">
                                <h4 className="markdown-h4">Блок №{index}</h4>
                                <input className="input width1200" type="text" name="courseName" id="courseName"
                                       placeholder="Название блока" value={title}
                                       onChange={(e) => setTitle(e.target.value)}/>
                                <div className="course-create-block-buttons">
                                    <button className="btn secondary-blue big" type="button">Сохранить блок
                                    </button>
                                    <button onClick={() => deleteBlock()}
                                            className="project__action-links-item btn-red">
                                        <svg width="21" height="21" viewBox="0 0 21 21" fill="none"
                                             xmlns="http://www.w3.org/2000/svg">
                                            <circle cx="10.5" cy="10.5" r="8.75" stroke="#DB5B42"/>
                                            <path
                                                d="M12.6875 8.31249L8.3125 12.6875M8.31248 8.31247L12.6875 12.6875"
                                                stroke="#DB5B42"
                                                strokeLinecap="round"/>
                                        </svg>
                                        <span>Удалить блок</span>
                                    </button>
                                </div>
                            </div>

                            {lessonsInBlock}

                            <div className="sidebar_profile-create_item create-lesson"
                                 onClick={() => onClickNewLesson()}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="37" height="37"
                                     viewBox="0 0 37 37"
                                     fill="none">
                                    <path
                                        d="M21.4979 0V15.7724H37V21.3462H21.4979V37H15.3049V21.3462H0V15.7724H15.3049V0H21.4979Z"/>
                                </svg>
                                <span>Создать урок</span>
                            </div>
                        </> :
                        <></>}

                </div>
            }
        </>
    );
}

export default CourseCreateBlock;