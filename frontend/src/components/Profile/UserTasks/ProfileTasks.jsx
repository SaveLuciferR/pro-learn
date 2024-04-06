import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axiosClient from '../../../axiosClient';
import SliderMain from '../../Slider/SliderMain';

const ProfileTasks = () => {
  const { lang, username } = useParams();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axiosClient
      .get(`${lang === undefined ? '/' : '/' + lang + '/'}@${username}/task-list`)
      .then(({ data }) => {
        setTasks(data.tasks);
      });
  }, [lang, username]);

  return (
    <div className="profile-tasks">
      <SliderMain data={tasks} sliderType="profileTasks" countSlide={2} />
    </div>
  );
};

export default ProfileTasks;
