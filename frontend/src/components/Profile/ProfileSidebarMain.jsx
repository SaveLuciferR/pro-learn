const ProfileSidebarMain = () => {
  return (
    <div className="profile-section-sidebar">
      <div className="profile-section-sidebar-tabs">
      <div className="profile-section-sidebar-tab">
        <p className="profile-section-sidebar-nickname">
          <div className="profile-section-sidebar-tab-text">John Johnson</div>
        </p>
        <p className="profile-section-sidebar-name">Джон Джонсон</p>
      </div>
        <div className="profile-section-sidebar-tab">
          <div className="profile-section-sidebar-tab-text">Созданные курсы</div>
        </div>
        <div className="profile-section-sidebar-tab">
          <div className="profile-section-sidebar-tab-text">Созданные задачи</div>
        </div>
        <div className="profile-section-sidebar-tab">
          <div className="profile-section-sidebar-tab-text">Пройденные задачи</div>
        </div>
        <div className="profile-section-sidebar-tab">
          <div className="profile-section-sidebar-tab-text">Текущие задачи</div>
        </div>
        <div className="profile-section-sidebar-tab">
          <div className="profile-section-sidebar-tab-text">Создать вопрос</div>
        </div>
      </div>
    </div>
  );
}

export default ProfileSidebarMain;