import CurrentCourseMainContent from '../Profile/MainPage/CurrentCourseMainContent';
import ProfileProjectsContent from '../Profile/MainPage/ProfileProjectsContent';
import CompleteCourseMainContent from '../Profile/MainPage/CompleteCourseMainContent';
import ProfileCurrentCoursesItem from '../Profile/CurrentCourses/ProfileCurrentCourseItem';
import ProfileProjectItem from '../Profile/Projects/ProfileProjectItem';
import ProfileTask from '../Profile/UserTasks/ProfileTask';
import ProfileCreateCourseSliderContent from '../Profile/CreatedCourses/ProfileCreateCourseSliderContent';

const SliderList = ({ type, items, index }) => {
  // const cards = items.map((slide, index) => {
  //   switch (type) {
  //     case 'profileCurrentCourse':
  //       return <CurrentCourseMainContent key={index} data={slide} />;
  //     case 'profileProjects':
  //       return <ProfileProjectsContent key={index} data={slide} />;
  //     case 'profileCompleteCourse':
  //       return <CompleteCourseMainContent />;
  //     case 'currentCourse':
  //       return <ProfileCurrentCoursesItem key={index} data={slide} />;
  //     default:
  //       return 'нету';
  //   }
  // });

  // console.log(items);

  const cards = () => {
    switch (type) {
      case 'profileCurrentCourse':
        return items.map((slide, index) => <CurrentCourseMainContent key={index} data={slide} />);

      case 'profileProjects':
        return items.map((slide, index) => <ProfileProjectsContent key={index} data={slide} />);

      case 'profileCompleteCourse':
        return items.map((slide, index) => <CompleteCourseMainContent />);

      case 'profileProjectsPage':
        return items.map((slide, index) => <ProfileProjectItem key={index} data={slide} />);

      case 'currentCourse':
        return Object.keys(items).map((slide, index) => (
          <ProfileCurrentCoursesItem key={index} data={items} index={slide} />
        ));

      case 'createdCourses':
        return Object.keys(items).map((slide, index) => (
          <ProfileCreateCourseSliderContent key={index} data={items} index={slide} />
        ));

      case 'profileTasks':
        return Object.keys(items).map((slide, index) => (
          <ProfileTask key={index} data={items} index={slide} />
        ));
      default:
        return 'нету';
    }
  };

  return (
    <div className={'slider-list'} style={{ transform: `translateX(calc(-${index * 100}% - ${(index) * 20}px))` }}>
      {cards()}
    </div>
  );
};

export default SliderList;
