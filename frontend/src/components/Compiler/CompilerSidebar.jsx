import { Collapse } from "react-collapse";
import { useState } from "react";

const CompilerSidebar = () => {
  const [isOpenedInfo, setIsOpenedInfo] = useState(true);
  const [isClosedInfoArrow, setIsClosedInfoArrow] = useState(false);

  return (
    <div className="sidebar">
      <div className="sidebar-container">
        <div className="sidebar-info">
          <button
            type="button"
            className="sidebar-info-button"
            onClick={() => {
              setIsOpenedInfo(!isOpenedInfo);
              setIsClosedInfoArrow(!isClosedInfoArrow);
            }}
          >
            <svg className={`sidebar-arrow${isClosedInfoArrow ? ' active' : ''}`}
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
            Info
          </button>
          <Collapse isOpened={isOpenedInfo}>
            <div className="sidebar-info-main">aboba</div>
          </Collapse>
        </div>
        <div className="sidebar-files"></div>
        <div className="sidebar-dependicies"></div>
      </div>
    </div>
  );
};

export default CompilerSidebar;
