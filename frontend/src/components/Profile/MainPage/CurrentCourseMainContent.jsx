import imgcourse from '../../../image 7.png';
import defaultIcon from '../../../DefaultIconCourse.png';
import LoadImage from '../../Component/LoadImage';

const CurrentCourseMainContent = ({ data, index, viewWords }) => {
  return (
    <div className="currentcourse-course-content">
      <div className="currentcourse-course">
        <div className="currentcourse-course-info">
          <p className="currentcourse-course-info-title clamp">_{data.title}</p>
          <div className="profile-section-main-difficulty">
            <p>_{viewWords['tpl_profile_card_dif']}: </p>
            <ul className="profile-difficulty-range">
              {Array(5)
                .fill('')
                .map((item, i) => (
                  <li
                    key={i}
                    className={`profile-difficulty-range-item ${
                      i < data.difficulty ? 'active' : ''
                    }`}
                  ></li>
                ))}
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
              <p className="currentcourse-course-info-rate-like-text">{data.like}</p>
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

              <p className="currentcourse-course-info-rate-dislike-text">{data.dislike}</p>
            </div>
          </div>
        </div>
        <div className="currentcourse-course-image">
          <LoadImage
            imageurl={data.icon}
            defaultImage={defaultIcon}
            altDefault={'no-course-icon'}
          />
        </div>
      </div>
      <div className="currentcourse-progress">
        <div className="currentcourse-progress-bar"></div>
        <p className="currentcourse-progress-text">5/10</p>
      </div>
    </div>
  );
};

export default CurrentCourseMainContent;
