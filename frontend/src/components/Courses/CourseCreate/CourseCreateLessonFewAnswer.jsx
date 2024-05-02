import {useEffect, useState} from "react";
import TextEditor from "../../TextEditor/TextEditor";
import {useSelector} from "react-redux";


const CourseCreateLessonFewAnswer = ({setDescription, setAnswerOp, description, lesson}) => {

    const [answers, setAnswers] = useState([]);
    const [content, setContent] = useState("");
    const [flag, setFlag] = useState(true);
    const [editableAnswer, setEditableAnswer] = useState(false);
    const [editableID, setEditableID] = useState(-1);

    useEffect(() => {
        const temp = [];

        if (lesson.answer_option !== undefined) {
            console.log(lesson)
            Object.keys(lesson.answer_option).map((item) => {
                temp.push({name: lesson.answer_option[item], active: lesson.right_answer.includes(item)})
                console.log(temp);
            })
        }
        setAnswers(temp);
    }, [])

    useEffect(() => {
        setAnswerOp(answers);
    }, [answers])

    const onClickNewAnswer = () => {
        if (content === "") {
            return;
        }

        const temp = {
            name: content,
            active: false,
        }

        setAnswers((prevState) => [...prevState, temp]);
        setContent("");
    }

    const onClickDeleteAnswer = (id) => {
        setAnswers(prevState => prevState.filter((item, i) => i !== id));
    }

    const onClickEditAnswer = (id) => {
        // console.log(id)
        setEditableAnswer(true);
        setEditableID(id);
        setContent(answers[id].name);
    }

    const onClickSaveEditAnswer = () => {
        // console.log(editableID)
        setEditableAnswer(false);
        setAnswers(prevState => prevState.map((item, i) => {
            if (i === editableID) return {...item, name: content};
            else return item;
        }));
        setEditableID(-1);
        setContent('');
    }

    const onClickCheckButtons = (index) => {
        if (!flag) {
            setFlag(true);
            return;

        }
        let updateList = answers.map((item, i) => {
            if (i === index) {
                return {...item, active: !item.active};
            } else {
                return {...item}
            }
        })

        setAnswers(updateList);

        setFlag(false);
    }

    return (
        <>
            <TextEditor setHTML={(e) => setDescription(e)} content={description}/>

            <form className="create-course radio-list">
                {answers.map((item, i) =>
                    <label key={i}
                        className={`course-create label-button ${item.active ? " active-radio" : ''}`}>
                        <input className="real_checkbox" type="checkbox" checked={item.active}/>
                        <span className="custom_checkbox"></span>
                        <p onClick={() => onClickCheckButtons(i)}>{item.name}</p>
                        <div className={"course-create button-answer"}>
                            <button type={'button'} className={"btn red"} onClick={() => onClickEditAnswer(i)}>
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <g clipPath="url(#clip0_243_5526)">
                                        <path
                                            d="M9.57598 2.71911L10.1939 2.10119C11.2177 1.07739 12.8776 1.07739 13.9014 2.10119C14.9252 3.12499 14.9252 4.7849 13.9014 5.80871L13.2835 6.42663M9.57598 2.71911C9.57598 2.71911 9.65322 4.03219 10.8118 5.19079C11.9704 6.34939 13.2835 6.42663 13.2835 6.42663M9.57598 2.71911L3.89515 8.39993C3.51038 8.78471 3.31799 8.9771 3.15254 9.18923C2.95736 9.43946 2.79003 9.71021 2.6535 9.99668C2.53776 10.2395 2.45172 10.4977 2.27964 11.0139L1.55048 13.2014M13.2835 6.42663L7.60267 12.1075C7.2179 12.4922 7.02551 12.6846 6.81338 12.8501C6.56315 13.0452 6.2924 13.2126 6.00592 13.3491C5.76307 13.4648 5.50495 13.5509 4.98872 13.723L2.80122 14.4521M2.80122 14.4521L2.2665 14.6304C2.01246 14.715 1.73238 14.6489 1.54302 14.4596C1.35367 14.2702 1.28756 13.9901 1.37224 13.7361L1.55048 13.2014M2.80122 14.4521L1.55048 13.2014"
                                            stroke="white"/>
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_243_5526">
                                            <rect width="16" height="16" fill="white"/>
                                        </clipPath>
                                    </defs>
                                </svg>
                            </button>
                            <button type={'button'} onClick={() => onClickDeleteAnswer(i)} className={"btn red"}>
                                <svg width="21" height="21" viewBox="0 0 21 21" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="10.5" cy="10.5" r="8.75" stroke="#DB5B42"/>
                                    <path
                                        d="M12.6875 8.31249L8.3125 12.6875M8.31248 8.31247L12.6875 12.6875"
                                        stroke="#DB5B42"
                                        strokeLinecap="round"/>
                                </svg>
                            </button>
                        </div>
                    </label>
                )}
            </form>
            {answers.length === 0 ? <></> :
                <p className="course-create support-text">Нажмите на флажок, чтобы выбрать этот ответ как
                    правильный</p>}

            <div className={`course-create radio-new-answer ${!editableAnswer ? 'active' : ''}`}>
                <input className="input width100 border-dashed" type="text" name="courseName" id="courseName"
                       placeholder="Вариант ответа" value={content} onChange={(e) => setContent(e.target.value)}/>
                <button onClick={() => onClickNewAnswer()} className="btn big secondary-blue">Добавить</button>
            </div>
            <div className={`course-create radio-new-answer ${editableAnswer ? 'active' : ''}`}>
                <input className="input width100 border-dashed" type="text" name="courseName" id="courseName"
                       placeholder="Вариант ответа" value={content} onChange={(e) => setContent(e.target.value)}/>
                <button onClick={() => onClickSaveEditAnswer()} className="btn big secondary-blue">Изменить</button>
            </div>
        </>
    );
}

export default CourseCreateLessonFewAnswer;