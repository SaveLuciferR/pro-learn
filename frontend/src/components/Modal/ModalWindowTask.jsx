import { setShowWindow } from '../../redux/Modal/slice';
import { useSelector, useDispatch } from 'react-redux';

const ModalWindowTask = () => {
  const dispatch = useDispatch();

  const isWindowShowed = useSelector((state) => state.modalElement.showWindow);
  const title = useSelector((state) => state.modalElement.titleText);

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
        <h1 className="modal-window-title">Привязка проекта к задаче</h1>
        <div className="modal-window-content-data scroll">
          <ul>
            <li>
              <p title="gbhjgbbbgbhjgggjkfkjfffjbtkjbtbtbtbjkfjbtjbdfsdfsdfsfykjbt">
                gbhjgbbbgbhjgggjkfkjfffjbtkjbtbtbtbjkfjbtjbdfsdfsdfsfykjbt
              </p>
              <button>Отвязать проект</button>
            </li>
            <li>
              <p>gbhjgbt</p>
              <button>Отвязать проект</button>
            </li>
            <li>
              <p>gbhjgbbbgbhjgggjkfkjfffjbtkjbtbtbtbjkfjbtjbdfsdfsdfsfykjbt</p>
              <button>Отвязать проект</button>
            </li>
            <li>
              <p>gbhjgbbbgbhjgggjkfkjfffjbtkjbtbtbtbjkfjbtjbdfsdfsdfsfykjbt</p>
              <button>Отвязать проект</button>
            </li>
            <li>
              <p>gbhjgbbbgbhjgggjkfkjfffjbtkjbtbtbtbjkfjbtjbdfsdfsdfsfykjbt</p>
              <button>Отвязать проект</button>
            </li>
            <li>
              <p>gbhjgbbbgbhjgggjkfkjfffjbtkjbtbtbtbjkfjbtjbdfsdfsdfsfykjbt</p>
              <button>Отвязать проект</button>
            </li>
            <li>
              <p>gbhjgbt</p>
              <button>Отвязать проект</button>
            </li>
            <li>
              <p>gbhjgbbbgbhjgggjkfkjfffjbtkjbtbtbtbjkfjbtjbdfsdfsdfsfykjbt</p>
              <button>Отвязать проект</button>
            </li>
            <li>
              <p>gbhjgbbbgbhjgggjkfkjfffjbtkjbtbtbtbjkfjbtjbdfsdfsdfsfykjbt</p>
              <button>Отвязать проект</button>
            </li>
            <li>
              <p>gbhjgbbbgbhjgggjkfkjfffjbtkjbtbtbtbjkfjbtjbdfsdfsdfsfykjbt</p>
              <button>Отвязать проект</button>
            </li>
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
            <circle cx="15.9974" cy="16" r="13.3333" stroke="#2EA043" strokeWidth="3" />
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
          <button className="btn big secondary-blue">Создать новый проект</button>
          <button className="btn big secondary-blue">Обновить</button>
        </div>
      </div>
    </div>
  );
};

export default ModalWindowTask;
