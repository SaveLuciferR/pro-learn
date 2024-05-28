import { useState } from 'react';
import { Link } from 'react-router-dom';

const AdminSidebar = () => {
  const [activePage, setActivePage] = useState('main');
  return (
    <div className="profile-section-sidebar">
      <div className="profile-section-sidebar-tabs">
        <div className={`profile-section-sidebar-tab${activePage === 'main' ? ' active' : ''}`}>
          <Link
            to={'/admin-panel/'}
            className="profile-section-sidebar-tab-text"
            onClick={() => setActivePage('main')}
          >
            Главная
          </Link>
        </div>
        {/* <div className={`profile-section-sidebar-tab${activePage === 'blog' ? ' active' : ''}`}>
          <Link
            to={'blog'}
            className="profile-section-sidebar-tab-text"
            onClick={() => setActivePage('blog')}
          >
            Статьи
          </Link>
        </div> */}
        <div className={`profile-section-sidebar-tab${activePage === 'course' ? ' active' : ''}`}>
          <Link
            to={'courses'}
            className="profile-section-sidebar-tab-text"
            onClick={() => setActivePage('course')}
          >
            Курсы
          </Link>
        </div>
        {/* <div className={`profile-section-sidebar-tab${activePage === 'category' ? ' active' : ''}`}>
          <Link
            className="profile-section-sidebar-tab-text"
            onClick={() => setActivePage('category')}
          >
            Категории
          </Link>
        </div> */}
        <div className={`profile-section-sidebar-tab${activePage === 'task' ? ' active' : ''}`}>
          <Link
            to={'tasks'}
            className="profile-section-sidebar-tab-text"
            onClick={() => setActivePage('task')}
          >
            Задачи
          </Link>
        </div>
        <div className={`profile-section-sidebar-tab${activePage === 'project' ? ' active' : ''}`}>
          <Link
            to={'projects'}
            className="profile-section-sidebar-tab-text"
            onClick={() => setActivePage('project')}
          >
            Проекты
          </Link>
        </div>
        <div className={`profile-section-sidebar-tab${activePage === 'user' ? ' active' : ''}`}>
          <Link
            to={'users'}
            className="profile-section-sidebar-tab-text"
            onClick={() => setActivePage('user')}
          >
            Пользователи
          </Link>
        </div>
        <div className={`profile-section-sidebar-tab${activePage === 'feedback' ? ' active' : ''}`}>
          <Link
            to={'feedback'}
            className="profile-section-sidebar-tab-text"
            onClick={() => setActivePage('feedback')}
          >
            Обратная связь
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;
