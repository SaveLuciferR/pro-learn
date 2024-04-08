import { Link, useParams } from 'react-router-dom';

const ProfileSettingsSidebar = ({ data }) => {
  const { username } = useParams();
  return (
    <div className="profile-section-sidebar">
      <div className="profile-section-sidebar-tabs">
        <div className="profile-section-sidebar-tab">
          <Link
            to={`../../profile/${username}/settings/general`}
            className="profile-section-sidebar-tab-text"
          >
            Настройки профиля
          </Link>
        </div>
        <div className="profile-section-sidebar-tab">
          <Link
            to={`../../profile/${username}/settings/sessions`}
            className="profile-section-sidebar-tab-text"
          >
            Текущие сессии
          </Link>
        </div>
        <div className="profile-section-sidebar-tab">
          <Link
            to={`../../profile/${username}/settings/security`}
            className="profile-section-sidebar-tab-text"
          >
            Безопасность
          </Link>
        </div>
        <div className="profile-section-sidebar-tab">
          <Link
            to={`../../profile/${username}/settings/privacy`}
            className="profile-section-sidebar-tab-text"
          >
            Приватность
          </Link>
        </div>
      </div>
    </div>
  );
};
export default ProfileSettingsSidebar;
