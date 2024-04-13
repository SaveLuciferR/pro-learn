import { useEffect, useState } from 'react';
import ProfileProjectItem from './ProfileProjectItem';
import ProfileProjectsButton from './ProfileProjectsButton';

const ProfileProjectspaginationItems = ({ currentItems }) => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    setProjects((prevState) => [<ProfileProjectsButton />]);
    console.log(projects);
    currentItems.map((slide, i) => {
      setProjects((prevState) => [...prevState, <ProfileProjectItem key={i} data={slide} />]);
    });
  }, [currentItems]);

  return <div className="profile-projects-page-main-content">{projects.map((i) => i)}</div>;
};

export default ProfileProjectspaginationItems;
