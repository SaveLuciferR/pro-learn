import img from "../header_bg.png";
import ProfileSidebarMain from "../components/Profile/ProfileSidebarMain";
import {useState} from "react";


const CourseCreate = () => {

    const [dropdownActive1, setDropdownActive1] = useState(false);
    const [dropdownActive2, setDropdownActive2] = useState(false);
    const [dropdownActive3, setDropdownActive3] = useState(false);
    const dropdownClick1 = () => setDropdownActive1(!dropdownActive1);
    const dropdownClick2 = () => setDropdownActive2(!dropdownActive2);
    const dropdownClick3 = () => setDropdownActive3(!dropdownActive3);

    return (
        <div className="profile-section">
            <ProfileSidebarMain/>
            <div className="profile-section-main">
                <h1 className="profile-settings-title big text-center-create">_Создать страницу</h1>
                <div className="course-create-header">
                    <div className="course-create-icon">
                        <div className="sidebar_profile-create_item">
                            <svg xmlns="http://www.w3.org/2000/svg" width="37" height="37"
                                 viewBox="0 0 37 37"
                                 fill="none">
                                <path
                                    d="M21.4979 0V15.7724H37V21.3462H21.4979V37H15.3049V21.3462H0V15.7724H15.3049V0H21.4979Z"/>
                            </svg>
                            <span>Иконка</span>
                        </div>
                    </div>
                    <div className="course-create-second_header">
                        <div className="course-create-top">

                        </div>
                        <div className="course-create-down">

                            <div className={`dropdown ${dropdownActive1 ? 'active' : ""}`}
                                 style={{maxWidth: "300px", width: "100%"}}
                                 onClick={() => dropdownClick1()}>
                                <div className="select  small">
                                    <span className="small unselectable">Язык программирования</span>
                                    <svg className="arrow" width="9" height="5" viewBox="0 0 9 5" fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path d="M4.5 5L8.39711 0.5H0.602886L4.5 5Z" fill="white"/>
                                    </svg>
                                </div>
                                <input type="hidden" name="language_code"/>
                                <ul className={`dropdown-menu  ${dropdownActive1 ? 'active' : ''}`}>
                                    <li>
                                        <div className="filter_checkbox">{/* Чекбоксы стилизованы */}
                                            <div className="filter_checkbox__item">
                                                <label>
                                                    <input className="real_checkbox" type="checkbox"/>
                                                    <span className="custom_checkbox"></span>
                                                    <p>Java</p>
                                                </label>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="filter_checkbox">{/* Чекбоксы стилизованы */}
                                            <div className="filter_checkbox__item">
                                                <label>
                                                    <input className="real_checkbox" type="checkbox"/>
                                                    <span className="custom_checkbox"></span>
                                                    <p>C++</p>
                                                </label>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="filter_checkbox">{/* Чекбоксы стилизованы */}
                                            <div className="filter_checkbox__item">
                                                <label>
                                                    <input className="real_checkbox" type="checkbox"/>
                                                    <span className="custom_checkbox"></span>
                                                    <p>C#</p>
                                                </label>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="filter_checkbox">{/* Чекбоксы стилизованы */}
                                            <div className="filter_checkbox__item">
                                                <label>
                                                    <input className="real_checkbox" type="checkbox"/>
                                                    <span className="custom_checkbox"></span>
                                                    <p>Python</p>
                                                </label>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="filter_checkbox">{/* Чекбоксы стилизованы */}
                                            <div className="filter_checkbox__item">
                                                <label>
                                                    <input className="real_checkbox" type="checkbox"/>
                                                    <span className="custom_checkbox"></span>
                                                    <p>JavaScript</p>
                                                </label>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="filter_checkbox">{/* Чекбоксы стилизованы */}
                                            <div className="filter_checkbox__item">
                                                <label>
                                                    <input className="real_checkbox" type="checkbox"/>
                                                    <span className="custom_checkbox"></span>
                                                    <p>Java</p>
                                                </label>
                                            </div>
                                        </div>
                                    </li>

                                </ul>
                            </div>

                            <div className={`dropdown ${dropdownActive2 ? 'active' : ""}`}
                                 style={{maxWidth: "300px", width: "100%"}}
                                 onClick={() => dropdownClick2()}>
                                <div className="select  small">
                                    <span className="small unselectable">Категория</span>
                                    <svg className="arrow" width="9" height="5" viewBox="0 0 9 5" fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path d="M4.5 5L8.39711 0.5H0.602886L4.5 5Z" fill="white"/>
                                    </svg>
                                </div>
                                <input type="hidden" name="language_code"/>
                                <ul className={`dropdown-menu  ${dropdownActive2 ? 'active' : ''}`}>
                                    <li>
                                        <div className="filter_checkbox">{/* Чекбоксы стилизованы */}
                                            <div className="filter_checkbox__item">
                                                <label>
                                                    <input className="real_checkbox" type="checkbox"/>
                                                    <span className="custom_checkbox"></span>
                                                    <p>Java</p>
                                                </label>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="filter_checkbox">{/* Чекбоксы стилизованы */}
                                            <div className="filter_checkbox__item">
                                                <label>
                                                    <input className="real_checkbox" type="checkbox"/>
                                                    <span className="custom_checkbox"></span>
                                                    <p>C++</p>
                                                </label>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="filter_checkbox">{/* Чекбоксы стилизованы */}
                                            <div className="filter_checkbox__item">
                                                <label>
                                                    <input className="real_checkbox" type="checkbox"/>
                                                    <span className="custom_checkbox"></span>
                                                    <p>C#</p>
                                                </label>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="filter_checkbox">{/* Чекбоксы стилизованы */}
                                            <div className="filter_checkbox__item">
                                                <label>
                                                    <input className="real_checkbox" type="checkbox"/>
                                                    <span className="custom_checkbox"></span>
                                                    <p>Python</p>
                                                </label>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="filter_checkbox">{/* Чекбоксы стилизованы */}
                                            <div className="filter_checkbox__item">
                                                <label>
                                                    <input className="real_checkbox" type="checkbox"/>
                                                    <span className="custom_checkbox"></span>
                                                    <p>JavaScript</p>
                                                </label>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="filter_checkbox">{/* Чекбоксы стилизованы */}
                                            <div className="filter_checkbox__item">
                                                <label>
                                                    <input className="real_checkbox" type="checkbox"/>
                                                    <span className="custom_checkbox"></span>
                                                    <p>Java</p>
                                                </label>
                                            </div>
                                        </div>
                                    </li>

                                </ul>
                            </div>

                            <div className={`dropdown ${dropdownActive3 ? 'active' : ""}`}
                                 style={{maxWidth: "300px", width: "100%"}}
                                 onClick={() => dropdownClick3()}>
                                <div className="select  small">
                                    <span className="small unselectable">Опубликовано</span>
                                    <svg className="arrow" width="9" height="5" viewBox="0 0 9 5" fill="none"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path d="M4.5 5L8.39711 0.5H0.602886L4.5 5Z" fill="white"/>
                                    </svg>
                                </div>
                                <input type="hidden" name="language_code"/>
                                <ul className={`dropdown-menu  ${dropdownActive3 ? 'active' : ''}`}>
                                    <li>Отклонено</li>
                                    <li>Черновик</li>
                                    <li>На модерации</li>
                                </ul>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CourseCreate;