import { useEffect, useState } from 'react';
import axiosClient from '../../axiosClient';
import Table from '../Table/Table';

const AdminProjects = () => {
  const [adminProjects, setAdminProjects] = useState([]);

  const columns = [
    {
      accessorKey: 'id',
      header: 'ID',
      size: 70,
      cell: (props) => <p>#{props.getValue()}</p>,
    },
    {
      accessorKey: 'title',
      header: 'Название',
      size: 225,
      cell: (props) => <p title={props.getValue()}>{props.getValue()}</p>,
    },
    {
      accessorKey: 'slug',
      header: 'Slug',
      size: 225,
      cell: (props) => <p title={props.getValue()}>{props.getValue()}</p>,
    },
    {
      accessorKey: 'private',
      header: 'Приватность',
      size: 149,
      cell: (props) => <p>{props.getValue() === '0' ? 'Публичный' : 'Приватный'}</p>,
    },
    {
      accessorKey: 'date_of_publication',
      header: 'Дата публикации',
      size: 194,
      cell: (props) => <p>{props.getValue()}</p>,
    },
    {
      accessorKey: 'description',
      header: 'Описание',
      size: 225,
      cell: (props) => <p title={props.getValue()}>{props.getValue()}</p>,
    },
  ];

  useEffect(() => {
    axiosClient.get('admin/project').then(({ data }) => {
      setAdminProjects(data.result.projects);
    });
  }, []);

  return (
    <>
      <div className="admin-header">
        <h1>_Проекты</h1>
      </div>
      <div className="admin-main-header">
        <input type="search" placeholder="Поиск ..." className="input width1200" />
      </div>
      <div className="admin-content">
        <Table data={adminProjects} columns={columns} />
      </div>
    </>
  );
};

export default AdminProjects;
