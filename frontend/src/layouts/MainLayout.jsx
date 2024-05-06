import {useState, useEffect} from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import {Outlet, useParams} from 'react-router-dom';

import axiosClient from "../axiosClient";
import {useDispatch, useSelector} from "react-redux";
import {
    setUserAuth, setUser, setNeedReloadPage, setActiveSidebar, setLanguages,
    setCurrentLanguage,
    setNeedActivateAccount
} from "../redux/MainLayout/slice";
import SidebarProfile from "../components/Profile/SidebarProfile";
import ModalWindow from '../components/Modal/ModalWindow';
import CompilerTaskDescription from "../components/Compiler/CompilerTaskDescription";


const MainLayout = ({isActiveSidebar, isCompiler, success}) => {

    const {lang} = useParams();

    const dispatch = useDispatch();
    const sidebarProfileActive = useSelector(state => state.mainLayout.sidebarProfileActive);
    const needReloadPage = useSelector(state => state.mainLayout.needReloadPage);

    const languages = useSelector(state => state.mainLayout.languages);
    const [language, setLanguage] = useState({});
    // const [languages, setLanguages] = useState({});
    const [layoutWords, setLayoutWords] = useState({});
    // const [activeSidebar, setActiveSidebar] = useState(isActiveSidebar);
    const [activeCompiler, setActiveCompiler] = useState(isCompiler);

    const activeSidebar = useSelector(state => state.mainLayout.activeSidebar);
    useEffect(() => {
        dispatch(setActiveSidebar(isActiveSidebar));
    })

    useEffect(() => {
        axiosClient.post(`${lang === undefined ? "/" : '/' + lang + '/'}language`)
            .then(({data}) => {
                setLanguage(data.language);
                dispatch(setLanguages(data.languages));
                setLayoutWords(data.layoutWords);
                dispatch(setCurrentLanguage(lang));
            });
    }, [lang]);

    useEffect(() => {
        if (needReloadPage) {
            axiosClient.post(`/user/auth`, {client2: localStorage.getItem('client'),})
                .then(({data}) => {
                    dispatch(setUserAuth(data.auth));
                    dispatch(setUser(data.user));
                    dispatch(setNeedActivateAccount(data.needActivateAccount));
                    // console.log(data.user);
                });

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
                    {/*{activeCompiler ? <CompilerTaskDescription/> : <></>}*/}
                    <div
                        className={`main ${activeSidebar ? 'active-sidebar' : ''} ${activeCompiler ? 'active-compiler' : ''}`}>
                        <>
                            {activeCompiler ?
                                <>
                                    <Outlet context={
                                        {
                                            activeSidebar: [(v) => setActiveSidebar(v)],
                                            activeCompiler: [(v) => setActiveCompiler(v)]
                                        }}/>
                                </>
                                :
                                <div className="container">
                                    <Outlet context={{
                                        activeSidebar: [(v) => setActiveSidebar(v)],
                                        activeCompiler: [(v) => setActiveCompiler(v)]
                                    }}/>
                                </div>}
                            {sidebarProfileActive ? <SidebarProfile viewWords={layoutWords}/> : <></>}
                        </>
                    </div>
                </>
            }
        </>
    );
}

export default MainLayout;