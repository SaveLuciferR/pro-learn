import { useState, useEffect } from 'react';
import SliderMain from '../../Slider/SliderMain';

const CurrentCourseMain = ({ data }) => {
  const [currentCourse, setCurrentCourse] = useState([]);

  useEffect(() => {
    setCurrentCourse(data.currentCourse);
  }, [data]);

  return (
    <div className="currentcourse">
      <p className="currentcourse-title">Текущие курсы</p>
      {currentCourse.length === 0 ? (
        <div className="profile-none">Нет текущих курсов ):</div>
      ) : (
        <SliderMain data={currentCourse} sliderType="profileCurrentCourse" countSlide={1} />
      )}
    </div>
  );
};

export default CurrentCourseMain;
