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
    const [viewWords, setViewWords] = useState({});

    const [searchFilter, setSearchFilter] = useState();
    const [categoryCourse, setCategoryCourse] = useState([]);


    useEffect(() => {
        axiosClient.get(`${lang === undefined ? '/' : '/' + lang + '/'}course`)
            .then((res) => {
                setCourses(res.data.course.all_course);
                if (res.data.course.user_course !== undefined) {
                    // console.log(res.data)
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
                setViewWords(res.data.viewWords);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [lang]);

    return (
        <div className="courses">
            <div className="courses-header">
                <p className="courses-header-title">_{viewWords['tpl_course-page_title']}</p>

                {courses.length === 0 ?
                    <p className="courses-header-desc">// {viewWords['tpl_course-page_not-found']} :(</p>
                    :
                    <p className="courses-header-desc">
                        // {viewWords['tpl_course-page_desc']}
                    </p>
                }
            </div>
            {userCoursesCurrent.length === 0 ?
                <></>
                :
                <StartedCourses courses={userCoursesCurrent} viewWords={viewWords}/>
            }
            {userCoursesComplete.length === 0 ?
                <></>
                :
                <CompletedCourses courses={userCoursesComplete} viewWords={viewWords}/>
            }
            {courses.length === 0 ?
                <></>
                :
                <AllCourses
                    courses={courses}
                    viewWords={viewWords}
                    search={searchFilter}
                    setSearch={setSearchFilter}

                />
            }
        </div>
    );
};

export default CoursePage;
