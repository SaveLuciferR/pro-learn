import {useEffect, useState} from 'react';
import ProfileProjectItem from './ProfileProjectItem';
import ProfileProjectsButton from './ProfileProjectsButton';

const ProfileProjectspaginationItems = ({currentItems, viewWords}) => {
    const [projects, setProjects] = useState(currentItems);

    

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
