import { Outlet } from 'react-router-dom';
import AdminSidebar from '../components/Admin/AdminSidebar';

const AdminPage = () => {
  return (
    <div className="admin">
      <AdminSidebar />
      <div className="admin-main">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminPage;
