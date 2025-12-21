import React, { useState, useEffect } from "react";
// Remove NavLink if not used, or keep if used elsewhere
import { FaTrash, FaUserShield, FaUser, FaEnvelope } from "react-icons/fa";

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
        <div className="w-full">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">User Management</h1>
                    <p className="text-sm text-gray-500 mt-1">
                        Total Users: <span className="font-bold text-pink-600">{users.length}</span>
                    </p>
                </div>
            </div>

            {/* Table Container */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full whitespace-nowrap text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-100 text-xs font-semibold tracking-wide text-gray-500 uppercase">
                                <th className="px-6 py-4">User Details</th>
                                <th className="px-6 py-4">Contact</th>
                                <th className="px-6 py-4 text-center">Role Status</th>
                                <th className="px-6 py-4 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {users.map((user) => (
                                <tr key={user.id} className="hover:bg-gray-50 transition-colors duration-150">
                                    {/* User Name & ID */}
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center text-pink-600 font-bold">
                                                {user.firstName ? user.firstName.charAt(0).toUpperCase() : <FaUser />}
                                            </div>
                                            <div>
                                                <p className="font-bold text-gray-800 text-sm">
                                                    {user.firstName} {user.lastName}
                                                </p>
                                                <p className="text-xs text-gray-400">ID: {user.id}</p>
                                            </div>
                                        </div>
                                    </td>

                                    {/* Email */}
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                            <FaEnvelope className="text-gray-400" />
                                            {user.email}
                                        </div>
                                    </td>

                                    {/* Role Status (Is Admin) */}
                                    <td className="px-6 py-4 text-center">
                                        {user.is_admin ? (
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">Admin</span>
                                        ) : (
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600 border border-gray-200">Customer</span>
                                        )}
                                    </td>

                                    {/* Actions Buttons */}
                                    <td className="px-6 py-4">
                                        <div className="flex items-center justify-center gap-3">
                                            {/* Make Admin Button */}
                                            {!user.is_admin && (
                                                <button
                                                    onClick={() => makeAdmin(user.id)}
                                                    className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors duration-200"
                                                    title="Promote to Admin">
                                                    <FaUserShield size={18} />
                                                </button>
                                            )}

                                            {/* Delete Button */}
                                            <button
                                                onClick={() => delete_user(user.id)}
                                                className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                                                title="Delete User">
                                                <FaTrash size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {users.length === 0 && <div className="p-8 text-center text-gray-500">No users found.</div>}
            </div>
        </div>
    );
}

export default ViewUsers;
