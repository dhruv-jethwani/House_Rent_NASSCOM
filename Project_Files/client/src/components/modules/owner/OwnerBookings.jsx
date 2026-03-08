import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ENDPOINTS } from '../../../config';

function OwnerBookings() {
    const [bookings, setBookings] = useState([]);
    const currentUserId = localStorage.getItem('userId');

    const fetchBookings = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(ENDPOINTS.GET_OWNER_BOOKINGS, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setBookings(response.data.bookings);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchBookings();
    }, [currentUserId]);

    const handleStatusChange = async (bookingId, newStatus) => {
        try {
            const token = localStorage.getItem('token');
            await axios.put(ENDPOINTS.UPDATE_BOOKING(bookingId), { bookingStatus: newStatus }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            sessionStorage.setItem('flash', `Booking marked as ${newStatus}!`);
            fetchBookings();
        } catch (error) {
            console.error("Failed to update booking status:", error);
            alert(error.response?.data?.message || "Failed to update booking status");
        }
    };

    return (
        <div className="table-responsive rounded-3 overflow-hidden">
            <table className="table table-hover mb-0 align-middle text-center">
                <thead style={{ background: 'linear-gradient(90deg, #98D8C8, #45B7D1)' }}>
                    <tr>
                        <th className="py-3" style={{ border: 'none', color: '#4f46e5', fontWeight: 'bold' }}>Booking ID</th>
                        <th className="py-3" style={{ border: 'none', color: '#4f46e5', fontWeight: 'bold' }}>Property ID</th>
                        <th className="py-3" style={{ border: 'none', color: '#4f46e5', fontWeight: 'bold' }}>Tenant Name</th>
                        <th className="py-3" style={{ border: 'none', color: '#4f46e5', fontWeight: 'bold' }}>Tenant Phone</th>
                        <th className="py-3" style={{ border: 'none', color: '#4f46e5', fontWeight: 'bold' }}>Status</th>
                        <th className="py-3" style={{ border: 'none', color: '#4f46e5', fontWeight: 'bold' }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {bookings.map(b => (
                        <tr key={b._id} style={{ backgroundColor: '#f8f9ff' }}>
                            <td className="small" style={{ color: '#64748b' }}>{b._id.substring(0,10)}...</td>
                            <td className="small" style={{ color: '#64748b' }}>{typeof b.propertyId === 'object' ? b.propertyId?._id?.substring(0,10) : b.propertyId?.substring(0,10)}...</td>
                            <td style={{ color: '#2d3748' }}>{b.userName}</td>
                            <td style={{ color: '#2d3748' }}>{b.phone}</td>
                            <td style={{ color: b.bookingStatus === 'booked' ? '#22c55e' : b.bookingStatus === 'rejected' ? '#ef4444' : '#f59e0b' }}>
                                {b.bookingStatus.toUpperCase()}
                            </td>
                            <td>
                                <div className="d-flex justify-content-center gap-2">
                                    {b.bookingStatus === 'rejected' ? (
                                        <span className="badge bg-secondary py-2 px-3 rounded-pill">Unchangeable</span>
                                    ) : b.bookingStatus === 'pending' ? (
                                        <>
                                            <button onClick={() => handleStatusChange(b._id, 'booked')} className="btn btn-sm rounded-pill px-3" style={{ background: 'linear-gradient(90deg, #4ECDC4, #45B7D1)', color: 'white', border: 'none' }}>Approve</button>
                                            <button onClick={() => handleStatusChange(b._id, 'rejected')} className="btn btn-sm rounded-pill px-3" style={{ background: 'linear-gradient(90deg, #FF6B6B, #FFA07A)', color: 'white', border: 'none' }}>Reject</button>
                                        </>
                                    ) : (
                                        <button onClick={() => handleStatusChange(b._id, 'pending')} className="btn btn-sm rounded-pill px-3" style={{ background: 'linear-gradient(90deg, #FFB84D, #FFA07A)', color: 'white', border: 'none' }}>Mark Pending</button>
                                    )}
                                </div>
                            </td>
                        </tr>
                    ))}
                    {bookings.length === 0 && <tr><td colSpan="6" className="py-4" style={{ color: '#94a3b8' }}>No bookings yet.</td></tr>}
                </tbody>
            </table>
        </div>
    );
}
export default OwnerBookings;