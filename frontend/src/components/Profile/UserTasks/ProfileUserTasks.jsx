import { Link, useParams } from 'react-router-dom';
import ProfileCreateCourseButton from '../CreatedCourses/ProfileCreateCourseButton';
import ProfileUserTaskItem from './ProfileUserTaskItem';

const ProfileUserTasks = () => {
  const { username } = useParams();

  return (
    <div>
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
        <h1>_Созданные задачи</h1>
      </div>
      <div className="profile-tasks">
        <ProfileCreateCourseButton type="task" />
        <ProfileUserTaskItem />
      </div>
    </div>
  );
};

export default ProfileUserTasks;
