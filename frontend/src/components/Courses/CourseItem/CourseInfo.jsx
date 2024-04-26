import img from '../../../image_5.png';
import {useEffect, useState} from "react";

const CourseInfo = ({course}) => {

    const [dif, setDif] = useState([0, 0, 0, 0, 0]);

    return (
        <div className="course-info">
            <div className="course-info-header">
                <p className="course-info-header-title">_{course.title}</p>
                <ul className="courses-card-header-tags">
                    {course.tags.map(item => <li className="courses-card-header-tag">#{item.title}</li>)}
                    {/*<li className="courses-card-header-tag">#Начинающим</li>*/}
                </ul>
            </div>
            <div className="course-info-main">
                <div className="course-info-main-text">
                    <p className="course-info-main-text-desc">
                        {course.excerpt}
                    </p>
                    <div className="profile-difficulty">
                        <p>_Сложность: </p>
                        <ul className="profile-difficulty-range">
                            {dif.map((item, i) =>
                                <li className={`profile-difficulty-range-item ${i < course.difficulty ? 'active' : ''}`}></li>
                            )}
                        </ul>
                    </div>
                    <div className="course-info-main-text-cards">
                        <div className="course-info-main-text-card">
                            <svg
                                width="49"
                                height="48"
                                viewBox="0 0 49 48"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M36.167 30C36.167 30.8284 35.4954 31.5 34.667 31.5H24.667C23.8386 31.5 23.167 30.8284 23.167 30C23.167 29.1716 23.8386 28.5 24.667 28.5H34.667C35.4954 28.5 36.167 29.1716 36.167 30Z"
                                    fill="white"
                                />
                                <path
                                    d="M15.6273 18.8477C14.9909 18.3173 14.045 18.4033 13.5147 19.0397C12.9843 19.6761 13.0703 20.622 13.7067 21.1523L14.1755 21.543C15.4927 22.6406 16.3539 23.363 16.9063 23.9748C17.4309 24.5557 17.4808 24.828 17.4808 25C17.4808 25.172 17.4309 25.4443 16.9063 26.0252C16.3539 26.637 15.4927 27.3594 14.1755 28.457L13.7067 28.8477C13.0703 29.378 12.9843 30.3239 13.5147 30.9603C14.045 31.5967 14.9909 31.6827 15.6273 31.1523L16.1801 30.6916C17.39 29.6835 18.42 28.8252 19.1329 28.0358C19.89 27.1974 20.4808 26.2332 20.4808 25C20.4808 23.7668 19.89 22.8026 19.1329 21.9642C18.42 21.1748 17.39 20.3165 16.1801 19.3084L15.6273 18.8477Z"
                                    fill="white"
                                />
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M24.5522 2.5H24.7817C29.3985 2.49997 33.0166 2.49995 35.8396 2.87949C38.7291 3.26797 41.0091 4.07865 42.7987 5.86827C44.5883 7.65789 45.399 9.93794 45.7875 12.8274C46.167 15.6504 46.167 19.2685 46.167 23.8853V24.1147C46.167 28.7315 46.167 32.3496 45.7875 35.1726C45.399 38.0621 44.5883 40.3421 42.7987 42.1317C41.0091 43.9213 38.7291 44.732 35.8396 45.1205C33.0166 45.5 29.3985 45.5 24.7817 45.5H24.5522C19.9355 45.5 16.3174 45.5 13.4944 45.1205C10.6049 44.732 8.32488 43.9213 6.53527 42.1317C4.74565 40.3421 3.93496 38.0621 3.54649 35.1726C3.16695 32.3496 3.16697 28.7315 3.16699 24.1148V23.8852C3.16697 19.2685 3.16695 15.6504 3.54649 12.8274C3.93496 9.93794 4.74565 7.65789 6.53527 5.86827C8.32488 4.07865 10.6049 3.26797 13.4944 2.87949C16.3174 2.49995 19.9354 2.49997 24.5522 2.5ZM13.8941 5.85274C11.3373 6.1965 9.7959 6.85028 8.65659 7.98959C7.51727 9.12891 6.86349 10.6703 6.51973 13.2272C6.17018 15.8271 6.16699 19.2436 6.16699 24C6.16699 28.7565 6.17018 32.1729 6.51973 34.7728C6.86349 37.3297 7.51727 38.8711 8.65659 40.0104C9.7959 41.1497 11.3373 41.8035 13.8941 42.1473C16.4941 42.4968 19.9105 42.5 24.667 42.5C29.4234 42.5 32.8399 42.4968 35.4398 42.1473C37.9966 41.8035 39.5381 41.1497 40.6774 40.0104C41.8167 38.8711 42.4705 37.3297 42.8143 34.7728C43.1638 32.1729 43.167 28.7565 43.167 24C43.167 19.2436 43.1638 15.8271 42.8143 13.2272C42.4705 10.6703 41.8167 9.12891 40.6774 7.98959C39.5381 6.85028 37.9966 6.1965 35.4398 5.85274C32.8399 5.50319 29.4234 5.5 24.667 5.5C19.9105 5.5 16.4941 5.50319 13.8941 5.85274Z"
                                    fill="white"
                                />
                            </svg>
                            <p>Количество блоков: {course.amount_stage}</p>
                        </div>
                        <div className="course-info-main-text-card">
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
                            <p>Количество уроков: {course.amount_step}</p>
                        </div>
                        <div className="course-info-main-text-card">
                            <svg
                                width="49"
                                height="48"
                                viewBox="0 0 49 48"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M14.334 12C14.334 13.1046 13.4386 14 12.334 14C11.2294 14 10.334 13.1046 10.334 12C10.334 10.8954 11.2294 10 12.334 10C13.4386 10 14.334 10.8954 14.334 12Z"
                                    fill="white"
                                />
                                <path
                                    d="M20.334 12C20.334 13.1046 19.4386 14 18.334 14C17.2294 14 16.334 13.1046 16.334 12C16.334 10.8954 17.2294 10 18.334 10C19.4386 10 20.334 10.8954 20.334 12Z"
                                    fill="white"
                                />
                                <path
                                    d="M24.334 14C25.4386 14 26.334 13.1046 26.334 12C26.334 10.8954 25.4386 10 24.334 10C23.2294 10 22.334 10.8954 22.334 12C22.334 13.1046 23.2294 14 24.334 14Z"
                                    fill="white"
                                />
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M24.2192 2.5C19.6024 2.49997 15.9844 2.49995 13.1614 2.87949C10.2719 3.26797 7.99188 4.07865 6.20226 5.86827C4.41264 7.65789 3.60196 9.93794 3.21348 12.8274C2.9887 14.4993 2.89705 16.4501 2.85969 18.722C2.84281 18.8121 2.83398 18.905 2.83398 19C2.83398 19.0798 2.84022 19.1581 2.85222 19.2346C2.83397 20.6592 2.83398 22.2062 2.83398 23.8852V24.1148C2.83396 28.7315 2.83394 32.3496 3.21348 35.1726C3.60196 38.0621 4.41264 40.3421 6.20226 42.1317C7.99188 43.9213 10.2719 44.732 13.1614 45.1205C15.9844 45.5 19.6024 45.5 24.2192 45.5H24.4487C29.0655 45.5 32.6836 45.5 35.5066 45.1205C38.396 44.732 40.6761 43.9213 42.4657 42.1317C44.2553 40.3421 45.066 38.0621 45.4545 35.1726C45.834 32.3496 45.834 28.7315 45.834 24.1147V23.8853C45.834 22.2062 45.834 20.6592 45.8158 19.2346C45.8278 19.1581 45.834 19.0798 45.834 19C45.834 18.905 45.8252 18.8121 45.8083 18.722C45.7709 16.4501 45.6793 14.4993 45.4545 12.8274C45.066 9.93794 44.2553 7.65789 42.4657 5.86827C40.6761 4.07865 38.396 3.26797 35.5066 2.87949C32.6836 2.49995 29.0655 2.49997 24.4487 2.5H24.2192ZM5.83399 24C5.83399 22.743 5.83421 21.5795 5.84099 20.5H16.834L16.834 42C16.834 42.1436 16.8542 42.2824 16.8918 42.4139C15.6458 42.3622 14.545 42.2795 13.5611 42.1473C11.0043 41.8035 9.46289 41.1497 8.32358 40.0104C7.18427 38.8711 6.53048 37.3297 6.18673 34.7728C5.83717 32.1729 5.83399 28.7565 5.83399 24ZM19.7544 42.4835C21.1278 42.4996 22.6466 42.5 24.334 42.5C29.0904 42.5 32.5069 42.4968 35.1068 42.1473C37.6636 41.8035 39.2051 41.1497 40.3444 40.0104C41.4837 38.8711 42.1375 37.3297 42.4812 34.7728C42.8308 32.1729 42.834 28.7565 42.834 24C42.834 22.743 42.8338 21.5795 42.827 20.5H19.834L19.834 42C19.834 42.1692 19.806 42.3318 19.7544 42.4835ZM6.18673 13.2272C6.02205 14.452 5.93425 15.858 5.88743 17.5H42.7805C42.7337 15.858 42.6459 14.452 42.4812 13.2272C42.1375 10.6703 41.4837 9.12891 40.3444 7.98959C39.2051 6.85028 37.6636 6.1965 35.1068 5.85274C32.5069 5.50319 29.0904 5.5 24.334 5.5C19.5775 5.5 16.1611 5.50319 13.5611 5.85274C11.0043 6.1965 9.46289 6.85028 8.32358 7.98959C7.18427 9.12891 6.53048 10.6703 6.18673 13.2272Z"
                                    fill="white"
                                />
                            </svg>
                            <p>Финальных проектов: {course.final_projects}</p>
                        </div>
                    </div>
                    <div className="created-course-bottom">
                        <div className="course-info-bottom-left">
                            <div className="course-info-bottom-stat">
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
                                        <p className="currentcourse-course-info-rate-like-text">{course.like}</p>
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
                                        <p className="currentcourse-course-info-rate-dislike-text">{course.dislike}</p>
                                    </div>
                                </div>
                            </div>
                            <p className="created-course-bottom-date">
                                &gt; {course.username}, {course.role === 'admin' ? 'Администратор' : 'Пользователь'}, {course.date_of_publication}
                            </p>
                        </div>
                        <p className="created-course-bottom-lang">// Язык: Python</p>
                    </div>
                </div>
                <img src={img} alt="course-image" className="course-info-main-img"/>
            </div>
            <div className="course-info-button">
                <button className="btn primary big">{course.success === 0 ? 'Начать прохождение курса' : 'Продолжить прохождение курса'}</button>
            </div>
        </div>
    );
};

export default CourseInfo;
