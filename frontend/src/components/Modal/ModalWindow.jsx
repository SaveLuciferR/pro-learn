import {setButtonAnswer, setShowWindow} from '../../redux/Modal/slice';
import {useSelector, useDispatch} from 'react-redux';

const ModalWindow = ({
                         isOpen,
                         setIsOpen,
                         isContentShowed,
                         isButtonsShowed,
                         titleText,
                         contentText,
                         handleOk,
                         handleCancel
                     }) => {

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

                <h1 className="modal-window-title">{titleText}</h1>
                <p
                    className="modal-window-content"
                    style={isContentShowed === true ? {} : {display: 'none'}}
                >
                    {contentText}
                </p>
                <div
                    className="modal-window-buttons"
                    style={isButtonsShowed === true ? {} : {display: 'none'}}
                >
                    <button onClick={() => handleOk()} className="btn big secondary-blue">
                        Да, удалить
                    </button>
                    <button onClick={() => handleCancel()} className="btn big secondary-blue">
                        Отмена
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ModalWindow;
