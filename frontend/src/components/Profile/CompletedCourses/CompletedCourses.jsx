import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileCompletedCoursesItem from './CompletedCoursesItem';
import { useEffect, useState } from 'react';
import axiosClient from '../../../axiosClient';
import SliderMain from '../../Slider/SliderMain';
import LoadingElement from '../../LoadingElement';

const ProfileCompletedCourses = () => {
  const { lang, username } = useParams();
  const [completedCourses, setCompletedCourses] = useState([]);
  let completedCoursesMassive = [];

  useEffect(() => {
    axiosClient
      .get(`${lang === undefined ? '/' : '/' + lang + '/'}@${username}/course-list`)
      .then(({ data }) => {
        setCompletedCourses(data.courses);
      });
  }, [lang, username]);

  useEffect(() => {
    Object.keys(completedCourses).map((i) => {
      return completedCourses[i].success === '1'
        ? completedCoursesMassive.push(completedCourses[i])
        : console.log();
    });
  }, [completedCourses]);

  return (
    <>
      {Object.keys(completedCourses).length === 0 ? (
        <LoadingElement />
      ) : (
        <div>
          <div className="created-courses-header">
            <div className="lessons-header-back">
              <svg
                width="21"
                height="21"
                viewBox="0 0 21 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13.125 4.375L7.875 10.5L13.125 16.625"
                  stroke="white"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <Link to={`../../profile/${username}`}>Профиль</Link>
            </div>
            <h1>_Пройденные курсы</h1>
          </div>
          <div className="profile-projects-page">
            <div className="profile-completed-page-main">
              {completedCoursesMassive.length === 0 ? (
                <div className="profile-none">Нет завершенных курсов :(</div>
              ) : (
                <SliderMain
                  data={completedCoursesMassive}
                  sliderType="profileCompletedCourses"
                  countSlide={2}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfileCompletedCourses;
