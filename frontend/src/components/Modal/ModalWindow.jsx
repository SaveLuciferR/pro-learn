import { setButtonAnswer, setShowWindow } from '../../redux/Modal/slice';
import { useSelector, useDispatch } from 'react-redux';

const ModalWindow = () => {
  const dispatch = useDispatch();

  const isWindowShowed = useSelector((state) => state.modalElement.showWindow);
  const title = useSelector((state) => state.modalElement.titleText);
  const content = useSelector((state) => state.modalElement.contentText);
  const iconType = useSelector((state) => state.modalElement.iconType);
  const isButtonsShowed = useSelector((state) => state.modalElement.showButtons);
  const isContentShowed = useSelector((state) => state.modalElement.showContent);
  const isIconShowed = useSelector((state) => state.modalElement.showIcon);

  const answerButton = (answer) => {
    dispatch(setButtonAnswer(answer));
    dispatch(setShowWindow(false));
  };

  return (
    <div className="modal" style={isWindowShowed === true ? {} : { display: 'none' }}>
      <div className="modal-window">
        <svg
          className="modal-window-close"
          onClick={() => dispatch(setShowWindow(false))}
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
        <div className="modal-window-icon" style={isIconShowed === true ? {} : { display: 'none' }}>
          {iconType === 'success' ? (
            <svg
              width="97"
              height="96"
              viewBox="0 0 97 96"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="48.625" cy="48" r="40" stroke="#2EA043" strokeWidth="6" />
              <path
                d="M34.625 50L42.625 58L62.625 38"
                stroke="#2EA043"
                strokeWidth="6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ) : (
            <svg
              width="96"
              height="96"
              viewBox="0 0 96 96"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="48" cy="48" r="40" stroke="#DB5B42" strokeWidth="6" />
              <path
                d="M57.9999 38L38 57.9999M37.9999 37.9999L57.9998 57.9999"
                stroke="#DB5B42"
                strokeWidth="6"
                strokeLinecap="round"
              />
            </svg>
          )}
        </div>

        <h1 className="modal-window-title">{title}</h1>
        <p
          className="modal-window-content"
          style={isContentShowed === true ? {} : { display: 'none' }}
        >
          {content}
        </p>
        <div
          className="modal-window-buttons"
          style={isButtonsShowed === true ? {} : { display: 'none' }}
        >
          <button onClick={() => answerButton(true)} className="btn big secondary-blue">
            Да, удалить
          </button>
          <button onClick={() => answerButton(false)} className="btn big secondary-blue">
            Отмена
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalWindow;
