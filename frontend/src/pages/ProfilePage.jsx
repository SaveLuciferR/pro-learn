import ProfileSidebarMain from "../components/Profile/ProfileSidebarMain";
import ProfileMain from "../components/Profile/ProfileMain";
import {useOutletContext} from "react-router-dom";

const ProfilePage = ({isActiveSidebar, isCompiler}) => {

    const {activeSidebar, activeCompiler} = useOutletContext();
    activeSidebar[0](isActiveSidebar);
    activeCompiler[0](isCompiler);

  return(
    <div className="profile-section">
      <ProfileSidebarMain />
        {/*<div className="profile-container">*/}
          <ProfileMain/>
        {/*</div>*/}
    </div>
  );
}

export default ProfilePage;