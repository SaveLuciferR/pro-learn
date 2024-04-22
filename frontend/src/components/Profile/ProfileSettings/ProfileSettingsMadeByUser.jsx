import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

const ProfileSettingsMadeByUser = () => {
  const navigate = useNavigate();
  const { username } = useParams();
  const [currentTab, setCurrentTab] = useState('courses');

  const onClickCreate = () => {
    if (currentTab === 'courses') navigate(`/profile/${username}/course-creation`);
    else if (currentTab === 'tasks') navigate(`/profile/${username}/task-creation`);
    else navigate(`/profile/${username}/project-creation`);
  };

  return (
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
        <h1>_Создано мной</h1>
      </div>
      <div className="profile-settings-creations">
        <div className="profile-settings-creations-tabs">
          <div className="course-create-tabs">
            <span
              className={`course-create-tabs ${currentTab === 'courses' ? ' active' : ''}`}
              onClick={() => setCurrentTab('courses')}
            >
              Курсы
            </span>
            <span
              className={`course-create-tabs ${currentTab === 'tasks' ? ' active' : ''}`}
              onClick={() => setCurrentTab('tasks')}
            >
              Задачи
            </span>
            <span
              className={`course-create-tabs ${currentTab === 'projects' ? ' active' : ''}`}
              onClick={() => setCurrentTab('projects')}
            >
              Проекты
            </span>
          </div>
          <div className="profile-settings-creations-none">
            <p>
              // Пока Вы ничего не сделали в этом разделе, <span>начните сейчас!</span>
            </p>
            <button className="btn big primary" onClick={() => onClickCreate()}>
              Создать{' '}
              {currentTab === 'courses' ? 'курс' : currentTab === 'tasks' ? 'задачу' : 'проект'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettingsMadeByUser;
