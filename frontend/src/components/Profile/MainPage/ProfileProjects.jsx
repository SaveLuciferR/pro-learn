import { Link } from 'react-router-dom';
import SliderMain from '../../Slider/SliderMain';
import { useEffect, useState } from 'react';

const ProfileProjects = ({ data, viewWords }) => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    setProjects(data.projects);
  }, [data]);

  return (
    <div className="profile-projects">
      <div className="profile-projects-header">
        <p className="profile-projects-header-title">{viewWords['tpl_profile_project_title']}</p>
        <Link to={`projects`} className="profile-projects-header-linkall">
          {viewWords['tpl_profile_main-page_project-all']}
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
      {projects === undefined || projects.length === 0 ? (
        <div className="profile-none">{viewWords['tpl_profile_project_missing']} ):</div>
      ) : (
        <SliderMain data={projects} sliderType="profileProjects" countSlide={1} viewWords={viewWords}/>
      )}
    </div>
  );
};

export default ProfileProjects;
