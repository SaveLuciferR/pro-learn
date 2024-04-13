const SliderUnder = ({ goToSlide, changeSlide, pagesType, items, indx, countSlide }) => {
  const renderDots = () => {
    const dots = [];

    for (let i = 0; i < items.length / countSlide; i++) {
      dots.push(
        <div
          key={`dot-${i}`}
          className={`slider-dot ${indx === i ? 'active' : ''}`}
          onClick={() => goToSlide(i)}
        ></div>,
      );
    }
    return dots;
  };

  const renderDigits = () => {
    const digits = [];

    for (let i = 0; i < items.length / countSlide; i++) {
      digits.push(
        <div key={`digit-${i}`} className={`slider-digit ${indx === i ? 'active' : ''}`}>
          {i + 1}
        </div>,
      );
    }
    return digits;
  };

  const countItems = () => {
    let count = 0;
    Object.keys(items).map(() => {
      count = count + 1;
    });
    console.log(count);
    return count;
  };
  // console.log(countSlide);

  return (
    <>
      {countItems() <= countSlide ? (
        <></>
      ) : (
        <div className={'slider-under-element'}>
          <div className={'slider-arrow'} onClick={() => changeSlide(-1)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 24 24"
              fill="none"
            >
              <circle
                cx="10"
                cy="10"
                r="10"
                transform="matrix(-1 0 0 1 22 2)"
                stroke="white"
                strokeWidth="1.5"
              />
              <path
                d="M13.5 9L10.5 12L13.5 15"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          {pagesType === 'digits' ? (
            <div className={'slider-digits'}>{renderDigits()}</div>
          ) : (
            <div className={'slider-dots'}>{renderDots()}</div>
          )}
          <div className={'slider-arrow'} onClick={() => changeSlide(1)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 24 24"
              fill="none"
            >
              <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="1.5" />
              <path
                d="M10.5 9L13.5 12L10.5 15"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      )}
    </>
  );
};

export default SliderUnder;
