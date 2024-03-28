import { useState } from 'react';

const CourseBlockItem = () => {
  const [activeList, setActiveList] = useState(false);

  return (
    <div className="course-blocks-item">
      <div className="course-blocks-item-header">
        <div className="course-blocks-item-header-l">
          <p className="course-blocks-item-header-title">_Название блока 1</p>
          <div className="course-blocks-item-header-status">
            <svg
              width="21"
              height="21"
              viewBox="0 0 21 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="10.5" cy="10.5" r="8.75" stroke="white" />
              <path
                d="M10.5 7V10.5L12.6875 12.6875"
                stroke="white"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <p>Проходится</p>
          </div>
          <p className="course-blocks-item-header-progress">4/8</p>
        </div>
        <svg
          width="36"
          height="36"
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M23.25 13.5L23.5074 13.7574C25.5074 15.7574 26.5074 16.7574 26.5074 18C26.5074 19.2426 25.5074 20.2426 23.5074 22.2426L23.25 22.5"
            stroke="white"
            strokeWidth="2.25"
            strokeLinecap="round"
          />
          <path
            d="M19.9414 10.7556L18.0003 18L16.0591 25.2444"
            stroke="white"
            strokeWidth="2.25"
            strokeLinecap="round"
          />
          <path
            d="M12.7495 13.5L12.4922 13.7574C10.4922 15.7574 9.49219 16.7574 9.49219 18C9.49219 19.2426 10.4922 20.2426 12.4922 22.2426L12.7495 22.5"
            stroke="white"
            strokeWidth="2.25"
            strokeLinecap="round"
          />
          <path
            d="M3 18C3 10.9289 3 7.3934 5.1967 5.1967C7.3934 3 10.9289 3 18 3C25.0711 3 28.6066 3 30.8033 5.1967C33 7.3934 33 10.9289 33 18C33 25.0711 33 28.6066 30.8033 30.8033C28.6066 33 25.0711 33 18 33C10.9289 33 7.3934 33 5.1967 30.8033C3 28.6066 3 25.0711 3 18Z"
            stroke="white"
            strokeWidth="2.25"
          />
        </svg>
      </div>
      {activeList ? (
        <ul className="course-blocks-item-lessons">
          <li className="course-blocks-item-lessons-item">
            <p>&gt; Название урока 1</p>
            <div className="course-blocks-item-lessons-item-status complete">
              <svg
                width="21"
                height="21"
                viewBox="0 0 21 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="10.5" cy="10.5" r="8.75" stroke="#2EA043" />
                <path
                  d="M7.4375 10.9375L9.1875 12.6875L13.5625 8.3125"
                  stroke="#2EA043"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <p>Пройдено</p>
            </div>
          </li>
        </ul>
      ) : (
        <></>
      )}
      <button onClick={() => setActiveList(!activeList)} className="course-blocks-item-bottom">
        {activeList ? <p>Свернуть</p> : <p>Развернуть</p>}
        <svg
          className={`compiler-sidebar-arrow${activeList ? ' active' : ''}`}
          width="21"
          height="21"
          viewBox="0 0 21 21"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16.625 7.875L10.5 13.125L4.375 7.875"
            stroke="white"
            strokeOpacity="0.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
};

/*

Пройдено:
<svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="10.5" cy="10.5" r="8.75" stroke="#2EA043"/>
<path d="M7.4375 10.9375L9.1875 12.6875L13.5625 8.3125" stroke="#2EA043" strokeLinecap="round" strokeLinejoin="round"/>
</svg>


Проходится:
<svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="10.5" cy="10.5" r="8.75" stroke="white"/>
<path d="M10.5 7V10.5L12.6875 12.6875" stroke="white" strokeLinecap="round" strokeLinejoin="round"/>
</svg>


Заблокировано:
<svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1.75 14C1.75 11.5251 1.75 10.2877 2.51884 9.51884C3.28769 8.75 4.52513 8.75 7 8.75H14C16.4749 8.75 17.7123 8.75 18.4812 9.51884C19.25 10.2877 19.25 11.5251 19.25 14C19.25 16.4749 19.25 17.7123 18.4812 18.4812C17.7123 19.25 16.4749 19.25 14 19.25H7C4.52513 19.25 3.28769 19.25 2.51884 18.4812C1.75 17.7123 1.75 16.4749 1.75 14Z" stroke="white" strokeOpacity="0.6"/>
<path d="M5.25 8.75V7C5.25 4.10051 7.60051 1.75 10.5 1.75C13.3995 1.75 15.75 4.10051 15.75 7V8.75" stroke="white" strokeOpacity="0.6" strokeLinecap="round"/>
</svg>


*/

export default CourseBlockItem;
