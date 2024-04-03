import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosClient from '../axiosClient';
// import { useReactTable } from '@tanstack/react-table';
import Slider from 'react-slick';

const Table = () => {
  const { lang, username } = useParams();
  const [data, setData] = useState([]);

  useEffect(() => {
    axiosClient
      .get(`${lang === undefined ? '/' : '/' + lang + '/'}@${username}/settings/session?`)
      .then(({ data }) => {
        setData(data.profile_sessions);
      });
  }, [lang]);

  console.log(data);

  // const table = useReactTable({
  //   data,
  //   columns,

  // });

  const settings = {
    dots: true,
    // dotsClass: 'best_blog_slider under_element_slider dots dot',
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    pauseOnHover: true, //Пауза прокручивания при наведении на карточку
  };

  return (
    <div className="currentcourse">
      <p className="currentcourse-title">Пройденные курсы</p>
      <Slider {...settings}>
        <div>
          <div className="currentcourse-course">
            <div className="currentcourse-course-info">
              <p className="currentcourse-course-info-title">_Web-разработчик</p>
              <div className="profile-difficulty">
                <p>_Сложность: </p>
                <ul className="profile-difficulty-range">
                  <li className="profile-difficulty-range-item active"></li>
                  <li className="profile-difficulty-range-item active"></li>
                  <li className="profile-difficulty-range-item active"></li>
                  <li className="profile-difficulty-range-item"></li>
                  <li className="profile-difficulty-range-item"></li>
                </ul>
              </div>
              <div className="currentcourse-course-info-rate">
                <div className="currentcourse-course-info-rate-like">
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
                  <p className="currentcourse-course-info-rate-like-text">12</p>
                </div>
                <div className="currentcourse-course-info-rate-dislike">
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

                  <p className="currentcourse-course-info-rate-dislike-text">2</p>
                </div>
              </div>
            </div>
            <div className="currentcourse-course-image">
              <img alt="course_image"></img>
            </div>
          </div>
          <div className="currentcourse-progress">
            <div className="currentcourse-progress-bar"></div>
            <p className="currentcourse-progress-text">10/10</p>
          </div>
        </div>
        <div>
          <div className="currentcourse-course">
            <div className="currentcourse-course-info">
              <p className="currentcourse-course-info-title">_Web-разработчик</p>
              <div className="profile-difficulty">
                <p>_Сложность: </p>
                <ul className="profile-difficulty-range">
                  <li className="profile-difficulty-range-item active"></li>
                  <li className="profile-difficulty-range-item active"></li>
                  <li className="profile-difficulty-range-item active"></li>
                  <li className="profile-difficulty-range-item"></li>
                  <li className="profile-difficulty-range-item"></li>
                </ul>
              </div>
              <div className="currentcourse-course-info-rate">
                <div className="currentcourse-course-info-rate-like">
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
                  <p className="currentcourse-course-info-rate-like-text">12</p>
                </div>
                <div className="currentcourse-course-info-rate-dislike">
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

                  <p className="currentcourse-course-info-rate-dislike-text">2</p>
                </div>
              </div>
            </div>
            <div className="currentcourse-course-image">
              <img alt="course_image"></img>
            </div>
          </div>
          <div className="currentcourse-progress">
            <div className="currentcourse-progress-bar"></div>
            <p className="currentcourse-progress-text">10/10</p>
          </div>
        </div>
        <div>
          <div className="currentcourse-course">
            <div className="currentcourse-course-info">
              <p className="currentcourse-course-info-title">_Web-разработчик</p>
              <div className="profile-difficulty">
                <p>_Сложность: </p>
                <ul className="profile-difficulty-range">
                  <li className="profile-difficulty-range-item active"></li>
                  <li className="profile-difficulty-range-item active"></li>
                  <li className="profile-difficulty-range-item active"></li>
                  <li className="profile-difficulty-range-item"></li>
                  <li className="profile-difficulty-range-item"></li>
                </ul>
              </div>
              <div className="currentcourse-course-info-rate">
                <div className="currentcourse-course-info-rate-like">
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
                  <p className="currentcourse-course-info-rate-like-text">12</p>
                </div>
                <div className="currentcourse-course-info-rate-dislike">
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

                  <p className="currentcourse-course-info-rate-dislike-text">2</p>
                </div>
              </div>
            </div>
            <div className="currentcourse-course-image">
              <img alt="course_image"></img>
            </div>
          </div>
          <div className="currentcourse-progress">
            <div className="currentcourse-progress-bar"></div>
            <p className="currentcourse-progress-text">10/10</p>
          </div>
        </div>
      </Slider>
      {/* <div className="currentcourse-slider">(слайдер)</div> */}
    </div>
  );
};
export default Table;
