import ProfileCreateCourse from './ProfileCreateCourseSlider';
import ProfileCreateCourseButton from './ProfileCreateCourseButton';

const ProfileCreatedCourses = () => {
  return (
    <div className="profile-section-main-cards">
      <ProfileCreateCourseButton type="course" />
      <ProfileCreateCourse />
    </div>
  );
};

export default ProfileCreatedCourses;
