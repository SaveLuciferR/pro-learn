import {useParams, Link} from 'react-router-dom';
import {useEffect, useState} from 'react';
import axiosClient from '../../../axiosClient';
import SliderMain from '../../Slider/SliderMain';
import LoadingElement from '../../LoadingElement';

const ProfileTasks = () => {
    const {lang, username} = useParams();
    const [tasks, setTasks] = useState([]);
    const [viewWords, setViewWords] = useState({});

    useEffect(() => {

        axiosClient
            .get(`${lang === undefined ? '/' : '/' + lang + '/'}@${username}`)
            .then(({data}) => {
                setViewWords(data.viewWords);
            });

        axiosClient
            .get(`${lang === undefined ? '/' : '/' + lang + '/'}@${username}/task-list`)
            .then(({data}) => {
                setTasks(data.tasks);
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
                <h1>_{viewWords['tpl_profile_task_title']}</h1>
            </div>
            <div className="profile-tasks">
                {tasks === undefined || tasks.length === 0 ? (
                    <div className="profile-none">{viewWords['tpl_profile_task_missing']} :(</div>
                ) : (
                    <SliderMain data={tasks} sliderType="profileTasks" countSlide={2} viewWords={viewWords}/>
                )}
            </div>
        </div>
    );
};

export default ProfileTasks;
