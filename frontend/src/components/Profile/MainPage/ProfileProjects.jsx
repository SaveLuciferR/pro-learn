import { Link } from 'react-router-dom';

const ProfileProjects = () => {
  return (
    <div className="profile-projects">
      <div className="profile-projects-header">
        <p className="profile-projects-header-title">Проекты</p>
        <Link to="" className="profile-projects-header-linkall">
          Посмотреть все
          <svg
            width="21"
            height="21"
            viewBox="0 0 21 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M11.786 4.78596C12.0422 4.52968 12.4578 4.52968 12.714 4.78596L17.964 10.036C18.2203 10.2922 18.2203 10.7078 17.964 10.964L12.714 16.214C12.4578 16.4703 12.0422 16.4703 11.786 16.214C11.5297 15.9578 11.5297 15.5422 11.786 15.286L15.9157 11.1562H3.5C3.13756 11.1562 2.84375 10.8624 2.84375 10.5C2.84375 10.1376 3.13756 9.84375 3.5 9.84375H15.9157L11.786 5.71404C11.5297 5.45776 11.5297 5.04224 11.786 4.78596Z"
              fill="white"
            />
          </svg>
        </Link>
      </div>
      <div className="profile-projects-info">
        <div className="profile-projects-info-text">
          <p className="profile-projects-info-text-name">_Название проекта</p>
          <p className="profile-projects-info-text-access">Публичный</p>
        </div>
        <svg
          className="info-about-name-edit"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_72_17902)">
            <path
              d="M9.57207 2.7191L10.19 2.10118C11.2138 1.07738 12.8737 1.07738 13.8975 2.10118C14.9213 3.12498 14.9213 4.7849 13.8975 5.8087L13.2796 6.42662M9.57207 2.7191C9.57207 2.7191 9.64931 4.03218 10.8079 5.19078C11.9665 6.34938 13.2796 6.42662 13.2796 6.42662M9.57207 2.7191L3.89125 8.39993C3.50647 8.7847 3.31408 8.97709 3.14863 9.18922C2.95345 9.43945 2.78612 9.7102 2.64959 9.99668C2.53385 10.2395 2.44782 10.4976 2.27574 11.0139L1.54657 13.2014M13.2796 6.42662L7.59877 12.1074C7.21399 12.4922 7.0216 12.6846 6.80947 12.8501C6.55924 13.0452 6.28849 13.2126 6.00202 13.3491C5.75916 13.4648 5.50105 13.5509 4.98482 13.723L2.79731 14.4521M2.79731 14.4521L2.26259 14.6304C2.00855 14.715 1.72847 14.6489 1.53912 14.4596C1.34977 14.2702 1.28365 13.9901 1.36833 13.7361L1.54657 13.2014M2.79731 14.4521L1.54657 13.2014"
              stroke="white"
            />
          </g>
          <defs>
            <clipPath id="clip0_72_17902">
              <rect width="16" height="16" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </div>
      <p className="profile-projects-desc">
        // Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in
        hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ..
      </p>
      <div className="profile-projects-bottom">
        <p className="profile-projects-bottom-date">24.01.2023</p>
        <div className="profile-projects-bottom-delete">
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="9" cy="9" r="7.5" stroke="#DB5B42" />
            <path
              d="M10.875 7.12502L7.125 10.875M7.12498 7.125L10.875 10.875"
              stroke="#DB5B42"
              strokeLinecap="round"
            />
          </svg>
          <p className="profile-projects-bottom-delete-text">Удалить</p>
        </div>
        <div className="profile-projects-bottom-lang">// Язык: Python</div>
      </div>
      <div className="profile-projects-slider">(слайдер)</div>
    </div>
  );
};

export default ProfileProjects;
