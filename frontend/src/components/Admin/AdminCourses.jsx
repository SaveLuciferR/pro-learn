import { useEffect, useState } from 'react';
import axiosClient from '../../axiosClient';
import Table from '../Table/Table';
import { Link, useNavigate } from 'react-router-dom';
import { RxOpenInNewWindow } from 'react-icons/rx';
import { RiCloseCircleLine } from 'react-icons/ri';
import TablePagination from '../Table/TablePagination';
import { BiDislike } from 'react-icons/bi';
import { BiLike } from 'react-icons/bi';

const AdminCourses = () => {
  const navigate = useNavigate();
  const [adminCourses, setAdminCourses] = useState([]);

  const [isSelectRow, setIsSelectRow] = useState(false);
  const [currentSelectRow, setCurrentSelectRow] = useState(-1);
  const [amountCourse, setAmountCourse] = useState(0);
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
      accessorKey: 'slug',
      header: 'Slug',
      size: 498,
      cell: (item) => <p title={item.slug}>{item.slug}</p>, // to={`/course/${item.slug}`}
    },
    {
      accessorKey: 'like',
      size: 73,
      cell: (item) => (
        <p className="admin-status">
          <BiLike size={20} className="svg" />
          {item.like}
        </p>
      ),
    },
    {
      accessorKey: 'dislike',
      size: 73,
      cell: (item) => (
        <p className="admin-status">
          <BiDislike size={20} className="svg" />
          {item.dislike}
        </p>
      ),
    },
    {
      accessorKey: 'code',
      header: 'Статус',
      size: 177,
      cell: (item) => (
        <>
          {item.status === 'public' ? (
            <p className="admin-status green">
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="9" cy="9" r="7.5" stroke="#2EA043" />
                <path
                  d="M6.375 9.375L7.875 10.875L11.625 7.125"
                  stroke="#2EA043"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>{' '}
              Опубликован
            </p>
          ) : item.status === 'reject' ? (
            <p className="admin-status red">
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="9" cy="9" r="7.5" stroke="#DB5B42" />
                <path
                  d="M10.875 7.125L7.125 10.875M7.12498 7.12498L10.875 10.875"
                  stroke="#DB5B42"
                  strokeLinecap="round"
                />
              </svg>{' '}
              Отклонён
            </p>
          ) : item.status === 'moderation' ? (
            <p className="admin-status">
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="9" cy="9" r="7.5" stroke="white" />
                <path
                  d="M9 6V9L10.875 10.875"
                  stroke="white"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>{' '}
              На модерации
            </p>
          ) : (
            <p className="admin-status">
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.25 7.5C2.25 4.67157 2.25 3.25736 3.12868 2.37868C4.00736 1.5 5.42157 1.5 8.25 1.5H9.75C12.5784 1.5 13.9926 1.5 14.8713 2.37868C15.75 3.25736 15.75 4.67157 15.75 7.5V10.5C15.75 13.3284 15.75 14.7426 14.8713 15.6213C13.9926 16.5 12.5784 16.5 9.75 16.5H8.25C5.42157 16.5 4.00736 16.5 3.12868 15.6213C2.25 14.7426 2.25 13.3284 2.25 10.5V7.5Z"
                  stroke="white"
                />
                <path d="M6 9H12" stroke="white" strokeLinecap="round" />
                <path d="M6 6H12" stroke="white" strokeLinecap="round" />
                <path d="M6 12H9.75" stroke="white" strokeLinecap="round" />
              </svg>{' '}
              Черновик
            </p>
          )}
        </>
      ),
    },
    {
      accessorKey: 'date_of_publication',
      header: 'Дата публикации',
      size: 205,
      cell: (item) => (
        <p>{item.date_of_publication === null ? 'Не опубликовано' : item.date_of_publication}</p>
      ),
    },
  ];

  useEffect(() => {
    axiosClient
      .get(`admin/course?start=${(currentPage - 1) * amountOnPage}&end=${amountOnPage}&lang=1`)
      .then(({ data }) => {
        setAdminCourses(data.result.courses);
        setAmountCourse(data.result.courseCount);
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
    if (skip > amountCourse) return amountCourse;
    return skip;
  };

  return (
    <div>
      <div className="admin-header">
        <h1>_Курсы</h1>
      </div>
      <div className="admin-main-header">
        <input type="search" placeholder="Поиск ..." className="input width1200" />
        <button onClick={() => navigate('/admin-panel/course-creation')} className="admin-button">
          Создать курс
        </button>
      </div>
      <div className="admin-content">
        <Table
          data={adminCourses}
          columns={columns}
          handleClickRow={onClickRowTable}
          selectRow={currentSelectRow}
          type="course"
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
        Показано {getAmountSkipNote()} из {amountCourse} записей
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
        amountNote={amountCourse}
        amountNoteOnPage={amountOnPage}
        currentPage={currentPage}
        setCurrentPage={handleSelectPage}
      />
    </div>
  );
};

export default AdminCourses;
