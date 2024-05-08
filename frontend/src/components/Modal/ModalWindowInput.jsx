import {Link} from "react-router-dom";
import {useRef} from "react";
import useOnClickOutside from "../../hooks/useOnClickOutside";


const ModalWindowInput = ({
                              isOpen,
                              setIsOpen,
                              placeholderText,
                              errorText,
                              titleText,
                              buttonText,
                              onClickButton,
                              content,
                              setContent
                          }) => {

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
                <div className=" height100 modal-window-content-data">
                    {errorText.length === 0 ?
                        <></>
                        :
                        <p className="form_input-message">{errorText}</p>
                    }
                    <input className={"input width100"} placeholder={placeholderText} value={content}
                           onChange={(e) => setContent(e.target.value)}/>
                </div>
                <div className="modal-window-buttons">
                    <button onClick={() => onClickButton()} className="btn big secondary-blue">{buttonText}</button>
                </div>
            </div>
        </div>
    );
}

export default ModalWindowInput;