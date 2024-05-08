import {useEffect, useRef, useState} from "react";
import axiosClient from "../../axiosClient";
import {Link, useParams} from "react-router-dom";
import useOnClickOutside from "../../hooks/useOnClickOutside";


const ModalWindowTask = (
    {
        isOpen,
        setIsOpen,
        bindData,
        setBindData,
        data,
        updateData,
        canBeViewData,
        linkToNewData,
        linkToData,
        bindText,
        unBindText,
        titleText,
        rejectLoadText,
        successBindText,
        rejectBindText,
        updateText,
        newDataText
    }) => {

    const {lang} = useParams();

    useEffect(() => {
        if (isOpen) {
            updateData();
        }
    }, [isOpen])

    const ref = useRef(null);

    useOnClickOutside(ref, () => {
        if (isOpen) {
            setIsOpen(false);
        }
    });

    return (
        <div className="modal" style={isOpen === true ? {} : {display: 'none'}}>
            <div ref={ref} className="modal-window">
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
                <h1 className="modal-window-title">{titleText}</h1>
                <div className="modal-window-content-data scroll">
                    <ul>
                        {data.length === 0 ? <div>{rejectLoadText}</div> :
                            <>
                                {
                                    data.map((item, i) => {
                                            if (canBeViewData(item, i)) {
                                                return (
                                                    <li key={i}>
                                                        <Link
                                                            to={`${lang === undefined ? "/" : '/' + lang + '/'}${linkToData}/${item.slug}`}
                                                            target={'_blank'}
                                                            title={item.title}>
                                                            {item.title}
                                                        </Link>
                                                        <button type={'button'}
                                                                onClick={() => setBindData(item.id, item.slug)}>{bindData === item.id ? unBindText : bindText}</button>
                                                    </li>
                                                );
                                            } else {
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
                    <h1>{successBindText}</h1>
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
                    <Link to={`${lang === undefined ? "/" : '/' + lang + '/'}${linkToNewData}`}
                          target={"_blank"} className="btn big secondary-blue">{newDataText}</Link>
                    <button className="btn big secondary-blue" onClick={() => updateData()}>{updateText}</button>
                </div>
            </div>
        </div>
    );
};

export default ModalWindowTask;
