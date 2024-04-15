import { useNavigate, useParams } from 'react-router-dom';
const ProfileProjectsButton = () => {
  const { lang, username } = useParams();
  const navigate = useNavigate();
  return (
    <button
      className="profile-projects-card-button"
      onClick={() =>
        navigate(`${lang === undefined ? '/' : '/' + lang + '/'}profile/${username}/project/add`)
      }
    >
      <div className="profile-projects-card-button-items">
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M18.5928 0V13.641H32V18.4615H18.5928V32H13.2367V18.4615H0V13.641H13.2367V0H18.5928Z"
            fill="white"
            fillOpacity="0.6"
          />
        </svg>
        <p className="profile-question-ask-text-title">Создать проект</p>
      </div>
    </button>
  );
};
export default ProfileProjectsButton;
