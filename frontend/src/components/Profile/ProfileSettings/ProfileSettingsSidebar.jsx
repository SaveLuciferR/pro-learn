import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const ProfileSettingsSidebar = ({ data }) => {
  const { username } = useParams();
  const [activePage, setActivePage] = useState('');
  return (
    <div className="profile-section-sidebar">
      <div className="profile-section-sidebar-tabs">
        <div className={`profile-section-sidebar-tab${activePage === 'main' ? ' active' : ''}`}>
          <Link
            to={`../../profile/${username}/settings/general`}
            className="profile-section-sidebar-tab-text"
            onClick={() => setActivePage('main')}
          >
            Настройки профиля
          </Link>
        </div>
        <div className={`profile-section-sidebar-tab${activePage === 'session' ? ' active' : ''}`}>
          <Link
            to={`../../profile/${username}/settings/sessions`}
            className="profile-section-sidebar-tab-text"
            onClick={() => setActivePage('session')}
          >
            Текущие сессии
          </Link>
        </div>
        <div className={`profile-section-sidebar-tab${activePage === 'creation' ? ' active' : ''}`}>
          <Link
            to={`../../profile/${username}/settings/creations`}
            className="profile-section-sidebar-tab-text"
            onClick={() => setActivePage('creation')}
          >
            Создано мной
          </Link>
        </div>
        <div className={`profile-section-sidebar-tab${activePage === 'security' ? ' active' : ''}`}>
          <Link
            to={`../../profile/${username}/settings/security`}
            className="profile-section-sidebar-tab-text"
            onClick={() => setActivePage('security')}
          >
            Безопасность
          </Link>
        </div>
        <div className={`profile-section-sidebar-tab${activePage === 'privacy' ? ' active' : ''}`}>
          <Link
            to={`../../profile/${username}/settings/privacy`}
            className="profile-section-sidebar-tab-text"
            onClick={() => setActivePage('privacy')}
          >
            Приватность
          </Link>
        </div>
      </div>
    </div>
  );
};
export default ProfileSettingsSidebar;
