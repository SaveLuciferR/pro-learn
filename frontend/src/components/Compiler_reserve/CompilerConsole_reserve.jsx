const CompilerConsole = () => {
  return (
    <div className="console">
      <div className="console-bar">
        <div className="console-info">
          <div className="console-dev">
            <svg
              width="18"
              height="19"
              viewBox="0 0 18 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.75 6.37219L14.0224 7.51731C15.1793 8.55854 15.7577 9.07915 15.7577 9.74719C15.7577 10.4152 15.1793 10.9358 14.0224 11.9771L12.75 13.1222"
                stroke="white"
                strokeLinecap="round"
              />
              <path
                d="M10.4922 4.25L9.00208 9.81114L7.51198 15.3723"
                stroke="white"
                strokeLinecap="round"
              />
              <path
                d="M5.24992 6.37219L3.97756 7.51731C2.82065 8.55854 2.24219 9.07915 2.24219 9.74719C2.24219 10.4152 2.82065 10.9358 3.97756 11.9771L5.24992 13.1222"
                stroke="white"
                strokeLinecap="round"
              />
            </svg>
            <p>dev</p>
          </div>
          <button type="button">
            <svg
              width="18"
              height="19"
              viewBox="0 0 18 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.5 9.5C1.5 5.96447 1.5 4.1967 2.59835 3.09835C3.6967 2 5.46447 2 9 2C12.5355 2 14.3033 2 15.4017 3.09835C16.5 4.1967 16.5 5.96447 16.5 9.5C16.5 13.0355 16.5 14.8033 15.4017 15.9017C14.3033 17 12.5355 17 9 17C5.46447 17 3.6967 17 2.59835 15.9017C1.5 14.8033 1.5 13.0355 1.5 9.5Z"
                stroke="white"
                strokeOpacity="0.8"
              />
              <path
                d="M12.75 11.75H10.875H9"
                stroke="white"
                strokeOpacity="0.8"
                strokeLinecap="round"
              />
              <path
                d="M5.25 8L5.4258 8.1465C6.38706 8.94755 6.86769 9.34808 6.86769 9.875C6.86769 10.4019 6.38706 10.8024 5.4258 11.6035L5.25 11.75"
                stroke="white"
                strokeOpacity="0.8"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
        <button type="button" className="console-hidden">
          <svg
            width="15"
            height="7"
            viewBox="0 0 15 7"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13.625 0.875001L7.5 6.125L1.375 0.875"
              stroke="white"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
      <div className="console-text">CONSOLE</div>
    </div>
  );
};
export default CompilerConsole;
