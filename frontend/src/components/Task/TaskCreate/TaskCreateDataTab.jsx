import {useDispatch, useSelector} from "react-redux";
import {
    addTaskInput,
    addTaskOutput,
    addTaskRowData,
    deleteTaskInput, deleteTaskOutput,
    editTaskInput,
    editTaskOutput, editTaskRowData
} from "../../../redux/Task/slice";
import {useEffect, useRef, useState} from "react";
import {setShowWindow} from "../../../redux/Modal/slice";

const TaskCreateDataTab = ({title, activeInput}) => {

    const dispatch = useDispatch();
    const currentData = useSelector(state => state.task.currentTaskEdit.input_output_data);

    const slideDown = useRef(null);
    const slideUp = useRef(null);

    const [isFocused, setIsFocused] = useState(false);
    const [rowFocus, setRowFocus] = useState(null);
    const [colFocus, setColFocus] = useState(null);
    const [activeSlideDown, setActiveSlideDown] = useState(true);
    const [activeSlideUp, setActiveSlideUp] = useState(true);

    const handleOnFocusInput = (row, col) => {
        setIsFocused(true);
        setRowFocus(row);
        setColFocus(col);

        updateActiveArrow(row, col);
    }

    const updateActiveArrow  = (row, col) => {
        setActiveSlideUp(currentData[row][activeInput ? 'input' : 'output'].length - 1 > col);
        setActiveSlideDown(col > 0);
    }

    const handleOnBlurInput = (e) => {
        console.log(e);
        if (document.activeElement === slideUp.current || document.activeElement === slideDown.current) {
            e.target.focus();
        }
        else {
            setIsFocused(false);
            setRowFocus(null);
            setColFocus(null);
        }
    }

    const handleAddNewRow = () => {
        dispatch(addTaskRowData({value: 0}));
    }

    const handleAddData = () => {
        if (activeInput) {
            dispatch(addTaskInput({num: 0}));
        } else {
            dispatch(addTaskOutput({num: 0}));
        }
    }

    const handleEditData = (row, col, value) => {
        if (activeInput) {
            dispatch(editTaskInput({row, col, value}));
        } else {
            dispatch(editTaskOutput({row, col, value}));
        }
    }

    const handleDeleteData = (index) => {
        if (activeInput) {
            dispatch(deleteTaskInput({index}));
        } else {
            dispatch(deleteTaskOutput({index}));
        }
    }

    const handleSlideData = (to) => {
        if (to === -1 && !activeSlideDown || to === 1 && !activeSlideUp) return;
        if (activeInput)
        {
            dispatch(editTaskRowData({slide: to, row: rowFocus, col: colFocus}))
        }
        else {

        }
        setColFocus(prevState => prevState + to);
        updateActiveArrow(rowFocus, colFocus + to);
    }

    return (
        <div className={`course-create-main-info active course-create-block`}>
            <h3 className="markdown-h3">{title}</h3>
            <div className={"task-create-main-data-col"}>
                {currentData.map((item, i) =>
                    <div className={"task-create-main-data"}>
                        {item[activeInput ? 'input' : 'output'].map((data, iData) =>
                            <div className={"data-input_block"}>
                                <button onClick={() => handleDeleteData(iData)} type={'button'}
                                        className={'btn delete-data_block'}>
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path d="M14 6L6 14" stroke="white" strokeWidth="2" strokeLinecap="round"
                                              strokeLinejoin="round"/>
                                        <path d="M6 6L14 14" stroke="white" strokeWidth="2" strokeLinecap="round"
                                              strokeLinejoin="round"/>
                                    </svg>
                                </button>
                                <input key={iData} className="task-create-main-data-item  input width110" type="text"
                                       name={`data ${i} ${iData}`} id={`data ${i} ${iData}`}
                                       placeholder="0" value={data}
                                       onFocus={() => handleOnFocusInput(i, iData)}
                                       onBlur={(e) => handleOnBlurInput(e)}
                                       onChange={(e) => handleEditData(i, iData, e.target.value)}/>
                            </div>
                        )}
                        <div
                            className="task-create-main-data-item  sidebar_profile-create_item create-lesson create-data create-row-data"
                            onClick={() => handleAddData()}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="37" height="37"
                                 viewBox="0 0 37 37"
                                 fill="none">
                                <path
                                    d="M21.4979 0V15.7724H37V21.3462H21.4979V37H15.3049V21.3462H0V15.7724H15.3049V0H21.4979Z"/>
                            </svg>
                        </div>
                    </div>
                )}
            </div>
            {/*  &&  */}
            {isFocused ? <div className={'slider-under-element slider-input hidden'}>
                    <div ref={slideDown} className={`slider-arrow ${!activeSlideDown ? 'hidden' : ''}`} onMouseDown={() => handleSlideData(-1)}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="30"
                            height="30"
                            viewBox="0 0 24 24"
                            fill="none"
                        >
                            <circle
                                cx="10"
                                cy="10"
                                r="10"
                                transform="matrix(-1 0 0 1 22 2)"
                                stroke="white"
                                strokeWidth="1.5"
                            />
                            <path
                                d="M13.5 9L10.5 12L13.5 15"
                                stroke="white"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </div>
                    <div ref={slideUp} className={`slider-arrow ${ !activeSlideUp ? 'hidden' : ''}`} onMouseDown={() => handleSlideData(1)}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="30"
                            height="30"
                            viewBox="0 0 24 24"
                            fill="none"
                        >
                            <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="1.5"/>
                            <path
                                d="M10.5 9L13.5 12L10.5 15"
                                stroke="white"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </div>
                </div>
                :
                <div className="sidebar_profile-create_item create-lesson create-row-data"
                     onClick={() => handleAddNewRow()}>
                    <span>Добавить строку</span>
                </div>
            }
        </div>
    );
}

export default TaskCreateDataTab;