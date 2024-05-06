import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import axiosClient from '../../../axiosClient';
import SliderMain from '../../Slider/SliderMain';

const ProfileCreateCourse = ({viewWords}) => {
  const { lang, username } = useParams();
  const currentUser = useSelector((state) => state.mainLayout.user);
  const [createdCourses, setCreatedCourses] = useState([]);

  useEffect(() => {
    axiosClient
      .get(`${lang === undefined ? '/' : '/' + lang + '/'}@${username}/course-from-user`)
      .then(({ data }) => {
        setCreatedCourses(data.courses);
      });
  }, [lang, username]);

  // course-from-user
  return (
    <div className="created-course">
      <div className={"profile-completed-page-main"}>
      {createdCourses.length === 0 ? (
        <div className="profile-none">Нет созданных курсов :(</div>
      ) : (
        <SliderMain data={createdCourses} sliderType="createdCourses" countSlide={1} viewWords={viewWords}/>
      )}
      </div>
    </div>
  );
};

export default ProfileCreateCourse;
