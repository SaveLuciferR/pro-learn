import img from '../../../image 7.png';

const ProfileCurrentCoursesItem = ({ data, index }) => {
  // console.log(index);
  return (
    <div className="profile-current-card">
      <ul className="created-course-header-tags">
        <li className="created-course-header-tag">#Python</li>
        <li className="created-course-header-tag">#Начинающим</li>
      </ul>
      <div className="created-course-info">
        <h1 className="created-course-info-title">{data[index].title}</h1>
        <div className="created-course-info-desc">
          <p className="created-course-info-desc-text">// {data[index].excerpt}</p>
          <img src={img} className="created-course-info-desc-img" />
        </div>
      </div>
      <div className="profile-difficulty">
        <p>_Сложность: </p>
        <ul className="profile-difficulty-range">
          <li className="profile-difficulty-range-item active"></li>
          <li className="profile-difficulty-range-item active"></li>
          <li className="profile-difficulty-range-item active"></li>
          <li className="profile-difficulty-range-item"></li>
          <li className="profile-difficulty-range-item"></li>
        </ul>
      </div>
      <div className="created-course-cards">
        <div className="created-course-card">
          <svg
            className="created-course-card-img"
            width="49"
            height="48"
            viewBox="0 0 49 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M36.332 30C36.332 30.8284 35.6605 31.5 34.832 31.5H24.832C24.0036 31.5 23.332 30.8284 23.332 30C23.332 29.1716 24.0036 28.5 24.832 28.5H34.832C35.6605 28.5 36.332 29.1716 36.332 30Z"
              fill="white"
            />
            <path
              d="M15.7923 18.8477C15.1559 18.3173 14.21 18.4033 13.6797 19.0397C13.1494 19.6761 13.2353 20.622 13.8718 21.1523L14.3406 21.543C15.6577 22.6406 16.519 23.363 17.0713 23.9748C17.5959 24.5557 17.6459 24.828 17.6459 25C17.6459 25.172 17.5959 25.4443 17.0713 26.0252C16.519 26.637 15.6577 27.3594 14.3406 28.457L13.8718 28.8477C13.2353 29.378 13.1494 30.3239 13.6797 30.9603C14.21 31.5967 15.1559 31.6827 15.7923 31.1523L16.3452 30.6916C17.5551 29.6835 18.5851 28.8252 19.2979 28.0358C20.055 27.1974 20.6459 26.2332 20.6459 25C20.6459 23.7668 20.055 22.8026 19.2979 21.9642C18.5851 21.1748 17.555 20.3165 16.3452 19.3084L15.7923 18.8477Z"
              fill="white"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M24.7173 2.5H24.9468C29.5636 2.49997 33.1816 2.49995 36.0046 2.87949C38.8941 3.26797 41.1741 4.07865 42.9638 5.86827C44.7534 7.65789 45.5641 9.93794 45.9525 12.8274C46.3321 15.6504 46.3321 19.2685 46.332 23.8853V24.1147C46.3321 28.7315 46.3321 32.3496 45.9525 35.1726C45.5641 38.0621 44.7534 40.3421 42.9638 42.1317C41.1741 43.9213 38.8941 44.732 36.0046 45.1205C33.1816 45.5 29.5636 45.5 24.9468 45.5H24.7173C20.1005 45.5 16.4824 45.5 13.6594 45.1205C10.77 44.732 8.48992 43.9213 6.7003 42.1317C4.91068 40.3421 4.1 38.0621 3.71152 35.1726C3.33199 32.3496 3.33201 28.7315 3.33203 24.1148V23.8852C3.33201 19.2685 3.33199 15.6504 3.71152 12.8274C4.1 9.93794 4.91068 7.65789 6.7003 5.86827C8.48992 4.07865 10.77 3.26797 13.6594 2.87949C16.4824 2.49995 20.1005 2.49997 24.7173 2.5ZM14.0592 5.85274C11.5024 6.1965 9.96094 6.85028 8.82162 7.98959C7.68231 9.12891 7.02853 10.6703 6.68477 13.2272C6.33522 15.8271 6.33203 19.2436 6.33203 24C6.33203 28.7565 6.33522 32.1729 6.68477 34.7728C7.02853 37.3297 7.68231 38.8711 8.82162 40.0104C9.96094 41.1497 11.5024 41.8035 14.0592 42.1473C16.6591 42.4968 20.0756 42.5 24.832 42.5C29.5885 42.5 33.0049 42.4968 35.6049 42.1473C38.1617 41.8035 39.7031 41.1497 40.8424 40.0104C41.9818 38.8711 42.6355 37.3297 42.9793 34.7728C43.3288 32.1729 43.332 28.7565 43.332 24C43.332 19.2436 43.3288 15.8271 42.9793 13.2272C42.6355 10.6703 41.9818 9.12891 40.8424 7.98959C39.7031 6.85028 38.1617 6.1965 35.6049 5.85274C33.0049 5.50319 29.5885 5.5 24.832 5.5C20.0756 5.5 16.6591 5.50319 14.0592 5.85274Z"
              fill="white"
            />
          </svg>
          <p className="created-course-card-text">Количество блоков: {data[index].amount_stage}</p>
        </div>
        <div className="created-course-card">
          <svg
            className="created-course-card-img"
            width="49"
            height="48"
            viewBox="0 0 49 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19.9045 28.5267C20.1954 27.751 19.8024 26.8864 19.0267 26.5955C18.251 26.3046 17.3864 26.6976 17.0955 27.4733L14.0955 35.4733C13.8046 36.249 14.1976 37.1136 14.9733 37.4045C15.749 37.6954 16.6136 37.3024 16.9045 36.5267L19.9045 28.5267Z"
              fill="white"
            />
            <path
              d="M13.5607 29.0607C14.1464 28.4749 14.1464 27.5251 13.5607 26.9393C12.9749 26.3536 12.0251 26.3536 11.4393 26.9393L9.43934 28.9393C8.85356 29.5251 8.85356 30.4749 9.43934 31.0607L11.4393 33.0607C12.0251 33.6464 12.9749 33.6464 13.5607 33.0607C14.1464 32.4749 14.1464 31.5251 13.5607 30.9393L12.6213 30L13.5607 29.0607Z"
              fill="white"
            />
            <path
              d="M22.5607 30.9393C21.9749 30.3536 21.0251 30.3536 20.4393 30.9393C19.8536 31.5251 19.8536 32.4749 20.4393 33.0607L21.3787 34L20.4393 34.9393C19.8536 35.5251 19.8536 36.4749 20.4393 37.0607C21.0251 37.6465 21.9749 37.6464 22.5607 37.0607L24.5607 35.0607C25.1464 34.4749 25.1464 33.5251 24.5607 32.9393L22.5607 30.9393Z"
              fill="white"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M20.3872 4.5H28.6128C29.2413 4.5 29.8475 4.49999 30.4319 4.50152C30.4545 4.50051 30.4772 4.5 30.5 4.5C30.5257 4.5 30.5513 4.50065 30.5767 4.50193C33.3447 4.51046 35.6215 4.55666 37.478 4.80627C39.8229 5.12153 41.7208 5.78576 43.2175 7.28249C44.7142 8.77921 45.3785 10.6771 45.6937 13.022C46.0001 15.3004 46 18.2116 46 21.8871V26.1128C46 29.7883 46.0001 32.6996 45.6937 34.978C45.3785 37.3229 44.7142 39.2208 43.2175 40.7175C41.7208 42.2142 39.8229 42.8785 37.478 43.1937C35.6215 43.4433 33.3448 43.4895 30.5767 43.4981C30.5513 43.4994 30.5257 43.5 30.5 43.5C30.4772 43.5 30.4545 43.4995 30.4319 43.4985C29.8504 43.5 29.2474 43.5 28.6222 43.5H20.3872C16.7117 43.5 13.8004 43.5001 11.522 43.1937C9.17711 42.8785 7.27921 42.2142 5.78249 40.7175C4.28576 39.2208 3.62153 37.3229 3.30627 34.978C2.99995 32.6996 2.99997 29.7884 3 26.1129V21.8872C2.99997 18.2117 2.99995 15.3004 3.30627 13.022C3.62153 10.6771 4.28576 8.77921 5.78249 7.28249C7.27921 5.78576 9.17711 5.12153 11.522 4.80627C13.8004 4.49995 16.7117 4.49997 20.3872 4.5ZM29 7.50004L29 40.5L20.5 40.5C16.6864 40.5 13.977 40.4968 11.9217 40.2205C9.90952 39.95 8.75023 39.4426 7.90381 38.5962C7.05739 37.7498 6.55005 36.5905 6.27952 34.5783C6.00319 32.523 6 29.8136 6 26V22C6 18.1864 6.00319 15.477 6.27952 13.4217C6.55005 11.4095 7.05739 10.2502 7.90381 9.40381C8.75023 8.55739 9.90952 8.05005 11.9217 7.77952C13.977 7.50319 16.6864 7.5 20.5 7.5L29 7.50004ZM37.0783 40.2205C35.7164 40.4036 34.0673 40.4668 32 40.4885L32 7.51146C34.0673 7.53324 35.7164 7.59641 37.0783 7.77952C39.0905 8.05005 40.2498 8.55739 41.0962 9.40381C41.9426 10.2502 42.45 11.4095 42.7205 13.4217C42.9968 15.477 43 18.1864 43 22V26C43 29.8136 42.9968 32.523 42.7205 34.5783C42.45 36.5905 41.9426 37.7498 41.0962 38.5962C40.2498 39.4426 39.0905 39.95 37.0783 40.2205Z"
              fill="white"
            />
          </svg>
          <p className="created-course-card-text">Количество уроков: {data[index].amount_step}</p>
        </div>
        <div className="created-course-card">
          <svg
            className="created-course-card-img"
            width="49"
            height="48"
            viewBox="0 0 49 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14.1641 12C14.1641 13.1046 13.2686 14 12.1641 14C11.0595 14 10.1641 13.1046 10.1641 12C10.1641 10.8954 11.0595 10 12.1641 10C13.2686 10 14.1641 10.8954 14.1641 12Z"
              fill="white"
            />
            <path
              d="M20.1641 12C20.1641 13.1046 19.2686 14 18.1641 14C17.0595 14 16.1641 13.1046 16.1641 12C16.1641 10.8954 17.0595 10 18.1641 10C19.2686 10 20.1641 10.8954 20.1641 12Z"
              fill="white"
            />
            <path
              d="M24.1641 14C25.2686 14 26.1641 13.1046 26.1641 12C26.1641 10.8954 25.2686 10 24.1641 10C23.0595 10 22.1641 10.8954 22.1641 12C22.1641 13.1046 23.0595 14 24.1641 14Z"
              fill="white"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M24.0493 2.5C19.4325 2.49997 15.8144 2.49995 12.9915 2.87949C10.102 3.26797 7.82196 4.07865 6.03234 5.86827C4.24272 7.65789 3.43204 9.93794 3.04356 12.8274C2.81878 14.4993 2.72713 16.4501 2.68977 18.722C2.67289 18.8121 2.66406 18.905 2.66406 19C2.66406 19.0798 2.67029 19.1581 2.68229 19.2346C2.66404 20.6592 2.66405 22.2062 2.66406 23.8852V24.1148C2.66404 28.7315 2.66402 32.3496 3.04356 35.1726C3.43204 38.0621 4.24272 40.3421 6.03234 42.1317C7.82196 43.9213 10.102 44.732 12.9915 45.1205C15.8144 45.5 19.4325 45.5 24.0493 45.5H24.2788C28.8956 45.5 32.5137 45.5 35.3367 45.1205C38.2261 44.732 40.5062 43.9213 42.2958 42.1317C44.0854 40.3421 44.8961 38.0621 45.2846 35.1726C45.6641 32.3496 45.6641 28.7315 45.6641 24.1147V23.8853C45.6641 22.2062 45.6641 20.6592 45.6458 19.2346C45.6578 19.1581 45.6641 19.0798 45.6641 19C45.6641 18.905 45.6552 18.8121 45.6384 18.722C45.601 16.4501 45.5093 14.4993 45.2846 12.8274C44.8961 9.93794 44.0854 7.65789 42.2958 5.86827C40.5062 4.07865 38.2261 3.26797 35.3367 2.87949C32.5137 2.49995 28.8956 2.49997 24.2788 2.5H24.0493ZM5.66406 24C5.66406 22.743 5.66429 21.5795 5.67107 20.5H16.6641L16.6641 42C16.6641 42.1436 16.6842 42.2824 16.7219 42.4139C15.4758 42.3622 14.3751 42.2795 13.3912 42.1473C10.8344 41.8035 9.29297 41.1497 8.15366 40.0104C7.01434 38.8711 6.36056 37.3297 6.0168 34.7728C5.66725 32.1729 5.66406 28.7565 5.66406 24ZM19.5844 42.4835C20.9579 42.4996 22.4767 42.5 24.1641 42.5C28.9205 42.5 32.337 42.4968 34.9369 42.1473C37.4937 41.8035 39.0352 41.1497 40.1745 40.0104C41.3138 38.8711 41.9676 37.3297 42.3113 34.7728C42.6609 32.1729 42.6641 28.7565 42.6641 24C42.6641 22.743 42.6638 21.5795 42.6571 20.5H19.6641L19.6641 42C19.6641 42.1692 19.6361 42.3318 19.5844 42.4835ZM6.0168 13.2272C5.85213 14.452 5.76433 15.858 5.71751 17.5H42.6106C42.5638 15.858 42.476 14.452 42.3113 13.2272C41.9676 10.6703 41.3138 9.12891 40.1745 7.98959C39.0352 6.85028 37.4937 6.1965 34.9369 5.85274C32.337 5.50319 28.9205 5.5 24.1641 5.5C19.4076 5.5 15.9912 5.50319 13.3912 5.85274C10.8344 6.1965 9.29297 6.85028 8.15366 7.98959C7.01434 9.12891 6.36056 10.6703 6.0168 13.2272Z"
              fill="white"
            />
          </svg>
          <p className="created-course-card-text">
            Финальных проектов: {data[index].final_projects}
          </p>
        </div>
      </div>
      <div className="profile-completed-card-stat">
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
            <p className="currentcourse-course-info-rate-like-text">{data[index].like}</p>
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
            <p className="currentcourse-course-info-rate-dislike-text">{data[index].dislike}</p>
          </div>
        </div>
        <p className="profile-completed-card-stat-lang">// Язык: Python</p>
      </div>
      <div className="profile-completed-card-about">
        <p>
          &gt; {data[index].username},{' '}
          {data[index].role === 'user' ? 'Пользователь' : 'Администратор'},{' '}
          {data[index].date_of_publication}
        </p>
      </div>
      <div className="profile-completed-card-progress">
        <div className="profile-completed-card-progress-bar"></div>
        <p className="profile-completed-card-progress-value">10/10</p>
      </div>
      <div className="profile-current-card-button">
        <button className="btn big primary">Продолжить обучение</button>
      </div>
    </div>
  );
};

export default ProfileCurrentCoursesItem;
