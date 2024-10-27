import { FaUser, FaHome } from "react-icons/fa";
import { RiLogoutBoxLine } from "react-icons/ri";
import { MdDashboard } from "react-icons/md";
// import { IoMdArrowDropdown } from "react-icons/io";
import { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { Link } from "react-router-dom";
import { signOut, getAuth } from 'firebase/auth';
import app from "../firebase/firebase.config";


const Sidebar = () => {

    const [isCollapsed, setIsCollapsed] = useState(false); // Manage collapse state
    const auth = getAuth(app);

    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    };

    //Handle Signout
    const handleLogOut = () => {
        signOut(auth).then(() => { });
    };


    return (
        <div className={`h-screen ${isCollapsed ? "w-20" : "w-64"} bg-white shadow-lg transition-all duration-300`}>
            <div className="flex items-center justify-between px-6 py-4">
                {!isCollapsed && (
                    <div className="flex items-center">
                        <span className="text-lg font-bold text-gray-800">Green Forms</span>

                    </div>
                )}
                <button onClick={toggleSidebar} className="p-2 focus:outline-none">
                    <AiOutlineMenu size={24} />
                </button>
            </div>

            <nav className="px-2 py-4">
                <ul className="space-y-2">
                    <li>
                        <Link
                            to=""
                            className={`flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100 ${isCollapsed ? "justify-center" : ""
                                }`}
                        >
                            <MdDashboard size={20} />
                            {!isCollapsed && <span className="ml-3">Dashboard</span>}

                        </Link>
                    </li>

                    <li>
                        <Link
                            to="users"
                            className={`flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100 ${isCollapsed ? "justify-center" : ""
                                }`}
                        >
                            <FaUser size={20} />
                            {!isCollapsed && <span className="ml-3">Users</span>}
                        </Link>
                    </li>

                    <li>
                        <Link
                            to="/"
                            className={`flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100 ${isCollapsed ? "justify-center" : ""
                                }`}
                        >
                            <FaHome size={20} />
                            {!isCollapsed && <span className="ml-3">Home</span>}
                        </Link>
                    </li>



                    <li>
                        
                            <Link
                                to="#"
                                className={`flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100 ${isCollapsed ? "justify-center" : ""
                                    }`}
                            ><button onClick={handleLogOut} className="flex items-center">
                                <RiLogoutBoxLine size={20} />
                                {!isCollapsed && <span className="ml-3">Logout</span>}
                                </button>
                            </Link>
                        
                    </li>


                </ul>
            </nav>


        </div>
    );
};

export default Sidebar;
