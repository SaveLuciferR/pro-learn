import { Link } from 'react-router-dom';

const ProfileSettingsSecurity = () => {
  return (
    <div className="profile-settings-security">
      <div className="profile-settings-security-title">
        <div className="profile-settings-security-title-back">
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
          <Link to="">Профиль</Link>
        </div>
        <p className="profile-settings-title big">Настройки безопасности</p>
        <div className="profile-settings-security-delete">
          <svg
            width="21"
            height="21"
            viewBox="0 0 21 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="10.5" cy="10.5" r="8.75" stroke="#DB5B42" />
            <path
              d="M12.6875 8.3125L8.3125 12.6875M8.31248 8.31248L12.6875 12.6875"
              stroke="#DB5B42"
              strokeLinecap="round"
            />
          </svg>
          <p>Удалить аккаунт</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettingsSecurity;
