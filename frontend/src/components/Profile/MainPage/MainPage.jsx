import CompleteCourse from './CompleteCourse';
import CurrentCourse from './CurrentCourse';
import ProfileInfo from './ProfileInfo';
import ProfileProjects from './ProfileProjects';

const ProfileMainPage = () => {
  return (
    <div className="profile-section-main-cards">
      <ProfileInfo />
      <CurrentCourse />
      <ProfileProjects />
      <CompleteCourse />
    </div>
  );
};

export default ProfileMainPage;
