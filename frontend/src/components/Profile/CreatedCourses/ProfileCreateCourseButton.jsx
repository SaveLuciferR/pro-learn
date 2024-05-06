import { useParams, useNavigate } from 'react-router-dom';

const ProfileCreateCourseButton = ({ type, viewWords }) => {
  const navigate = useNavigate();
  const { lang, username } = useParams();
  return (
    <>
      {type === 'course' ? (
        <button
          onClick={() => {
            navigate(
              `${lang === undefined ? '/' : '/' + lang + '/'}profile/${username}/course-creation`,
            );
          }}
          className="created-button"
        >
          <div className="created-button-content">
            <svg
              className="created-button-img"
              width="97"
              height="97"
              viewBox="0 0 97 97"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M56.3593 0V41.3494H97V55.9615H56.3593V97H40.1237V55.9615H0V41.3494H40.1237V0H56.3593Z"
                fill="white"
                fillOpacity="0.6"
              />
            </svg>
            <p className="created-button-text">Создать курс</p>
          </div>
        </button>
      ) : (
        <div className="created-button">
          <div className="created-button-content">
            <svg
              className="created-button-img"
              width="97"
              height="97"
              viewBox="0 0 97 97"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M56.3593 0V41.3494H97V55.9615H56.3593V97H40.1237V55.9615H0V41.3494H40.1237V0H56.3593Z"
                fill="white"
                fillOpacity="0.6"
              />
            </svg>
            <p className="created-button-text">Создать задачу</p>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfileCreateCourseButton;
