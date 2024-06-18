import { useEffect, useState, useRef } from 'react';
import { Outlet, useOutletContext, useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axiosClient from '../axiosClient';
import ProfileSidebarMain from '../components/Profile/ProfileSidebarMain';
import img from '../header_bg.png';
import ProfilePopUpSidebar from '../components/Profile/ProfilePopUpSidebar';
import useOnClickOutside from '../hooks/useOnClickOutside';
import defaultBackground from '../Background.svg';
import LoadImage from '../components/Component/LoadImage';
/* ICONS */
import { FiMenu } from 'react-icons/fi';
import { IoSettingsOutline } from 'react-icons/io5';

const ProfilePage = ({ isActiveSidebar, isCompiler }) => {
  const navigate = useNavigate();
  const { activeSidebar, activeCompiler } = useOutletContext();

  activeSidebar[0](isActiveSidebar);
  activeCompiler[0](isCompiler);

  const currentUser = useSelector((state) => state.mainLayout.user);

  const { lang, username } = useParams();
  const [isProfileSidebar, setIsProfileSidebar] = useState(false);
  const [profileData, setProfileData] = useState([]);
  const [viewWords, setViewWords] = useState({});

  const ref = useRef(null);

  useEffect(() => {
    axiosClient
      .get(`${lang === undefined ? '/' : '/' + lang + '/'}@${username}`)
      .then(({ data }) => {
        setProfileData(data.profileInfo);
        setViewWords(data.viewWords);
        console.log(profileData);
      });
  }, [lang, username]);

  useOnClickOutside(ref, () => {
    if (isProfileSidebar) {
      setIsProfileSidebar(false);
    }
  });

  return (
    <div className="profile-section">
      <ProfileSidebarMain data={profileData} viewWords={viewWords} />
      {/*<div className="profile-container">*/}
      <div className="profile-section-main">
        <div className="profile-section-main-header">
          <div className="profile-section-main-header-background">
            <div className="profile-section-main-header-buttons">
              <button
                onClick={() => navigate(`../profile/${username}/settings/general`)}
                style={currentUser.username !== username ? { display: 'none' } : {}}
              >
                <IoSettingsOutline
                  color="#ffffff"
                  size={20}
                  title="Settings"
                  className="profile-section-main-header-button"
                />
              </button>
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
            {isProfileSidebar ? <ProfilePopUpSidebar viewWords={viewWords} /> : <></>}
            <LoadImage
              imageurl={profileData.heading_img}
              defaultImage={defaultBackground}
              altDefault={'default-background'}
            />
          </div>
        </div>
        <Outlet />
      </div>
      {/*</div>*/}
    </div>
  );
};

export default ProfilePage;
