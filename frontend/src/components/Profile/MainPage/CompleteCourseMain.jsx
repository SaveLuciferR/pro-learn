import { useEffect, useState } from 'react';
import SliderMain from '../../Slider/SliderMain';

/* Переделать названия классов, сделать карточку рабочей */
const CompleteCourseMain = ({ data }) => {
  const [completeCourse, setCompleteCourse] = useState([]);

  useEffect(() => {
    setCompleteCourse(data.projects);
  }, [data]);

  // console.log(completeCourse)

  return (
    <div className="currentcourse">
      <p className="currentcourse-title">Пройденные курсы</p>
      <SliderMain data={completeCourse} sliderType="profileCompleteCourse" countSlide={1} />
    </div>
  );
};

export default CompleteCourseMain;
