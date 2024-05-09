import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axiosClient from '../../../axiosClient';
import ModalWindow from '../../Modal/ModalWindow';
import Table from '../../Table/Table';
/* ICONS */
import { MdKeyboardArrowLeft } from 'react-icons/md';

const ProfileSettingsSessions = () => {
  const { lang, username } = useParams();
  const [sessions, setSessions] = useState([]);

  const [isSelectRow, setIsSelectRow] = useState(false);
  const [currentSelectRow, setCurrentSelectRow] = useState(-1);
  const [amountSessions, setAmountSessions] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [amountOnPage, setAmountOnPage] = useState(3);
  const [addAmountOnPage, setAddAmountOnPage] = useState(2);

  const columns = [
    {
      accessorKey: 'id',
      header: 'ID',
      size: 70,
      cell: (item) => <p>#{item.id}</p>,
    },
    {
      accessorKey: 'type_device',
      header: 'Устройство',
      size: 70,
      cell: (item) => <p>{item.id}</p>,
    },
    {
      accessorKey: 'ip_address',
      header: 'IP-адрес',
      size: 70,
      cell: (item) => <p>{item.id}</p>,
    },
    {
      accessorKey: 'country_address',
      header: 'Страна',
      size: 70,
      cell: (item) => <p>{item.id}</p>,
    },
    {
      accessorKey: 'city_address',
      header: 'Город',
      size: 70,
      cell: (item) => <p>{item.id}</p>,
    },
    {
      accessorKey: 'date_of_last_session',
      header: 'Последний вход',
      size: 70,
      cell: (item) => <p>{item.id}</p>,
    },
  ];

  useEffect(() => {
    axiosClient
      .get(`${lang === undefined ? '/' : '/' + lang + '/'}@${username}/settings/session?`)
      .then(({ data }) => {
        console.log(data);
        setSessions(data);
      });
  }, [lang, username]);

  //   useEffect(() => {
  //     axiosClient.get(`admin/course?start=${(currentPage - 1) * amountOnPage}&end=${amountOnPage}&lang=1`).then(({data}) => {
  //       setSessions(data.result.courses);
  //         setAmountCourse(data.result.courseCount);
  //     });
  // }, [currentPage, amountOnPage]);

  const onClickRowTable = (i, item) => {
    if (currentSelectRow === i) {
      setIsSelectRow(false);
      setCurrentSelectRow(-1);
    } else {
      setCurrentSelectRow(i);
      setIsSelectRow(true);
    }
  };

  const handleSelectPage = (i) => {
    if (i === currentPage) return;
    setIsSelectRow(false);
    setCurrentSelectRow(-1);
    setCurrentPage(i);
  };

  const getAmountSkipNote = () => {
    let skip = amountOnPage * currentPage;
    if (skip > amountSessions) return amountSessions;
    return skip;
  };

  return (
    <div>
      <div className="created-courses-header">
        <div className="lessons-header-back">
          <MdKeyboardArrowLeft color="#ffffff" size={21} />
          <Link to={`../../profile/${username}`}>Профиль</Link>
        </div>
        <h1>_Текущие сессии</h1>
      </div>
      <div className="profile-settings-sessions">
        <div className="profile-settings-sessions-main">
          {/* <Table
            data={sessions}
            columns={columns}
            handleClickRow={onClickRowTable}
            selectRow={currentSelectRow}
          /> */}
          <ModalWindow />
        </div>
      </div>
    </div>
  );
};

export default ProfileSettingsSessions;
