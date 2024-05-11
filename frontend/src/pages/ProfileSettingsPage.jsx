import {Outlet, useParams} from 'react-router-dom';
import img from '../header_bg.png';

import ProfileSettingsSidebar from '../components/Profile/ProfileSettings/ProfileSettingsSidebar';
import {useEffect, useState} from "react";
import axiosClient from "../axiosClient";

const ProfileSettingsPage = () => {

    return (
        <div className="profile-settings">
            <ProfileSettingsSidebar/>
            {/*<div className="profile-container">*/}
            <div className="profile-section-main">
                <div className="profile-section-main-header">
                    <div className="profile-section-main-header-background">
                        <img src={img} alt="background-image"/>
                    </div>
                </div>
                <Outlet/>
            </div>
        </div>
    );
};
export default ProfileSettingsPage;
