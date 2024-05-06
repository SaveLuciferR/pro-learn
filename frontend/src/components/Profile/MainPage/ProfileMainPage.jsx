import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosClient from '../../../axiosClient';
import CompleteCourseMain from './CompleteCourseMain';
import CurrentCourseMain from './CurrentCourseMain';
import ProfileInfo from './ProfileInfo';
import ProfileProjects from './ProfileProjects';
import LoadingElement from '../../LoadingElement';

const ProfileMainPage = () => {
    const {lang, username} = useParams();
    const [userData, setUserData] = useState([]);
    const [viewWords, setViewWords] = useState({});
    // const [completedCourse, setCompletedCourse] = useState([]);

    useEffect(() => {
        axiosClient
            .get(`${lang === undefined ? '/' : '/' + lang + '/'}@${username}`)
            .then(({data}) => {
                console.log(data)
                setUserData(data.profileInfo);
                setViewWords(data.viewWords);
            });
    }, [lang, username]);

    return (
        <>
            {Object.keys(userData).length === 0 ? (
                <LoadingElement/>
            ) : (
                <div className="profile-section-main-cards">
                    <ProfileInfo data={userData} viewWords={viewWords}/>
                    <CurrentCourseMain data={userData} viewWords={viewWords}/>
                    <ProfileProjects data={userData} viewWords={viewWords}/>
                    <CompleteCourseMain data={userData} viewWords={viewWords}/>
                </div>
            )}
        </>
    );};

export default ProfileMainPage;
