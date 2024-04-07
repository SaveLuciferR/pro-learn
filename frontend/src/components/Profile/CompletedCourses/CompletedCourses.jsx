import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileCompletedCoursesItem from './CompletedCoursesItem';
import { useEffect, useState } from 'react';
import axiosClient from '../../../axiosClient';
import SliderMain from '../../Slider/SliderMain';

const ProfileCompletedCourses = () => {
  const { lang, username } = useParams();
  const [completedCourses, setCompletedCourses] = useState([]);

  useEffect(() => {
    axiosClient
      .get(`${lang === undefined ? '/' : '/' + lang + '/'}@${username}`)
      .then(({ data }) => {
        setCompletedCourses(data);
      });
  }, [lang, username]);

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
          <Link to={`../../profile/${username}`}>Профиль</Link>
        </div>
        <p className="profile-completed-page-title">Пройденные курсы</p>
      </div>
      <div className="profile-completed-page-main">
        <SliderMain data={completedCourses} sliderType="profileCompletedCourses" countSlide={2} />
        <ProfileCompletedCoursesItem />
        <ProfileCompletedCoursesItem />
      </div>
      <div className="profile-tasks-slider">(слайдер)</div>
    </div>
  );
};

export default ProfileCompletedCourses;
