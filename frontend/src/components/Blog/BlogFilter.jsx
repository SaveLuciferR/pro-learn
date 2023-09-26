import { useState } from "react";

const Filter = () => {
  const [btnFilter, setBtnFilter] = useState(false);

  const changeState = () => {
    setBtnFilter(true);
  }

  let check = btnFilter ? ' active' : '';

  return (
    <div className={`filter${check}`}>
      <div className="filter_container">
        <div className="filter_header">
          <svg
            className="filter_close"
            onClick={changeState}
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
          <h2 className="filter_title">Фильтр</h2>
        </div>
        <h3 className="filter_category">&gt; Категория статей</h3>
        <div className="filter_checkbox">
          <div className="filter_checkbox__item">
            <label>
              <input className="real_checkbox" type="checkbox" />
              <span className="custom_checkbox"></span>
              <p>Обновление языка</p>
            </label>
          </div>
          <div className="filter_checkbox__item">
            <label>
              <input className="real_checkbox" type="checkbox" />
              <span className="custom_checkbox"></span>
              <p>C#</p>
            </label>
          </div>
          <div className="filter_checkbox__item">
            <label>
              <input className="real_checkbox" type="checkbox" />
              <span className="custom_checkbox"></span>
              <p>C++</p>
            </label>
          </div>
          <div className="filter_checkbox__item">
            <label>
              <input className="real_checkbox" type="checkbox" />
              <span className="custom_checkbox"></span>
              <p>JavaScript</p>
            </label>
          </div>
          <div className="filter_checkbox__item">
            <label>
              <input className="real_checkbox" type="checkbox" />
              <span className="custom_checkbox"></span>
              <p>PHP</p>
            </label>
          </div>
        </div>
        <h3 className="filter_category">&gt; От кого</h3>
        <div className="filter_checkbox">
          <div className="filter_checkbox__item">
            <label>
              <input className="real_checkbox" type="checkbox" />
              <span className="custom_checkbox"></span>
              <p>Администрация</p>
            </label>
          </div>
          <div className="filter_checkbox__item">
            <label>
              <input className="real_checkbox" type="checkbox" />
              <span className="custom_checkbox"></span>
              <p>Пользователи</p>
            </label>
          </div>
        </div>
        <div className="filter_search">
          <input
            className="filter_search__item"
            type="text"
            placeholder="Поиск по никнейму..."
          />
          <svg className="filter_search__icon"
            width="20"
            height="21"
            viewBox="0 0 20 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.16667 16.3333C12.8486 16.3333 15.8333 13.3486 15.8333 9.66667C15.8333 5.98477 12.8486 3 9.16667 3C5.48477 3 2.5 5.98477 2.5 9.66667C2.5 13.3486 5.48477 16.3333 9.16667 16.3333Z"
              stroke="white"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M17.5 18L13.875 14.375"
              stroke="white"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Filter;
