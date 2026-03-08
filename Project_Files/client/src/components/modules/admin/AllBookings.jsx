import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ENDPOINTS } from '../../../config';

function AllBookings() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchBookings = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(ENDPOINTS.GET_ALL_BOOKINGS, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setBookings(response.data.bookings);
        } catch (error) {
            console.error("Error fetching bookings:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBookings();
    }, []);

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

    if (loading) return <div className="p-4" style={{ color: '#64748b' }}>Loading bookings...</div>;

    return (
        <div className="table-responsive rounded-3 overflow-hidden" style={{ border: '2px solid #e0e7ff' }}>
            <table className="table table-hover mb-0 align-middle text-center">
                <thead style={{ background: 'linear-gradient(90deg, #98D8C8, #45B7D1)' }}>
                    <tr>
                        <th className="py-3" style={{ border: 'none', color: '#4f46e5', fontWeight: 'bold' }}>Booking ID</th>
                        <th className="py-3" style={{ border: 'none', color: '#4f46e5', fontWeight: 'bold' }}>Property</th>
                        <th className="py-3" style={{ border: 'none', color: '#4f46e5', fontWeight: 'bold' }}>Tenant</th>
                        <th className="py-3" style={{ border: 'none', color: '#4f46e5', fontWeight: 'bold' }}>Owner</th>
                        <th className="py-3" style={{ border: 'none', color: '#4f46e5', fontWeight: 'bold' }}>Status</th>
                        <th className="py-3" style={{ border: 'none', color: '#4f46e5', fontWeight: 'bold' }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {bookings.map((booking) => (
                        <tr key={booking._id} style={{ backgroundColor: '#f8f9ff' }}>
                            <td className="small" style={{ color: '#64748b' }}>{booking._id.substring(0, 10)}...</td>
                            <td style={{ color: '#2d3748' }}>
                                {typeof booking.propertyId === 'object' 
                                    ? booking.propertyId?.propertyTitle 
                                    : booking.propertyId}
                            </td>
                            <td style={{ color: '#2d3748' }}>{booking.userName}</td>
                            <td style={{ color: '#2d3748' }}>
                                {typeof booking.ownerID === 'object' 
                                    ? booking.ownerID?.username 
                                    : booking.ownerID}
                            </td>
                            <td style={{ color: booking.bookingStatus === 'booked' ? '#22c55e' : booking.bookingStatus === 'rejected' ? '#ef4444' : '#f59e0b' }}>
                                {booking.bookingStatus.toUpperCase()}
                            </td>
                            <td>
                                <div className="d-flex justify-content-center gap-2">
                                    {booking.bookingStatus === 'rejected' ? (
                                        <span className="badge bg-secondary py-2 px-3 rounded-pill">Unchangeable</span>
                                    ) : booking.bookingStatus === 'pending' ? (
                                        <>
                                            <button onClick={() => handleStatusChange(booking._id, 'booked')} className="btn btn-sm rounded-pill px-2" style={{ background: 'linear-gradient(90deg, #4ECDC4, #45B7D1)', color: 'white', border: 'none' }}>
                                                Approve
                                            </button>
                                            <button onClick={() => handleStatusChange(booking._id, 'rejected')} className="btn btn-sm rounded-pill px-2" style={{ background: 'linear-gradient(90deg, #FF6B6B, #FFA07A)', color: 'white', border: 'none' }}>
                                                Reject
                                            </button>
                                        </>
                                    ) : (
                                        <button onClick={() => handleStatusChange(booking._id, 'pending')} className="btn btn-sm rounded-pill px-2" style={{ background: 'linear-gradient(90deg, #FFB84D, #FFA07A)', color: 'white', border: 'none' }}>
                                            Mark Pending
                                        </button>
                                    )}
                                </div>
                            </td>
                        </tr>
                    ))}
                    {bookings.length === 0 && (
                        <tr>
                            <td colSpan="6" className="py-4" style={{ color: '#94a3b8' }}>
                                No bookings available.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default AllBookings;