import ProfileSettingsUserMain from '../components/Profile/ProfileSettings/ProfileSettingsUserMain';
import ProfileSettingsSidebar from '../components/Profile/ProfileSettings/ProfileSettingsSidebar';

const ProfileSettingsUserPage = () => {
  return (
    <div className="profile-settings">
      <ProfileSettingsSidebar />
      <ProfileSettingsUserMain />
    </div>
  );
};
export default ProfileSettingsUserPage;
