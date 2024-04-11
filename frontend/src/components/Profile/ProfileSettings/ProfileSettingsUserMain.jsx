import { Link, useParams } from 'react-router-dom';
import img from '../../../avatar.png';
import { useEffect, useState } from 'react';
import axiosClient from "../../../axiosClient";

const ProfileSettingsUserMain = ({ data }) => {
  const [nickname, setNickname] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [infoAbout, setInfoAbout] = useState('');
  const [country, setCountry] = useState('');

  useEffect(() => {
    console.log(data);
    setNickname(data.username);
    setLastName(data.last_name);
    setFirstName(data.first_name);
    setInfoAbout(data.about_user);
    setCountry(data.country_address);
  }, []);

  const onClickSaveMainProfileSettings = () => {
    axiosClient.post(`/@${username}/settings/general`, {
      username: nickname,
      avatar_img: '',
      heading_img: '',
      about_user: infoAbout,
      last_name: lastName,
      first_name: firstName,
      country_address: country
    })
        .then((data) => {
          console.log(data);
        })
        .catch(({response}) => {
          console.log(response);
        })
  }

  const { username } = useParams();
  return (
    <div className="profile-settings-main">
      <div className="profile-settings-main-header">
        <svg
          width="37"
          height="37"
          viewBox="0 0 37 37"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M21.4979 0V15.7724H37V21.3462H21.4979V37H15.3049V21.3462H0V15.7724H15.3049V0H21.4979Z"
            fill="white"
            fillOpacity="0.5"
          />
        </svg>
        <div className="profile-settings-main-header-load">
          <svg
            width="21"
            height="21"
            viewBox="0 0 21 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.75 10.5C1.75 6.37521 1.75 4.31282 3.03141 3.03141C4.31282 1.75 6.37521 1.75 10.5 1.75C14.6248 1.75 16.6872 1.75 17.9686 3.03141C19.25 4.31282 19.25 6.37521 19.25 10.5C19.25 14.6248 19.25 16.6872 17.9686 17.9686C16.6872 19.25 14.6248 19.25 10.5 19.25C6.37521 19.25 4.31282 19.25 3.03141 17.9686C1.75 16.6872 1.75 14.6248 1.75 10.5Z"
              stroke="white"
            />
            <circle cx="14" cy="7" r="1.75" stroke="white" />
            <path
              d="M1.75 10.9376L3.28264 9.59657C4.08 8.89889 5.28174 8.9389 6.03092 9.68809L9.78443 13.4416C10.3858 14.0429 11.3323 14.1249 12.0281 13.6359L12.289 13.4526C13.2902 12.7489 14.6448 12.8305 15.5544 13.6491L18.375 16.1876"
              stroke="white"
              strokeLinecap="round"
            />
          </svg>
          <p>Загрузить новую шапку</p>
        </div>
        <p className="profile-settings-main-header-text">Рекомендуемый размер 1080х194</p>
      </div>
      <div className="profile-settings-main-line"></div>
      <div className="profile-settings-main-main">
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
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <Link to={`/profile/${username}`}>Профиль</Link>
          </div>
          <p className="profile-settings-main-main-text">Настройки профиля</p>
        </div>
        <div className="profile-settings-main-main-avatar">
          <img src={img} alt="avatar" />
          <div className="profile-settings-main-header-load">
            <svg
              width="21"
              height="21"
              viewBox="0 0 21 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.75 10.5C1.75 6.37521 1.75 4.31282 3.03141 3.03141C4.31282 1.75 6.37521 1.75 10.5 1.75C14.6248 1.75 16.6872 1.75 17.9686 3.03141C19.25 4.31282 19.25 6.37521 19.25 10.5C19.25 14.6248 19.25 16.6872 17.9686 17.9686C16.6872 19.25 14.6248 19.25 10.5 19.25C6.37521 19.25 4.31282 19.25 3.03141 17.9686C1.75 16.6872 1.75 14.6248 1.75 10.5Z"
                stroke="white"
              />
              <circle cx="14" cy="7" r="1.75" stroke="white" />
              <path
                d="M1.75 10.9376L3.28264 9.59657C4.08 8.89889 5.28174 8.9389 6.03092 9.68809L9.78443 13.4416C10.3858 14.0429 11.3323 14.1249 12.0281 13.6359L12.289 13.4526C13.2902 12.7489 14.6448 12.8305 15.5544 13.6491L18.375 16.1876"
                stroke="white"
                strokeLinecap="round"
              />
            </svg>
            <p>Загрузить новый аватар</p>
          </div>
        </div>
        <div className="profile-settings-main-main-name">
          <div className="profile-settings-main-main-name_item">
            <div className="profile-settings-main-main-nick">
              <p className="profile-settings-main-main-title-part">_Сменить ник</p>
              <p className="profile-settings-main-main-nick-desc">Ник должен быть уникальным</p>
            </div>
            <input
              type="text"
              className="input width100"
              name="nickname"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
            />
          </div>
          <div className="profile-settings-main-main-name_item">
            <p className="profile-settings-main-main-title-part">_Имя</p>
            <input
              type="text"
              className="input width100"
              name="name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="profile-settings-main-main-name_item">
            <p className="profile-settings-main-main-title-part">_Фамилия</p>
            <input
              type="text"
              className="input width100"
              name="surname"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
        </div>
        <div className="profile-settings-main-main-bio">
          <p className="profile-settings-main-main-title-part">_О себе</p>
          <textarea
            className="input textarea"
            value={infoAbout}
            onChange={(e) => setInfoAbout(e.target.value)}
          />
        </div>
        <div className="profile-settings-main-main-country">
          <p className="profile-settings-main-main-title-part">_Страна</p>
          <div className="profile-settings-main-main-bottom">
            <input
              type="search"
              className="input w531"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
            <button onClick={() => onClickSaveMainProfileSettings() } className="btn big secondary-blue">Сохранить изменения</button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProfileSettingsUserMain;
