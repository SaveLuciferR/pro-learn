import CourseCreateTab from './CourseCreateTab';
import {useEffect, useState} from "react";
import axiosClient from "../../../axiosClient";
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {setCurrentCourseStatus, setTypeLesson} from "../../../redux/Course/slice";

const CourseCreateMain = ({type}) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {lang, username} = useParams();
    const languages = useSelector(state => state.mainLayout.languages);
    const currentCourse = useSelector(state => state.course.currentCourseEdit);

    const [currentLang, setCurrentLang] = useState('1');

    useEffect(() => {
        axiosClient
            .get(`${lang === undefined ? "/" : '/' + lang + "/"}@${username}/creation/course/type-lesson`)
            .then(({data}) => {
                dispatch(setTypeLesson(data.type_course));
            })
    }, [lang, username])

    const onClickSaveCourse = () => {
        dispatch(setCurrentCourseStatus("draft"));
        axiosClient.post(`@${username}/creation/course`, {course: currentCourse})
            .then(({data}) => {
                // if (data.result.slug) {
                //     navigate(`${lang === undefined ? "/" : '/' + lang + "/"}profile/${username}/course-edit/${data.result.slug}`);
                // }
                console.log(data);
            })
            .catch((response) => {
                console.log(response);
            });
    }

    const onClickPublishCourse = () => {
        dispatch(setCurrentCourseStatus("draft"));
        axiosClient.post(`@${username}/creation/course`, {course: currentCourse})
            .then((data) => {
                console.log(data);
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

            {Object.keys(languages).map((item) => <CourseCreateTab type={type} currentLang={languages[item].id}
                                                                   active={currentLang === languages[item].id}/>)}

            <div className="course-create-buttons">
                <button className="project__action-links-item btn-red">
                    <svg width="21" height="21" viewBox="0 0 21 21" fill="none"
                         xmlns="http://www.w3.org/2000/svg">
                        <circle cx="10.5" cy="10.5" r="8.75" stroke="#DB5B42"/>
                        <path d="M12.6875 8.31249L8.3125 12.6875M8.31248 8.31247L12.6875 12.6875"
                              stroke="#DB5B42"
                              strokeLinecap="round"/>
                    </svg>
                    <span>Удалить курс</span>
                </button>
                <button onClick={() => onClickPublishCourse()} className="btn primary big">Опубликовать</button>
                <button onClick={() => onClickSaveCourse()} className="btn secondary-blue big">Сохранить курс</button>
            </div>
        </div>
    );
}

export default CourseCreateMain;