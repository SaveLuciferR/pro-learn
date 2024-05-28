import {Link, useParams} from 'react-router-dom';
import ProfileCreateCourseButton from '../CreatedCourses/ProfileCreateCourseButton';
import ProfileUserTaskItem from './ProfileUserTaskItem';
import {useState, useEffect} from "react";
import axiosClient from "../../../axiosClient";
import SliderMain from "../../Slider/SliderMain";
import ProfileUserTaskSlider from "./ProfileUserTaskSlider";
import {useSelector} from "react-redux";

const ProfileUserTasks = () => {
    const {lang, username} = useParams();

    const user = useSelector(state => state.mainLayout.user);

    const [viewWords, setViewWords] = useState({});
    const [tasks, setTasks] = useState([]);

    useEffect(() => {

        axiosClient
            .get(`${lang === undefined ? '/' : '/' + lang + '/'}@${username}/task-from-user`)
            .then((res) => {
                setTasks(res.data.tasks);
            })
            .catch((err) => {
                console.log(err);
            })

        axiosClient
            .get(`${lang === undefined ? '/' : '/' + lang + '/'}@${username}`)
            .then(({data}) => {
                setViewWords(data.viewWords);
            });
    }, [lang, username]);

    return (
        <div>
            <div className="created-courses-header">
                <div className="lessons-header-back">
                    <svg
                        width="21"
                        height="21"
                        viewBox="0 0 21 21"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M13.125 4.375L7.875 10.5L13.125 16.625"
                            stroke="white"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                    </svg>
                    <Link to={`../../profile/${username}`}>{viewWords['tpl_profile_back-profile']}</Link>
                </div>
                <h1>_{viewWords['tpl_profile_created-task_title']}</h1>
            </div>
            <div className="profile-tasks">
                <ProfileCreateCourseButton type="task" viewWords={viewWords} isOwner={user.username === username}/>
                <ProfileUserTaskSlider viewWords={viewWords} data={tasks}/>
                {/*<ProfileUserTaskItem viewWords={viewWords}/>*/}
            </div>
        </div>
    );
};

export default ProfileUserTasks;
