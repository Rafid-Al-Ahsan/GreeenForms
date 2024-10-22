import { Link } from "react-router-dom";
import { createUserWithEmailAndPassword, getAuth, signOut, updateProfile } from 'firebase/auth';
import app from '../firebase/firebase.config';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IoLeaf } from "react-icons/io5";


const Registration = () => {
    const auth = getAuth(app);

    // const navigate = useNavigate();

    const handleRegister = (event) => {

        event.preventDefault();
        const form = event.target;
        const photo = form.photo.value;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;


        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                const createdUser = result.user;

                updateProfile(createdUser, { photoURL: photo, displayName: name })
                    .then(() => {
                        console.log('User profile updated successfully.');
                    })
                    .catch((updateError) => {
                        console.error('Error updating user profile:', updateError);
                    });

                signOut(auth);

                toast.success('User created successful! Please go to the login page and login', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });

                event.target.reset();
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



    }
    return (
        <div>

            <Link to="/"><div className="flex items-center justify-center bg-gray-100 absolute left-[35%] top-[5%]">
                <IoLeaf className="h-8 w-8 sm:h-10 sm:w-10 text-teal-800" />
                <span className="ml-3 text-teal-800 text-2xl  font-semibold">
                    Green Forms
                </span>


            </div></Link>

            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="bg-white shadow-xl rounded-lg p-8 max-w-md w-full">
                    <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Create Your Account</h2>

                    <form onSubmit={handleRegister}>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-medium mb-1">Photo URL</label>
                            <input
                                type="text"
                                placeholder="https://example.com/photo.jpg"
                                name="photo"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-medium mb-1">Name</label>
                            <input
                                type="text"
                                placeholder="Your Name"
                                name="name"
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-medium mb-1">Email address</label>
                            <input
                                type="email"
                                placeholder="you@example.com"
                                name="email"
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-medium mb-1">Password</label>
                            <input
                                type="password"
                                placeholder="••••••••"
                                name="password"
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full py-3 bg-teal-600 text-white rounded-lg shadow-md hover:bg-teal-600 transition-all duration-300"
                        >
                            Register
                        </button>

                        <ToastContainer />

                        <div className="text-center mt-4 text-sm">
                            <p className="text-gray-600">
                                Already have an account?{' '}
                                <Link to="/login" className="text-[rgb(0,127,170)] hover:underline">
                                    Login
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>

        </div>
    );
};

export default Registration;