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
  const [listCourse, setListCourse] = useState([]);
  let currentCourse = [];
  let completeCourse = [];

  const addCurrentCourse = (item) => {
    console.log(item);
    currentCourse.push(item);
    console.log(currentCourse);
  };
  const addCompleteCourse = ({ item }) => {
    completeCourse.push(item);
  };

  useEffect(() => {
    axiosClient
      .get(`${lang === undefined ? '/' : '/' + lang + '/'}@${username}`)
      .then(({ data }) => {
        setUserData(data.profileInfo);
      });

    axiosClient
      .get(`${lang === undefined ? '/' : '/' + lang + '/'}@${username}/course-list`)
      .then(({ data }) => {
        setListCourse(data.courses);
      });
  }, [lang, username]);

  useEffect(() => {
    Object.keys(listCourse).map((i) => {
      console.log(listCourse[i]);
      return listCourse[i].success === '0'
        ? addCurrentCourse(listCourse[i])
        : addCompleteCourse(listCourse[i]);
    });
  }, [listCourse]);
  return (
    <>
      {Object.keys(userData).length === 0 ? (
        <LoadingElement />
      ) : (
        <div className="profile-section-main-cards">
          <ProfileInfo data={userData} />
          <CurrentCourseMain data={currentCourse} />
          <ProfileProjects data={userData} />
          <CompleteCourseMain data={completeCourse} />
        </div>
      )}
    </>
  );
};

export default ProfileMainPage;
