import {GiConfirmed} from "react-icons/gi";
import ProgressBar from "../Component/ProgressBar";
import {IoIosCheckmarkCircleOutline} from "react-icons/io";
import useOnClickOutside from "../../hooks/useOnClickOutside";
import {useRef} from "react";


const ModalWindow = ({
                         isOpen,
                         setIsOpen,
                         haveLabel,
                         isContentShowed,
                         progress,
                         maxProgress,
                         titleText,
                         contentText,
                         handleClose
                     }) => {

    const ref = useRef(null);

    const closeModal = () => {
        if (typeof handleClose === 'function') {
            handleClose();
        }
        setIsOpen(false);
    }

    useOnClickOutside(ref, () => {
        if (isOpen) {
            closeModal();
        }
    });

    return (
        <div className="modal" style={isOpen === true ? {} : {display: 'none'}}>
            <div ref={ref} className="modal-window">
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

                <div className={"modal-window-check-mark"}>
                    <IoIosCheckmarkCircleOutline size={80} color={`#2ea043`}/>
                </div>
                <h1 className="modal-window-title">{titleText}</h1>
                <p
                    className="modal-window-content"
                    style={isContentShowed === true ? {} : {display: 'none'}}
                >
                    {contentText}
                </p>
                <div className="modal-window-progress-bar">
                    <ProgressBar
                        haveLabel={haveLabel}
                        progress={progress}
                        maxProgress={maxProgress}/>
                </div>
            </div>
        </div>
    );
}

export default ModalWindow;