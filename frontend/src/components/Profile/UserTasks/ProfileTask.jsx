import {Link} from "react-router-dom";

const ProfileTask = ({ data, index, isCreated, viewWords}) => {
  const countDifficulty = [1, 2, 3, 4, 5];

  const listDifficulty = countDifficulty.map((i) => {
    return (
      <li
        className={`profile-difficulty-range-item${i <= data.difficulty ? ' active' : ''}`}
      ></li>
    );
  });

  return (
    <div className={`profile-current-card ${isCreated ? 'created-card' : ''}`}>
      <ul className="created-course-header-tags">
        {data.tags.map((item) => {
          return <li className="created-course-header-tag">#{item.title}</li>;
        })}
      </ul>
      <Link to={`../../task/${data.slug}`} className="profile-task-title clamp">_{data.title}</Link>
      <div className={"profile-task-desc clamp multiline"} dangerouslySetInnerHTML={{__html: data.content}}/>
      {/*<p className="profile-task-desc clamp multiline">// {data.content}</p>*/}
      <div className="profile-difficulty">
        <p>_{viewWords['tpl_profile_card_dif']}: </p>
        <ul className="profile-difficulty-range">{listDifficulty}</ul>
      </div>
      <div className="profile-task-stat">
        <div className="created-course-stat-rate">
          <div className="created-course-stat-rate-like">
            <svg
              className="currentcourse-course-info-rate-arrow"
              width="12"
              height="13"
              viewBox="0 0 12 13"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 10.5L6 2.5M6 2.5L9 5.5M6 2.5L3 5.5"
                stroke="#2EA043"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <p className="currentcourse-course-info-rate-like-text">{data.like}</p>
          </div>
          <div className="created-course-stat-rate-dislike">
            <svg
              className="currentcourse-course-info-rate-arrow"
              width="12"
              height="13"
              viewBox="0 0 12 13"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 2.5L6 10.5M6 10.5L9 7.5M6 10.5L3 7.5"
                stroke="#DB5B42"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <p className="currentcourse-course-info-rate-dislike-text">{data.dislike}</p>
          </div>
        </div>
        <div className="created-course-stat-view">
          <svg
            width="21"
            height="21"
            viewBox="0 0 21 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2.86553 13.3837C2.12184 12.4175 1.75 11.9345 1.75 10.5C1.75 9.06555 2.12184 8.58246 2.86553 7.61629C4.35047 5.68711 6.84085 3.5 10.5 3.5C14.1592 3.5 16.6495 5.68711 18.1345 7.61629C18.8782 8.58246 19.25 9.06555 19.25 10.5C19.25 11.9345 18.8782 12.4175 18.1345 13.3837C16.6495 15.3129 14.1592 17.5 10.5 17.5C6.84085 17.5 4.35047 15.3129 2.86553 13.3837Z"
              stroke="white"
            />
            <path
              d="M13.125 10.5C13.125 11.9497 11.9497 13.125 10.5 13.125C9.05025 13.125 7.875 11.9497 7.875 10.5C7.875 9.05025 9.05025 7.875 10.5 7.875C11.9497 7.875 13.125 9.05025 13.125 10.5Z"
              stroke="white"
            />
          </svg>
          <p>{viewWords['tpl_profile_card_view']}: {data.views}</p>
        </div>
        <div className="created-course-stat-ended">
          <svg
            width="21"
            height="21"
            viewBox="0 0 21 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.55988 3.06219C9.80326 2.47927 11.1967 2.47927 12.44 3.06219L18.2949 5.80706C19.5684 6.40412 19.5684 8.47092 18.2948 9.06798L12.4401 11.8128C11.1967 12.3957 9.80333 12.3957 8.55995 11.8128L2.70515 9.06794C1.43161 8.47088 1.43162 6.40408 2.70515 5.80702L8.55988 3.06219Z"
              stroke="white"
            />
            <path d="M1.75 7.4375V12.25" stroke="white" strokeLinecap="round" />
            <path
              d="M16.625 10.0625V14.5472C16.625 15.4293 16.1844 16.2551 15.4128 16.6824C14.128 17.3939 12.0715 18.375 10.5 18.375C8.9285 18.375 6.87199 17.3939 5.58717 16.6824C4.81557 16.2551 4.375 15.4293 4.375 14.5472V10.0625"
              stroke="white"
              strokeLinecap="round"
            />
          </svg>
          <p>{viewWords['tpl_profile_card_finished']}: {data.finish_users}</p>
        </div>
      </div>
      <div className="profile-task-complete-stat">
        <Link to={`../../task/${data.slug}`} className="btn big primary">{viewWords['tpl_profile_task_goto-solve']}</Link>
        {data.success === '0' ? (
          <div className="profile-task-complete-solution">{viewWords['tpl_profile_task_solve-unsuccess']}</div>
        ) : (
          <div className="profile-task-complete-solution end">
            <svg
              width="21"
              height="21"
              viewBox="0 0 21 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="10.5" cy="10.5" r="8.75" stroke="#2EA043" />
              <path
                d="M7.4375 10.9375L9.1875 12.6875L13.5625 8.3125"
                stroke="#2EA043"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <p>{viewWords['tpl_profile_task_solve-success']}</p>
          </div>
        )}
      </div>
      <div className="created-course-bottom">
        {data.date_of_publication !== null ?
            <p className="created-course-bottom-date">{data.date_of_publication}</p>
            :
            <p className="created-course-bottom-date">{viewWords['tpl_profile_card_not-publish']}</p>
        }
        <p className="created-course-bottom-lang">
          {/* // Язык: {data.language.map((key) => {})} */}
        </p>
      </div>
    </div>
  );
};
export default ProfileTask;
