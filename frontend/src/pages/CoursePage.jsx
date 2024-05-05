import {useOutletContext, useParams} from 'react-router-dom';
import AllCourses from '../components/Courses/AllCourses';
import CompletedCourses from '../components/Courses/CompletedCourses';
import StartedCourses from '../components/Courses/StartedCourses';
import {useEffect, useState} from "react";
import axiosClient from "../axiosClient";

const CoursePage = ({isActiveSidebar, isCompiler}) => {
    const {activeSidebar, activeCompiler} = useOutletContext();
    activeSidebar[0](isActiveSidebar);
    activeCompiler[0](isCompiler);

    const {lang} = useParams();

    const [courses, setCourses] = useState([]);
    const [userCoursesComplete, setUserCoursesComplete] = useState([]);
    const [userCoursesCurrent, setUserCoursesCurrent] = useState([]);

    useEffect(() => {
        axiosClient.get(`${lang === undefined ? '/' : '/' + lang + '/'}course`)
            .then((res) => {
                setCourses(res.data.course.all_course);
                if (res.data.course.user_course !== undefined) {
                    console.log(res.data.course.user_course)
                    let currentCourse = []
                    let completeCourse = [];
                    res.data.course.user_course.map((item, i) => {
                        if (item.success === '1') {
                            completeCourse = [...completeCourse, item];
                        } else {
                            currentCourse = [...currentCourse, item];
                        }
                    })
                    setUserCoursesCurrent(currentCourse);
                    setUserCoursesComplete(completeCourse);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <div className="courses">
            <div className="courses-header">
                <p className="courses-header-title">_Курсы</p>

                {courses.length === 0 ?
                    <p className="courses-header-desc">// Курсы не найдены :(</p>
                    :
                    <p className="courses-header-desc">
                        // Цель этого раздела - предоставить как можно более грамотную и структурированную
                        информацию для обучения языков программирования и смежным технологиям.
                    </p>
                }
            </div>
            {userCoursesCurrent.length === 0 ?
                <></>
                :
                <StartedCourses courses={userCoursesCurrent}/>
            }
            {userCoursesComplete.length === 0 ?
                <></>
                :
                <></>
                // <CompletedCourses courses={userCoursesComplete}/>
            }
            {courses.length === 0 ?
                <></>
                :
                <AllCourses courses={courses}/>
            }
        </div>
    );
};

export default CoursePage;
