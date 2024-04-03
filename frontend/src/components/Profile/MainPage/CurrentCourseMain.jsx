import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosClient from '../../../axiosClient';
import SliderMain from '../../Slider/SliderMain';

const CurrentCourseMain = () => {
  const { lang, username } = useParams();
  const [userCurrentCourseData, setUserCurrentCourseData] = useState([]);

  useEffect(() => {
    axiosClient
      .get(`${lang === undefined ? '/' : '/' + lang + '/'}@${username}`)
      .then(({ data }) => {
        setUserCurrentCourseData(data.profileInfo.projects);
        console.log(userCurrentCourseData + ' data');
      });
  }, [lang, username]);

  return (
    <div className="currentcourse">
      <p className="currentcourse-title">Текущие курсы</p>
      <SliderMain data={userCurrentCourseData} sliderType="profileCurrentCourse" />
    </div>
  );
};

export default CurrentCourseMain;
