function Sidebar() {
  return (
    <nav className="sidebar">
      <div className="sidebar__container">
        <div className="sidebar_btngroup">
          {/* Часть с кнопками навигации */}
          <div className="sidebar_btn">
            <div className="sidebar_btn__item">
              {/* Курсы */}
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 11C2 7.22876 2 5.34315 3.17157 4.17157C4.34315 3 6.22876 3 10 3H14C17.7712 3 19.6569 3 20.8284 4.17157C22 5.34315 22 7.22876 22 11V13C22 16.7712 22 18.6569 20.8284 19.8284C19.6569 21 17.7712 21 14 21H10C6.22876 21 4.34315 21 3.17157 19.8284C2 18.6569 2 16.7712 2 13V11Z"
                  stroke="white"
                  strokeWidth="1.5"
                />
                <path
                  d="M5.5 10H11.5"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  d="M6.5 14H10.5"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  d="M15 21L15 3"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>
          <div className="sidebar_btn">
            <div className="sidebar_btn__item">
              {/* Практика */}
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17 7.82959L18.6965 9.35641C20.239 10.7447 21.0103 11.4389 21.0103 12.3296C21.0103 13.2203 20.239 13.9145 18.6965 15.3028L17 16.8296"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  d="M13.9868 5L12 12.4149L10.0132 19.8297"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  d="M7.00005 7.82959L5.30358 9.35641C3.76102 10.7447 2.98975 11.4389 2.98975 12.3296C2.98975 13.2203 3.76102 13.9145 5.30358 15.3028L7.00005 16.8296"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>
          <div className="sidebar_btn">
            <div className="sidebar_btn__item">{/* Сообщество */}
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="12"
                  cy="6"
                  r="4"
                  stroke="white"
                  strokeWidth="1.5"
                />
                <path
                  d="M18 9C19.6569 9 21 7.88071 21 6.5C21 5.11929 19.6569 4 18 4"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  d="M6 9C4.34315 9 3 7.88071 3 6.5C3 5.11929 4.34315 4 6 4"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <ellipse
                  cx="12"
                  cy="17"
                  rx="6"
                  ry="4"
                  stroke="white"
                  strokeWidth="1.5"
                />
                <path
                  d="M20 19C21.7542 18.6153 23 17.6411 23 16.5C23 15.3589 21.7542 14.3847 20 14"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  d="M4 19C2.24575 18.6153 1 17.6411 1 16.5C1 15.3589 2.24575 14.3847 4 14"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Sidebar;
