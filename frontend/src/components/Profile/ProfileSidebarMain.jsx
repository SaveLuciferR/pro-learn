const ProfileSidebarMain = () => {
  return (
    <div className="profile-main-sidebar">
      <div className="profile-main-sidebar-tabs">
      <div className="profile-main-sidebar-tab">
        <p className="profile-main-sidebar-nickname">John Johnson</p>
        <p className="profile-main-sidebar-name">Джон Джонсон</p>
      </div>
        <div className="profile-main-sidebar-tab">
          Созданные курсы
        </div>

        <div className="profile-main-sidebar-tab">
          Созданные задачи
        </div>

        <div className="profile-main-sidebar-tab">
          Пройденные задачи
        </div>

        <div className="profile-main-sidebar-tab">
          Текущие задачи
        </div>

        <div className="profile-main-sidebar-tab">
          Создать вопрос
        </div>
      </div>
    </div>
  );
}

export default ProfileSidebarMain;