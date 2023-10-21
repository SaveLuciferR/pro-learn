import { useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { Outlet } from 'react-router-dom';

const MainLayout = ({isActiveSidebar}) => {

    const [activeSidebar, setActiveSidebar] = useState(isActiveSidebar);

    return(
        <>
            <Header/>
            {activeSidebar ? <Sidebar/> : <></>}
            <Outlet context={[setActiveSidebar]}/>
        </>
    );
}

export default MainLayout;