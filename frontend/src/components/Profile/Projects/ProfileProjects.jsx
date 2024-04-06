import { Link, useParams } from 'react-router-dom';
import ProfileProjectItem from './ProfileProjectItem';
import { useEffect, useState } from 'react';
import axiosClient from '../../../axiosClient';
import SliderMain from '../../Slider/SliderMain';

const ProfileProjects = () => {
  const { lang, username } = useParams();
  const [projectsData, setProjectsData] = useState([]);

  useEffect(() => {
    axiosClient
      .get(`${lang === undefined ? '/' : '/' + lang + '/'}@${username}`)
      .then(({ data }) => {
        setProjectsData(data.profileInfo.projects);
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
          <Link to="">Профиль</Link>
        </div>
        <p className="profile-projects-page-title">Проекты</p>
      </div>
      <div className="profile-projects-page-main">
        <SliderMain data={projectsData} sliderType="profileProjectsPage" countSlide={4} />
      </div>
      <div className="profile-tasks-slider">(слайдер)</div>
    </div>
  );
};

export default ProfileProjects;
