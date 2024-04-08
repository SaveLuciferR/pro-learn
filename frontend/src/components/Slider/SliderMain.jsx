import { useEffect, useState } from 'react';
import SliderUnder from './SliderUnder';
import SliderList from './SliderList';

const SliderMain = ({ data, sliderType, countSlide }) => {
  const [sliderItems, setSliderItems] = useState([]);
  const [slideIndex, setSlideIndex] = useState(0);
  const [touchPosition, setTouchPosition] = useState(null);
  const [countSlidePerPage, setCountSlidePerPage] = useState(0);

  // console.log(data);

  useEffect(() => {
    setSliderItems(data);
    setCountSlidePerPage(countSlide);
  }, [data]);

  const changeSlide = (direction = 1) => {
    let slideNumber = 0;

    if (slideIndex + direction < 0) {
      slideNumber = sliderItems.length / countSlidePerPage - 1;
    } else {
      slideNumber = (slideIndex + direction) % (sliderItems.length / countSlidePerPage);
    }

    setSlideIndex(slideNumber);
  };

  const goToSlide = (number) => {
    setSlideIndex(number % (sliderItems.length / countSlidePerPage));
  };

  const handleTouchStart = (e) => {
    const touchDown = e.touches[0].clientX;

    setTouchPosition(touchDown);
  };

  const handleTouchMove = (e) => {
    if (touchPosition === null) {
      return;
    }

    const currentPosition = e.touches[0].clientX;
    const direction = touchPosition - currentPosition;

    if (direction > 10) {
      changeSlide(1);
    }

    if (direction < -10) {
      changeSlide(-1);
    }

    setTouchPosition(null);
  };

  return (
    <div className={'slider'} onTouchStart={handleTouchStart} onTouchMove={handleTouchMove}>
      <SliderList type={sliderType} items={sliderItems} index={slideIndex} />
      <SliderUnder
        changeSlide={(e) => changeSlide(e)}
        goToSlide={(e) => goToSlide(e)}
        pagesType="digits"
        items={sliderItems}
        indx={slideIndex}
        countSlide={countSlidePerPage}
      />
    </div>
  );
};

export default SliderMain;
