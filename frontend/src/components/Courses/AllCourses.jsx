import CourseCard from './CourseCard';

const AllCourses = ({courses}) => {
  return (
    <div className="courses-all">
      <div className="courses-all-title">
        _Все курсы
        <button className="courses-all-filter">
          Фильтр
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
          {courses.map((item, i) => <CourseCard key={i} obj={item}/>)}
      </div>
      <div className="courses-all-bottom">
        <p className="courses-all-bottom-showed">Показано 10 из 100 курсов</p>
        <button className="courses-all-bottom-load">Загрузить еще</button>
        <div className="courses-slider">(слайдер)</div>
      </div>
    </div>
  );
};

export default AllCourses;
