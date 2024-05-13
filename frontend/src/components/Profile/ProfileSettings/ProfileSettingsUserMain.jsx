import { Link, useParams } from 'react-router-dom';
import img from '../../../avatar.png';
import { useEffect, useState, useRef } from 'react';
import axiosClient from '../../../axiosClient';

import ProfilePopUpSidebar from '../ProfilePopUpSidebar';
import useOnClickOutside from '../../../hooks/useOnClickOutside';

/* ICONS */
import { FiMenu } from 'react-icons/fi';
import {FaFileImage, FaImage} from "react-icons/fa";

const ProfileSettingsUserMain = ({data, viewWords}) => {
    const [nickname, setNickname] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [infoAbout, setInfoAbout] = useState('');
    const [country, setCountry] = useState('');
    const [avaUrl, setAvaUrl] = useState('');
    const [headUrl, setHeadUrl] = useState('');

    const [ava, setAva] = useState(null);
    const [head, setHead] = useState(null);

  const [isProfileSidebar, setIsProfileSidebar] = useState(false);


  useEffect(() => {
        // console.log(data);
        setNickname(data.username);
        setLastName(data.last_name);
        setFirstName(data.first_name);
        setInfoAbout(data.about_user);
        setCountry(data.country_address);
        setAvaUrl(data.avatar_img);
        setHeadUrl(data.heading_img);
    }, []);

    useEffect(() => {
        // console.log(ava)
        if (ava !== null) {
            axiosClient.post(`/@${username}/settings/general/upload-avatar`,
                {
                    img: ava
                },
                {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                })
                .then((res) => {
                    setAvaUrl(res.data.url);
                })
                .catch((err) => {
                    console.log(err);
                })
        }
    }, [ava]);

    useEffect(() => {
        console.log(head)
        if (head !== null) {
            axiosClient.post(`/@${username}/settings/general/upload-avatar`,
                {
                    img: head
                },
                {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                })
                .then((res) => {
                    setHeadUrl(res.data.url);
                })
                .catch((err) => {
                    console.log(err);
                })
        }
    }, [head]);

    const onClickSaveMainProfileSettings = () => {
        axiosClient
            .post(`/@${username}/settings/general`, {
                username: nickname,
                avatar_img: avaUrl,
                heading_img: headUrl,
                about_user: infoAbout,
                last_name: lastName,
                first_name: firstName,
                country_address: country,
            })
            .then((data) => {
                console.log(data);
            })
            .catch(({response}) => {
                console.log(response);
            });
    };

    const {username} = useParams();
    return (
        <div className="profile-settings-main">
            <label className="profile-settings-main-header input-file btn">
                {/*<div className={"profile-settings-main-header-container"}>*/}
                    <img src={headUrl} alt={'header'}/>
                {/*</div>*/}
                <input
                    type={"file"}
                    onChange={(e) => setHead(e.target.files[0])}
                    accept={"image/*"}
                    name="newHeading"
                    multiple={false}/>
                <svg
                    width="37"
                    height="37"
                    viewBox="0 0 37 37"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M21.4979 0V15.7724H37V21.3462H21.4979V37H15.3049V21.3462H0V15.7724H15.3049V0H21.4979Z"
                        fill="white"
                        fillOpacity="0.5"
                    />
                </svg>
                <div className="profile-settings-main-header-load">
                    <FaFileImage/>
                    <span className={"btn file"}>{viewWords['tpl_profile-settings_general-upload-heading']}</span>
                </div>
                <p className="profile-settings-main-header-text">{viewWords['tpl_profile-settings_general-upload-heading-rec']}</p>
            </label>
            <div className="profile-settings-main-line"></div>
            <div className="created-courses-header">
                <div className="lessons-header-back">
                    <svg
                        width="21"
                        height="21"
                        viewBox="0 0 21 21"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M13.125 4.375L7.875 10.5L13.125 16.625"
                            stroke="white"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                    <Link to={`../profile/${username}`}>{viewWords['tpl_profile_back-profile']}</Link>
                </div>
                <h1>_{viewWords['tpl_profile-settings_general-title']}</h1>
            </div>
            <div className="profile-settings-main-main">
                <div className="profile-settings-main-main-avatar">
                    <div className={"profile-settings-main-main-avatar-container"}>
                        <img src={avaUrl} alt="avatar"/>
                    </div>
                    <label className="btn profile-settings-main-header-load input-file">
                        <FaFileImage size={21}/>
                        <input
                            type={"file"}
                            onChange={(e) => setAva(e.target.files[0])}
                            accept={"image/*"}
                            name="newAvatar"
                            multiple={false}/>
                        <span className={"btn file"}>{viewWords['tpl_profile-settings_general-upload-avatar']}</span>
                    </label>
                </div>
                <div className="profile-settings-main-main-name">
                    <div className="profile-settings-main-main-name_item">
                        <div className="profile-settings-main-main-nick">
                            <p className="profile-settings-main-main-title-part">_{viewWords['tpl_profile-settings_general-nickname-title']}</p>
                            <p className="profile-settings-main-main-nick-desc">{viewWords['tpl_profile-settings_general-nickname-desc']}</p>
                        </div>
                        <input
                            type="text"
                            className="input width100"
                            name="nickname"
                            value={nickname}
                            onChange={(e) => setNickname(e.target.value)}
                        />
                    </div>
                    <div className="profile-settings-main-main-name_item">
                        <p className="profile-settings-main-main-title-part">_{viewWords['tpl_profile-settings_general-fname-title']}</p>
                        <input
                            type="text"
                            className="input width100"
                            name="name"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </div>
                    <div className="profile-settings-main-main-name_item">
                        <p className="profile-settings-main-main-title-part">_{viewWords['tpl_profile-settings_general-sname-title']}</p>
                        <input
                            type="text"
                            className="input width100"
                            name="surname"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </div>
                </div>
                <div className="profile-settings-main-main-bio">
                    <p className="profile-settings-main-main-title-part">_{viewWords['tpl_profile-settings_general-about-me-title']}</p>
                    <textarea
                        className="input textarea"
                        value={infoAbout}
                        onChange={(e) => setInfoAbout(e.target.value)}
                    />
                </div>
                <div className="profile-settings-main-main-country">
                    <p className="profile-settings-main-main-title-part">_{viewWords['tpl_profile-settings_general-country-title']}</p>
                    <div className="profile-settings-main-main-bottom">
                        <input
                            type="search"
                            className="input w531"
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                        />
                        <button
                            onClick={() => onClickSaveMainProfileSettings()}
                            className="btn big secondary-blue"
                        >
                            {viewWords['tpl_profile-settings_general-save']}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default ProfileSettingsUserMain;
