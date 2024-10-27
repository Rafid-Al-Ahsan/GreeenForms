
import Sidebar from './Sidebar';
import { Outlet } from "react-router-dom";

const AdminMain = () => {
    return (
        <div className="flex">
            <div><Sidebar /></div>
            <div className='w-full'><Outlet></Outlet></div>
        </div>
    );
};

export default AdminMain;