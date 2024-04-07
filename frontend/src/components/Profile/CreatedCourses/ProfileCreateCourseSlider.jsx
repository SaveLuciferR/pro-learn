import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import axiosClient from '../../../axiosClient';
import img from '../../../image 7.png';
import SliderMain from '../../Slider/SliderMain';

const ProfileCreateCourse = () => {
  const { lang, username } = useParams();
  const currentUser = useSelector((state) => state.mainLayout.user);
  const [createdCourses, setCreatedCourses] = useState([]);

  useEffect(() => {
    axiosClient
      .get(`${lang === undefined ? '/' : '/' + lang + '/'}@${username}/course-from-user`)
      .then(({ data }) => {
        setCreatedCourses(data.courses);
      });
  }, [lang, username]);

  console.log(createdCourses);
  // course-from-user
  return (
    <div className="created-course">
      <SliderMain data={createdCourses} sliderType="createdCourses" countSlide={1} />
      <div className="currentcourse-slider">(слайдер)</div>
    </div>
  );
};

export default ProfileCreateCourse;
