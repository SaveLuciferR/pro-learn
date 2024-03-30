import {Outlet} from "react-router-dom";


const AdminLayout = () => {

    return (
        <div className={'main'}>
            <Outlet/>
        </div>
    );
}

export default AdminLayout;