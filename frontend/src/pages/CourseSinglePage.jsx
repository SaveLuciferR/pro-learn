import CourseBlocks from '../components/Courses/CourseItem/CourseBlocks';
import CourseInfo from '../components/Courses/CourseItem/CourseInfo';
import {useEffect, useState} from "react";
import axiosClient from "../axiosClient";
import {useParams} from "react-router-dom";
import LoadingElement from "../components/LoadingElement";

const CourseSinglePage = () => {

    const {lang, slug} = useParams();

    const [course, setCourse] = useState([]);

    useEffect(() => {
        axiosClient.get(`${lang === undefined ? '/' : '/' + lang + '/'}course/${slug}`)
            .then((res) => {
                setCourse(res.data.course);
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])

    return (
        <div className="course">
            {Object.keys(course).length === 0 ?
                <LoadingElement/> :
                <>
                    <CourseInfo course={course}/>
                    <CourseBlocks course={course}/>
                </>
            }

        </div>
    );
};

export default CourseSinglePage;
