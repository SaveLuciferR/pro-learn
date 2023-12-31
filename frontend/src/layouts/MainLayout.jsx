import {useState, useEffect} from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import {Outlet, useParams} from 'react-router-dom';

import axiosClient from "../axiosClient";
import {useDispatch, useSelector} from "react-redux";
import {setUserAuth, setUser, setNeedReloadPage} from "../redux/MainLayout/slice";
import SidebarProfile from "../components/Profile/SidebarProfile";
import axios from "axios";

const MainLayout = ({isActiveSidebar, isCompiler}) => {

    const {lang} = useParams();

    const dispatch = useDispatch();
    const sidebarProfileActive = useSelector(state => state.mainLayout.sidebarProfileActive);
    const needReloadPage = useSelector(state => state.mainLayout.needReloadPage);

    const [language, setLanguage] = useState({});
    const [languages, setLanguages] = useState({});
    const [layoutWords, setLayoutWords] = useState({});
    const [activeSidebar, setActiveSidebar] = useState(isActiveSidebar);
    const [activeCompiler, setActiveCompiler] = useState(isCompiler);

    useEffect(() => {
        axiosClient.post(`${lang === undefined ? "/" : '/' + lang + '/'}language`)
            .then(({data}) => {
                setLanguage(data.language);
                setLanguages(data.languages);
                setLayoutWords(data.layoutWords);
            });
    }, [lang]);

    useEffect(() => {
        if (needReloadPage) {
            axiosClient.post(`/user/auth`, {client2: localStorage.getItem('client'), })
                .then(({data}) => {
                    dispatch(setUserAuth(data.auth));
                    dispatch(setUser(data.user));
                    console.log(data.user);
                });

            // axiosClient.post('/user/get-session-id', {client: localStorage.getItem('client')})
            //     .then(({data}) => {
            //         localStorage.setItem('client', data.client);
            //     })

            dispatch(setNeedReloadPage(false));
        }
    }, [needReloadPage]);

    return (
        <>
            {Object.keys(languages).length === 0 ?
                <div>Loading....</div>
                :
                <>
                    <Header language={language} languages={languages} layoutWords={layoutWords}/>
                    {activeSidebar ? <Sidebar/> : <></>}
                    <div
                        className={`main ${activeSidebar ? 'active-sidebar' : ''} ${activeCompiler ? 'active-compiler' : ''}`}>
                        <>
                            {activeCompiler ?
                                <Outlet context={
                                    {
                                        activeSidebar: [(v) => setActiveSidebar(v)],
                                        activeCompiler: [(v) => setActiveCompiler(v)]
                                    }}/>
                                :
                                <div className="container">
                                    <Outlet context={{
                                        activeSidebar: [(v) => setActiveSidebar(v)],
                                        activeCompiler: [(v) => setActiveCompiler(v)]
                                    }}/>
                                </div>}
                            {sidebarProfileActive ? <SidebarProfile/> : <></>}
                        </>
                    </div>
                </>
            }
        </>
    );
}

export default MainLayout;