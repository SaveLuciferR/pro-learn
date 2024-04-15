import { Link, useParams } from 'react-router-dom';
import Table from '../../Table';
import { useEffect, useState } from 'react';
import axiosClient from '../../../axiosClient';
import ModalWindow from '../../Modal/ModalWindow';
import ModalWindowTask from '../../Modal/ModalWindowTask';

const ProfileSettingsSessions = () => {
  const { lang, username } = useParams();
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    axiosClient
      .get(`${lang === undefined ? '/' : '/' + lang + '/'}@${username}/settings/session?`)
      .then(({ data }) => {
        setSessions(data);
      });
  }, [lang, username]);

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
        <h1>_Текущие сессии</h1>
      </div>
      <div className="profile-settings-sessions">
        <div className="profile-settings-sessions-main">
          <Table />
          <ModalWindowTask />
        </div>
      </div>
    </div>
  );
};

export default ProfileSettingsSessions;
