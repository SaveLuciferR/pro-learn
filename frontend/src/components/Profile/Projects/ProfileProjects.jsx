import { Link } from 'react-router-dom';
import ProfileProjectItem from './ProfileProjectItem';

const ProfileProjects = () => {
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
        <p className="profile-projects-page-title">Проекты</p>
      </div>
      <div className="profile-projects-page-main">
        <ProfileProjectItem />
        <ProfileProjectItem />
        <ProfileProjectItem />
        <ProfileProjectItem />
      </div>
      <div className="profile-tasks-slider">(слайдер)</div>
    </div>
  );
};

export default ProfileProjects;
