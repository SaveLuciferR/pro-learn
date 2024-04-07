import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosClient from '../../../axiosClient';
import CompleteCourseMain from './CompleteCourseMain';
import CurrentCourseMain from './CurrentCourseMain';
import ProfileInfo from './ProfileInfo';
import ProfileProjects from './ProfileProjects';

const ProfileMainPage = () => {
  const { lang, username } = useParams();
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    axiosClient
      .get(`${lang === undefined ? '/' : '/' + lang + '/'}@${username}`)
      .then(({ data }) => {
        setUserData(data.profileInfo);
      });
  }, [lang, username]);

  console.log(userData);
  console.log(username);

  return (
    <>
      {Object.keys(userData).length === 0 ? (
        <div>Loading..."</div>
      ) : (
        <div className="profile-section-main-cards">
          <ProfileInfo data={userData} />
          <CurrentCourseMain data={userData} />
          <ProfileProjects data={userData} />
          <CompleteCourseMain data={userData} />
        </div>
      )}
    </>
  );
};

export default ProfileMainPage;
