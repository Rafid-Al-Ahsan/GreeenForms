/* eslint-disable no-unused-vars */
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GithubAuthProvider, GoogleAuthProvider } from "firebase/auth";
import { Link, useLocation, useNavigate } from "react-router-dom";
import app from "../firebase/firebase.config";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IoLeaf } from "react-icons/io5";
import axios from 'axios';
import { useState } from 'react';

const auth = getAuth(app);

const Login = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';
    const [role, setRole] = useState('');

    const handleLogin = event => {
        event.preventDefault();
        const form = event.target;
        const email = form.emailfield.value;
        const password = form.passwordfield.value;


      // Fetch user data from the server using email
      fetch(`https://greenforms-serverside.vercel.app/registereduser/${email}`)
      .then(response => response.json())
      .then(data => {
         if(data.role === "Blocked"){
            toast.error('Your account is blocked. Please contact support.', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            return; 
         }

         signInWithEmailAndPassword(auth, email, password)
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser);
                navigate(from, { replace: true })
            })
            .catch(error => {
                toast.error(error.message, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            })
      })

        

    }

    const googleProvider = new GoogleAuthProvider();
    const googleLogin = () => {
        const role = "User";

        signInWithPopup(auth, googleProvider)
            .then(result => {
                const loggedInUser = result.user;
                const saveUser = { name: loggedInUser.displayName, email: loggedInUser.email, role: role, img: loggedInUser.photoURL };
                axios.post('https://greenforms-serverside.vercel.app/registereduser', saveUser)
                navigate(from, { replace: true })
                console.log(loggedInUser)
            })
            .catch(error => {
                console.error(error.message);
            })
    }

    // const provider = new GithubAuthProvider();
    // const githubLogin = () => {
    //     const role = "User";

    //     signInWithPopup(auth, provider)
    //         .then(result => {
    //             const loggedInUser = result.user;
    //             const saveUser = { name: loggedInUser.displayName, email: loggedInUser.email, role: role, img: loggedInUser.photoURL };
    //             axios.post('https://greenforms-serverside.vercel.app/registereduser', saveUser)
    //             navigate(from, { replace: true })
    //         })
    //         .catch(error => {
    //             console.error(error.message);
    //         })
    // }


    return (
        <div>

            <Link to="/"><div className="flex items-center justify-center bg-gray-100 absolute left-[35%] top-[5%]">
                <IoLeaf className="h-8 w-8 sm:h-10 sm:w-10 text-teal-800" />
                <span className="ml-3 text-teal-800 text-2xl  font-semibold">
                    Green Forms
                </span>
                

            </div></Link>


            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
                    <h2 className="text-center text-2xl font-semibold mb-6">Please Login</h2>

                    <form onSubmit={handleLogin}>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-medium mb-2">
                                Email address
                            </label>
                            <input
                                type="email"
                                placeholder="email"
                                name="emailfield"
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                            />
                        </div>

                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-medium mb-2">
                                Password
                            </label>
                            <input
                                type="password"
                                placeholder="password"
                                name="passwordfield"
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full py-2 bg-teal-600  text-white rounded-md hover:bg-teal-700 transition-colors mb-4"
                        >
                            Login
                        </button>
                    </form>

                    <p className="text-center text-sm text-gray-600">
                        Do not have an account?{' '}
                        <Link to="/registration" className="text-[rgb(0,127,170)] hover:underline">
                            Register
                        </Link>
                    </p>

                    <div className="flex items-center my-4">
                        <hr className="w-full border-gray-300" />
                        <span className="px-2 text-gray-400">OR</span>
                        <hr className="w-full border-gray-300" />
                    </div>

                    <button onClick={googleLogin} className="w-full flex items-center justify-center py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-100 transition-colors">
                        <img src="https://www.svgrepo.com/show/355037/google.svg" alt="Google" className="w-5 h-5 mr-2" />
                        Login using Google
                    </button>
                    {/* <br />
                    <button onClick={githubLogin} className="w-full flex items-center justify-center py-2 bg-white border border-gray-300 rounded-md hover:bg-gray-100 transition-colors">
                        <img src="https://www.svgrepo.com/show/512317/github-142.svg" alt="Google" className="w-5 h-5 mr-2" />
                        Login using Github
                    </button> */}
                </div>

                <ToastContainer />
            </div>


        </div>
    );
};

export default Login;