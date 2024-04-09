import {useEffect, useState} from "react";
import TextEditor from "../../TextEditor/TextEditor";
import {useSelector} from "react-redux";


const CourseCreateLessonFewAnswer = ({setDescription, setAnswerOp, description, lesson}) => {

    const [answers, setAnswers] = useState([]);
    const [content, setContent] = useState("");
    const [flag, setFlag] = useState(true);

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
                    <label onClick={() => onClickCheckButtons(i)} key={i}
                           className={`course-create ${item.active ? " active-radio" : ''}`}>
                        <input className="real_checkbox" type="checkbox" checked={item.active}/>
                        <span className="custom_checkbox"></span>
                        <p>{item.name}</p>
                    </label>
                )}
            </form>
            {answers.length === 0 ? <></> :
                <p className="course-create support-text">Нажмите на флажок, чтобы выбрать этот ответ как
                    правильный</p>}

            <div className="course-create radio-new-answer">
                <input className="input width100 border-dashed" type="text" name="courseName" id="courseName"
                       placeholder="Вариант ответа" value={content} onChange={(e) => setContent(e.target.value)}/>
                <button onClick={() => onClickNewAnswer()} className="btn big secondary-blue">Добавить</button>
            </div>
        </>
    );
}

export default CourseCreateLessonFewAnswer;