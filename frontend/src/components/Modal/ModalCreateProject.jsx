import {useEffect, useRef, useState} from "react";
import {useParams} from "react-router-dom";
import axiosClient from "../../axiosClient";
import LoadingElement from "../LoadingElement";
import useOnClickOutside from "../../hooks/useOnClickOutside";

const ModalCreateProject = ({
                                isOpen,
                                setIsOpen,
                                handleGotoCompiler,
                                handleGotoCreate,
                                currentTemplate,
                                setCurrentTemplate
                            }) => {

    const {lang} = useParams();

    const [search, setSearch] = useState('');
    const [type, setType] = useState('all');
    const [templates, setTemplates] = useState([]);

    const ref = useRef(null);

    useEffect(() => {
        axiosClient.get(`${lang === undefined ? '/' : '/' + lang + '/'}template&type=${type}?search=${search}`)
            .then((res) => {
                // console.log(res);
                setTemplates(res.data.templates);
            })
    }, [lang, type, search])

    useOnClickOutside(ref, () => {
        if (isOpen) {
            closeModal();
        }
    })

    const closeModal = () => {
        setIsOpen(false);
    }

    return (
        <div className="modal" style={isOpen === true ? {} : {display: 'none'}}>
            <div ref={ref} className="modal-window-templates">
                <svg
                    className="modal-window-close"
                    onClick={() => closeModal()}
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
                <div className={"modal-window-templates-inner"}>
                    <div className={"modal-window-sidebar"}>
                        <h3 className={"markdown-h3"}>Создать проект</h3>
                        <input
                            className={"input width100"}
                            placeholder="Поиск шаблона"
                            type="text"
                            name="search"
                            id="search"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <div className={"modal-window-sidebar-buttons"}>
                            <button onClick={() => setType('all')}
                                    className={`btn ${type === 'all' ? 'active' : ''}`}>Все шаблоны
                            </button>
                            <button onClick={() => setType('user')}
                                    className={`btn ${type === 'user' ? 'active' : ''}`}>Шаблоны пользователей
                            </button>
                            <button onClick={() => setType('admin')}
                                    className={`btn ${type === 'admin' ? 'active' : ''}`}>Шаблоны администраторов
                            </button>
                        </div>
                    </div>
                    <div className={"modal-window-templates-content scroll"}>
                        {templates.length === 0 ?
                            <p>Шаблоны отсутствуют</p>
                            :
                            <>
                                {templates.map((item, i) => (
                                    <div key={i}
                                         className={`modal-template-card ${currentTemplate === item.id ? 'active' : ''}`}
                                         onClick={() => setCurrentTemplate(item.id)}>
                                        <p className={"modal-template-card-title clamp"}>{item.title}</p>
                                        <p className={"modal-template-card-content clamp multiline"}>{item.description}</p>
                                        <div className="profile-completed-card-about">
                                            <p>{item.username}, {item.role}</p>
                                        </div>
                                    </div>
                                ))}
                            </>
                        }
                    </div>
                </div>
                <div className={"modal-window-templates-buttons"}>
                    <button className={"btn big secondary-blue"} onClick={() => handleGotoCompiler()}>Перейти в компилятор</button>
                    <button className={"btn big secondary-blue"} onClick={() => handleGotoCreate()}>Перейти к добавлению проекта</button>
                </div>
            </div>
        </div>
    );
}

export default ModalCreateProject;