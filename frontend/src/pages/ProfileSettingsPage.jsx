import img from '../header_bg.png';
import { Outlet, useParams } from 'react-router-dom';
import { useState, useRef } from 'react';
import ProfilePopUpSidebar from '../components/Profile/ProfilePopUpSidebar';
import useOnClickOutside from '../hooks/useOnClickOutside';
import ProfileSettingsSidebar from '../components/Profile/ProfileSettings/ProfileSettingsSidebar';
import axiosClient from '../axiosClient';
/* ICONS */
import { FiMenu } from 'react-icons/fi';

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
            {isProfileSidebar ? <ProfilePopUpSidebar type={'settings'} /> : <></>}
            <img src={img} alt="background-image" />
          </div>
        </div>
        <Outlet />
      </div>
    </div>
  );
};
export default ProfileSettingsPage;
