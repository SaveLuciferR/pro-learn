import CompleteCourseMain from './CompleteCourseMain';
import CurrentCourseMain from './CurrentCourseMain';
import ProfileInfo from './ProfileInfo';
import ProfileProjects from './ProfileProjects';

const ProfileMainPage = () => {
  return (
    <div className="profile-section-main-cards">
      <ProfileInfo />
      <CurrentCourseMain />
      <ProfileProjects />
      <CompleteCourseMain />
    </div>
  );
};

export default ProfileMainPage;
