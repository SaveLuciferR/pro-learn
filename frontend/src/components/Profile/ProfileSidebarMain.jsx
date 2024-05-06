import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axiosClient from '../../axiosClient';

const ProfileSidebarMain = () => {
  const { username, lang } = useParams();
  const [data, setData] = useState([]);
  const [viewWords, setViewWords] = useState({});

  useEffect(() => {
    axiosClient
      .get(`${lang === undefined ? '/' : '/' + lang + '/'}@${username}`)
      .then(({ data }) => {
        setData(data.profileInfo);
        setViewWords(data.viewWords);
      });
  }, [lang, username]);

  return (
    <div className="profile-section-sidebar">
      <div className="profile-section-sidebar-tabs">
        <div className="profile-section-sidebar-tab">
          <p className="profile-section-sidebar-nickname">
            <Link
              to={`${lang === undefined ? '/' : '/' + lang + '/'}profile/${username}`}
              className="profile-section-sidebar-tab-text"
            >
              {data.username}
            </Link>
          </p>
          <p className="profile-section-sidebar-name">
            {data.first_name} {data.last_name}
          </p>
        </div>
        <div className="profile-section-sidebar-tab">
          <Link
            to={`${lang === undefined ? '/' : '/' + lang + '/'}profile/${username}/current-courses`}
            className="profile-section-sidebar-tab-text"
          >
            {viewWords['tpl_profile_current-courses_title']}
          </Link>
        </div>
        <div className="profile-section-sidebar-tab">
          <Link
            to={`${
              lang === undefined ? '/' : '/' + lang + '/'
            }profile/${username}/completed-courses`}
            className="profile-section-sidebar-tab-text"
          >
            {viewWords['tpl_profile_completed-courses_title']}
          </Link>
        </div>
        <div className="profile-section-sidebar-tab">
          <Link
            to={`${lang === undefined ? '/' : '/' + lang + '/'}profile/${username}/created-courses`}
            className="profile-section-sidebar-tab-text"
          >
            {viewWords['tpl_profile_created-courses_title']}
          </Link>
        </div>
        <div className="profile-section-sidebar-tab">
          <Link
            to={`${lang === undefined ? '/' : '/' + lang + '/'}profile/${username}/projects`}
            className="profile-section-sidebar-tab-text"
          >
            {viewWords['tpl_profile_project_title']}
          </Link>
        </div>
        <div className="profile-section-sidebar-tab">
          <Link
            to={`${lang === undefined ? '/' : '/' + lang + '/'}profile/${username}/user-tasks`}
            className="profile-section-sidebar-tab-text"
          >
            {viewWords['tpl_profile_created-task_title']}
          </Link>
        </div>
        <div className="profile-section-sidebar-tab">
          <Link
            to={`${lang === undefined ? '/' : '/' + lang + '/'}profile/${username}/tasks`}
            className="profile-section-sidebar-tab-text"
          >
            {viewWords['tpl_profile_task_title']}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProfileSidebarMain;
