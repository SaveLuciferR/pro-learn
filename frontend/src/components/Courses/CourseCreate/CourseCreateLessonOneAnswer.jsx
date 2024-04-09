import {useEffect, useState} from "react";
import TextEditor from "../../TextEditor/TextEditor";

const CourseCreateLessonOneAnswer = ({setDescription, setAnswerOp, lesson, description}) => {

    const [answers, setAnswers] = useState([]);
    const [content, setContent] = useState("");

    useEffect(() => {
        const temp = [];

        if (lesson.answer_option !== undefined) {
            Object.keys(lesson.answer_option).map((item) => {
                temp.push({name: lesson.answer_option[item], active: lesson.right_answer.includes(item)})
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

    const onClickRadioButtons = (index) => {
        let updateList = answers.map((item, i) => {
            if (i === index) {
                return {...item, active: true};
            } else {
                return {...item, active: false}
            }
        })

        setAnswers(updateList);
    }

    return (
        <>
            <TextEditor setHTML={(e) => setDescription(e)} content={description}/>
            <form className="create-course radio-list">
                {answers.map((item, i) =>
                    <label onClick={() => onClickRadioButtons(i)} key={i}
                           className={`radio-list-label course-create ${item.active ? " active-radio" : ''}`}>
                        <input key={i} type="radio" name="answer"  checked={item.active}/>
                        {item.name}
                    </label>
                )}
            </form>
            {answers.length === 0 ? <></> :
                <p className="course-create support-text">
                    Нажмите на радиокнопку, чтобы выбрать этот ответ как правильный
                </p>
            }

            <div className="course-create radio-new-answer">
                <input className="input width100 border-dashed" type="text" name="courseName" id="courseName"
                       placeholder="Вариант ответа" value={content} onChange={(e) => setContent(e.target.value)}/>
                <button onClick={() => onClickNewAnswer()} className="btn big secondary-blue">Добавить</button>
            </div>
        </>
    );
}

export default CourseCreateLessonOneAnswer;