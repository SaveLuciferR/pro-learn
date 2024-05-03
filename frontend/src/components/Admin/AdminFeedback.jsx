import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axiosClient from '../../axiosClient';
import Table from '../Table/Table';
import TablePagination from "../Table/TablePagination";
/* ICONS */
import { RxOpenInNewWindow } from "react-icons/rx";
import { RiCloseCircleLine } from "react-icons/ri";

const AdminFeedback = () => {
  const [adminFeedback, setAdminFeedback] = useState([]);

  const [isSelectRow, setIsSelectRow] = useState(false);
  const [currentSelectRow, setCurrentSelectRow] = useState(-1);
  const [amountFeedback, setAmountFeedback] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [amountOnPage, setAmountOnPage] = useState(3);
  const [addAmountOnPage, setAddAmountOnPage] = useState(2);

  const columns = [
    {
      accessorKey: 'id',
      header: 'ID',
      size: 272,
      cell: (item) => <p>#{item.id}</p>,
    },
    {
      accessorKey: 'username',
      header: 'Проверил',
      size: 272,
      cell: (item) => <p>{item.name}</p>,
    },
    {
      accessorKey: 'title',
      header: 'Статус',
      size: 272,
      cell: (item) => {
        item.title === 'Просмотрено' ? (<p className='admin-status green'>
          <RxOpenInNewWindow size={20} color='#2EA043' />Просмотрено
        </p>) : (<p className='admin-status red'><RiCloseCircleLine size={20} color='#DB5B42' />Не просмотрено</p>)
      },
    },
    {
      accessorKey: 'name',
      header: 'Имя',
      size: 272,
      cell: (item) => <p>{item.name}</p>,
    },
    {
      accessorKey: 'email',
      header: 'Email',
      size: 272,
      cell: (item) => <p>{item.email}</p>,
    },
    {
      accessorKey: 'text',
      header: 'Текст',
      size: 272,
      cell: (item) => <p>{item.text}</p>,
    },
    {
      accessorKey: 'date_of_departure',
      header: 'Дата отправления',
      size: 272,
      cell: (item) => <p>{item.date_of_departure}</p>,
    },
  ];

  useEffect(() => {
    axiosClient.get(`admin/feedback?start=${(currentPage - 1) * amountOnPage}&end=${amountOnPage}`).then(({ data }) => {
      setAdminFeedback(data.result.feedback);
      setAmountFeedback(data.result.feedbackCount);
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
    if (skip > amountFeedback) return amountFeedback;
    return skip;
  }

  return (
    <>
      <div className="admin-header">
        <h1>_Обратная связь</h1>
      </div>
      <div className="admin-main-header">
        <input type="search" placeholder="Поиск ..." className="input width1200" />
      </div>
      <div className="admin-content">
        <Table data={adminFeedback} columns={columns} handleClickRow={onClickRowTable} selectRow={currentSelectRow} />
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
      <div className={"admin-footer-buttons"}>Показано {getAmountSkipNote()} из {amountFeedback} записей</div>
      <div className={"admin-footer-buttons"}>
        <button className={"btn secondary-white big"} type={'button'}
          onClick={() => setAmountOnPage(prevState => prevState + addAmountOnPage)}>Загрузить еще
        </button>
      </div>
      <TablePagination amountNote={amountFeedback}
        amountNoteOnPage={amountOnPage}
        currentPage={currentPage}
        setCurrentPage={handleSelectPage}
      />
    </>
  );
};

export default AdminFeedback;
