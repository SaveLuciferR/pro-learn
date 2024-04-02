import { Link } from 'react-router-dom';

const ProfileSettingsPrivacy = () => {
  return (
    <div className="profile-settings-privacy">
      <div className="profile-settings-main-main-title">
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
          <Link to="">Профиль</Link>
        </div>
        <h1 className="profile-settings-title big">_Приватность</h1>
      </div>
      <div className="profile-settings-privacy-main">
        <div className="profile-settings-privacy-main_item">
          <svg
            width="61"
            height="60"
            viewBox="0 0 61 60"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8 26.0416C8 18.0477 8 14.0507 8.94379 12.706C9.88758 11.3613 13.6458 10.0749 21.1623 7.50198L22.5943 7.01179C26.5125 5.6706 28.4715 5 30.5 5C32.5285 5 34.4875 5.6706 38.4057 7.01179L39.8377 7.50198C47.3542 10.0749 51.1124 11.3613 52.0562 12.706C53 14.0507 53 18.0477 53 26.0416C53 27.2491 53 28.5585 53 29.9784C53 44.0736 42.4026 50.9137 35.7536 53.8182C33.95 54.6061 33.0481 55 30.5 55C27.9519 55 27.05 54.6061 25.2464 53.8182C18.5974 50.9137 8 44.0736 8 29.9784C8 28.5585 8 27.2491 8 26.0416Z"
              stroke="white"
              strokeWidth="3"
            />
            <circle cx="30.5" cy="22.5" r="5" stroke="white" strokeWidth="3" />
            <path
              d="M40.5 37.5C40.5 40.2614 40.5 42.5 30.5 42.5C20.5 42.5 20.5 40.2614 20.5 37.5C20.5 34.7386 24.9772 32.5 30.5 32.5C36.0228 32.5 40.5 34.7386 40.5 37.5Z"
              stroke="white"
              strokeWidth="3"
            />
          </svg>
          <button className="btn big primary width100p">Скрыть профиль</button>
          <p className="profile-settings-text small opacity60">
            Полностью скрыть профиль от других пользователей
          </p>
        </div>
        <div className="profile-settings-privacy-main_item">
          <svg
            width="61"
            height="60"
            viewBox="0 0 61 60"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5.5 40C5.5 32.9289 5.5 29.3934 7.6967 27.1967C9.8934 25 13.4289 25 20.5 25H40.5C47.5711 25 51.1066 25 53.3033 27.1967C55.5 29.3934 55.5 32.9289 55.5 40C55.5 47.0711 55.5 50.6066 53.3033 52.8033C51.1066 55 47.5711 55 40.5 55H20.5C13.4289 55 9.8934 55 7.6967 52.8033C5.5 50.6066 5.5 47.0711 5.5 40Z"
              stroke="white"
              strokeWidth="3"
            />
            <path
              d="M15.5 25V20C15.5 11.7157 22.2157 5 30.5 5C38.7843 5 45.5 11.7157 45.5 20V25"
              stroke="white"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>
          <button className="btn big primary width100p">Скрыть прохождение</button>
          <p className="profile-settings-text small opacity60">
            Скрыть прохождение курсов и задач от других пользователей
          </p>
        </div>
        <div className="profile-settings-privacy-main_item">
          <svg
            width="61"
            height="60"
            viewBox="0 0 61 60"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M53 43.75C53 48.5825 49.0825 52.5 44.25 52.5C39.4175 52.5 35.5 48.5825 35.5 43.75C35.5 38.9175 39.4175 35 44.25 35C49.0825 35 53 38.9175 53 43.75Z"
              stroke="white"
              stroke-width="3"
            />
            <path d="M5.5 27.5H55.5" stroke="white" strokeWidth="3" strokeLinecap="round" />
            <path
              d="M10.5 27.5L12.0345 21.362C13.3987 15.9053 14.0808 13.1769 16.1152 11.5885C18.1497 10 20.962 10 26.5866 10H34.4134C40.038 10 42.8503 10 44.8848 11.5885C46.9192 13.1769 47.6013 15.9053 48.9655 21.362L50.5 27.5"
              stroke="white"
              stroke-width="3"
              stroke-linecap="round"
            />
            <path
              d="M25.5 43.75C25.5 48.5825 21.5825 52.5 16.75 52.5C11.9175 52.5 8 48.5825 8 43.75C8 38.9175 11.9175 35 16.75 35C21.5825 35 25.5 38.9175 25.5 43.75Z"
              stroke="white"
              stroke-width="3"
            />
            <path
              d="M25.5 43.75L27.1459 42.927C29.2574 41.8713 31.7426 41.8713 33.8541 42.927L35.5 43.75"
              stroke="white"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>
          <button className="btn big primary width100p">Скрыть информацию</button>
          <p className="profile-settings-text small opacity60">
            Скрыть личную информацию от других пользователей
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettingsPrivacy;
