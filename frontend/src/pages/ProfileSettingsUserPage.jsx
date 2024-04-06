import { useParams } from 'react-router-dom';
import ProfileSettingsUserMain from '../components/Profile/ProfileSettings/ProfileSettingsUserMain';
import ProfileSettingsSidebar from '../components/Profile/ProfileSettings/ProfileSettingsSidebar';
import { useEffect, useState } from 'react';
import axiosClient from '../axiosClient';

const ProfileSettingsUserPage = () => {
  const { lang, username } = useParams();
  const [userSettings, setUserSettings] = useState([]);

  useEffect(() => {
    axiosClient
      .get(`${lang === undefined ? '/' : '/' + lang + '/'}@${username}`)
      .then(({ data }) => {
        setUserSettings(data.profileInfo);
      });
  }, [lang, username]);

  console.log(userSettings);

  return (
    <div className="profile-settings">
      <ProfileSettingsSidebar />
      <ProfileSettingsUserMain data={userSettings} />
    </div>
  );
};
export default ProfileSettingsUserPage;
