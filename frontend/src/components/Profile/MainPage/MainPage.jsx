import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosClient from '../../../axiosClient';
import CompleteCourseMain from './CompleteCourseMain';
import CurrentCourseMain from './CurrentCourseMain';
import ProfileInfo from './ProfileInfo';
import ProfileProjects from './ProfileProjects';
import LoadingElement from '../../LoadingElement';

const ProfileMainPage = () => {
  const { lang, username } = useParams();
  const [userData, setUserData] = useState([]);
  const [completedCourse, setCompletedCourse] = useState([]);

  useEffect(() => {
    axiosClient
      .get(`${lang === undefined ? '/' : '/' + lang + '/'}@${username}`)
      .then(({ data }) => {
        setUserData(data.profileInfo);
      });

    axiosClient
      .get(`${lang === undefined ? '/' : '/' + lang + '/'}@${username}`)
      .then(({ data }) => {
        setCompletedCourse(data);
      });
  }, [lang, username]);

  console.log(userData);
  console.log(username);

  return (
    <>
      {Object.keys(userData).length === 0 ? (
        <LoadingElement />
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
