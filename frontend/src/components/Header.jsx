function Header() {
  return (
    <header className="header">
      <div className="container">
        <div className="header_warpper">
          <div className="header_leftside">
            {/* Часть с лого и категориями */}
            <h2 className="header_title">Pro-Learn</h2>
            <div className="header_category">
              <p className="header_category__item">Новости</p>
            </div>
          </div>
          <div className="header_rightside">
            {/* Часть с сменой языка, поиском и аккаунтом */}
            <div className="header_lang">
              <p>rus</p>
              <svg
                width="9"
                height="5"
                viewBox="0 0 9 5"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M4.5 5L8.39711 0.5H0.602886L4.5 5Z" fill="white" />
              </svg>
            </div>
            <div className="header_icons">
              <div className="header_icons__icon">
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 28 28"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.8333 22.1667C17.988 22.1667 22.1667 17.988 22.1667 12.8333C22.1667 7.67868 17.988 3.5 12.8333 3.5C7.67868 3.5 3.5 7.67868 3.5 12.8333C3.5 17.988 7.67868 22.1667 12.8333 22.1667Z"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M24.5 24.5L19.425 19.425"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="header_icons__icon">
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 28 28"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="14"
                    cy="10.5"
                    r="3.5"
                    stroke="white"
                    strokeWidth="1.5"
                  />
                  <circle
                    cx="13.9999"
                    cy="14"
                    r="11.6667"
                    stroke="white"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M20.964 23.3333C20.7783 19.9599 19.7455 17.5 13.9999 17.5C8.25441 17.5 7.22156 19.9599 7.03589 23.3333"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
