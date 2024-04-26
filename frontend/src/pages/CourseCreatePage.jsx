import img from "../header_bg.png";
import ProfileSidebarMain from "../components/Profile/ProfileSidebarMain";
import CourseCreateMain from "../components/Courses/CourseCreate/CourseCreateMain";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setCurrentCourse, setCurrentCourseEdit, setCurrentCourseMainInfo} from "../redux/Course/slice";
import axiosClient from "../axiosClient";
import {useMatch, useParams} from "react-router-dom";


const CourseCreatePage = ({type = 'create'}) => {

    const [dropdownActive1, setDropdownActive1] = useState(false);
    const [dropdownActive2, setDropdownActive2] = useState(false);
    // const [dropdownActive3, setDropdownActive3] = useState(false);
    const dropdownClick1 = () => setDropdownActive1(!dropdownActive1);
    const dropdownClick2 = () => setDropdownActive2(!dropdownActive2);
    // const dropdownClick3 = () => setDropdownActive3(!dropdownActive3);

    const dispatch = useDispatch();

    const {slug, username, lang} = useParams();

    const course = useSelector(state => state.course.currentCourseEdit);

    const [successToGetCourse, setSuccessToGetCourse] = useState(false);
    const [uploadIcon, setUploadIcon] = useState(null);
    const [difficultyAmount, setDifficultyAmount] = useState([false, false, false, false, false]);
    const [allCategoryProg, setAllCategoryProg] = useState([]);
    const [allLangProg, setAllLangProg] = useState([]);

    const [langProg, setLangProg] = useState([]);
    const [difficulty, setDifficulty] = useState(1);
    const [icon, setIcon] = useState('');
    const [categoryLang, setCategoryLang] = useState([]);
    const [status, setStatus] = useState("draft");

    useEffect(() => {
        if (type === 'edit') {
            axiosClient
                .get(`@${username}/creation/edit-course/${slug}`)
                .then(({data}) => {
                    if (data.result.success) {
                        console.log(data);
                        dispatch(setCurrentCourse({course: data.result.course}));
                        setDifficulty(data.result.course.difficulty);
                        setIcon(data.result.course.icon);
                        setCategoryLang([]);
                        setLangProg([]);
                        setLangProg(data.result.course.lang_prog);
                        setCategoryLang(data.result.course.category_prog);
                        setSuccessToGetCourse(true);
                    }
                })
        } else {
            const temp = {
                difficulty: 1,
                icon: '',
                slug: '',
                lang_prog: [],
                category_prog: [],
                status: "draft",
                main: {
                    '1': {
                        block: {}
                    }
                }
            }

            setSuccessToGetCourse(true);
            dispatch(setCurrentCourse({course: temp}));
        }

        axiosClient
            .get(`${lang === undefined ? "/" : '/' + lang + '/'}@${username}/creation/course/category-lang-prog`)
            .then(({data}) => {
                console.log(data);
                setAllCategoryProg(data.category_lang);
                setAllLangProg(data.lang_prog);
            })
    }, [])

    useEffect(() => {
        setDifficultyAmount(prevState => prevState.map((item, i) => difficulty > i));
    }, [difficulty])

    useEffect(() => {
        if (uploadIcon) {
            axiosClient
                .post(`@${username}/creation/course/save-icon`, {icon: uploadIcon}, {headers: {"Content-Type": "multipart/form-data"}})
                .then(({data}) => {
                    setIcon(data.icon);
                })
        }
    }, [uploadIcon]);

    useEffect(() => {
        if (successToGetCourse) {
            dispatch(setCurrentCourseMainInfo({difficulty, icon, category_prog: categoryLang, lang_prog: langProg}))
        }
    }, [langProg, difficulty, icon, categoryLang])

    useEffect(() => {
        console.log(course);
    }, [course])

    const onClickCategoryProg = (id) => {
        if (categoryLang.includes(id)) {
            setCategoryLang(prevState => prevState.filter((item) => item !== id));
        } else {
            setCategoryLang(prevState => [...prevState, id]);
        }
    }

    const onClickLangProg = (id) => {
        if (langProg.includes(id)) {
            setLangProg(prevState => prevState.filter((item) => item !== id));
        } else {
            setLangProg(prevState => [...prevState, id]);
        }
    }

    return (
        <>
            {!successToGetCourse || allCategoryProg === undefined ?
                <div>Loading...</div> :

                <div className="profile-section">
                    <ProfileSidebarMain/>
                    <div className="profile-section-main">
                        <h1 className="profile-settings-title big text-center-create">{type === 'edit' ? "_Изменить курс" : "_Создать курс"}</h1>
                        <div className="course-create-header">
                            <label className="input-file course-create-icon">
                                <div className="sidebar_profile-create_item">
                                    <input height={'100%'} hidden={true} onChange={(e) => setUploadIcon(e.target.files)}
                                           type="file" accept={"image/*"}
                                           name="project"/>
                                    {course.icon ?
                                        <img alt={"загруженная картинка"} src={course.icon}/> :
                                        <>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="37" height="37"
                                                 viewBox="0 0 37 37"
                                                 fill="none">
                                                <path
                                                    d="M21.4979 0V15.7724H37V21.3462H21.4979V37H15.3049V21.3462H0V15.7724H15.3049V0H21.4979Z"/>
                                            </svg>
                                            <span>Иконка</span>
                                        </>
                                    }
                                </div>
                            </label>
                            <div className="course-create-second_header">
                                <div className="course-create-top">
                                    <span>_Сложность: </span>
                                    <div className="inline-block">
                                        <ul className="profile-difficulty-range inline">

                                            {difficultyAmount.map((item, i) =>
                                                <li onClick={() => setDifficulty(i + 1)}
                                                    className={`hover profile-difficulty-range-item ${item ? 'active' : ''}`}></li>)}
                                        </ul>
                                    </div>
                                </div>
                                <div className="course-create-down">

                                    <div className={`dropdown ${dropdownActive1 ? 'active' : ""}`}
                                         style={{maxWidth: "300px", width: "100%"}}
                                         onClick={() => dropdownClick1()}>
                                        <div className="select  small">
                                            <span className="small unselectable">Категория</span>
                                            <svg className="arrow" width="9" height="5" viewBox="0 0 9 5" fill="none"
                                                 xmlns="http://www.w3.org/2000/svg">
                                                <path d="M4.5 5L8.39711 0.5H0.602886L4.5 5Z" fill="white"/>
                                            </svg>
                                        </div>
                                        <input type="hidden" name="language_code"/>
                                        <ul className={`dropdown-menu  ${dropdownActive1 ? 'active' : ''}`}>

                                            {allCategoryProg.map((item) =>
                                                <li>
                                                    <div className="filter_checkbox">
                                                        <div className="filter_checkbox__item">
                                                            <label>
                                                                <input className="real_checkbox" type="checkbox"
                                                                       onChange={() => onClickCategoryProg(item.id)}
                                                                       value={categoryLang.includes(item.id)}/>
                                                                <span className="custom_checkbox"></span>
                                                                <p>{item.title}</p>
                                                            </label>
                                                        </div>
                                                    </div>
                                                </li>
                                            )}

                                        </ul>
                                    </div>

                                    <div className={`dropdown ${dropdownActive2 ? 'active' : ""}`}
                                         style={{maxWidth: "300px", width: "100%"}}
                                         onClick={() => dropdownClick2()}>
                                        <div className="select  small">
                                            <span className="small unselectable">Язык программирования</span>
                                            <svg className="arrow" width="9" height="5" viewBox="0 0 9 5" fill="none"
                                                 xmlns="http://www.w3.org/2000/svg">
                                                <path d="M4.5 5L8.39711 0.5H0.602886L4.5 5Z" fill="white"/>
                                            </svg>
                                        </div>
                                        <input type="hidden" name="language_code"/>
                                        <ul className={`dropdown-menu  ${dropdownActive2 ? 'active' : ''}`}>

                                            {allLangProg.map((item) =>
                                                <li>
                                                    <div className="filter_checkbox">{/* Чекбоксы стилизованы */}
                                                        <div className="filter_checkbox__item">
                                                            <label>
                                                                <input className="real_checkbox" type="checkbox"
                                                                       onChange={() => onClickLangProg(item.id)}
                                                                       value={langProg.includes(item.id)}/>
                                                                <span className="custom_checkbox"></span>
                                                                <p>{item.title}</p>
                                                            </label>
                                                        </div>
                                                    </div>
                                                </li>
                                            )}

                                        </ul>
                                    </div>

                                    {/*<div className={`dropdown ${dropdownActive3 ? 'active' : ""}`}*/}
                                    {/*     style={{maxWidth: "300px", width: "100%"}}*/}
                                    {/*     onClick={() => dropdownClick3()}>*/}
                                    {/*    <div className="select  small">*/}
                                    {/*        <span className="small unselectable">Опубликовано</span>*/}
                                    {/*        <svg className="arrow" width="9" height="5" viewBox="0 0 9 5" fill="none"*/}
                                    {/*             xmlns="http://www.w3.org/2000/svg">*/}
                                    {/*            <path d="M4.5 5L8.39711 0.5H0.602886L4.5 5Z" fill="white"/>*/}
                                    {/*        </svg>*/}
                                    {/*    </div>*/}
                                    {/*    <input type="hidden" name="language_code"/>*/}
                                    {/*    <ul className={`dropdown-menu  ${dropdownActive3 ? 'active' : ''}`}>*/}
                                    {/*        <li>Отклонено</li>*/}
                                    {/*        <li>Черновик</li>*/}
                                    {/*        <li>На модерации</li>*/}
                                    {/*    </ul>*/}
                                    {/*</div>*/}

                                </div>
                            </div>
                        </div>
                        <CourseCreateMain type={type}/>
                    </div>
                </div>
            }
        </>
    );
}

export default CourseCreatePage;