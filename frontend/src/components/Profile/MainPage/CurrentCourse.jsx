import imgcourse from '../../../image 7.png';

const CurrentCourse = () => {
  return (
    <div className="currentcourse">
      <p className="currentcourse-title">Текущие курсы</p>
      <div className="currentcourse-course">
        <div className="currentcourse-course-info">
          <p className="currentcourse-course-info-title">_Web-разработчик</p>
          <div className="currentcourse-course-info-difficulty">
            <p>_Сложность: </p>
            <ul className="currentcourse-course-info-difficulty-range">
              <li className="currentcourse-course-info-difficulty-range-item active"></li>
              <li className="currentcourse-course-info-difficulty-range-item active"></li>
              <li className="currentcourse-course-info-difficulty-range-item active"></li>
              <li className="currentcourse-course-info-difficulty-range-item"></li>
              <li className="currentcourse-course-info-difficulty-range-item"></li>
            </ul>
          </div>
          <div className="currentcourse-course-info-rate">
            <div className="currentcourse-course-info-rate-like">
              <svg
                className="currentcourse-course-info-rate-arrow"
                width="12"
                height="13"
                viewBox="0 0 12 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 10.5L6 2.5M6 2.5L9 5.5M6 2.5L3 5.5"
                  stroke="#2EA043"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <p className="currentcourse-course-info-rate-like-text">12</p>
            </div>
            <div className="currentcourse-course-info-rate-dislike">
              <svg
                className="currentcourse-course-info-rate-arrow"
                width="12"
                height="13"
                viewBox="0 0 12 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 2.5L6 10.5M6 10.5L9 7.5M6 10.5L3 7.5"
                  stroke="#DB5B42"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <p className="currentcourse-course-info-rate-dislike-text">2</p>
            </div>
          </div>
        </div>
        <div className="currentcourse-course-image">
          <img src={imgcourse} alt="course_image"></img>
        </div>
      </div>
      <div className="currentcourse-progress">
        <div className="currentcourse-progress-bar"></div>
        <p className="currentcourse-progress-text">5/10</p>
      </div>
      <div className="currentcourse-slider">(слайдер)</div>
    </div>
  );
};

export default CurrentCourse;
