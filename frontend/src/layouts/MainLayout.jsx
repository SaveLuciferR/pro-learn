import { useState, useEffect } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { Outlet, useParams } from 'react-router-dom';

import axiosClient from "../axiosClient";
import {useDispatch} from "react-redux";
import {setUserAuth} from "../redux/MainLayout/slice";

const MainLayout = ({ isActiveSidebar, isCompiler }) => {

    const { lang } = useParams();

    const dispatch = useDispatch();

    const [language, setLanguage] = useState({});
    const [languages, setLanguages] = useState({});
    const [layoutWords, setLayoutWords] = useState({});
    const [activeSidebar, setActiveSidebar] = useState(isActiveSidebar);
    const [activeCompiler, setActiveCompiler] = useState(isCompiler);

    useEffect(() => {
        axiosClient.post(`${lang === undefined ? "/" : '/' + lang + '/'}language`)
            .then(({ data }) => {
                setLanguage(data.language);
                setLanguages(data.languages);
                setLayoutWords(data.layoutWords);
            });
    }, [lang]);

    useEffect(() => {
        axiosClient.post(`user/auth`, {client: localStorage.getItem('client')})
            .then(({data}) => {
                dispatch(setUserAuth(data.auth));
                console.log(data);
            })
    }, [])

    return (
        <>
            {Object.keys(languages).length === 0 ?
                <div>Loading....</div>
                :
                <>
                    <Header language={language} languages={languages} layoutWords={layoutWords} />
                    {activeSidebar ? <Sidebar /> : <></>}
                    <div className={`main ${activeSidebar ? 'active-sidebar' : ''} ${activeCompiler ? 'active-compiler' : ''}`}>
                        <>
                            {activeCompiler ?
                                <Outlet context={
                                    {
                                        activeSidebar: [(v) => setActiveSidebar(v)],
                                        activeCompiler: [(v) => setActiveCompiler(v)]
                                    }} />
                                :
                                <div className="container">
                                    <Outlet context={{
                                        activeSidebar: [(v) => setActiveSidebar(v)],
                                        activeCompiler: [(v) => setActiveCompiler(v)]
                                    }} />
                                </div>}
                        </>
                    </div>
                </>
            }
        </>
    );
}

export default MainLayout;