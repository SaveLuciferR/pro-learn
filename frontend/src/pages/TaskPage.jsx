import { useEffect, useState } from 'react';
import { useOutletContext, useParams } from 'react-router-dom';
import axiosClient from '../axiosClient';
import TaskMainCard from '../components/Task/TaskMainCard';
/* ICONS */
import { FiFilter } from 'react-icons/fi';

const TaskPage = ({ isActiveSidebar, isCompiler }) => {
  const { activeSidebar, activeCompiler } = useOutletContext();
  activeSidebar[0](isActiveSidebar);
  activeCompiler[0](isCompiler);

  const { lang } = useParams();

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axiosClient.get(`${lang === undefined ? '/' : '/' + lang + '/'}task`).then((res) => {
      console.log(res);
    });
  }, [lang]);

  return (
    <div className="courses">
      <div className="courses-header">
        <p className="courses-header-title">_Задачи</p>
        <p className="courses-header-desc">
          // Цель этого раздела - предоставить как можно более грамотную и структурированную
          информацию для обучения языков программирования и смежным технологиям.
        </p>
      </div>
      <div className="courses-all">
        <div className="courses-all-title">
          <button className="courses-all-filter">
            Фильтр
            <FiFilter color="#ffffff" size={24} />
          </button>
        </div>
        <div className="courses-all-main">
          <TaskMainCard />
          <TaskMainCard />
          <TaskMainCard />
          <TaskMainCard />
          <TaskMainCard />
        </div>
        <div className="courses-all-bottom">
          <p className="courses-all-bottom-showed">Показано 10 из 10 записей</p>
          <button className="courses-all-bottom-load">Загрузить еще</button>
          <div className="courses-slider">(слайдер)</div>
        </div>
      </div>
    </div>
  );
};
export default TaskPage;
