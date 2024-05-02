import CourseCreateLessonTheory from "./CourseCreateLessonTheory";
import CourseCreateLessonInputData from "./CourseCreateLessonInputData";
import CourseCreateLessonFewAnswer from "./CourseCreateLessonFewAnswer";
import CourseCreateLessonOneAnswer from "./CourseCreateLessonOneAnswer";
import {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    bindTaskToCourse,
    editCurrentCourseMainLesson,
    setCurrentCourseEditMainLessonCode
} from "../../../redux/Course/slice";
import CourseCreateLessonTask from "./CourseCreateLessonTask";


const CourseCreateLesson = ({
                                active,
                                type,
                                deleteLesson,
                                obj,
                                index,
                                currentLang,
                                numStage,
                                activeSlideUp,
                                activeSlideDown,
                                handleSlideData
                            }) => {

    const dispatch = useDispatch();

    const languages = useSelector(state => state.mainLayout.languages);
    const lesson = useSelector(state => state.course.currentCourseEdit).main[currentLang].block[numStage].lesson[index];
    const typeLesson = useSelector(state => state.course.typeLesson);

    const [dropdownActive, setDropdownActive] = useState(false);

    const [code, setCode] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [answerOption, setAnswerOption] = useState({});
    const [rightAnswer, setRightAnswer] = useState("");
    const [canBeUpdate, setCanBeUpdate] = useState(false);
    const [slugBindSlugText, setBindSlugText] = useState(null);


    useEffect(() => {
        console.log(lesson);
        if (type === 'edit') {
            setCode(lesson.code);
            setTitle(lesson.title);
            setDescription(lesson.description);
            setAnswerOption(lesson.answer_option);
            setRightAnswer(lesson.right_answer);
        } else {
            setCode('theory');
        }

        setCanBeUpdate(true);
    }, [])

    useEffect(() => {
        if (canBeUpdate) {
            dispatch(editCurrentCourseMainLesson({
                lang: currentLang,
                num_stage: numStage,
                num_step: index,
                title: title,
                description: description,
                answer_option: answerOption,
                right_answer: rightAnswer
            }))
        }
    }, [title, description, answerOption, rightAnswer]);

    useEffect(() => {
        if (canBeUpdate) {
            dispatch(setCurrentCourseEditMainLessonCode({
                languages: languages,
                num_stage: numStage,
                num_step: index,
                code: code,
            }))
        }
    }, [code])

    // useEffect(() => {
    //     console.log(lesson.answer_option)
    //     if (canBeUpdate && lesson !== undefined) {
    //         console.log(lesson.answer_option)
    //         setCode(lesson.code);
    //         setTitle(lesson.title);
    //         setDescription(lesson.description);
    //         setAnswerOption(lesson.answer_option);
    //         setRightAnswer(lesson.right_answer);
    //     }
    // }, [lesson])

    const renderCodeComponent = () => {
        // console.log(lesson);
        switch (code) {
            case "theory": {
                return <CourseCreateLessonTheory key={index}
                                                 description={description}
                                                 setDescription={(value) => setDescription(value)}/>
            }
            case "input-data": {
                return <CourseCreateLessonInputData key={index}
                                                    description={description}
                                                    setDescription={(value) => setDescription(value)}/>
            }
            case "few-answer": {
                return <CourseCreateLessonFewAnswer key={index}
                                                    lesson={lesson}
                                                    description={description}
                                                    setDescription={(value) => setDescription(value)}
                                                    setAnswerOp={(e) => setAnswer(e)}/>
            }
            case "one-answer": {
                return <CourseCreateLessonOneAnswer key={index}
                                                    lesson={lesson}
                                                    description={description}
                                                    setDescription={(value) => setDescription(value)}
                                                    setAnswerOp={(e) => setAnswer(e)}/>
            }
            case "task": {
                return <CourseCreateLessonTask
                    key={index}
                    index={index}
                    currentLesson={lesson}
                    updateTaskID={(id, slug) => updateTaskID(id, slug)}
                    slugBindTask={slugBindSlugText}
                    setSlugBindTask={(s) => setBindSlugText(s)}
                />
            }
            default:
                return null;
        }
    }

    const updateTaskID = (id, slug) => {
        dispatch(bindTaskToCourse({languages: languages, task: id, num_stage: numStage, num_step: index}));
        setBindSlugText(id === lesson.challenge_id ? null : slug);
    }

    const setAnswer = (answers) => {
        let temp = {};
        let answersRight = '';
        answers.map((item, i) => {
            temp[i + 1] = item.name;
            if (item.active) {
                answersRight += (i + 1) + ',';
            }
        })
        setAnswerOption(temp);
        setRightAnswer(answersRight.replace(/,$/, ''));
    }

    return (
        <>
            {obj === undefined || code === '' ? <div>Loading...</div> :
                <div className={`course-create-block ${active ? 'active' : ''}`}>

                    <h4 className="markdown-h4">Урок №{index}</h4>

                    {typeLesson.length === 0 ? <div>Loading...</div> :
                        <div className={`dropdown ${dropdownActive ? 'active' : ""}`}
                             style={{width: "100%"}}
                             onClick={() => setDropdownActive(!dropdownActive)}>
                            <div className="select  small">
                                <span
                                    className="small unselectable">{typeLesson.find(item => code === item.code).title}</span>
                                <svg className="arrow" width="9" height="5" viewBox="0 0 9 5" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path d="M4.5 5L8.39711 0.5H0.602886L4.5 5Z" fill="white"/>
                                </svg>
                            </div>
                            <input key={obj.code} type="hidden" name="language_code"/>
                            <ul className={`dropdown-menu  ${dropdownActive ? 'active' : ''}`}>
                                {typeLesson.map((item, i) => {
                                        return code === item.code ? <></> :
                                            <li onClick={() => setCode(item.code)}
                                                key={i}>{item.title}</li>
                                    }
                                )}
                            </ul>
                        </div>
                    }

                    <input className="input width1200" type="text" name="courseName" id="courseName"
                           placeholder="Название урока" value={title} onChange={(e) => setTitle(e.target.value)}/>

                    {renderCodeComponent()}

                    <div className={""}>
                        <button className={`btn slider-arrow ${!activeSlideDown ? 'hidden' : ''}`}
                             onMouseDown={() => handleSlideData(-1)}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="30"
                                height="30"
                                viewBox="0 0 24 24"
                                fill="none"
                            >
                                <circle
                                    cx="10"
                                    cy="10"
                                    r="10"
                                    transform="matrix(-1 0 0 1 22 2)"
                                    stroke="white"
                                    strokeWidth="1.5"
                                />
                                <path
                                    d="M13.5 9L10.5 12L13.5 15"
                                    stroke="white"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </button>
                        <button className={`btn slider-arrow ${!activeSlideUp ? 'hidden' : ''}`}
                             onMouseDown={() => handleSlideData(1)}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="30"
                                height="30"
                                viewBox="0 0 24 24"
                                fill="none"
                            >
                                <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="1.5"/>
                                <path
                                    d="M10.5 9L13.5 12L10.5 15"
                                    stroke="white"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </button>
                    </div>
                    <button onClick={() => deleteLesson()}
                            className="project__action-links-item btn-red">
                        <svg width="21" height="21" viewBox="0 0 21 21" fill="none"
                             xmlns="http://www.w3.org/2000/svg">
                            <circle cx="10.5" cy="10.5" r="8.75" stroke="#DB5B42"/>
                            <path
                                d="M12.6875 8.31249L8.3125 12.6875M8.31248 8.31247L12.6875 12.6875"
                                stroke="#DB5B42"
                                strokeLinecap="round"/>
                        </svg>
                        <span>Удалить урок</span>
                    </button>
                </div>
            }
        </>
    );
}

export default CourseCreateLesson;