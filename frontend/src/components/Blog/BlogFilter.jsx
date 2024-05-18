/* ICONS */
import { IoMdClose } from 'react-icons/io';
import { FiSearch } from 'react-icons/fi';

const BlogFilter = ({ isOpen, setIsOpen, titleText, data, search, setSearch }) => {
  //Фильтр для страницы со статьями

  return (
    <div className={`filter${isOpen ? ' active' : ''}`}>
      {/* Тернарный оператор на раздачу активного класса */}
      <div className="filter_container">
        <div className="filter_header">
          <button type="button" onClick={() => setIsOpen(false)}>
            {/* Изменение state при клике */}
            <IoMdClose size={24} color="#ffffff" />
          </button>
          <h2 className="filter_title">Фильтр</h2>
        </div>
        <h3 className="filter_category">&gt; Категория статей</h3>
        <div className="filter_checkbox">
          {/* Чекбоксы стилизованы */}
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
          {/* Строка поиска */}
          <input className="filter_search__item" type="text" placeholder="Поиск по никнейму..." />
          <FiSearch size={20} color="#5f5f5f" className="filter_search__icon" />
        </div>
      </div>
    </div>
  );
};

export default BlogFilter;
