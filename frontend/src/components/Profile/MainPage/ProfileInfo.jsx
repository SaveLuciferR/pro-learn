import img from '../../../header_bg.png';

const ProfileInfo = () => {
  return (
    <div className="info-about">
      <div className="info-about-name">
        <div className="info-about-name-leftside">
          <div className="info-about-name-photo">
            <img src={img} alt="profile-avatar" />
            {/* настроить стили, чтобы изображение не искажалось */}
          </div>
          <div className="info-about-name-nameblock">
            <p className="info-about-name-nameblock-nickname">John Johnson</p>
            <p className="info-about-name-nameblock-realname">Джон Джонсон</p>
          </div>
        </div>
        <p className="info-about-name-status">Администрация</p>
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
      <div className="info-about-bio">
        <p className="info-about-bio-title">&gt; О себе</p>
        <p className="info-about-bio-text">
          // Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in
          hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur,
          ultrices mauris. ..
        </p>
      </div>
      <div className="info-about-bottom">
        <div className="info-about-bottom-dor">
          <p>// Дата регистрации: 24.01.2023</p>
        </div>
        <div className="info-about-bottom-country">
          <p> Страна: Россия</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
