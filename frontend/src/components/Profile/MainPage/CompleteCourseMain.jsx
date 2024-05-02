import { useEffect, useState } from 'react';
import SliderMain from '../../Slider/SliderMain';
import { Link } from 'react-router-dom';

/* Переделать названия классов, сделать карточку рабочей */
const CompleteCourseMain = ({ data }) => {
  const [completeCourse, setCompleteCourse] = useState({});

  useEffect(() => {
    setCompleteCourse(data);
  }, [data]);

  // console.log(completeCourse)

  return (
    <div className="currentcourse">
      <Link to={'completed-courses'} className="currentcourse-title">
        Пройденные курсы
      </Link>
      {Object.keys(completeCourse).length === 0 ? (
        <div className="profile-none">Нет завершенных курсов ):</div>
      ) : (
        <SliderMain data={completeCourse} sliderType="profileCompleteCourse" countSlide={1} />
      )}
    </div>
  );
};

export default CompleteCourseMain;
