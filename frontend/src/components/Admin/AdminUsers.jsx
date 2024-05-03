import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axiosClient from '../../axiosClient';
import Table from '../Table/Table';
import TablePagination from "../Table/TablePagination";

import { RxOpenInNewWindow } from "react-icons/rx";
import { RiCloseCircleLine } from "react-icons/ri";

const AdminUsers = () => {
  const [adminUsers, setAdminUsers] = useState([]);

  const [isSelectRow, setIsSelectRow] = useState(false);
  const [currentSelectRow, setCurrentSelectRow] = useState(-1);
  const [amountUsers, setAmountUsers] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [amountOnPage, setAmountOnPage] = useState(5);
  const [addAmountOnPage, setAddAmountOnPage] = useState(2);

  const columns = [
    {
      accessorKey: 'id',
      header: 'ID',
      size: 70,
      cell: (item) => <p>#{item.id}</p>,
    },
    {
      accessorKey: 'username',
      header: 'Имя пользователя',
      size: 190,
      cell: (item) => (
        <Link to={`/profile/${item.username}`} title={item.username}>
          {item.username}
        </Link>
      ),
    },
    {
      accessorKey: 'avatar_img',
      header: 'Аватар',
      size: 80,
      cell: () => <p>☺</p>,
    },
    {
      accessorKey: 'role',
      header: 'Роль',
      size: 145,
      cell: (item) => <p>{item.role === 'admin' ? 'Администратор' : 'Пользователь'}</p>,
    },
    {
      accessorKey: 'mail',
      header: 'Почта',
      size: 153,
      cell: (item) => <p title={item.mail}>{item.mail}</p>,
    },
    {
      accessorKey: 'about_user',
      header: 'О пользователе',
      size: 190,
      cell: (item) => <p title={item.about_user}>{item.about_user}</p>,
    },
    {
      accessorKey: 'mb_for_project',
      header: 'мб',
      size: 70,
      cell: (item) => <p>{item.mb_for_project}</p>,
    },
    {
      accessorKey: 'date_of_registration',
      header: 'Дата регистрации',
      size: 190,
      cell: (item) => <p>{item.date_of_registration}</p>,
    },
  ];

  useEffect(() => {
    axiosClient.get(`admin/user?start=${(currentPage - 1) * amountOnPage}&end=${amountOnPage}&lang=1`).then(({ data }) => {
      setAdminUsers(data.result.users);
      setAmountUsers(data.result.userCount);
    });
  }, [currentPage, amountOnPage]);

  const onClickRowTable = (i, item) => {
    if (currentSelectRow === i) {
      setIsSelectRow(false);
      setCurrentSelectRow(-1);
    } else {
      setCurrentSelectRow(i);
      setIsSelectRow(true);
    }
  }

  const handleSelectPage = (i) => {
    if (i === currentPage) return;
    setIsSelectRow(false);
    setCurrentSelectRow(-1);
    setCurrentPage(i);
  }

  const getAmountSkipNote = () => {
    let skip = amountOnPage * currentPage;
    if (skip > amountUsers) return amountUsers;
    return skip;
  }

  return (
    <>
      <div className="admin-header">
        <h1>_Пользователи</h1>
      </div>
      <div className="admin-main-header">
        <input type="search" placeholder="Поиск ..." className="input width1200" />
      </div>
      <div className="admin-content">
        <Table data={adminUsers} columns={columns} handleClickRow={onClickRowTable} selectRow={currentSelectRow} />
      </div>
      {isSelectRow ?
        <div className={"admin-footer-buttons"}>
          <button className={"btn primary big"}>Редактировать</button>
          <Link className={"btn with_icon"} to={"/"} target={'_blank'}><RxOpenInNewWindow
            size={21} /><span>Открыть</span></Link> {/* TODO если не опубликовано, то нет ссылки */}
          <button className={"btn with_icon btn-red"}>
            <RiCloseCircleLine size={21}
              color={'#DB5B42'} />
            <span>Удалить</span>
          </button>
        </div>
        :
        <></>}
      <div className={"admin-footer-buttons"}>Показано {getAmountSkipNote()} из {amountUsers} записей</div>
      <div className={"admin-footer-buttons"}>
        <button className={"btn secondary-white big"} type={'button'}
          onClick={() => setAmountOnPage(prevState => prevState + addAmountOnPage)}>Загрузить еще
        </button>
      </div>
      <TablePagination amountNote={amountUsers}
        amountNoteOnPage={amountOnPage}
        currentPage={currentPage}
        setCurrentPage={handleSelectPage}
      />
    </>
  );
};
export default AdminUsers;
