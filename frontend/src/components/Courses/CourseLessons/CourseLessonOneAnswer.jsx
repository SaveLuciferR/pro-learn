import {useEffect} from "react";

const CourseLessonOneAnswer = ({lesson, answer, setAnswer}) => {

    return (
        <div className="lessons-oneoption">
            <div className="lessons-oneoption-info" dangerouslySetInnerHTML={{__html: lesson.description}}/>
            <div className="lesson-oneoption-answer">
                <p className="markdown-h3">Выберите правильный ответ</p>
                <form className="radio-list">

                    {Object.keys(lesson.answer_option).map((item, i) =>
                        <label key={item} className="radio-list-label">
                            <input type="radio" name="a" onChange={() => setAnswer(item)}/>
                            {lesson.answer_option[item]}
                        </label>
                    )}

                </form>
            </div>
        </div>
    );
};

export default CourseLessonOneAnswer;
