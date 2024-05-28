import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from '../components/Admin/AdminSidebar';
import ProfilePopUpSidebar from '../components/Profile/ProfilePopUpSidebar';
/* ICONS */
import { FiMenu } from 'react-icons/fi';

const AdminPage = () => {
  const [isProfileSidebar, setIsProfileSidebar] = useState(false);

  return (
    <div className="admin">
      <AdminSidebar />
      <div className="admin-main">
        <div className="profile-section-main-header-buttons">
          <button
            onClick={() => setIsProfileSidebar(!isProfileSidebar)}
            className="profile-section-main-header-button-menu"
          >
            <FiMenu
              color="#ffffff"
              size={20}
              title="Menu"
              className="profile-section-main-header-button"
            />
          </button>
        </div>
        {isProfileSidebar ? <ProfilePopUpSidebar type={'admin'} /> : <></>}
        <Outlet />
      </div>
    </div>
  );
};

export default AdminPage;
