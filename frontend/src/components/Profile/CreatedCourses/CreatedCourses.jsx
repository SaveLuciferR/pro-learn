import { Link, useParams } from 'react-router-dom';
import ProfileCreateCourse from './ProfileCreateCourseSlider';
import ProfileCreateCourseButton from './ProfileCreateCourseButton';

const ProfileCreatedCourses = () => {
  const { username } = useParams();
  return (
    <div className="created-courses">
      <div className="created-courses-header">
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
          <Link to={`../../profile/${username}`}>Профиль</Link>
        </div>
        <h1>_Созданные курсы</h1>
      </div>
      <div className="profile-section-main-cards">
        <ProfileCreateCourseButton type="course" />
        <ProfileCreateCourse />
      </div>
    </div>
  );
};

export default ProfileCreatedCourses;
