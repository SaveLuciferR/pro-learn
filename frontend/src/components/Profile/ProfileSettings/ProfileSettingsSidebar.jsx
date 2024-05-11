import {Link, useParams} from 'react-router-dom';
import {useEffect, useState} from "react";
import axiosClient from "../../../axiosClient";

const ProfileSettingsSidebar = () => {
    const {lang, username} = useParams();
    const [viewWords, setViewWords] = useState({});

    useEffect(() => {
        axiosClient
            .get(`${lang === undefined ? '/' : '/' + lang + '/'}@${username}/settings/general`)
            .then(({data}) => {
                console.log(data);
                setViewWords(data.viewWords);
            })
            .catch(({response}) => {
                console.log(response);
            });
    }, [lang, username]);

    return (
        <div className="profile-section-sidebar">
            <div className="profile-section-sidebar-tabs">
                <div className="profile-section-sidebar-tab">
                    <Link
                        to={`../profile/${username}/settings/general`}
                        className="profile-section-sidebar-tab-text"
                    >
                        {viewWords['tpl_profile-settings_sidebar_general']}
                    </Link>
                </div>
                {/*<div className="profile-section-sidebar-tab">*/}
                {/*    <Link*/}
                {/*        to={`../profile/${username}/settings/sessions`}*/}
                {/*        className="profile-section-sidebar-tab-text"*/}
                {/*    >*/}
                {/*        {viewWords['tpl_profile-settings_sidebar_session']}*/}
                {/*    </Link>*/}
                {/*</div>*/}
                <div className="profile-section-sidebar-tab">
                    <Link
                        to={`../profile/${username}/settings/security`}
                        className="profile-section-sidebar-tab-text"
                    >
                        {viewWords['tpl_profile-settings_sidebar_security']}
                    </Link>
                </div>
                <div className="profile-section-sidebar-tab">
                    <Link
                        to={`../profile/${username}/settings/privacy`}
                        className="profile-section-sidebar-tab-text"
                    >
                        {viewWords['tpl_profile-settings_sidebar_privacy']}
                    </Link>
                </div>
            </div>
        </div>
    );
};
export default ProfileSettingsSidebar;
