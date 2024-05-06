import {useEffect, useState} from 'react';
import ProfileProjectItem from './ProfileProjectItem';
import ProfileProjectsButton from './ProfileProjectsButton';

const ProfileProjectspaginationItems = ({currentItems, children}) => {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        setProjects((prevState) => [<ProfileProjectsButton key={-1}/>]);
        console.log(projects);
        currentItems.map((slide, i) => {
            setProjects((prevState) => [...prevState, <ProfileProjectItem key={i} data={slide}/>]);
        });
    }, [currentItems]);

    useEffect(() => {
        console.log(projects)
    }, [projects]);

    return (
        <>
            {projects.length === 0 ?
                <div>Loading...</div>
                :
                <div className="profile-projects-page-main-content">
                    {projects}
                </div>
            }
        </>
    );
};

export default ProfileProjectspaginationItems;
