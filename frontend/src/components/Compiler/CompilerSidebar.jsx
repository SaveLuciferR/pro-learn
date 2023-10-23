import { Collapse } from "react-collapse";
import { useState } from "react";

const CompilerSidebar = () => {
  const [isOpenedInfo, setIsOpenedInfo] = useState(true);
  const [isClosedInfoArrow, setIsClosedInfoArrow] = useState(false);

  const [isOpenedFiles, setIsOpenedFiles] = useState(true);
  const [isClosedFilesArrow, setIsClosedFilesArrow] = useState(false);

  const [isOpenedDependicies, setIsOpenedDependicies] = useState(true);
  const [isClosedDependiciesArrow, setIsClosedDependiciesArrow] =
    useState(false);

  return (
    <div className="compiler-sidebar">
      <div className="compiler-sidebar-container">
        <div className="compiler-sidebar-info">
          <button
            type="button"
            className="compiler-sidebar-tab-button"
            onClick={() => {
              setIsOpenedInfo(!isOpenedInfo);
              setIsClosedInfoArrow(!isClosedInfoArrow);
            }}
          >
            <svg
              className={`compiler-sidebar-arrow${
                isClosedInfoArrow ? " active" : ""
              }`}
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
            <div className="compiler-sidebar-info-main">aboba</div>
          </Collapse>
        </div>
        <div className="compiler-sidebar-files">
          <button
            type="button"
            className="compiler-sidebar-tab-button"
            onClick={() => {
              setIsOpenedFiles(!isOpenedFiles);
              setIsClosedFilesArrow(!isClosedFilesArrow);
            }}
          >
            <svg
              className={`compiler-sidebar-arrow${
                isClosedFilesArrow ? " active" : ""
              }`}
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
            Files
          </button>
          <Collapse isOpened={isOpenedFiles}>
            <div className="compiler-sidebar-files-main">aboba1</div>
          </Collapse>
        </div>
        <div className="compiler-sidebar-dependicies">
          <button
            type="button"
            className="compiler-sidebar-tab-button"
            onClick={() => {
              setIsOpenedDependicies(!isOpenedDependicies);
              setIsClosedDependiciesArrow(!isClosedDependiciesArrow);
            }}
          >
            <svg
              className={`compiler-sidebar-arrow${
                isClosedDependiciesArrow ? " active" : ""
              }`}
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
            Dependices
          </button>
          <Collapse isOpened={isOpenedDependicies}>
            <div className="compiler-sidebar-dependcies-main">aboba2</div>
          </Collapse>
        </div>
      </div>
    </div>
  );
};

export default CompilerSidebar;
