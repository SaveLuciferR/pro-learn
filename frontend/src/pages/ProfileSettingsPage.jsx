import { useState, useRef } from 'react';
import { Outlet } from 'react-router-dom';
import ProfilePopUpSidebar from '../components/Profile/ProfilePopUpSidebar';
import useOnClickOutside from '../hooks/useOnClickOutside';
import img from '../header_bg.png';
/* ICONS */
import { FiMenu } from 'react-icons/fi';

import ProfileSettingsSidebar from '../components/Profile/ProfileSettings/ProfileSettingsSidebar';

const ProfileSettingsPage = () => {
  const [isProfileSidebar, setIsProfileSidebar] = useState(false);
  const ref = useRef();

  useOnClickOutside(ref, () => {
    if (isProfileSidebar) {
      setIsProfileSidebar(false);
    }
  });

  return (
    <div className="profile-settings">
      <ProfileSettingsSidebar />
      {/*<div className="profile-container">*/}
      <div className="profile-section-main">
        <div className="profile-section-main-header">
          <div className="profile-section-main-header-background">
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
            {isProfileSidebar ? <ProfilePopUpSidebar isSettings={true} /> : <></>}
            <img src={img} alt="background-image" />
          </div>
        </div>
        <Outlet />
      </div>
    </div>
  );
};
export default ProfileSettingsPage;
