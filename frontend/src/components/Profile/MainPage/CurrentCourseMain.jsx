import { useState, useEffect } from 'react';
import SliderMain from '../../Slider/SliderMain';
import { Link } from 'react-router-dom';

const CurrentCourseMain = ({ data, viewWords}) => {
  const [currentCourse, setCurrentCourse] = useState([]);

  useEffect(() => {
    // console.log(data.currentCourse)
    setCurrentCourse(data.currentCourse);
  }, [data]);

  return (
    <div className="currentcourse">
      <Link to={'current-courses'} className="currentcourse-title">
        {viewWords['tpl_profile_current-courses_title']}
      </Link>
      {currentCourse === undefined || currentCourse.length === 0 ? (
        <div className="profile-none">{viewWords['tpl_profile_current-courses_missing']} ):</div>
      ) : (
        <SliderMain data={currentCourse} sliderType="profileCurrentCourse" countSlide={1} viewWords={viewWords}/>
      )}
    </div>
  );
};

export default CurrentCourseMain;
