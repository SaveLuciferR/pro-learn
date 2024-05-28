import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { mainLayout } from '../../redux/MainLayout/slice';

const ProfilePopUpSidebar = ({ viewWords, type }) => {
  const { lang, username } = useParams();
  return (
    <div className="profile-popup">
      <ul className="profile-popup-list">
        {type === undefined ? (
          <>
            <li>
              <Link to={`${lang === undefined ? '/' : '/' + lang + '/'}profile/${username}`}>
                {username}
              </Link>
            </li>
            <li>
              <Link
                to={`${
                  lang === undefined ? '/' : '/' + lang + '/'
                }profile/${username}/current-courses`}
              >
                {viewWords === undefined
                  ? 'Текущие курсы'
                  : viewWords['tpl_profile_current-courses_title']}
              </Link>
            </li>
            <li>
              <Link
                to={`${
                  lang === undefined ? '/' : '/' + lang + '/'
                }profile/${username}/completed-courses`}
              >
                {viewWords === undefined
                  ? 'Пройденные курсы'
                  : viewWords['tpl_profile_completed-courses_title']}
              </Link>
            </li>
            <li>
              <Link
                to={`${
                  lang === undefined ? '/' : '/' + lang + '/'
                }profile/${username}/created-courses`}
              >
                {viewWords === undefined
                  ? 'Созданные курсы'
                  : viewWords['tpl_profile_created-courses_title']}
              </Link>
            </li>
            <li>
              <Link
                to={`${lang === undefined ? '/' : '/' + lang + '/'}profile/${username}/projects`}
              >
                {viewWords === undefined ? 'Проекты' : viewWords['tpl_profile_project_title']}
              </Link>
            </li>
            <li>
              <Link
                to={`${lang === undefined ? '/' : '/' + lang + '/'}profile/${username}/user-tasks`}
              >
                {viewWords === undefined
                  ? 'Созданные задачи'
                  : viewWords['tpl_profile_created-task_title']}
              </Link>
            </li>
            <li>
              <Link to={`${lang === undefined ? '/' : '/' + lang + '/'}profile/${username}/tasks`}>
                {viewWords === undefined ? 'Задачи' : viewWords['tpl_profile_task_title']}
              </Link>
            </li>
          </>
        ) : type === 'settings' ? (
          <>
            <li>
              <Link to={`../../profile/${username}/settings/general`}>Настройки профиля</Link>
            </li>
            <li>
              <Link to={`../../profile/${username}/settings/sessions`}>Текущие сесии</Link>
            </li>
            <li>
              <Link to={`../../profile/${username}/settings/security`}>Безопасность</Link>
            </li>
            <li>
              <Link to={`../../profile/${username}/settings/privacy`}>Приватность</Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to={'/admin-panel/'}>Главная</Link>
            </li>
            <li>
              <Link to={'/admin-panel/courses'}>Курсы</Link>
            </li>
            <li>
              <Link to={'/admin-panel/tasks'}>Задачи</Link>
            </li>
            <li>
              <Link to={'/admin-panel/projects'}>Проекты</Link>
            </li>
            <li>
              <Link to={'/admin-panel/users'}>Пользователи</Link>
            </li>
            <li>
              <Link to={'/admin-panel/feedback'}>Обратная связь</Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default ProfilePopUpSidebar;
