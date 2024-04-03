import CurrentCourseMainContent from '../Profile/MainPage/CurrentCourseMainContent';
import { useSelector } from 'react-redux';
import ProfileProjectsContent from '../Profile/MainPage/ProfileProjectsContent';

const SliderList = ({ type }) => {
  const slideIndex = useSelector((state) => state.slider.slideIndex);
  const sliderItems = useSelector((state) => state.slider.sliderItems);

  const cards = sliderItems.map((slide, index) => {
    switch (type) {
      case 'profileCurrentCourse':
        return <CurrentCourseMainContent key={index} data={slide} />;
      case 'profileProjects':
        return <ProfileProjectsContent key={index} data={slide} />;
      default:
        return 'нету';
    }
  });

  console.log(slideIndex + ' ТИП');

  return (
    <div className={'slider-list'} style={{ transform: `translateX(-${slideIndex * 100}%)` }}>
      {cards}
    </div>
  );
};

export default SliderList;
