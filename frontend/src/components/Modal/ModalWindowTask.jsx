import {useEffect, useState} from "react";
import axiosClient from "../../axiosClient";
import {Link, useParams} from "react-router-dom";


const ModalWindowTask = ({isOpen, setIsOpen, setBindData, bindData, isProject}) => {

    const {username, lang} = useParams();

    const [data, setData] = useState([]);


    useEffect(() => {
        if (isOpen) {
            updateData();
        }
    }, [isOpen])

    const updateData = () => {
        setData([]);
        if (isProject) {
            axiosClient.get(`/@${username}/project-list`)
                .then(({data}) => {
                    setData(data.projects);
                    console.log(data);
                })
                .catch((response) => {
                    console.log(response)
                })
        } else {

        }
    }

    return (
        <div className="modal" style={isOpen === true ? {} : {display: 'none'}}>
            <div className="modal-window">
                <svg
                    className="modal-window-close"
                    onClick={() => setIsOpen(false)}
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M18 6L6 18"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M6 6L18 18"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
                <h1 className="modal-window-title">Привязка проекта к задаче</h1>
                <div className="modal-window-content-data scroll">
                    <ul>
                        {data.length === 0 ? <div>Проекты отсутствуют</div> :
                            <>
                                {
                                    data.map((item, i) => {
                                            if (item.private === '0') {
                                                return (
                                                    <li key={i}>
                                                        <Link
                                                            to={`${lang === undefined ? "/" : '/' + lang + '/'}profile/${username}/project/${item.slug}`}
                                                            target={'_blank'}
                                                            title={item.title}>
                                                            {item.title}
                                                        </Link>
                                                        <button type={'button'}
                                                                onClick={() => setBindData(item.id, item.slug)}>{bindData === item.id ? "Отвязать проект" : "Привязать проект"}</button>
                                                    </li>
                                                );
                                            }
                                            else {
                                                return <></>;
                                            }
                                        }
                                    )
                                }
                            </>
                        }
                    </ul>
                </div>
                <div className="modal-window-content-status">
                    <h1>Проект успешно привязан</h1>
                    <svg
                        width="32"
                        height="32"
                        viewBox="0 0 32 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <circle cx="15.9974" cy="16" r="13.3333" stroke="#2EA043" strokeWidth="3"/>
                        <path
                            d="M11.3359 16.6666L14.0026 19.3333L20.6693 12.6666"
                            stroke="#2EA043"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </div>
                <div className="modal-window-buttons">
                    <Link to={`${lang === undefined ? "/" : '/' + lang + '/'}profile/${username}/project-creation`}
                          target={"_blank"} className="btn big secondary-blue">Создать новый проект</Link>
                    <button className="btn big secondary-blue" onClick={() => updateData()}>Обновить</button>
                </div>
            </div>
        </div>
    );
};

export default ModalWindowTask;
