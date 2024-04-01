import { Link } from 'react-router-dom';
import ProfileCurrentCoursesItem from './ProfileCurrentCourseItem';

const ProfileCurrentCourses = () => {
  return (
    <div className="profile-projects-page">
      <div className="profile-projects-page-header">
        <div className="profile-projects-page-nav">
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
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <Link to="">Профиль</Link>
        </div>
        <p className="profile-current-page-title">Текущие курсы</p>
      </div>
      <div className="profile-completed-page-main">
        <ProfileCurrentCoursesItem />
        <ProfileCurrentCoursesItem />
      </div>
      <div className="profile-tasks-slider">(слайдер)</div>
    </div>
  );
};

export default ProfileCurrentCourses;
