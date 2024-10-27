import { useState } from "react";
import Swal from "sweetalert2";
import { TbLockFilled } from "react-icons/tb";
import { MdDelete } from "react-icons/md";
import { AuthContext } from "../provider/AuthProvider";
import { useContext } from "react";
import { signOut, getAuth} from 'firebase/auth';
import app from "../firebase/firebase.config";


const Users = () => {

    const { user } = useContext(AuthContext)
    const [users, setUsers] = useState([]);
    const auth = getAuth(app);


    fetch(`https://greenforms-serverside.vercel.app/registereduser`)
        .then(response => response.json())
        .then(data => setUsers(data))


    const makeUser = (id) => {
        const value = "User";
        const role = { value };

        fetch(`https://greenforms-serverside.vercel.app/registereduser/${id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(role)
        }).then(() => {
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "User role changed to User",
                showConfirmButton: false,
                timer: 1500
            });
        })
            .catch((error) => {
                console.log(error);
            })
    };



    const makeAdmin = (id) => {
        const value = "Admin";
        const role = { value };

        fetch(`https://greenforms-serverside.vercel.app/registereduser/${id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(role)
        }).then(() => {
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "User role changed to Admin",
                showConfirmButton: false,
                timer: 1500
            });
        })
            .catch((error) => {
                console.log(error);
            })
    };

    const block = (id,email) => {
        const value = "Blocked";
        const role = { value };

        fetch(`https://greenforms-serverside.vercel.app/registereduser/${id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(role)
        }).then(() => {
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "The user has been blocked",
                showConfirmButton: false,
                timer: 1500
            });
        })
            .catch((error) => {
                console.log(error);
            })

            if (email === user.email) { // Replace `currentUserEmail` with the actual email of the logged-in user
                handleLogOut(); // Call the logout function
            }
    };

    const handleDelete = (email) => {

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {

            if (result.isConfirmed) {
                fetch(`https://greenforms-serverside.vercel.app/registereduser/${email}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                })

                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "The user has been deleted",
                    showConfirmButton: false,
                    timer: 1500
                });

                if (email === user.email) { // Replace `currentUserEmail` with the actual email of the logged-in user
                    handleLogOut(); // Call the logout function
                }
            }

        })


    }



    //Handle Signout
    const handleLogOut = () => {
        signOut(auth).then(() => { });
    };

    return (
        <div className="flex flex-col items-center p-4">
            <h1 className="text-2xl font-bold mb-4">All Users</h1>
            <table className="min-w-full border border-gray-200">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="px-4 py-2 text-left border-b">#</th>
                        <th className="px-4 py-2 text-left border-b">Name</th>
                        <th className="px-4 py-2 text-left border-b">Email</th>
                        <th className="px-4 py-2 text-left border-b">Role</th>
                        <th className="px-4 py-2 text-left border-b">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={user.id} className="border-b">
                            <td className="px-4 py-2">{index + 1}</td>
                            <td className="px-4 py-2">{user.name}</td>
                            <td className="px-4 py-2">{user.email}</td>
                            <td className="px-4 py-2">{user.role}</td>
                            <td className="px-4 py-2 flex gap-2">
                                <button
                                    className="px-3 py-1 text-white bg-gray-400 border border-gray-300 rounded disabled:opacity-50"
                                    disabled={user.role === 'User'}
                                    onClick={() => makeUser(user._id)}
                                >
                                    Make User
                                </button>
                                <button
                                    className="px-3 py-1 text-white bg-gray-400  border border-gray-300 rounded disabled:opacity-50"
                                    disabled={user.role === 'Admin'}    
                                    onClick={() => makeAdmin(user._id)}
                                >
                                    Make Admin
                                </button>

                                <button
                                    className="px-3 py-1 text-white bg-blue-500 border border-gray-300 rounded disabled:opacity-50"
                                    disabled={user.role === 'Blocked'}
                                    onClick={() => block(user._id, user.email)}
                                >
                                    <TbLockFilled />
                                </button>

                                <button
                                    className="px-3 py-1 text-white bg-red-500 border border-gray-300 rounded disabled:opacity-50"
                                    disabled={user.role === 'Blocked'}
                                    onClick={() => handleDelete(user.email)}
                                >
                                    <MdDelete />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Users;
