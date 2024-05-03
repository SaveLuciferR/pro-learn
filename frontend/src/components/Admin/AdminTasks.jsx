import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axiosClient from '../../axiosClient';
import Table from '../Table/Table';
import TablePagination from "../Table/TablePagination";
/* ICONS */
import { BiDislike, BiLike } from "react-icons/bi";
import { IoIosCheckmarkCircleOutline, IoIosCloseCircleOutline } from "react-icons/io";
import { LuClock4 } from "react-icons/lu";
import { CgNotes } from "react-icons/cg";
import { RxOpenInNewWindow } from "react-icons/rx";
import { RiCloseCircleLine } from "react-icons/ri";

const AdminTasks = () => {
  const navigate = useNavigate();
  const [adminTasks, setAdminTasks] = useState([]);

  const countDifficulty = [1, 2, 3, 4, 5];

  const [isSelectRow, setIsSelectRow] = useState(false);
  const [currentSelectRow, setCurrentSelectRow] = useState(-1);
  const [amountTask, setAmountTask] = useState(0);
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
      accessorKey: 'title',
      header: 'Название',
      size: 313,
      cell: (item) => <p title={item.title}>{item.title}</p>,
    },
    {
      accessorKey: 'like',
      size: 73,
      cell: (item) => (
        <p className="admin-status">
          <BiLike size={20} className='svg' />
          {item.like}
        </p>
      ),
    },
    {
      accessorKey: 'dislike',
      size: 73,
      cell: (item) => (
        <p className="admin-status">
          <BiDislike size={20} className='svg' />
          {item.dislike}
        </p>
      ),
    },
    {
      accessorKey: 'difficulty',
      header: 'Сложность',
      size: 177,
      cell: (item) => {
        return (
          <ul className="profile-difficulty-range">
            {countDifficulty.map((i) => {
              return (
                <li
                  className={`profile-difficulty-range-item${i <= item.difficulty ? ' active' : ''
                    }`}
                ></li>
              );
            })}
          </ul>
        );
      },
    },
    {
      accessorKey: 'code',
      header: 'Статус',
      size: 177,
      cell: (item) => (
        <>
          {item.code === 'public' ? (
            <p className="admin-status green">
              <IoIosCheckmarkCircleOutline size={20} color='#2ea043' />

              Опубликован
            </p>
          ) : item.code === 'reject' ? (
            <p className="admin-status red">
              <IoIosCloseCircleOutline size={20} color='#db5b42' />
              Отклонён
            </p>
          ) : item.code === 'moderation' ? (
            <p className="admin-status">
              <LuClock4 size={20} />
              На модерации
            </p>
          ) : (
            <p className="admin-status">
              <CgNotes size={20} />
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
      cell: (item) => <p>{item.date_of_publication === null ? 'Не опубликовано' : item.date_of_publication}</p>,
    },
  ];

  useEffect(() => {
    axiosClient.get(`admin/task?start=${(currentPage - 1) * amountOnPage}&end=${amountOnPage}&lang=1`).then(({ data }) => {
      setAdminTasks(data.result.tasks);
      setAmountTask(data.result.taskCount);
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
    if (skip > amountTask) return amountTask;
    return skip;
  }

  return (
    <>
      <div className="admin-header">
        <h1>_Задачи</h1>
      </div>
      <div className="admin-main-header">
        <input type="search" placeholder="Поиск ..." className="input width1200" />
        <button onClick={() => navigate('/admin-panel/task-creation')} className="admin-button">
          Создать задачу
        </button>
      </div>
      <div className="admin-content">
        <Table data={adminTasks} columns={columns} handleClickRow={onClickRowTable} selectRow={currentSelectRow} />
        {/* <OldTable data={adminTasks} columns={columns} /> */}
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
      <div className={"admin-footer-buttons"}>Показано {getAmountSkipNote()} из {amountTask} записей</div>
      <div className={"admin-footer-buttons"}>
        <button className={"btn secondary-white big"} type={'button'}
          onClick={() => setAmountOnPage(prevState => prevState + addAmountOnPage)}>Загрузить еще
        </button>
      </div>
      <TablePagination amountNote={amountTask}
        amountNoteOnPage={amountOnPage}
        currentPage={currentPage}
        setCurrentPage={handleSelectPage}
      />
    </>
  );
};

export default AdminTasks;
