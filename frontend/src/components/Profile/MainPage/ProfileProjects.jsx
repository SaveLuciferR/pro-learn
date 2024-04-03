import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosClient from '../../../axiosClient';
import { Link } from 'react-router-dom';
import SliderMain from '../../Slider/SliderMain';

const ProfileProjects = () => {
  const { lang, username } = useParams();
  const [userCurrentProjectData, setUserCurrentProjectData] = useState([]);

  useEffect(() => {
    axiosClient
      .get(`${lang === undefined ? '/' : '/' + lang + '/'}@${username}`)
      .then(({ data }) => {
        setUserCurrentProjectData(data.profileInfo.projects);
        // console.log(userCurrentProjectData + ' data');
      });
  }, [lang, username]);

  return (
    <div className="profile-projects">
      <div className="profile-projects-header">
        <p className="profile-projects-header-title">Проекты</p>
        <Link to="" className="profile-projects-header-linkall">
          Посмотреть все
          <svg
            width="21"
            height="21"
            viewBox="0 0 21 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M11.786 4.78596C12.0422 4.52968 12.4578 4.52968 12.714 4.78596L17.964 10.036C18.2203 10.2922 18.2203 10.7078 17.964 10.964L12.714 16.214C12.4578 16.4703 12.0422 16.4703 11.786 16.214C11.5297 15.9578 11.5297 15.5422 11.786 15.286L15.9157 11.1562H3.5C3.13756 11.1562 2.84375 10.8624 2.84375 10.5C2.84375 10.1376 3.13756 9.84375 3.5 9.84375H15.9157L11.786 5.71404C11.5297 5.45776 11.5297 5.04224 11.786 4.78596Z"
              fill="white"
            />
          </svg>
        </Link>
      </div>

      <SliderMain data={userCurrentProjectData} sliderType="profileProjects" />
      <div className="profile-projects-slider">(слайдер)</div>
    </div>
  );
};

export default ProfileProjects;
