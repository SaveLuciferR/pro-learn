import CurrentCourseMainContent from '../Profile/MainPage/CurrentCourseMainContent';
import ProfileProjectsContent from '../Profile/MainPage/ProfileProjectsContent';

const SliderList = ({ items, type, index }) => {
  console.log(items);
  const cards = items.map((slide, index) => {
    switch (type) {
      case 'profileCurrentCourse':
        return <CurrentCourseMainContent key={index} data={slide} />;
      case 'profileProjects':
        return <ProfileProjectsContent key={index} data={slide} />;
      default:
        return 'нету';
    }
  });

  // console.log(slideIndex + ' ТИП');

  return (
    <div className={'slider-list'} style={{ transform: `translateX(-${index * 100}%)` }}>
      {cards}
    </div>
  );
};

export default SliderList;
