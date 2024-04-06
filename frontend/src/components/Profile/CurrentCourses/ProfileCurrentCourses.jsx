import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axiosClient from '../../../axiosClient';
import SliderMain from '../../Slider/SliderMain';

const ProfileCurrentCourses = () => {
  const { lang, username } = useParams();
  const [currentCourses, setCurrentCourses] = useState([]);

  useEffect(() => {
    axiosClient
      .get(`${lang === undefined ? '/' : '/' + lang + '/'}@${username}`)
      .then(({ data }) => {
        setCurrentCourses(data.profileInfo.currentCourse);
      });
  }, [lang, username]);

  console.log(currentCourses);

  return (
    <div className="profile-projects-page">
      <div className="profile-projects-page-header">
        <div className="profile-projects-page-nav">
          <svg
            width="21"
            height="21"
            viewBox="0 0 21 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13.125 4.375L7.875 10.5L13.125 16.625"
              stroke="white"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <Link to="">Профиль</Link>
        </div>
        <p className="profile-current-page-title">Текущие курсы</p>
      </div>
      <div className="profile-completed-page-main">
        <SliderMain data={currentCourses} sliderType="currentCourse" countSlide={2} />
      </div>
    </div>
  );
};

export default ProfileCurrentCourses;
