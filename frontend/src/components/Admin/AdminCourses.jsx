import {useEffect, useState} from 'react';
import axiosClient from '../../axiosClient';
import Table from '../Table/Table';
import {Link, useNavigate} from 'react-router-dom';
import {RxOpenInNewWindow} from "react-icons/rx";
import {RiCloseCircleLine} from "react-icons/ri";
import TablePagination from "../Table/TablePagination";

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
                    <svg
                        className="svg"
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M17.4793 10.1543L16.9866 10.0691L17.4793 10.1543ZM16.8914 13.5541L16.3987 13.4689L16.8914 13.5541ZM5.78148 17.0642L5.28333 17.1073L5.78148 17.0642ZM5.10467 9.23701L5.60281 9.19393L5.10467 9.23701ZM11.6625 4.35119L12.1559 4.43203V4.43203L11.6625 4.35119ZM11.1102 7.72166L11.6037 7.8025L11.1102 7.72166ZM5.58178 8.06458L5.25539 7.68581H5.25539L5.58178 8.06458ZM6.78073 7.03142L7.10713 7.41019L7.10713 7.41019L6.78073 7.03142ZM8.76504 3.98646L8.28106 3.86091L8.76504 3.98646ZM9.16147 2.45825L9.64545 2.58379L9.64545 2.58379L9.16147 2.45825ZM10.5563 1.7203L10.4034 2.19634L10.4034 2.19634L10.5563 1.7203ZM10.6771 1.75911L10.8301 1.28307L10.8301 1.28307L10.6771 1.75911ZM8.21829 5.38552L8.65931 5.6211V5.6211L8.21829 5.38552ZM11.5872 2.70628L11.1033 2.83182V2.83182L11.5872 2.70628ZM9.7285 1.777L9.51145 1.32657V1.32657L9.7285 1.777ZM3.30967 17.8923L2.81152 17.9353L3.30967 17.8923ZM2.5 8.52851L2.99814 8.48543C2.97507 8.21867 2.74595 8.01743 2.47844 8.02897C2.21093 8.04051 2 8.26075 2 8.52851H2.5ZM16.9866 10.0691L16.3987 13.4689L17.384 13.6393L17.972 10.2395L16.9866 10.0691ZM11.0375 17.8333H7.16362V18.8333H11.0375V17.8333ZM6.27962 17.0212L5.60281 9.19393L4.60653 9.28008L5.28333 17.1073L6.27962 17.0212ZM16.3987 13.4689C15.9654 15.9742 13.7086 17.8333 11.0375 17.8333V18.8333C14.1685 18.8333 16.8634 16.6498 17.384 13.6393L16.3987 13.4689ZM11.169 4.27034L10.6168 7.64081L11.6037 7.8025L12.1559 4.43203L11.169 4.27034ZM5.90818 8.44335L7.10713 7.41019L6.45434 6.65265L5.25539 7.68581L5.90818 8.44335ZM9.24903 4.112L9.64545 2.58379L8.67749 2.3327L8.28106 3.86091L9.24903 4.112ZM10.4034 2.19634L10.5242 2.23515L10.8301 1.28307L10.7093 1.24426L10.4034 2.19634ZM8.65931 5.6211C8.91467 5.14307 9.11289 4.63681 9.24903 4.112L8.28106 3.86091C8.16493 4.30859 7.99569 4.74103 7.77727 5.14993L8.65931 5.6211ZM10.5242 2.23515C10.8188 2.32978 11.0325 2.559 11.1033 2.83182L12.0712 2.58073C11.9112 1.96374 11.4384 1.47848 10.8301 1.28307L10.5242 2.23515ZM9.64545 2.58379C9.68415 2.4346 9.79058 2.30211 9.94555 2.22743L9.51145 1.32657C9.10017 1.52475 8.79233 1.88997 8.67749 2.3327L9.64545 2.58379ZM9.94555 2.22743C10.0868 2.15935 10.2521 2.14774 10.4034 2.19634L10.7093 1.24426C10.3149 1.11757 9.88462 1.14675 9.51145 1.32657L9.94555 2.22743ZM11.7947 9.02851H16.1123V8.02851H11.7947V9.02851ZM3.80781 17.8492L2.99814 8.48543L2.00186 8.57158L2.81152 17.9353L3.80781 17.8492ZM3 17.9273V8.52851H2V17.9273H3ZM2.81152 17.9353C2.80683 17.8811 2.84965 17.8333 2.90559 17.8333V18.8333C3.43713 18.8333 3.85352 18.3778 3.80781 17.8492L2.81152 17.9353ZM12.1559 4.43203C12.2568 3.81577 12.228 3.18518 12.0712 2.58073L11.1033 2.83182C11.2251 3.30149 11.2475 3.79149 11.169 4.27035L12.1559 4.43203ZM7.16362 17.8333C6.70372 17.8333 6.31939 17.4811 6.27962 17.0212L5.28333 17.1073C5.36772 18.0833 6.18389 18.8333 7.16362 18.8333V17.8333ZM7.10713 7.41019C7.67162 6.92375 8.2672 6.35515 8.65931 5.6211L7.77727 5.14993C7.47713 5.71181 7.0024 6.18037 6.45434 6.65265L7.10713 7.41019ZM17.972 10.2395C18.1716 9.08538 17.284 8.02851 16.1123 8.02851V9.02851C16.6622 9.02851 17.0807 9.52498 16.9866 10.0691L17.972 10.2395ZM2.90559 17.8333C2.95827 17.8333 3 17.8759 3 17.9273H2C2 18.4272 2.40491 18.8333 2.90559 18.8333V17.8333ZM10.6168 7.64081C10.4978 8.36726 11.0577 9.02851 11.7947 9.02851V8.02851C11.6759 8.02851 11.5841 7.92156 11.6037 7.8025L10.6168 7.64081ZM5.60281 9.19393C5.57817 8.90898 5.69191 8.62971 5.90818 8.44335L5.25539 7.68581C4.79556 8.08205 4.55424 8.67529 4.60653 9.28008L5.60281 9.19393Z"
                            fill="white"
                        />
                    </svg>
                    {item.like}
                </p>
            ),
        },
        {
            accessorKey: 'dislike',
            size: 73,
            cell: (item) => (
                <p className="admin-status">
                    <svg
                        className="svg"
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M17.4793 9.84567L16.9866 9.93087L17.4793 9.84567ZM16.8914 6.44587L16.3987 6.53107L16.8914 6.44587ZM5.78148 2.93577L5.28333 2.8927L5.78148 2.93577ZM5.10467 10.763L5.60281 10.8061L5.10467 10.763ZM11.6625 15.6488L12.1559 15.568V15.568L11.6625 15.6488ZM11.1102 12.2783L11.6037 12.1975L11.1102 12.2783ZM5.58178 11.9354L5.25539 12.3142H5.25539L5.58178 11.9354ZM6.78073 12.9686L7.10713 12.5898L7.10713 12.5898L6.78073 12.9686ZM8.76504 16.0135L8.28106 16.1391L8.76504 16.0135ZM9.16147 17.5418L9.64545 17.4162L9.64545 17.4162L9.16147 17.5418ZM10.5563 18.2797L10.4034 17.8037L10.4034 17.8037L10.5563 18.2797ZM10.6771 18.2409L10.8301 18.7169L10.8301 18.7169L10.6771 18.2409ZM8.21829 14.6145L8.65931 14.3789V14.3789L8.21829 14.6145ZM11.5872 17.2937L11.1033 17.1682V17.1682L11.5872 17.2937ZM9.7285 18.223L9.51145 18.6734V18.6734L9.7285 18.223ZM3.30967 2.10773L2.81152 2.06466L3.30967 2.10773ZM2.5 11.4715L2.99814 11.5146C2.97507 11.7813 2.74595 11.9826 2.47844 11.971C2.21093 11.9595 2 11.7393 2 11.4715H2.5ZM16.9866 9.93087L16.3987 6.53107L17.384 6.36067L17.972 9.76047L16.9866 9.93087ZM11.0375 2.16666H7.16362V1.16666H11.0375V2.16666ZM6.27962 2.97884L5.60281 10.8061L4.60653 10.7199L5.28333 2.8927L6.27962 2.97884ZM16.3987 6.53107C15.9654 4.02577 13.7086 2.16666 11.0375 2.16666V1.16666C14.1685 1.16666 16.8634 3.35023 17.384 6.36067L16.3987 6.53107ZM11.169 15.7297L10.6168 12.3592L11.6037 12.1975L12.1559 15.568L11.169 15.7297ZM5.90818 11.5567L7.10713 12.5898L6.45434 13.3474L5.25539 12.3142L5.90818 11.5567ZM9.24903 15.888L9.64545 17.4162L8.67749 17.6673L8.28106 16.1391L9.24903 15.888ZM10.4034 17.8037L10.5242 17.7649L10.8301 18.7169L10.7093 18.7557L10.4034 17.8037ZM8.65931 14.3789C8.91467 14.8569 9.11289 15.3632 9.24903 15.888L8.28106 16.1391C8.16493 15.6914 7.99569 15.259 7.77727 14.8501L8.65931 14.3789ZM10.5242 17.7649C10.8188 17.6702 11.0325 17.441 11.1033 17.1682L12.0712 17.4193C11.9112 18.0363 11.4384 18.5215 10.8301 18.7169L10.5242 17.7649ZM9.64545 17.4162C9.68415 17.5654 9.79058 17.6979 9.94555 17.7726L9.51145 18.6734C9.10017 18.4752 8.79233 18.11 8.67749 17.6673L9.64545 17.4162ZM9.94555 17.7726C10.0868 17.8406 10.2521 17.8523 10.4034 17.8037L10.7093 18.7557C10.3149 18.8824 9.88462 18.8533 9.51145 18.6734L9.94555 17.7726ZM11.7947 10.9715H16.1123V11.9715H11.7947V10.9715ZM3.80781 2.1508L2.99814 11.5146L2.00186 11.4284L2.81152 2.06466L3.80781 2.1508ZM3 2.07271V11.4715H2V2.07271H3ZM2.81152 2.06466C2.80683 2.11892 2.84965 2.16666 2.90559 2.16666V1.16666C3.43713 1.16666 3.85352 1.62217 3.80781 2.1508L2.81152 2.06466ZM12.1559 15.568C12.2568 16.1842 12.228 16.8148 12.0712 17.4193L11.1033 17.1682C11.2251 16.6985 11.2475 16.2085 11.169 15.7297L12.1559 15.568ZM7.16362 2.16666C6.70372 2.16666 6.31939 2.51891 6.27962 2.97884L5.28333 2.8927C5.36772 1.91673 6.18389 1.16666 7.16362 1.16666V2.16666ZM7.10713 12.5898C7.67162 13.0762 8.2672 13.6449 8.65931 14.3789L7.77727 14.8501C7.47713 14.2882 7.0024 13.8196 6.45434 13.3474L7.10713 12.5898ZM17.972 9.76047C18.1716 10.9146 17.284 11.9715 16.1123 11.9715V10.9715C16.6622 10.9715 17.0807 10.475 16.9866 9.93087L17.972 9.76047ZM2.90559 2.16666C2.95827 2.16666 3 2.12406 3 2.07271H2C2 1.57285 2.40491 1.16666 2.90559 1.16666V2.16666ZM10.6168 12.3592C10.4978 11.6327 11.0577 10.9715 11.7947 10.9715V11.9715C11.6759 11.9715 11.5841 12.0784 11.6037 12.1975L10.6168 12.3592ZM5.60281 10.8061C5.57817 11.091 5.69191 11.3703 5.90818 11.5567L5.25539 12.3142C4.79556 11.9179 4.55424 11.3247 4.60653 10.7199L5.60281 10.8061Z"
                            fill="white"
                        />
                    </svg>
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
                                <circle cx="9" cy="9" r="7.5" stroke="#2EA043"/>
                                <path
                                    d="M6.375 9.375L7.875 10.875L11.625 7.125"
                                    stroke="#2EA043"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                            {' '}
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
                                <circle cx="9" cy="9" r="7.5" stroke="#DB5B42"/>
                                <path
                                    d="M10.875 7.125L7.125 10.875M7.12498 7.12498L10.875 10.875"
                                    stroke="#DB5B42"
                                    strokeLinecap="round"
                                />
                            </svg>
                            {' '}
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
                                <circle cx="9" cy="9" r="7.5" stroke="white"/>
                                <path
                                    d="M9 6V9L10.875 10.875"
                                    stroke="white"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                            {' '}
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
                                <path d="M6 9H12" stroke="white" strokeLinecap="round"/>
                                <path d="M6 6H12" stroke="white" strokeLinecap="round"/>
                                <path d="M6 12H9.75" stroke="white" strokeLinecap="round"/>
                            </svg>
                            {' '}
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
        axiosClient.get(`admin/course?start=${(currentPage - 1) * amountOnPage}&end=${amountOnPage}&lang=1`).then(({data}) => {
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
    }

    const handleSelectPage = (i) => {
        if (i === currentPage) return;
        setIsSelectRow(false);
        setCurrentSelectRow(-1);
        setCurrentPage(i);
    }

    const getAmountSkipNote = () => {
        let skip = amountOnPage * currentPage;
        if (skip > amountCourse) return amountCourse;
        return skip;
    }

    return (
        <div>
            <div className="admin-header">
                <h1>_Курсы</h1>
            </div>
            <div className="admin-main-header">
                <input type="search" placeholder="Поиск ..." className="input width1200"/>
                <button onClick={() => navigate('/admin-panel/course-creation')} className="admin-button">
                    Создать курс
                </button>
            </div>
            <div className="admin-content">
                <Table data={adminCourses} columns={columns} handleClickRow={onClickRowTable}
                       selectRow={currentSelectRow}/>
            </div>
            {isSelectRow ?
                <div className={"admin-footer-buttons"}>
                    <button className={"btn primary big"}>Редактировать</button>
                    <Link className={"btn with_icon"} to={"/"} target={'_blank'}><RxOpenInNewWindow
                        size={21}/><span>Открыть</span></Link> {/* TODO если не опубликовано, то нет ссылки */}
                    <button className={"btn with_icon btn-red"}>
                        <RiCloseCircleLine size={21}
                                           color={'#DB5B42'}/>
                        <span>Удалить</span>
                    </button>
                </div>
                :
                <></>
            }
            <div className={"admin-footer-buttons"}>Показано {getAmountSkipNote()} из {amountCourse} записей</div>
            <div className={"admin-footer-buttons"}>
                <button className={"btn secondary-white big"} type={'button'}
                        onClick={() => setAmountOnPage(prevState => prevState + addAmountOnPage)}>Загрузить еще
                </button>
            </div>
            <TablePagination amountNote={amountCourse}
                             amountNoteOnPage={amountOnPage}
                             currentPage={currentPage}
                             setCurrentPage={handleSelectPage}
            />
        </div>
    );
};

export default AdminCourses;
