import { Link, Outlet } from 'react-router-dom';

const CourseLessonPage = () => {
  return (
    <div className="lessons">
      <div className="lessons-header">
        <div className="lessons-header-back">
          <svg
            width="21"
            height="21"
            viewBox="0 0 21 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13.125 4.375L7.875 10.5L13.125 16.625"
              stroke="white"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <Link to="/courses/name-course">Блоки</Link>
        </div>

        <p className="lessons-header-title">_Название урока 5</p>
      </div>
      <div className="lessons-stage">
        <svg
          width="21"
          height="21"
          viewBox="0 0 21 21"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="8.75"
            cy="8.75"
            r="8.75"
            transform="matrix(-1 0 0 1 19.25 1.75)"
            stroke="white"
            strokeOpacity="0.6"
          />
          <path
            d="M11.8125 7.875L9.1875 10.5L11.8125 13.125"
            stroke="white"
            strokeOpacity="0.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <p>5/8</p>
        <svg
          width="21"
          height="21"
          viewBox="0 0 21 21"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="10.5" cy="10.5" r="8.75" stroke="white" strokeOpacity="0.6" />
          <path
            d="M9.1875 7.875L11.8125 10.5L9.1875 13.125"
            stroke="white"
            strokeOpacity="0.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <div className="lessons-btn">
        <button className="btn primary big">Проверить ответ</button>
      </div>
      <div className="lessons-main">
        <Outlet />
      </div>
    </div>
  );
};

export default CourseLessonPage;
