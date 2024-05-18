import CourseCard from './CourseCard';
import BlogFilter from "../Blog/BlogFilter";
import {useState} from "react";

const AllCourses = ({courses, viewWords}) => {

    const [isOpenFilter, setIsOpenFilter] = useState(false);

    return (
        <div className="courses-all">
            <div className="courses-all-title">
                _{viewWords['tpl_course-page_course-all']}
                <button className="courses-all-filter">
                    {viewWords['tpl_course-page_filter_title']}
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M22 3H2L10 12.46V19L14 21V12.46L22 3Z"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </button>
            </div>
            <div className="courses-all-main">
                {courses.map((item, i) => <CourseCard key={i} obj={item} viewWords={viewWords}/>)}
            </div>
            <div className="courses-all-bottom">
                <p className="courses-all-bottom-showed">Показано 10 из 100 курсов</p>
                <button className="courses-all-bottom-load">Загрузить еще</button>
                <div className="courses-slider">(слайдер)</div>
            </div>
            <BlogFilter
                isOpen={isOpenFilter}
                setIsOpen={setIsOpenFilter}

            />
        </div>
    );
};

export default AllCourses;
