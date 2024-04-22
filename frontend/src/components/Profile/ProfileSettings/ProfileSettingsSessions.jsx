import { Link, useParams } from 'react-router-dom';
import Table from '../../Table/Table';
import { useEffect, useState } from 'react';
import axiosClient from '../../../axiosClient';
import LoadingElement from '../../LoadingElement';
import { useDispatch, useSelector } from 'react-redux';
import { setShowWindow, setTitleText } from '../../../redux/Modal/slice';

const ProfileSettingsSessions = () => {
  const dispatch = useDispatch();
  const isButtonAnswer = useSelector((state) => state.modalElement.buttonAnswer);

  const columns = [
    {
      accessorKey: 'delete',
      size: 50,
      cell: (i) => (
        <button
          onClick={() => {
            deleteSession(i);
          }}
        >
          <svg
            width="25"
            height="25"
            viewBox="0 0 25 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="12.4987" cy="12.5" r="10.4167" stroke="#DB5B42" />
            <path
              d="M15.1028 9.89583L9.89453 15.1041M9.89451 9.89581L15.1028 15.1041"
              stroke="#DB5B42"
              strokeLinecap="round"
            />
          </svg>
        </button>
      ),
    },
    {
      accessorKey: 'type_device',
      header: 'Устройство',
      size: 288,
      cell: (props) => <p>{props.getValue()}</p>,
    },
    {
      accessorKey: 'country_address',
      header: 'Страна',
      size: 184,
      cell: (props) => <p>{props.getValue()}</p>,
    },
    {
      accessorKey: 'city_address',
      header: 'Город',
      size: 184,
      cell: (props) => <p>{props.getValue()}</p>,
    },
    {
      accessorKey: 'date_of_last_session',
      header: 'Последний вход',
      size: 184,
      cell: (props) => <p>{props.getValue()}</p>,
    },
    {
      accessorKey: 'ip_address',
      header: 'IP адрес',
      size: 184,
      cell: (props) => <p>{props.getValue()}</p>,
    },
  ];

  const deleteSession = (i) => {
    dispatch(setShowWindow(true));
    dispatch(setTitleText('Вы действительно хотите выйти с этого устройства?'));
    // console.log(dataTable[i.row.id].id);
  };

  useEffect(() => {
    isButtonAnswer === true ? console.log('да удалить') : console.log('нет не удалить');
  }, [isButtonAnswer]);

  const { lang, username } = useParams();
  const [sessions, setSessions] = useState([]);
  let dataTable = [];

  Object.keys(sessions).map((i) => {
    i === 'success' ? console.log() : dataTable.push(sessions[i]);
  });

  useEffect(() => {
    axiosClient
      .get(`${lang === undefined ? '/' : '/' + lang + '/'}@${username}/settings/session?`)
      .then(({ data }) => {
        setSessions(data.profile_sessions);
      });
  }, [lang, username]);

  return (
    <>
      {Object.keys(sessions).length === 0 ? (
        <LoadingElement />
      ) : (
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
              <div className="profile-settings-sessions-table">
                <Table data={dataTable} columns={columns} />
              </div>
              <div className="profile-settings-sessions-button">
                <button className="btn big secondary-blue">Прервать все сессии</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfileSettingsSessions;
