import {useEffect, useState} from 'react';
import ProfileProjectItem from './ProfileProjectItem';
import ProfileProjectsButton from './ProfileProjectsButton';

const ProfileProjectspaginationItems = ({currentItems}) => {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        setProjects((prevState) => [<ProfileProjectsButton/>]);
        // console.log(projects);
        currentItems.map((slide, i) => {
            setProjects((prevState) => [...prevState, <ProfileProjectItem key={i} data={slide}/>]);
        });
    }, [currentItems]);

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
