import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ENDPOINTS } from '../../../config';

function AllUsers() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    // 1. Fetch all users from the backend
    const fetchUsers = async () => {
        try {
            const response = await axios.get(ENDPOINTS.GET_USERS);
            setUsers(response.data.users);
        } catch (error) {
            console.error("Error fetching users:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    // 2. Grant or Ungrant Owner status
    const handleStatusChange = async (userId, newStatus) => {
        try {
            await axios.put(ENDPOINTS.UPDATE_USER_STATUS(userId), { granted: newStatus });
            // Update local state to show change immediately
            fetchUsers();
            sessionStorage.setItem('flash', `Owner status updated to ${newStatus}`);
        } catch (error) {
            console.error("Error updating status:", error);
            alert("Failed to update user status");
        }
    };

    // 3. Delete user logic
    const handleDeleteUser = async (userId) => {
        if (!window.confirm("Are you sure you want to delete this user permanently?")) return;
        try {
            // Reusing the base GET_USERS endpoint but appending ID for DELETE
            await axios.delete(`${ENDPOINTS.GET_USERS}/${userId}`);
            setUsers(users.filter(u => u._id !== userId));
            sessionStorage.setItem('flash', 'User deleted successfully');
        } catch (error) {
            console.error("Error deleting user:", error);
            alert("Could not delete user");
        }
    };

    if (loading) return <div className="p-4" style={{ color: '#64748b' }}>Loading user database...</div>;

    return (
        <div className="table-responsive rounded-3 overflow-hidden" style={{ border: '2px solid #e0e7ff' }}>
            <table className="table table-hover mb-0 align-middle text-center">
                <thead style={{ background: 'linear-gradient(90deg, #4ECDC4, #45B7D1)' }}>
                    <tr>
                        <th className="py-3 px-4" style={{ border: 'none', color: '#FF6B6B', fontWeight: 'bold' }}>User ID</th>
                        <th className="py-3" style={{ border: 'none', color: '#FF6B6B', fontWeight: 'bold' }}>Name</th>
                        <th className="py-3" style={{ border: 'none', color: '#FF6B6B', fontWeight: 'bold' }}>Email</th>
                        <th className="py-3" style={{ border: 'none', color: '#FF6B6B', fontWeight: 'bold' }}>Type</th>
                        <th className="py-3" style={{ border: 'none', color: '#FF6B6B', fontWeight: 'bold' }}>Status (Owners)</th>
                        <th className="py-3" style={{ border: 'none', color: '#FF6B6B', fontWeight: 'bold' }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user._id} style={{ backgroundColor: '#f8f9ff' }}>
                            <td className="px-4 small" style={{ color: '#64748b' }}>{user._id}</td>
                            <td style={{ color: '#2d3748' }}>{user.username || user.name}</td>
                            <td style={{ color: '#64748b' }}>{user.email}</td>
                            <td>
                                <span className={`badge ${user.type === 'Admin' ? 'bg-danger' : user.type === 'Owner' ? 'bg-primary' : 'bg-info'}`}>
                                    {user.type}
                                </span>
                            </td>
                            <td>
                                {user.type === 'Owner' ? (
                                    <span style={{ color: user.granted === 'granted' ? '#22c55e' : '#f59e0b', fontWeight: 'bold' }}>
                                        {user.granted.toUpperCase()}
                                    </span>
                                ) : (
                                    <span style={{ color: '#94a3b8' }}>-</span>
                                )}
                            </td>
                            <td>
                                <div className="d-flex justify-content-center gap-2">
                                    {user.type === 'Owner' && (
                                        user.granted === 'pending' || user.granted === 'rejected' ? (
                                            <button 
                                                onClick={() => handleStatusChange(user._id, 'granted')} 
                                                className="btn btn-sm rounded-pill px-3"
                                                style={{ background: 'linear-gradient(90deg, #4ECDC4, #45B7D1)', color: 'white', border: 'none' }}
                                            >
                                                Grant
                                            </button>
                                        ) : (
                                            <button 
                                                onClick={() => handleStatusChange(user._id, 'pending')} 
                                                className="btn btn-sm rounded-pill px-3"
                                                style={{ background: 'linear-gradient(90deg, #FF6B6B, #FFA07A)', color: 'white', border: 'none' }}
                                            >
                                                Ungrant
                                            </button>
                                        )
                                    )}
                                    {user.type !== 'Admin' && (
                                        <button 
                                            onClick={() => handleDeleteUser(user._id)} 
                                            className="btn btn-sm rounded-pill px-3"
                                            style={{ color: '#FF6B6B', border: '2px solid #FF6B6B', background: 'white' }}
                                        >
                                            Delete
                                        </button>
                                    )}
                                </div>
                            </td>
                        </tr>
                    ))}
                    {users.length === 0 && (
                        <tr><td colSpan="6" className="py-5" style={{ color: '#94a3b8' }}>No registered users found.</td></tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default AllUsers;