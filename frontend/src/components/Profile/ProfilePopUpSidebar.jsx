import { Link, useParams } from 'react-router-dom';
import useOnClickOutside from '../../hooks/useOnClickOutside';

const ProfilePopUpSidebar = ({ viewWords }) => {
  const { lang, username } = useParams();
  return (
    <div className="profile-popup">
      <ul className="profile-popup-list">
        <li>
          <Link to={`${lang === undefined ? '/' : '/' + lang + '/'}profile/${username}`}>
            {username}
          </Link>
        </li>
        <li>
          <Link
            to={`${lang === undefined ? '/' : '/' + lang + '/'}profile/${username}/current-courses`}
          >
            {viewWords['tpl_profile_current-courses_title']}
          </Link>
        </li>
        <li>
          <Link
            to={`${
              lang === undefined ? '/' : '/' + lang + '/'
            }profile/${username}/completed-courses`}
          >
            {viewWords['tpl_profile_completed-courses_title']}
          </Link>
        </li>
        <li>
          <Link
            to={`${lang === undefined ? '/' : '/' + lang + '/'}profile/${username}/created-courses`}
          >
            {viewWords['tpl_profile_created-courses_title']}
          </Link>
        </li>
        <li>
          <Link to={`${lang === undefined ? '/' : '/' + lang + '/'}profile/${username}/projects`}>
            {viewWords['tpl_profile_project_title']}
          </Link>
        </li>
        <li>
          <Link to={`${lang === undefined ? '/' : '/' + lang + '/'}profile/${username}/user-tasks`}>
            {viewWords['tpl_profile_created-task_title']}
          </Link>
        </li>
        <li>
          <Link to={`${lang === undefined ? '/' : '/' + lang + '/'}profile/${username}/tasks`}>
            {viewWords['tpl_profile_task_title']}
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default ProfilePopUpSidebar;
