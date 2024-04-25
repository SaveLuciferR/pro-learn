import { useState, useEffect } from 'react';
import SliderMain from '../../Slider/SliderMain';
import { Link } from 'react-router-dom';

const CurrentCourseMain = ({ data }) => {
  const [currentCourse, setCurrentCourse] = useState([]);

  useEffect(() => {
    setCurrentCourse(data);
  }, [data]);

  return (
    <div className="currentcourse">
      <Link to={'current-courses'} className="currentcourse-title">
        Текущие курсы
      </Link>
      {Object.keys(currentCourse).length === 0 ? (
        <div className="profile-none">Нет текущих курсов ):</div>
      ) : (
        <SliderMain data={currentCourse} sliderType="profileCurrentCourse" countSlide={1} />
      )}
    </div>
  );
};

export default CurrentCourseMain;
