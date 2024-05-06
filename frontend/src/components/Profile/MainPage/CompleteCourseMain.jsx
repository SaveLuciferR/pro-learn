import { useEffect, useState } from 'react';
import SliderMain from '../../Slider/SliderMain';
import { Link } from 'react-router-dom';

/* Переделать названия классов, сделать карточку рабочей */
const CompleteCourseMain = ({ data, viewWords }) => {
  const [completeCourse, setCompleteCourse] = useState([]);

  useEffect(() => {
    setCompleteCourse(data.completeCourse);
  }, [data]);

  // console.log(completeCourse)

  return (
    <div className="currentcourse">
      <Link to={'completed-courses'} className="currentcourse-title">
          {viewWords['tpl_profile_completed-courses_title']}
      </Link>
      {completeCourse.length === 0 ? (
        <div className="profile-none">{viewWords['tpl_profile_completed-courses_missing']} ):</div>
      ) : (
        <SliderMain data={completeCourse} sliderType="profileCompleteCourse" countSlide={1} viewWords={viewWords}/>
      )}
    </div>
  );
};

export default CompleteCourseMain;
