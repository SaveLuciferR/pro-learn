import { Link, useNavigate, useParams } from 'react-router-dom';

const ProfileProjectsContent = ({ data, viewWords }) => {
  const { lang, username } = useParams();
  const navigate = useNavigate();

  return (
    <div className="profile-projects-content">
      <div className="profile-projects-info">
        <div className="profile-projects-info-text">
          <Link
            to={`${lang === undefined ? '/' : '/' + lang + '/'}profile/${username}/project/${
              data.slug
            }`}
            className="profile-projects-info-text-name clamp"
          >
            _{data.title}
          </Link>
          <p className="profile-projects-info-text-access">
            {data.private === '0' ? viewWords['tpl_profile_project-card_public'] : viewWords['tpl_profile_project-card_private']}
          </p>
        </div>
        <svg
            onClick={() => navigate(`../../profile/${username}/project-edit/${data.slug}`)}
          className="info-about-name-edit"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_72_17902)">
            <path
              d="M9.57207 2.7191L10.19 2.10118C11.2138 1.07738 12.8737 1.07738 13.8975 2.10118C14.9213 3.12498 14.9213 4.7849 13.8975 5.8087L13.2796 6.42662M9.57207 2.7191C9.57207 2.7191 9.64931 4.03218 10.8079 5.19078C11.9665 6.34938 13.2796 6.42662 13.2796 6.42662M9.57207 2.7191L3.89125 8.39993C3.50647 8.7847 3.31408 8.97709 3.14863 9.18922C2.95345 9.43945 2.78612 9.7102 2.64959 9.99668C2.53385 10.2395 2.44782 10.4976 2.27574 11.0139L1.54657 13.2014M13.2796 6.42662L7.59877 12.1074C7.21399 12.4922 7.0216 12.6846 6.80947 12.8501C6.55924 13.0452 6.28849 13.2126 6.00202 13.3491C5.75916 13.4648 5.50105 13.5509 4.98482 13.723L2.79731 14.4521M2.79731 14.4521L2.26259 14.6304C2.00855 14.715 1.72847 14.6489 1.53912 14.4596C1.34977 14.2702 1.28365 13.9901 1.36833 13.7361L1.54657 13.2014M2.79731 14.4521L1.54657 13.2014"
              stroke="white"
            />
          </g>
          <defs>
            <clipPath id="clip0_72_17902">
              <rect width="16" height="16" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </div>
      <p className="profile-projects-desc">// {data.description}</p>
      <div className="profile-projects-bottom">
        <p className="profile-projects-bottom-date">{data.date_of_publication}</p>
        {/*<div className="profile-projects-bottom-delete">*/}
        {/*  <svg*/}
        {/*    width="18"*/}
        {/*    height="18"*/}
        {/*    viewBox="0 0 18 18"*/}
        {/*    fill="none"*/}
        {/*    xmlns="http://www.w3.org/2000/svg"*/}
        {/*  >*/}
        {/*    <circle cx="9" cy="9" r="7.5" stroke="#DB5B42" />*/}
        {/*    <path*/}
        {/*      d="M10.875 7.12502L7.125 10.875M7.12498 7.125L10.875 10.875"*/}
        {/*      stroke="#DB5B42"*/}
        {/*      strokeLinecap="round"*/}
        {/*    />*/}
        {/*  </svg>*/}
        {/*  <p className="profile-projects-bottom-delete-text">Удалить</p>*/}
        {/*</div>*/}
        <div className="profile-projects-bottom-lang">// {viewWords['tpl_profile_card_language']}: Python</div>
      </div>
    </div>
  );
};
export default ProfileProjectsContent;
