import CurrentCourseMainContent from '../Profile/MainPage/CurrentCourseMainContent';
import ProfileProjectsContent from '../Profile/MainPage/ProfileProjectsContent';
import CompleteCourseMainContent from '../Profile/MainPage/CompleteCourseMainContent';
import ProfileCoursesItem from '../Profile/CurrentCourses/ProfileCourseItem';
import ProfileProjectItem from '../Profile/Projects/ProfileProjectItem';
import ProfileTask from '../Profile/UserTasks/ProfileTask';
import CourseCard from "../Courses/CourseCard";

const SliderList = ({ type, items, index, viewWords}) => {

  const cards = () => {
    switch (type) {
      case 'profileCurrentCourse':
        return items.map((slide, index) => (
            <CurrentCourseMainContent key={index} data={slide} index={index} viewWords={viewWords}/>
        ));

      case 'profileProjects':
        return items.map((slide, index) => <ProfileProjectsContent key={index} data={slide}
                                                                   viewWords={viewWords}/>);

      case 'profileCompleteCourse':
        return items.map((slide, index) => <CompleteCourseMainContent key={index} data={slide}
                                                                      viewWords={viewWords}/>);

      case 'profileCompletedCourses':
        return items.map((slide, index) =>
            <ProfileCoursesItem key={index} data={slide} index={index}
                               viewWords={viewWords}
                               isContinue={false}
                               isCreated={false}
            />
        );

      case 'profileProjectsPage':
        return items.map((slide, index) => <ProfileProjectItem key={index} data={slide}
                                                               viewWords={viewWords}/>);

      case 'currentCourse':
        return items.map((slide, index) => (
            <ProfileCoursesItem key={index} data={slide} index={index} viewWords={viewWords}
                               isContinue={true} isCreated={false}/>
        ));

      case 'createdCourses':
        return items.map((slide, index) => (
            <ProfileCoursesItem key={index} data={slide} index={index} viewWords={viewWords}
                               isContinue={false} isCreated={true}/>
        ));

      case 'createdTasks':
        return items.map((slide, index) => (
            <ProfileTask key={index} data={slide} index={index} viewWords={viewWords}
                         isContinue={false} isCreated={true}/>
        ));

      case 'profileTasks':
        return items.map((slide, index) => (
            <ProfileTask key={index} data={slide} index={slide} viewWords={viewWords} isCreated={false}/>
        ));
      case 'currentCoursePage':
            return items.map((slide, i) => <CourseCard key={i} obj={slide} isSlider={true} viewWords={viewWords}/>)
      default:
        return null;
    }
  };

  return (
    <div
      className={'slider-list'}
      style={{ transform: `translateX(calc(-${index * 100}% - ${index * 20}px))` }}
    >
      {cards()}
    </div>
  );
};

export default SliderList;
