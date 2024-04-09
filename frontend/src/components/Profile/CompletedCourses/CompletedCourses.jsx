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
        setCompletedCourses(data.profileInfo.projects);
      });
  }, [lang, username]);

  return (
    <div>
      <div className="created-courses-header">
        <div className="lessons-header-back">
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
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <Link to={`../../profile/${username}`}>Профиль</Link>
        </div>
        <h1>Пройденные курсы</h1>
      </div>
      <div className="profile-projects-page">
        <div className="profile-completed-page-main">
          <SliderMain data={completedCourses} sliderType="profileCompletedCourses" countSlide={2} />
        </div>
      </div>
    </div>
  );
};

export default ProfileCompletedCourses;
