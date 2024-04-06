import { Link, useParams } from 'react-router-dom';

const ProfileSidebarMain = () => {
  const { username } = useParams();

  return (
    <div className="profile-section-sidebar">
      <div className="profile-section-sidebar-tabs">
        <div className="profile-section-sidebar-tab">
          <p className="profile-section-sidebar-nickname">
            <Link to={`/profile/${username}`} className="profile-section-sidebar-tab-text">
              John Johnson
            </Link>
          </p>
          <p className="profile-section-sidebar-name">Джон Джонсон</p>
        </div>
        <div className="profile-section-sidebar-tab">
          <Link to="current-courses" className="profile-section-sidebar-tab-text">
            Текущие курсы
          </Link>
        </div>
        <div className="profile-section-sidebar-tab">
          <Link to="completed-courses" className="profile-section-sidebar-tab-text">
            Пройденные курсы
          </Link>
        </div>
        <div className="profile-section-sidebar-tab">
          <Link to="created-courses" className="profile-section-sidebar-tab-text">
            Созданные курсы
          </Link>
        </div>
        <div className="profile-section-sidebar-tab">
          <Link to="projects" className="profile-section-sidebar-tab-text">
            Проекты
          </Link>
        </div>
        <div className="profile-section-sidebar-tab">
          <Link to="user-tasks" className="profile-section-sidebar-tab-text">
            Созданные задачи
          </Link>
        </div>
        <div className="profile-section-sidebar-tab">
          <Link to="tasks" className="profile-section-sidebar-tab-text">
            Задачи
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProfileSidebarMain;
