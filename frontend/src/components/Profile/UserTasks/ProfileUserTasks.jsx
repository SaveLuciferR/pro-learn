import ProfileCreateCourseButton from '../CreatedCourses/ProfileCreateCourseButton';
import ProfileUserTaskItem from './ProfileUserTaskItem';

const ProfileUserTasks = () => {
  return (
    <div className="profile-tasks">
      <ProfileCreateCourseButton type="task" />
      <ProfileUserTaskItem />
    </div>
  );
};

export default ProfileUserTasks;
