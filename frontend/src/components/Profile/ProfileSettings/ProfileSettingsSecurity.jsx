import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { setShowWindow, setTitleText, setContentText } from '../../../redux/Modal/slice';
import { useSelector, useDispatch } from 'react-redux';

const ProfileSettingsSecurity = () => {
  const dispatch = useDispatch();

  const buttonAnswer = useSelector((state) => state.modalElement.buttonAnswer);
  const currentUser = useSelector((state) => state.mainLayout.user);

  let temp = '';
  const { lang, username } = useParams();
  const [email, setEmail] = useState('');
  const [secondEmail, setSecondEmail] = useState('');
  // const [password, setPassword] = useState('');
  const [isActiveChangePswd, setIsActiveChangePswd] = useState(false);

  const swapEmails = () => {
    temp = email;
    setEmail(secondEmail);
    setSecondEmail(temp);
  };

  const definePswd = () => {
    isActiveChangePswd ? console.log('123') : setIsActiveChangePswd(true);
    console.log('click');
  };

  const modalDelete = () => {
    dispatch(setShowWindow(true));
    dispatch(setTitleText('Вы действительно хотите удалить аккаунт?'));
    dispatch(
      setContentText(
        'Если Вы удалите свой аккаунт, то безвозвратно потеряете свои курсы, задачи, прогресс, код, проекты и достижения.',
      ),
    );
  };

  useEffect(() => {
    setEmail(currentUser.mail);
    setSecondEmail(currentUser.second_mail);
    // setPassword(currentUser.password);
  }, []);

  /* <div className="profile-settings-security-delete">
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
        </div> */
  return (
    <div>
      <div className="created-courses-header">
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
          <Link to={`../../profile/${username}`}>Профиль</Link>
        </div>
        <h1>_Настройки безопасности</h1>
        <button className="profile-settings-security-delete" onClick={() => modalDelete()}>
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
        </button>
      </div>
      <div className="profile-settings-security">
        <div className="profile-settings-security-main">
          <div className="profile-settings-security-main_item">
            <p className="profile-settings-title">_Основная почта</p>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input width100"
              type="email"
              name="email"
            />
            <p className="profile-settings-security-main-comment">
              <span className="profile-settings-security-main-comment accent">
                // Это ваша основная почта.
              </span>
              Её можно сменить, если у Вас есть запасная почта.
            </p>
            <button
              onClick={() => swapEmails()}
              className="btn big secondary-blue profile-settings-security-main-btn"
            >
              <svg
                width="21"
                height="21"
                viewBox="0 0 21 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15.75 7L5.25 7M5.25 7L8.85938 3.5M5.25 7L8.85938 10.5"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M5.25 14L15.75 14M15.75 14L12.1406 10.5M15.75 14L12.1406 17.5"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Поменять почты местами
            </button>
            <button className="btn big secondary-blue" style={{ width: '250px' }}>
              Сохранить изменения
            </button>
          </div>
          <div className="profile-settings-security-main_item">
            <p className="profile-settings-title">_Запасная почта</p>
            <input
              value={secondEmail}
              onChange={(e) => setSecondEmail(e.target.value)}
              className="input width100"
              type="email"
              name="secondEmail"
            />
            <p className="profile-settings-security-main-comment">
              <span className="profile-settings-security-main-comment accent">
                // Это ваша запасная почта.
              </span>
              Её можно изменить или поменять местами с основной.
            </p>
          </div>
          <div className="profile-settings-security-main_item">
            <p className="profile-settings-title">_Пароль</p>
            <input className="input width100" type="password" name="password" />
            {isActiveChangePswd ? (
              <div className="profile-settings-security-main-change">
                <p className="profile-settings-title">_Новый пароль</p>
                <input className="input width100" type="password" name="newpassword" />
                <p className="profile-settings-title">_Повторите новый пароль</p>
                <input className="input width100" type="password" name="repeatpassword" />
              </div>
            ) : (
              <></>
            )}
            <button
              onClick={() => definePswd()}
              style={{ width: '250px' }}
              className="btn big secondary-blue"
            >
              Сменить пароль
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettingsSecurity;
