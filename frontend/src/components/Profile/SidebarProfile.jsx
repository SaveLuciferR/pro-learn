import { useDispatch, useSelector } from 'react-redux';
import img from '../../header_bg.png';
import { setNeedReloadPage, setSidebarProfileActive } from '../../redux/MainLayout/slice';
import axiosClient from '../../axiosClient';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import useOnClickOutside from '../../hooks/useOnClickOutside';
import { useRef } from 'react';

const SidebarProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { lang } = useParams();

  const currentUser = useSelector((state) => state.mainLayout.user);
  const sidebarProfileActive = useSelector((state) => state.mainLayout.sidebarProfileActive);

  const currentUrl = window.location;

  const ref = useRef(null);

  const onClickCloseSidebar = () => {
    dispatch(setSidebarProfileActive(false));
  };

  const onClickLogout = () => {
    axiosClient.post('/user/logout').then(({ data }) => {
      dispatch(setSidebarProfileActive(false));
      navigate(currentUrl);
      dispatch(setNeedReloadPage(true));
    });
  };

  const onClickLogin = () => {
    dispatch(setSidebarProfileActive(false));
    navigate('/user/login');
  };

  const onClickRegister = () => {
    dispatch(setSidebarProfileActive(false));
    navigate('/user/register');
  };

  useOnClickOutside(ref, () => {
    if (sidebarProfileActive) {
      dispatch(setSidebarProfileActive(false));
    }
  });

  return (
    <div className={'filter-bg'}>
      <div ref={ref} className={`filter${sidebarProfileActive ? ' active' : ''}`}>
        {/* Тернарный оператор на раздачу активного класса */}
        <div className="filter_container">
          {currentUser.length === 0 ? (
            <div className="sidebar_profile-empty">
              <div className="sidebar_profile-header_close" onClick={() => onClickCloseSidebar()}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M18 6L6 18"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M6 6L18 18"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <button onClick={() => onClickLogin()} type="button" className="btn big primary ">
                Авторизация
              </button>
              <button onClick={() => onClickRegister()} type="button" className="btn big primary ">
                Регистрация
              </button>
            </div>
          ) : (
            <>
              <div className="sidebar_profile-header">
                <div className="sidebar_profile-header_close" onClick={() => onClickCloseSidebar()}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M18 6L6 18"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M6 6L18 18"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div className="sidebar_profile-header_username">{currentUser.username}</div>
                <div
                  className="sidebar_profile-header_setting"
                  onClick={() =>
                    navigate(
                      `${lang === undefined ? '/' : '/' + lang + '/'}profile/${
                        currentUser.username
                      }/settings/general`,
                    )
                  }
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle cx="12" cy="12" r="3" stroke="white" strokeWidth="1.5" />
                    <path
                      d="M13.7639 2.15224C13.3963 2 12.9304 2 11.9985 2C11.0666 2 10.6007 2 10.2332 2.15224C9.7431 2.35523 9.35375 2.74458 9.15076 3.23463C9.0581 3.45834 9.02184 3.7185 9.00765 4.09799C8.98679 4.65568 8.70079 5.17189 8.21748 5.45093C7.73417 5.72996 7.14412 5.71954 6.65073 5.45876C6.31498 5.2813 6.07154 5.18262 5.83147 5.15102C5.30558 5.08178 4.77372 5.22429 4.3529 5.5472C4.03728 5.78938 3.80431 6.1929 3.33837 6.99993C2.87243 7.80697 2.63946 8.21048 2.58753 8.60491C2.51829 9.1308 2.6608 9.66266 2.98371 10.0835C3.1311 10.2756 3.33824 10.437 3.65972 10.639C4.13233 10.936 4.43643 11.4419 4.43639 12C4.43636 12.5581 4.13228 13.0639 3.65972 13.3608C3.33818 13.5629 3.13101 13.7244 2.98361 13.9165C2.66071 14.3373 2.5182 14.8691 2.58743 15.395C2.63936 15.7894 2.87233 16.193 3.33827 17C3.80421 17.807 4.03718 18.2106 4.3528 18.4527C4.77362 18.7756 5.30548 18.9181 5.83137 18.8489C6.07143 18.8173 6.31486 18.7186 6.65057 18.5412C7.14401 18.2804 7.73409 18.27 8.21743 18.549C8.70077 18.8281 8.98679 19.3443 9.00765 19.9021C9.02184 20.2815 9.05811 20.5417 9.15076 20.7654C9.35375 21.2554 9.7431 21.6448 10.2332 21.8478C10.6007 22 11.0666 22 11.9985 22C12.9304 22 13.3963 22 13.7639 21.8478C14.2539 21.6448 14.6433 21.2554 14.8463 20.7654C14.9389 20.5417 14.9752 20.2815 14.9894 19.902C15.0103 19.3443 15.2962 18.8281 15.7795 18.549C16.2628 18.2699 16.853 18.2804 17.3464 18.5412C17.6821 18.7186 17.9255 18.8172 18.1656 18.8488C18.6915 18.9181 19.2233 18.7756 19.6442 18.4527C19.9598 18.2105 20.1927 17.807 20.6587 16.9999C21.1246 16.1929 21.3576 15.7894 21.4095 15.395C21.4788 14.8691 21.3362 14.3372 21.0133 13.9164C20.8659 13.7243 20.6588 13.5628 20.3373 13.3608C19.8647 13.0639 19.5606 12.558 19.5607 11.9999C19.5607 11.4418 19.8647 10.9361 20.3373 10.6392C20.6588 10.4371 20.866 10.2757 21.0134 10.0835C21.3363 9.66273 21.4789 9.13087 21.4096 8.60497C21.3577 8.21055 21.1247 7.80703 20.6588 7C20.1928 6.19297 19.9599 5.78945 19.6442 5.54727C19.2234 5.22436 18.6916 5.08185 18.1657 5.15109C17.9256 5.18269 17.6822 5.28136 17.3465 5.4588C16.853 5.71959 16.263 5.73002 15.7796 5.45096C15.2963 5.17191 15.0103 4.65566 14.9894 4.09794C14.9752 3.71848 14.9389 3.45833 14.8463 3.23463C14.6433 2.74458 14.2539 2.35523 13.7639 2.15224Z"
                      stroke="white"
                      strokeWidth="1.5"
                    />
                  </svg>
                </div>
              </div>
              <div className="sidebar_profile-body">
                <div className="sidebar_profile-body_img">
                  <img src={img} alt="" />
                </div>
                <Link to={'profile/' + currentUser.username} className="btn primary big">
                  Перейти в профиль
                </Link>
                <button onClick={() => onClickLogout()} type="button" className="btn">
                  Выйти
                </button>

                <div className="sidebar_profile-create">
                  <Link
                    to={`/profile/${currentUser.username}/course-creation`}
                    className="sidebar_profile-create_item"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="37"
                      height="37"
                      viewBox="0 0 37 37"
                      fill="none"
                    >
                      <path d="M21.4979 0V15.7724H37V21.3462H21.4979V37H15.3049V21.3462H0V15.7724H15.3049V0H21.4979Z" />
                    </svg>
                    <span>Создать курс</span>
                  </Link>
                  <Link
                    to={`/profile/${currentUser.username}/task-creation`}
                    className="sidebar_profile-create_item"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="37"
                      height="37"
                      viewBox="0 0 37 37"
                      fill="none"
                    >
                      <path d="M21.4979 0V15.7724H37V21.3462H21.4979V37H15.3049V21.3462H0V15.7724H15.3049V0H21.4979Z" />
                    </svg>
                    <span>Создать задачу</span>
                  </Link>
                  <div className="sidebar_profile-create_item">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="37"
                      height="37"
                      viewBox="0 0 37 37"
                      fill="none"
                    >
                      <path d="M21.4979 0V15.7724H37V21.3462H21.4979V37H15.3049V21.3462H0V15.7724H15.3049V0H21.4979Z" />
                    </svg>
                    <span>Создать блог</span>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SidebarProfile;
