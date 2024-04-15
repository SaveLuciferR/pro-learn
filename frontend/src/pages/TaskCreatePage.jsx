import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {useParams} from "react-router-dom";
import ProfileSidebarMain from "../components/Profile/ProfileSidebarMain";
import img from "../header_bg.png";
import TaskCreateMain from "../components/Task/TaskCreate/TaskCreateMain";
import DropdownCheckbox from "../components/DropdownCheckbox";


const TaskCreatePage = ({type}) => {

    const testLang = [
        {
            id: 1,
            title: 'C#',
        },
        {
            id: 3,
            title: 'Java'
        },
        {
            id: 2,
            title: 'Python'
        },
    ]

    const testCategory = [
        {
            id: 1,
            title: 'web',
        },
        {
            id: 2,
            title: 'tes2',
        },
        {
            id: 3,
            title: 'trt3',
        },
    ]

    const [dropdownActive1, setDropdownActive1] = useState(false);
    const dropdownClick1 = () => setDropdownActive1(!dropdownActive1);

    const [checkContent1, setCheckContent1] = useState([]);
    const [checkContent2, setCheckContent2] = useState([]);

    const dispatch = useDispatch();

    const {slug, username, lang} = useParams();

    useEffect(() => {
        console.log(checkContent2)
    }, [checkContent2])

    return (
        <div className="profile-section">
            <ProfileSidebarMain/>
            <div className="profile-section-main">
                <h1 className="profile-settings-title big text-center-create">{type === 'edit' ? "_Изменить задачу" : "_Создать задачу"}</h1>
                <div className="course-create-header">
                    <div className="course-create-second_header task-second_header">
                        <div className="course-create-top">
                            <span>_Сложность: </span>
                            <div className="inline-block">
                                <ul className="profile-difficulty-range inline">

                                    <li className={`hover profile-difficulty-range-item active`}></li>
                                    <li className={`hover profile-difficulty-range-item active`}></li>
                                    <li className={`hover profile-difficulty-range-item active`}></li>
                                    <li className={`hover profile-difficulty-range-item active`}></li>
                                    <li className={`hover profile-difficulty-range-item`}></li>

                                </ul>
                            </div>
                        </div>
                        <div className="course-create-down">

                            <DropdownCheckbox title={"Категория"} content={testCategory} checkContent={checkContent1}
                                              setCheckContent={setCheckContent1}/>
                            <DropdownCheckbox title={"Языки программирования"} content={testLang}
                                              checkContent={checkContent2} setCheckContent={setCheckContent2}/>
                            <button className={'btn secondary-blue big'}>Перейти к проекту</button>
                            <button className={'btn underline-hover'}>Привязать проект</button>

                        </div>
                    </div>
                </div>
                <TaskCreateMain type={type}/>
            </div>
        </div>
    );
}

export default TaskCreatePage;