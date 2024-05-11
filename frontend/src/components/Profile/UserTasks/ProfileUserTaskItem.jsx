const ProfileUserTaskItem = ({viewWords}) => {
  return (
    <div className="profile-task">
      <div className="created-course-header">
        <ul className="created-course-header-tags">
          <li className="created-course-header-tag">#Python</li>
          <li className="created-course-header-tag">#Начинающим</li>
        </ul>
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
      <p className="profile-task-title clamp">_Самописный калькулятор</p>
      <p className="profile-task-desc clamp multiline">
        // Напишите программу, которая считывает с клавиатуры два целых числа и строку. Если эта
        строка является обозначением одной из четырёх математических операций (+, -, *, /), то
        выведите результат применения этой операции к введённым ранее числам, в противном случае
        выведите «Неверная операция». Если пользователь захочет поделить на ноль, выведите текст «На
        ноль делить нельзя!».
      </p>
      <div className="profile-difficulty">
        <p>_{viewWords['tpl_profile_card_dif']}: </p>
        <ul className="profile-difficulty-range">
          <li className="profile-difficulty-range-item active"></li>
          <li className="profile-difficulty-range-item active"></li>
          <li className="profile-difficulty-range-item active"></li>
          <li className="profile-difficulty-range-item"></li>
          <li className="profile-difficulty-range-item"></li>
        </ul>
      </div>
      <div className="profile-task-stat">
        <div className="created-course-stat-rate">
          <div className="created-course-stat-rate-like">
            <svg
              className="currentcourse-course-info-rate-arrow"
              width="12"
              height="13"
              viewBox="0 0 12 13"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 10.5L6 2.5M6 2.5L9 5.5M6 2.5L3 5.5"
                stroke="#2EA043"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <p className="currentcourse-course-info-rate-like-text">12</p>
          </div>
          <div className="created-course-stat-rate-dislike">
            <svg
              className="currentcourse-course-info-rate-arrow"
              width="12"
              height="13"
              viewBox="0 0 12 13"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 2.5L6 10.5M6 10.5L9 7.5M6 10.5L3 7.5"
                stroke="#DB5B42"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <p className="currentcourse-course-info-rate-dislike-text">2</p>
          </div>
        </div>
        <div className="created-course-stat-view">
          <svg
            width="21"
            height="21"
            viewBox="0 0 21 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2.86553 13.3837C2.12184 12.4175 1.75 11.9345 1.75 10.5C1.75 9.06555 2.12184 8.58246 2.86553 7.61629C4.35047 5.68711 6.84085 3.5 10.5 3.5C14.1592 3.5 16.6495 5.68711 18.1345 7.61629C18.8782 8.58246 19.25 9.06555 19.25 10.5C19.25 11.9345 18.8782 12.4175 18.1345 13.3837C16.6495 15.3129 14.1592 17.5 10.5 17.5C6.84085 17.5 4.35047 15.3129 2.86553 13.3837Z"
              stroke="white"
            />
            <path
              d="M13.125 10.5C13.125 11.9497 11.9497 13.125 10.5 13.125C9.05025 13.125 7.875 11.9497 7.875 10.5C7.875 9.05025 9.05025 7.875 10.5 7.875C11.9497 7.875 13.125 9.05025 13.125 10.5Z"
              stroke="white"
            />
          </svg>
          <p>{viewWords['tpl_profile_card_view']}: 1k</p>
        </div>
        <div className="created-course-stat-ended">
          <svg
            width="21"
            height="21"
            viewBox="0 0 21 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.55988 3.06219C9.80326 2.47927 11.1967 2.47927 12.44 3.06219L18.2949 5.80706C19.5684 6.40412 19.5684 8.47092 18.2948 9.06798L12.4401 11.8128C11.1967 12.3957 9.80333 12.3957 8.55995 11.8128L2.70515 9.06794C1.43161 8.47088 1.43162 6.40408 2.70515 5.80702L8.55988 3.06219Z"
              stroke="white"
            />
            <path d="M1.75 7.4375V12.25" stroke="white" strokeLinecap="round" />
            <path
              d="M16.625 10.0625V14.5472C16.625 15.4293 16.1844 16.2551 15.4128 16.6824C14.128 17.3939 12.0715 18.375 10.5 18.375C8.9285 18.375 6.87199 17.3939 5.58717 16.6824C4.81557 16.2551 4.375 15.4293 4.375 14.5472V10.0625"
              stroke="white"
              strokeLinecap="round"
            />
          </svg>
          <p>{viewWords['tpl_profile_card_finished']}: 64</p>
        </div>
      </div>
      <button className="btn big primary">Решить задачу</button>
      <div className="created-course-bottom">
        <p className="created-course-bottom-date">28.06.2023</p>
        <p className="created-course-bottom-lang">// {viewWords['tpl_profile_card_language']}: Python</p>
      </div>
      <div className="currentcourse-slider">(слайдер)</div>
    </div>
  );
};

export default ProfileUserTaskItem;
