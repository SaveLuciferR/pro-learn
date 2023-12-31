

const BlogCard = (obj) => {//Карточка статьи
    //Передача объекта с базы
    return (
        <div className="maincontent_allarticle__items">
            <div className="maincontent_allarticle__item">
                <div className="maincontent_allarticle__flex">
                    <div className="maincontent_allarticle__text">
                        <div className="maincontent_allarticle__info">
                            {/* Инфо о статье */}
                            <p className="mc_ba__date">{obj.date_of_publication}</p>
                            <p className="mc_ba_from">
                                {obj.role === "admin" ? "От админа" : "От пользователя" /* Отображение типа пользователя словами */}
                            </p>
                            <p className="mc_ba_nickname">{obj.username}</p>{/* Имя пользователя */}
                        </div>
                        <h2 className="maincontent_bestarticle__title">{obj.title}</h2>
                        <p className="maincontent_bestarticle__content">{obj.excerpt}</p>
                    </div>
                    <div className="maincontent_bestarticle__stat">
                        {/* Часть с лайками, комментами и просмотрами */}
                        <div className="maincontent_bestarticle__lac">
                            <div className="maincontent_bestarticle__statblock">
                                {/* Heart */}
                                <div className="mc_ba__icon">
                                    <svg
                                        width="14"
                                        height="14"
                                        viewBox="0 0 14 14"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M5.22764 11.0313L5.53718 10.6387L5.22764 11.0313ZM6.99996 3.20867L6.63972 3.55541C6.73397 3.65334 6.86404 3.70867 6.99996 3.70867C7.13588 3.70867 7.26595 3.65334 7.3602 3.55541L6.99996 3.20867ZM8.77228 11.0313L9.08182 11.424L8.77228 11.0313ZM5.53718 10.6387C4.64934 9.93875 3.68949 9.26319 2.92736 8.405C2.18237 7.56611 1.66663 6.59225 1.66663 5.32994H0.666626C0.666626 6.90434 1.32322 8.10466 2.17965 9.06902C3.01893 10.0141 4.08959 10.7709 4.91809 11.424L5.53718 10.6387ZM1.66663 5.32994C1.66663 4.09865 2.36228 3.06934 3.30682 2.63759C4.21983 2.22025 5.45523 2.32477 6.63972 3.55541L7.3602 2.86194C5.91979 1.3654 4.23851 1.11219 2.89109 1.7281C1.57518 2.32961 0.666626 3.72452 0.666626 5.32994H1.66663ZM4.91809 11.424C5.21632 11.6591 5.54045 11.913 5.86991 12.1056C6.1992 12.298 6.58136 12.4583 6.99996 12.4583V11.4583C6.83523 11.4583 6.63405 11.3939 6.37443 11.2422C6.11497 11.0905 5.84461 10.881 5.53718 10.6387L4.91809 11.424ZM9.08182 11.424C9.91033 10.7709 10.981 10.0141 11.8203 9.06902C12.6767 8.10466 13.3333 6.90434 13.3333 5.32994H12.3333C12.3333 6.59225 11.8176 7.56611 11.0726 8.405C10.3104 9.26319 9.35058 9.93875 8.46274 10.6387L9.08182 11.424ZM13.3333 5.32994C13.3333 3.72452 12.4247 2.32961 11.1088 1.7281C9.7614 1.11219 8.08013 1.3654 6.63972 2.86194L7.3602 3.55541C8.54469 2.32477 9.78009 2.22025 10.6931 2.63759C11.6376 3.06934 12.3333 4.09865 12.3333 5.32994H13.3333ZM8.46274 10.6387C8.15531 10.881 7.88495 11.0905 7.62549 11.2422C7.36586 11.3939 7.16469 11.4583 6.99996 11.4583V12.4583C7.41856 12.4583 7.80072 12.298 8.13001 12.1056C8.45947 11.913 8.78359 11.6591 9.08182 11.424L8.46274 10.6387Z"
                                            fill="white"
                                        />
                                    </svg>
                                </div>
                                <p className="mc_ba_text">{obj.like}</p>{/* Количество лайков */}
                            </div>
                            <div className="maincontent_bestarticle__statblock">
                                {/* Comment */}
                                <div className="mc_ba__icon">
                                    <svg
                                        width="14"
                                        height="14"
                                        viewBox="0 0 14 14"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <g clipPath="url(#clip0_11_1157)">
                                            <path
                                                d="M7.63384 12.4762L8.06412 12.7308L7.63384 12.4762ZM7.95007 11.9419L7.51979 11.6872L7.95007 11.9419ZM6.04983 11.9419L5.61955 12.1966L6.04983 11.9419ZM6.36605 12.4762L6.79633 12.2215H6.79633L6.36605 12.4762ZM1.38864 9.28283L1.85058 9.09149L1.85058 9.09149L1.38864 9.28283ZM4.54388 11.0784L4.53527 11.5783H4.53527L4.54388 11.0784ZM2.96713 10.8613L2.77579 11.3233H2.77579L2.96713 10.8613ZM12.6113 9.28283L13.0732 9.47417V9.47417L12.6113 9.28283ZM9.45601 11.0784L9.4474 10.5784L9.45601 11.0784ZM11.0328 10.8613L11.2241 11.3233H11.2241L11.0328 10.8613ZM11.4406 1.59647L11.1793 2.02279L11.4406 1.59647ZM12.4035 2.55938L12.8298 2.29813V2.29813L12.4035 2.55938ZM2.55934 1.59647L2.29809 1.17015V1.17015L2.55934 1.59647ZM1.59643 2.55938L1.17011 2.29813H1.17011L1.59643 2.55938ZM5.48492 11.2057L5.7363 10.7735L5.7363 10.7735L5.48492 11.2057ZM8.06412 12.7308L8.38034 12.1966L7.51979 11.6872L7.20356 12.2215L8.06412 12.7308ZM5.61955 12.1966L5.93578 12.7308L6.79633 12.2215L6.48011 11.6872L5.61955 12.1966ZM7.20356 12.2215C7.11532 12.3706 6.88457 12.3706 6.79633 12.2215L5.93578 12.7308C6.41123 13.5341 7.58866 13.5341 8.06412 12.7308L7.20356 12.2215ZM6.12496 1.66667H7.87496V0.666672H6.12496V1.66667ZM12.3333 6.125V6.70834H13.3333V6.125H12.3333ZM1.66663 6.70834V6.125H0.666626V6.70834H1.66663ZM0.666626 6.70834C0.666626 7.381 0.666355 7.91053 0.695538 8.33824C0.725027 8.77045 0.786253 9.1351 0.926704 9.47417L1.85058 9.09149C1.76902 8.89457 1.71923 8.65146 1.69322 8.27017C1.6669 7.88439 1.66663 7.39468 1.66663 6.70834H0.666626ZM4.55249 10.5784C3.82015 10.5658 3.44721 10.519 3.15847 10.3994L2.77579 11.3233C3.25741 11.5228 3.80303 11.5657 4.53527 11.5783L4.55249 10.5784ZM0.926704 9.47417C1.27348 10.3114 1.93861 10.9765 2.77579 11.3233L3.15847 10.3994C2.56632 10.1541 2.09586 9.68364 1.85058 9.09149L0.926704 9.47417ZM12.3333 6.70834C12.3333 7.39468 12.333 7.88439 12.3067 8.27017C12.2807 8.65146 12.2309 8.89457 12.1493 9.09149L13.0732 9.47417C13.2137 9.1351 13.2749 8.77045 13.3044 8.33824C13.3336 7.91053 13.3333 7.381 13.3333 6.70834H12.3333ZM9.46463 11.5783C10.1969 11.5657 10.7425 11.5228 11.2241 11.3233L10.8414 10.3994C10.5527 10.519 10.1798 10.5658 9.4474 10.5784L9.46463 11.5783ZM12.1493 9.09149C11.9041 9.68364 11.4336 10.1541 10.8414 10.3994L11.2241 11.3233C12.0613 10.9765 12.7264 10.3114 13.0732 9.47417L12.1493 9.09149ZM7.87496 1.66667C8.83939 1.66667 9.52761 1.6672 10.0635 1.71815C10.5919 1.7684 10.9204 1.86413 11.1793 2.02279L11.7018 1.17015C11.2594 0.899018 10.7598 0.779846 10.1581 0.722642C9.56394 0.666144 8.82003 0.666672 7.87496 0.666672V1.66667ZM13.3333 6.125C13.3333 5.17994 13.3338 4.43602 13.2773 3.84182C13.2201 3.24017 13.1009 2.74058 12.8298 2.29813L11.9772 2.82063C12.1358 3.07955 12.2316 3.40802 12.2818 3.93647C12.3328 4.47236 12.3333 5.16057 12.3333 6.125H13.3333ZM11.1793 2.02279C11.5045 2.22206 11.7779 2.49546 11.9772 2.82063L12.8298 2.29813C12.5481 1.8384 12.1616 1.45188 11.7018 1.17015L11.1793 2.02279ZM6.12496 0.666672C5.17989 0.666672 4.43598 0.666144 3.84177 0.722642C3.24013 0.779846 2.74054 0.899018 2.29809 1.17015L2.82059 2.02279C3.07951 1.86413 3.40798 1.7684 3.93643 1.71815C4.47231 1.6672 5.16053 1.66667 6.12496 1.66667V0.666672ZM1.66663 6.125C1.66663 5.16057 1.66715 4.47236 1.71811 3.93647C1.76835 3.40802 1.86408 3.07955 2.02275 2.82063L1.17011 2.29813C0.898972 2.74058 0.779801 3.24017 0.722596 3.84182C0.666098 4.43602 0.666626 5.17994 0.666626 6.125H1.66663ZM2.29809 1.17015C1.83836 1.45187 1.45183 1.8384 1.17011 2.29813L2.02275 2.82063C2.22201 2.49546 2.49541 2.22206 2.82059 2.02279L2.29809 1.17015ZM6.48011 11.6872C6.36227 11.4881 6.25659 11.3086 6.15334 11.1669C6.04393 11.0168 5.91576 10.8779 5.7363 10.7735L5.23354 11.638C5.25107 11.6482 5.28272 11.6702 5.3452 11.7559C5.41383 11.8501 5.49211 11.9813 5.61955 12.1966L6.48011 11.6872ZM4.53527 11.5783C4.79257 11.5827 4.9514 11.586 5.07151 11.5993C5.18235 11.6115 5.21765 11.6287 5.23354 11.638L5.7363 10.7735C5.5552 10.6682 5.368 10.626 5.18157 10.6053C5.00442 10.5857 4.79123 10.5825 4.55249 10.5784L4.53527 11.5783ZM8.38034 12.1966C8.50779 11.9813 8.58607 11.8501 8.6547 11.7559C8.71718 11.6702 8.74882 11.6482 8.76635 11.638L8.26359 10.7735C8.08414 10.8779 7.95597 11.0168 7.84656 11.1669C7.7433 11.3086 7.63762 11.4881 7.51979 11.6872L8.38034 12.1966ZM9.4474 10.5784C9.20867 10.5825 8.99548 10.5857 8.81832 10.6053C8.6319 10.626 8.4447 10.6682 8.26359 10.7735L8.76635 11.638C8.78224 11.6287 8.81755 11.6115 8.92838 11.5993C9.04849 11.586 9.20733 11.5827 9.46463 11.5783L9.4474 10.5784Z"
                                                fill="white"
                                            />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_11_1157">
                                                <rect width="14" height="14" fill="white"/>
                                            </clipPath>
                                        </defs>
                                    </svg>
                                </div>
                                <p className="mc_ba_text">{obj.comments}</p>{/* Количество комментариев */}
                            </div>
                        </div>
                        <div className="maincontent_bestarticle__statblock">
                            {/* View */}
                            <svg
                                width="18"
                                height="18"
                                viewBox="0 0 18 18"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M2.45617 11.4718C1.81872 10.6436 1.5 10.2295 1.5 9C1.5 7.77047 1.81872 7.3564 2.45617 6.52825C3.72897 4.87467 5.86359 3 9 3C12.1364 3 14.271 4.87467 15.5438 6.52825C16.1813 7.35639 16.5 7.77047 16.5 9C16.5 10.2295 16.1813 10.6436 15.5438 11.4718C14.271 13.1253 12.1364 15 9 15C5.86359 15 3.72897 13.1253 2.45617 11.4718Z"
                                    stroke="white"
                                    strokeOpacity="0.8"
                                />
                                <path
                                    d="M11.25 9C11.25 10.2426 10.2426 11.25 9 11.25C7.75736 11.25 6.75 10.2426 6.75 9C6.75 7.75736 7.75736 6.75 9 6.75C10.2426 6.75 11.25 7.75736 11.25 9Z"
                                    stroke="white"
                                    strokeOpacity="0.8"
                                />
                            </svg>
                            <p className="mc_ba_viewtext">{obj.views}</p>{/* Количество просмотров */}
                        </div>
                    </div>
                </div>
            </div>
            {/* <img className="maincontent_allarticle__photo" src={`http://pro-learn${obj.img}`} alt={obj.title} /> */}
            <div className="maincontent_allarticle__photo"></div>
            <img className="maincontent_bestarticle__photo" src={`http://pro-learn/${obj.img}`} alt={obj.title}/>
        </div>
    );
};

export default BlogCard;
