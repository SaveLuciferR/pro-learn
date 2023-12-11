import { useState, useEffect } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { Outlet, useParams } from 'react-router-dom';

import axiosClient from "../axiosClient";

const MainLayout = ({ isActiveSidebar }) => {

    const { lang } = useParams();

    const [language, setLanguage] = useState({});
    const [languages, setLanguages] = useState({});
    const [layoutWords, setLayoutWords] = useState({});
    const [activeSidebar, setActiveSidebar] = useState(isActiveSidebar);

    useEffect(() => {
        axiosClient.post(`${lang === undefined ? "/" : '/' + lang + '/'}language`)
            .then(({ data }) => {
                setLanguage(data.language);
                setLanguages(data.languages);
                setLayoutWords(data.layoutWords);
            });
    }, [lang]);

    return (
        <>
            {Object.keys(languages).length === 0 ?
                <div>Loading....</div>
                :
                <>
                    <Header language={language} languages={languages} layoutWords={layoutWords}/>
                    {/* {activeSidebar ? <Sidebar/> : <></>} */}
                    <Sidebar />
                    <div className="main">
                        {/* <div className="container"> */}
                            <Outlet context={activeSidebar} />
                        {/* </div> */}
                    </div>
                </>
            }
        </>
    );
}

export default MainLayout;