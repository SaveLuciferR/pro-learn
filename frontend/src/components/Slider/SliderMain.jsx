import { useDispatch, useSelector } from 'react-redux';
import { setSliderItems, setSlideIndex, setTouchPosition } from '../../redux/Slider/slice';
import SliderUnder from './SliderUnder';
import SliderList from './SliderList';

const SliderMain = ({ data, sliderType }) => {
  const dispatch = useDispatch();
  dispatch(setSliderItems(data));

  const sliderItems = useSelector((state) => state.slider.sliderItems);
  const slideIndex = useSelector((state) => state.slider.slideIndex);
  const touchPosition = useSelector((state) => state.slider.touchPosition);
  const countSlidePerPage = 1;

  const changeSlide = (direction = 1) => {
    // console.log(direction);
    let slideNumber = 0;

    if (slideIndex + direction < 0) {
      slideNumber = sliderItems.length / countSlidePerPage - 1;
    } else {
      slideNumber = (slideIndex + direction) % (sliderItems.length / countSlidePerPage);
    }

    dispatch(setSlideIndex(slideNumber));
  };

  const goToSlide = (number) => {
    dispatch(setSlideIndex(number % (sliderItems.length / countSlidePerPage)));
  };

  const handleTouchStart = (e) => {
    const touchDown = e.touches[0].clientX;

    dispatch(setTouchPosition(touchDown));
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

    dispatch(setTouchPosition(null));
  };

  return (
    <div className={'slider'} onTouchStart={handleTouchStart} onTouchMove={handleTouchMove}>
      <SliderList type={sliderType} />
      <SliderUnder
        changeSlide={(e) => changeSlide(e)}
        goToSlide={(e) => goToSlide(e)}
        pagesType="digits"
      />
    </div>
  );
};

export default SliderMain;
