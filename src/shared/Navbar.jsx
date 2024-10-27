import { IoLeaf } from "react-icons/io5";
import app from "../firebase/firebase.config";
import { getAuth, signOut } from "firebase/auth";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from '../provider/AuthProvider';
import { FaAngleDown } from "react-icons/fa";
import { useState } from 'react';

const Navbar = () => {

    const { user } = useContext(AuthContext);
    const auth = getAuth(app);
    const [role, setRole] = useState('');

    const handleLogOut = () => {
        signOut(auth).then(() => { });
    };

    fetch(`https://greenforms-serverside.vercel.app/registereduser/${user?.email}`)
    .then(res => res.json())
    .then(data => setRole(data.role))

    return (
        <nav className="bg-teal-50 py-4 px-8 flex items-center justify-between shadow-md">
            {/* Left-hand side: Logo and Company Name */}
           <Link to="/"><div className="flex items-center">
                <IoLeaf className="h-8 w-8 sm:h-10 sm:w-10 text-teal-800" />
                <span className="ml-3 text-teal-800 text-lg  font-semibold">
                    Green Forms
                </span>
                {user? <Link to='/header'><button className="text-gray-500 font-semibold px-10 py-2 rounded-lg sm:text-sm md:text-lg flex items-center gap-2"><FaAngleDown />Forms</button></Link> : <></>}
                {role === "Admin" && <Link to='/dashboard'><button className="text-gray-500 font-semibold py-2 rounded-lg sm:text-sm md:text-lg flex items-center gap-2"><FaAngleDown />Admin Panel</button></Link>}

            </div></Link>

            {/* Right-hand side: Profile Image and Logout Button */}
            <div className="flex items-center">
                {user && <img
                    src={user?.photoURL}// Replace with profile photo URL
                    alt="Profile Photo"
                    className="mx-5 rounded-full border border-gray-300 fluid"
                    style={{ width: "3rem", height: "3rem" }}
                    title={user?.displayName}
                />}

                {/* {user ? (
                    <button onClick={handleLogOut} className="text-white bg-teal-600 px-4 py-2 rounded-lg hover:bg-teal-700 transition duration-300">Logout</button>
                ) : (
                    // Conditionally render either 'Login' or 'Sign Up' button
                    isLoginPage ? (
                        <Link to='/registration'><button className="text-white bg-teal-600 px-4 py-2 rounded-lg hover:bg-teal-700 transition duration-300">Sign Up</button></Link>
                    ) : isRegistrationPage ? (
                        <Link to='/login'><button className="text-white bg-teal-600 px-4 py-2 rounded-lg hover:bg-teal-700 transition duration-300">Login</button></Link>
                    ) : (
                        // Default to 'Sign Up' if it's not on login/registration pages
                        <Link to='/registration'><button className="text-white bg-teal-600 px-4 py-2 rounded-lg hover:bg-teal-700 transition duration-300">Sign Up</button></Link>
                    )
                )} */}

                {user? <></> : <Link to='/registration'><button className="text-gray-500 font-semibold px-4 py-2 rounded-lg mr-5">Sign Up</button></Link>}

                {user ? 
                    <button onClick={handleLogOut} className="text-white bg-teal-600 px-4 py-2 rounded-lg hover:bg-teal-700 transition duration-300">Logout</button>:
                    <Link to='/login'><button className="text-white bg-teal-600 px-4 py-2 rounded-lg hover:bg-teal-700 transition duration-300">Login</button></Link>}




            </div>
        </nav>
    );
};

export default Navbar;