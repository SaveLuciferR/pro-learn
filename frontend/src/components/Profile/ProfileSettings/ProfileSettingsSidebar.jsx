import { Link } from 'react-router-dom';

const ProfileSettingsSidebar = () => {
  return (
    <div className="profile-section-sidebar">
      <div className="profile-section-sidebar-tabs">
        <div className="profile-section-sidebar-tab">
          <Link to="" className="profile-section-sidebar-tab-text">
            Настройки профиля
          </Link>
        </div>
        <div className="profile-section-sidebar-tab">
          <Link to="" className="profile-section-sidebar-tab-text">
            Текущие сессии
          </Link>
        </div>
        <div className="profile-section-sidebar-tab">
          <Link to="" className="profile-section-sidebar-tab-text">
            Создано мной
          </Link>
        </div>
        <div className="profile-section-sidebar-tab">
          <Link to="" className="profile-section-sidebar-tab-text">
            Настройки приватности
          </Link>
        </div>
      </div>
    </div>
  );
};
export default ProfileSettingsSidebar;
