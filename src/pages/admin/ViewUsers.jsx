import React, { useState, useEffect } from "react";
// Remove NavLink if not used, or keep if used elsewhere
import { FaTrash, FaUserShield } from "react-icons/fa";

function ViewUsers() {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const [users, setUsers] = useState([]);

    // Base API URL
    const api = "http://127.0.0.1:5000/api/admin/users";

    const get_users = async () => {
        try {
            const response = await fetch(`${api}`);
            const data = await response.json();
            if (data.status === "success") {
                setUsers(data.users);
            } else {
                console.error(data.message);
            }
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    const delete_user = async (user_id) => {
        // 1. Client-side check: Prevent deleting self
        if (currentUser && user_id === currentUser.id) {
            alert("You cannot delete yourself.");
            return;
        }

        // 2. Confirmation dialog
        if (!window.confirm("Are you sure you want to delete this user?")) {
            return;
        }

        try {
            const response = await fetch(`${api}/${user_id}`, {
                method: "DELETE",
            });

            const data = await response.json();

            if (response.ok) {
                // Success: Update UI
                alert(data.message);
                // Optimistic update: filter out the deleted user instead of calling API again
                setUsers(users.filter((user) => user.id !== user_id));
            } else {
                // Error: Show message (e.g., "Cannot delete an admin user")
                alert(data.message);
            }
        } catch (error) {
            console.error("Failed to delete user:", error);
            alert("An error occurred while trying to delete the user.");
        }
    };

    const makeAdmin = async (user_id) => {
        try {
            const response = await fetch(`${api}/${user_id}`, {
                method: "POST", // Note: PATCH or PUT is often preferred for updates, but POST works
            });
            if (response.ok) {
                get_users();
                alert("User is now an Admin.");
            } else {
                const data = await response.json();
                alert(data.message || "Failed to make admin");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    useEffect(() => {
        get_users();
    }, []);

    return (
        <>
            <h1 className="text-2xl md:text-4xl text-center mt-10 md:mt-20 lg:mt-50 text-pink-600">View Users</h1>
            <div className="flex flex-col w-full gap-6 justify-center items-center mt-4 md:mt-10 mb-10 px-4">
                <div className="overflow-x-auto w-full">
                    <table className="table-auto min-w-full border-0 rounded-2xl bg-pink-200 border-pink-400">
                        <thead className="border-0 rounded-2xl border-pink-400 w-[100%]">
                            <tr>
                                <th className="text-center text-md md:text-lg lg:text-2xl border-pink-700 p-2">ID</th>
                                <th className="text-center text-md md:text-lg lg:text-2xl border-pink-700 p-2">First Name</th>
                                <th className="text-center text-md md:text-lg lg:text-2xl border-pink-700 p-2">Last Name</th>
                                <th className="text-center text-md md:text-lg lg:text-2xl border-pink-700 p-2">Email</th>
                                <th className="text-center text-md md:text-lg lg:text-2xl border-pink-700 p-2">Delete</th>
                                <th className="text-center text-md md:text-lg lg:text-2xl border-pink-700 p-2">Is Admin</th>
                                <th className="hidden md:table-cell text-center text-md md:text-lg lg:text-2xl border-pink-700 p-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="border-0 rounded-2xl border-pink-400">
                            {users.map((user) => (
                                <tr key={user.id}>
                                    <td className="border-4 text-md text-center md:text-lg lg:text-2xl border-pink-400 p-2">{user.id ? user.id : "N/A"}</td>
                                    <td className="border-4 text-md text-center md:text-lg lg:text-2xl border-pink-400 p-2">{user.firstName}</td>
                                    <td className="border-4 text-md text-center md:text-lg lg:text-2xl border-pink-400 p-2">{user.lastName}</td>
                                    <td className="border-4 text-md text-center md:text-lg lg:text-2xl border-pink-400 p-2">{user.email}</td>
                                    <td className="border-4 text-md text-center md:text-lg lg:text-2xl border-pink-400 p-2">
                                        <div className="flex items-center justify-center">
                                            <button
                                                className="bg-red-500 gap-2 shadow-md shadow-red-400 hover:shadow-xl hover:shadow-red-700 hover:bg-red-700 cursor-pointer transition duration-300 ease-in-out text-white font-bold flex justify-center items-center py-2 px-4 rounded-2xl"
                                                onClick={() => delete_user(user.id)}>
                                                <FaTrash /> Delete
                                            </button>
                                        </div>
                                    </td>
                                    <td className="border-4 text-md text-center md:text-lg lg:text-2xl border-pink-400 p-2">{user.is_admin ? "Yes" : "No"}</td>
                                    <td className="border-4 text-md text-center md:text-lg lg:text-2xl border-pink-400 p-2">
                                        <div className="flex items-center justify-center">
                                            {!user.is_admin && (
                                                <button
                                                    className="bg-green-400 gap-2 shadow-md shadow-green-300 hover:shadow-xl hover:shadow-green-500 cursor-pointer transition duration-300 ease-in-out hover:bg-green-700 text-white font-bold flex justify-center items-center py-2 px-4 rounded-2xl"
                                                    onClick={() => makeAdmin(user.id)}>
                                                    <FaUserShield /> Make Admin
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default ViewUsers;
