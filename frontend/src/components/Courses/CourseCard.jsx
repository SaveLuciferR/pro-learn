import img from '../../image 7.png';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const CourseCard = ({ obj }) => {
  const getLangProg = () => {
    let temp = '';
    obj.language.map((item, i) => (temp += item + ', '));
    temp = temp.replace(/, $/, '');
    return temp;
  };

  return (
    <div className="courses-card">
      <div className="courses-card-header">
        <ul className="courses-card-header-tags">
          {obj.tags.map((item, i) => (
            <li key={i} className="courses-card-header-tag">
              #{item.title}
            </li>
          ))}
        </ul>
        {/*<p className="courses-card-header-status">Не начат</p>*/}
      </div>
      <div className="created-course-info">
        <Link to={`${obj.slug}`} className="courses-card-info-title">
          {obj.title}
        </Link>
        <div className="courses-card-info-desc">
          <p className="courses-card-info-desc-text clamp multiline">// {obj.excerpt}</p>
          <img src={img} className="courses-card-info-desc-img"></img>
        </div>
      </div>
      <div className="profile-difficulty">
        <p>_Сложность: </p>
        <ul className="profile-difficulty-range">
          {Array(5)
            .fill('')
            .map((item, i) => (
              <li
                className={`profile-difficulty-range-item ${i < obj.difficulty ? 'active' : ''}`}
              ></li>
            ))}
        </ul>
      </div>
      <div className="courses-card-cards">
        <div className="courses-card-card">
          <svg
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M35.5 30C35.5 30.8284 34.8284 31.5 34 31.5H24C23.1716 31.5 22.5 30.8284 22.5 30C22.5 29.1716 23.1716 28.5 24 28.5H34C34.8284 28.5 35.5 29.1716 35.5 30Z"
              fill="white"
            />
            <path
              d="M14.9603 18.8477C14.3239 18.3173 13.378 18.4033 12.8477 19.0397C12.3173 19.6761 12.4033 20.622 13.0397 21.1523L13.5085 21.543C14.8257 22.6406 15.6869 23.363 16.2393 23.9748C16.7639 24.5557 16.8139 24.828 16.8139 25C16.8139 25.172 16.7639 25.4443 16.2393 26.0252C15.6869 26.637 14.8257 27.3594 13.5085 28.457L13.0397 28.8477C12.4033 29.378 12.3173 30.3239 12.8477 30.9603C13.378 31.5967 14.3239 31.6827 14.9603 31.1523L15.5131 30.6916C16.723 29.6835 17.753 28.8252 18.4659 28.0358C19.223 27.1974 19.8139 26.2332 19.8139 25C19.8139 23.7668 19.223 22.8026 18.4659 21.9642C17.753 21.1748 16.723 20.3165 15.5131 19.3084L14.9603 18.8477Z"
              fill="white"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M23.8852 2.5H24.1148C28.7315 2.49997 32.3496 2.49995 35.1726 2.87949C38.0621 3.26797 40.3421 4.07865 42.1317 5.86827C43.9213 7.65789 44.732 9.93794 45.1205 12.8274C45.5 15.6504 45.5 19.2685 45.5 23.8853V24.1147C45.5 28.7315 45.5 32.3496 45.1205 35.1726C44.732 38.0621 43.9213 40.3421 42.1317 42.1317C40.3421 43.9213 38.0621 44.732 35.1726 45.1205C32.3496 45.5 28.7315 45.5 24.1147 45.5H23.8853C19.2685 45.5 15.6504 45.5 12.8274 45.1205C9.93794 44.732 7.65789 43.9213 5.86827 42.1317C4.07865 40.3421 3.26797 38.0621 2.87949 35.1726C2.49995 32.3496 2.49997 28.7315 2.5 24.1148V23.8852C2.49997 19.2685 2.49995 15.6504 2.87949 12.8274C3.26797 9.93794 4.07865 7.65789 5.86827 5.86827C7.65789 4.07865 9.93794 3.26797 12.8274 2.87949C15.6504 2.49995 19.2685 2.49997 23.8852 2.5ZM13.2272 5.85274C10.6703 6.1965 9.12891 6.85028 7.98959 7.98959C6.85028 9.12891 6.1965 10.6703 5.85274 13.2272C5.50319 15.8271 5.5 19.2436 5.5 24C5.5 28.7565 5.50319 32.1729 5.85274 34.7728C6.1965 37.3297 6.85028 38.8711 7.98959 40.0104C9.12891 41.1497 10.6703 41.8035 13.2272 42.1473C15.8271 42.4968 19.2436 42.5 24 42.5C28.7565 42.5 32.1729 42.4968 34.7728 42.1473C37.3297 41.8035 38.8711 41.1497 40.0104 40.0104C41.1497 38.8711 41.8035 37.3297 42.1473 34.7728C42.4968 32.1729 42.5 28.7565 42.5 24C42.5 19.2436 42.4968 15.8271 42.1473 13.2272C41.8035 10.6703 41.1497 9.12891 40.0104 7.98959C38.8711 6.85028 37.3297 6.1965 34.7728 5.85274C32.1729 5.50319 28.7565 5.5 24 5.5C19.2436 5.5 15.8271 5.50319 13.2272 5.85274Z"
              fill="white"
            />
          </svg>
          <p>Количество блоков: {obj.amount_stage}</p>
        </div>
        <div className="courses-card-card">
          <svg
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19.4045 28.5267C19.6954 27.751 19.3024 26.8864 18.5267 26.5955C17.751 26.3046 16.8864 26.6976 16.5955 27.4733L13.5955 35.4733C13.3046 36.249 13.6976 37.1136 14.4733 37.4045C15.249 37.6954 16.1136 37.3024 16.4045 36.5267L19.4045 28.5267Z"
              fill="white"
            />
            <path
              d="M13.0607 29.0607C13.6464 28.4749 13.6464 27.5251 13.0607 26.9393C12.4749 26.3536 11.5251 26.3536 10.9393 26.9393L8.93934 28.9393C8.35356 29.5251 8.35356 30.4749 8.93934 31.0607L10.9393 33.0607C11.5251 33.6464 12.4749 33.6464 13.0607 33.0607C13.6464 32.4749 13.6464 31.5251 13.0607 30.9393L12.1213 30L13.0607 29.0607Z"
              fill="white"
            />
            <path
              d="M22.0607 30.9393C21.4749 30.3536 20.5251 30.3536 19.9393 30.9393C19.3536 31.5251 19.3536 32.4749 19.9393 33.0607L20.8787 34L19.9393 34.9393C19.3536 35.5251 19.3536 36.4749 19.9393 37.0607C20.5251 37.6465 21.4749 37.6464 22.0607 37.0607L24.0607 35.0607C24.6464 34.4749 24.6464 33.5251 24.0607 32.9393L22.0607 30.9393Z"
              fill="white"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M19.8872 4.5H28.1128C28.7413 4.5 29.3475 4.49999 29.9319 4.50152C29.9545 4.50051 29.9772 4.5 30 4.5C30.0257 4.5 30.0513 4.50065 30.0767 4.50193C32.8447 4.51046 35.1215 4.55666 36.978 4.80627C39.3229 5.12153 41.2208 5.78576 42.7175 7.28249C44.2142 8.77921 44.8785 10.6771 45.1937 13.022C45.5001 15.3004 45.5 18.2116 45.5 21.8871V26.1128C45.5 29.7883 45.5001 32.6996 45.1937 34.978C44.8785 37.3229 44.2142 39.2208 42.7175 40.7175C41.2208 42.2142 39.3229 42.8785 36.978 43.1937C35.1215 43.4433 32.8448 43.4895 30.0767 43.4981C30.0513 43.4994 30.0257 43.5 30 43.5C29.9772 43.5 29.9545 43.4995 29.9319 43.4985C29.3504 43.5 28.7474 43.5 28.1222 43.5H19.8872C16.2117 43.5 13.3004 43.5001 11.022 43.1937C8.67711 42.8785 6.77921 42.2142 5.28249 40.7175C3.78576 39.2208 3.12153 37.3229 2.80627 34.978C2.49995 32.6996 2.49997 29.7884 2.5 26.1129V21.8872C2.49997 18.2117 2.49995 15.3004 2.80627 13.022C3.12153 10.6771 3.78576 8.77921 5.28249 7.28249C6.77921 5.78576 8.67711 5.12153 11.022 4.80627C13.3004 4.49995 16.2117 4.49997 19.8872 4.5ZM28.5 7.50004L28.5 40.5L20 40.5C16.1864 40.5 13.477 40.4968 11.4217 40.2205C9.40952 39.95 8.25023 39.4426 7.40381 38.5962C6.55739 37.7498 6.05005 36.5905 5.77952 34.5783C5.50319 32.523 5.5 29.8136 5.5 26V22C5.5 18.1864 5.50319 15.477 5.77952 13.4217C6.05005 11.4095 6.55739 10.2502 7.40381 9.40381C8.25023 8.55739 9.40952 8.05005 11.4217 7.77952C13.477 7.50319 16.1864 7.5 20 7.5L28.5 7.50004ZM36.5783 40.2205C35.2164 40.4036 33.5673 40.4668 31.5 40.4885L31.5 7.51146C33.5673 7.53324 35.2164 7.59641 36.5783 7.77952C38.5905 8.05005 39.7498 8.55739 40.5962 9.40381C41.4426 10.2502 41.95 11.4095 42.2205 13.4217C42.4968 15.477 42.5 18.1864 42.5 22V26C42.5 29.8136 42.4968 32.523 42.2205 34.5783C41.95 36.5905 41.4426 37.7498 40.5962 38.5962C39.7498 39.4426 38.5905 39.95 36.5783 40.2205Z"
              fill="white"
            />
          </svg>
          <p>Количество уроков: {obj.amount_step}</p>
        </div>
        <div className="courses-card-card">
          <svg
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14 12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12C10 10.8954 10.8954 10 12 10C13.1046 10 14 10.8954 14 12Z"
              fill="white"
            />
            <path
              d="M20 12C20 13.1046 19.1046 14 18 14C16.8954 14 16 13.1046 16 12C16 10.8954 16.8954 10 18 10C19.1046 10 20 10.8954 20 12Z"
              fill="white"
            />
            <path
              d="M24 14C25.1046 14 26 13.1046 26 12C26 10.8954 25.1046 10 24 10C22.8954 10 22 10.8954 22 12C22 13.1046 22.8954 14 24 14Z"
              fill="white"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M23.8852 2.5C19.2685 2.49997 15.6504 2.49995 12.8274 2.87949C9.93794 3.26797 7.65789 4.07865 5.86827 5.86827C4.07865 7.65789 3.26797 9.93794 2.87949 12.8274C2.65471 14.4993 2.56306 16.4501 2.5257 18.722C2.50883 18.8121 2.5 18.905 2.5 19C2.5 19.0798 2.50623 19.1581 2.51823 19.2346C2.49998 20.6592 2.49999 22.2062 2.5 23.8852V24.1148C2.49997 28.7315 2.49995 32.3496 2.87949 35.1726C3.26797 38.0621 4.07865 40.3421 5.86827 42.1317C7.65789 43.9213 9.93794 44.732 12.8274 45.1205C15.6504 45.5 19.2685 45.5 23.8853 45.5H24.1147C28.7315 45.5 32.3496 45.5 35.1726 45.1205C38.0621 44.732 40.3421 43.9213 42.1317 42.1317C43.9213 40.3421 44.732 38.0621 45.1205 35.1726C45.5 32.3496 45.5 28.7315 45.5 24.1147V23.8853C45.5 22.2062 45.5 20.6592 45.4818 19.2346C45.4938 19.1581 45.5 19.0798 45.5 19C45.5 18.905 45.4912 18.8121 45.4743 18.722C45.4369 16.4501 45.3453 14.4993 45.1205 12.8274C44.732 9.93794 43.9213 7.65789 42.1317 5.86827C40.3421 4.07865 38.0621 3.26797 35.1726 2.87949C32.3496 2.49995 28.7315 2.49997 24.1148 2.5H23.8852ZM5.5 24C5.5 22.743 5.50022 21.5795 5.507 20.5H16.5L16.5 42C16.5 42.1436 16.5202 42.2824 16.5578 42.4139C15.3118 42.3622 14.211 42.2795 13.2272 42.1473C10.6703 41.8035 9.12891 41.1497 7.98959 40.0104C6.85028 38.8711 6.1965 37.3297 5.85274 34.7728C5.50319 32.1729 5.5 28.7565 5.5 24ZM19.4204 42.4835C20.7939 42.4996 22.3126 42.5 24 42.5C28.7565 42.5 32.1729 42.4968 34.7728 42.1473C37.3297 41.8035 38.8711 41.1497 40.0104 40.0104C41.1497 38.8711 41.8035 37.3297 42.1473 34.7728C42.4968 32.1729 42.5 28.7565 42.5 24C42.5 22.743 42.4998 21.5795 42.493 20.5H19.5L19.5 42C19.5 42.1692 19.472 42.3318 19.4204 42.4835ZM5.85274 13.2272C5.68807 14.452 5.60026 15.858 5.55345 17.5H42.4466C42.3997 15.858 42.3119 14.452 42.1473 13.2272C41.8035 10.6703 41.1497 9.12891 40.0104 7.98959C38.8711 6.85028 37.3297 6.1965 34.7728 5.85274C32.1729 5.50319 28.7565 5.5 24 5.5C19.2436 5.5 15.8271 5.50319 13.2272 5.85274C10.6703 6.1965 9.12891 6.85028 7.98959 7.98959C6.85028 9.12891 6.1965 10.6703 5.85274 13.2272Z"
              fill="white"
            />
          </svg>
          <p>Финальных проектов: {obj.final_projects}</p>
        </div>
      </div>
      <div className="profile-completed-card-stat">
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
            <p className="currentcourse-course-info-rate-like-text">{obj.like}</p>
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
            <p className="currentcourse-course-info-rate-dislike-text">{obj.dislike}</p>
          </div>
        </div>
      </div>
      <div className="tasks-card-bottom">
        <p className="tasks-card-bottom-info">
          &gt; {obj.username}, {obj.role === 'admin' ? 'Администратор' : 'Пользователь'},{' '}
          {obj.date_of_publication}
        </p>
        <p className="tasks-card-bottom-lang">// Язык: {getLangProg()}</p>
      </div>
    </div>
  );
};

export default CourseCard;
