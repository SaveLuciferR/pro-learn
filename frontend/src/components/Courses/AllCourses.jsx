import CourseCard from './CourseCard';
import BlogFilter from '../Blog/BlogFilter';
import { useState } from 'react';
/* ICONS */
import { FiFilter } from 'react-icons/fi';

const AllCourses = ({ courses, viewWords }) => {
  const [isOpenFilter, setIsOpenFilter] = useState(false);

  return (
    <div className="courses-all">
      <div className="courses-all-title">
        _{viewWords['tpl_course-page_course-all']}
        <button onClick={() => setIsOpenFilter(!isOpenFilter)} className="courses-all-filter">
          {viewWords['tpl_course-page_filter_title']}
          <FiFilter size={24} color="#ffffff" />
        </button>
      </div>
      <div className="courses-all-main">
        {courses.map((item, i) => (
          <CourseCard key={i} obj={item} viewWords={viewWords} />
        ))}
      </div>
      <div className="courses-all-bottom">
        <p className="courses-all-bottom-showed">Показано 10 из 100 курсов</p>
        <button className="courses-all-bottom-load">Загрузить еще</button>
        <div className="courses-slider">(слайдер)</div>
      </div>
      <BlogFilter isOpen={isOpenFilter} setIsOpen={() => setIsOpenFilter()} />
    </div>
  );
};

export default AllCourses;
