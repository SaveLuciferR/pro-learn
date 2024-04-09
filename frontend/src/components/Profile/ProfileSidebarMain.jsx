import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProfileSidebarMain = () => {
  const { username } = useParams();
  const currentUser = useSelector((state) => state.mainLayout.user);

  return (
    <div className="profile-section-sidebar">
      <div className="profile-section-sidebar-tabs">
        <div className="profile-section-sidebar-tab">
          <p className="profile-section-sidebar-nickname">
            <Link to={`/profile/${username}`} className="profile-section-sidebar-tab-text">
              {currentUser.username}
            </Link>
          </p>
          <p className="profile-section-sidebar-name">
            {currentUser.first_name} {currentUser.last_name}
          </p>
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
