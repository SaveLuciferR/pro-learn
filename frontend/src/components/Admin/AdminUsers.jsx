import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axiosClient from '../../axiosClient';
import Table from '../Table/Table';

const AdminUsers = () => {
  const [adminUsers, setAdminUsers] = useState([]);

  const columns = [
    {
      accessorKey: 'id',
      header: 'ID',
      size: 70,
      cell: (props) => <p>#{props.getValue()}</p>,
    },
    {
      accessorKey: 'username',
      header: 'Имя пользователя',
      size: 190,
      cell: (props) => (
        <Link to={`/profile/${props.getValue()}`} title={props.getValue()}>
          {props.getValue()}
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
      cell: (props) => <p>{props.getValue() === 'admin' ? 'Администратор' : 'Пользователь'}</p>,
    },
    {
      accessorKey: 'mail',
      header: 'Почта',
      size: 153,
      cell: (props) => <p title={props.getValue()}>{props.getValue()}</p>,
    },
    {
      accessorKey: 'about_user',
      header: 'О пользователе',
      size: 190,
      cell: (props) => <p title={props.getValue()}>{props.getValue()}</p>,
    },
    {
      accessorKey: 'mb_for_project',
      header: 'мб',
      size: 70,
      cell: (props) => <p>{props.getValue()}</p>,
    },
    {
      accessorKey: 'date_of_registration',
      header: 'Дата регистрации',
      size: 190,
      cell: (props) => <p>{props.getValue()}</p>,
    },
  ];

  useEffect(() => {
    axiosClient.get('admin/user').then(({ data }) => {
      setAdminUsers(data.result.users);
    });
  }, []);

  return (
    <>
      <div className="admin-header">
        <h1>_Пользователи</h1>
      </div>
      <div className="admin-main-header">
        <input type="search" placeholder="Поиск ..." className="input width1200" />
      </div>
      <div className="admin-content">
        <Table data={adminUsers} columns={columns} />
      </div>
    </>
  );
};
export default AdminUsers;
