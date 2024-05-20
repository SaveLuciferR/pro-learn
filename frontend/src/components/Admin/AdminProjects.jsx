import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axiosClient from '../../axiosClient';
import Table from '../Table/Table';
import TablePagination from '../Table/TablePagination';

import { RxOpenInNewWindow } from 'react-icons/rx';
import { RiCloseCircleLine } from 'react-icons/ri';

const AdminProjects = () => {
  const [adminProjects, setAdminProjects] = useState([]);

  const [isSelectRow, setIsSelectRow] = useState(false);
  const [currentSelectRow, setCurrentSelectRow] = useState(-1);
  const [amountProject, setAmountProject] = useState(0);
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
      accessorKey: 'title',
      header: 'Название',
      size: 225,
      cell: (item) => <p title={item.title}>{item.title}</p>,
    },
    {
      accessorKey: 'slug',
      header: 'Slug',
      size: 225,
      cell: (item) => <p title={item.slug}>{item.slug}</p>,
    },
    {
      accessorKey: 'private',
      header: 'Приватность',
      size: 149,
      cell: (item) => <p>{item.private === '0' ? 'Публичный' : 'Приватный'}</p>,
    },
    {
      accessorKey: 'date_of_publication',
      header: 'Дата публикации',
      size: 194,
      cell: (item) => <p>{item.date_of_publication}</p>,
    },
    {
      accessorKey: 'description',
      header: 'Описание',
      size: 225,
      cell: (item) => <p title={item.description}>{item.description}</p>,
    },
  ];

  useEffect(() => {
    axiosClient
      .get(`admin/project?start=${(currentPage - 1) * amountOnPage}&end=${amountOnPage}&lang=1`)
      .then(({ data }) => {
        setAdminProjects(data.result.projects);
        setAmountProject(data.result.projectCount);
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
  };

  const handleSelectPage = (i) => {
    if (i === currentPage) return;
    setIsSelectRow(false);
    setCurrentSelectRow(-1);
    setCurrentPage(i);
  };

  const getAmountSkipNote = () => {
    let skip = amountOnPage * currentPage;
    if (skip > amountProject) return amountProject;
    return skip;
  };

  return (
    <>
      <div className="admin-header">
        <h1>_Проекты</h1>
      </div>
      <div className="admin-main-header">
        <input type="search" placeholder="Поиск ..." className="input width1200" />
      </div>
      <div className="admin-content">
        <Table
          data={adminProjects}
          columns={columns}
          handleClickRow={onClickRowTable}
          selectRow={currentSelectRow}
          type="project"
        />
      </div>
      {isSelectRow ? (
        <div className={'admin-footer-buttons'}>
          <button className={'btn primary big'}>Редактировать</button>
          <Link className={'btn with_icon'} to={'/'} target={'_blank'}>
            <RxOpenInNewWindow size={21} />
            <span>Открыть</span>
          </Link>{' '}
          {/* TODO если не опубликовано, то нет ссылки */}
          <button className={'btn with_icon btn-red'}>
            <RiCloseCircleLine size={21} color={'#DB5B42'} />
            <span>Удалить</span>
          </button>
        </div>
      ) : (
        <></>
      )}
      <div className={'admin-footer-buttons'}>
        Показано {getAmountSkipNote()} из {amountProject} записей
      </div>
      <div className={'admin-footer-buttons'}>
        <button
          className={'btn secondary-white big'}
          type={'button'}
          onClick={() => setAmountOnPage((prevState) => prevState + addAmountOnPage)}
        >
          Загрузить еще
        </button>
      </div>
      <TablePagination
        amountNote={amountProject}
        amountNoteOnPage={amountOnPage}
        currentPage={currentPage}
        setCurrentPage={handleSelectPage}
      />
    </>
  );
};

export default AdminProjects;
