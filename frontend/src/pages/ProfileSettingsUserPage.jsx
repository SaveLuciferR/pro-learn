import {useParams} from 'react-router-dom';
import ProfileSettingsUserMain from '../components/Profile/ProfileSettings/ProfileSettingsUserMain';
import ProfileSettingsSidebar from '../components/Profile/ProfileSettings/ProfileSettingsSidebar';
import {useEffect, useState} from 'react';
import axiosClient from '../axiosClient';

const ProfileSettingsUserPage = () => {
    const {lang, username} = useParams();
    const [userSettings, setUserSettings] = useState([]);
    const [canBeRender, setCanBeRender] = useState(false);
    const [viewWords, setViewWords] = useState({});

    useEffect(() => {
        axiosClient
            .get(`${lang === undefined ? '/' : '/' + lang + '/'}@${username}/settings/general`)
            .then(({data}) => {
                console.log(data);
                setUserSettings(data.profile_general);
                setViewWords(data.viewWords);
                setCanBeRender(true);
            })
            .catch(({response}) => {
                console.log(response);
            });
    }, [lang, username]);

    return (
        <div className="profile-settings">
            <ProfileSettingsSidebar/>
            {canBeRender ? <ProfileSettingsUserMain viewWords={viewWords} data={userSettings}/> : <div>Loading...</div>}

        </div>
    );
};
export default ProfileSettingsUserPage;
