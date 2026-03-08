import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ENDPOINTS } from '../../../config';

function RenterBookings() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const currentUserId = localStorage.getItem('userId');

    useEffect(() => {
        const fetchMyBookings = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(ENDPOINTS.GET_BOOKINGS, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setBookings(response.data.bookings);
            } catch (error) {
                console.error("Error fetching booking history:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchMyBookings();
    }, [currentUserId]);

    const handleCancelRequest = async (bookingId) => {
        if (!window.confirm("Are you sure you want to cancel this booking request?")) return;
        
        try {
            const token = localStorage.getItem('token');
            await axios.delete(ENDPOINTS.DELETE_BOOKING(bookingId), {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            
            // Remove the cancelled booking from the local state
            setBookings(bookings.filter(b => b._id !== bookingId));
            sessionStorage.setItem('flash', 'Booking request cancelled successfully.');
            
            // Optional: Reload to refresh the Navbar wallet balance if needed, 
            // though cancelling a pending request doesn't affect the wallet.
        } catch (error) {
            console.error("Failed to cancel booking:", error);
            alert(error.response?.data?.message || "Failed to cancel booking request.");
        }
    };

    if (loading) return <div className="p-4" style={{ color: '#64748b' }}>Loading your booking history...</div>;

    return (
        <div className="table-responsive rounded-3 overflow-hidden" style={{ border: '2px solid #e0e7ff' }}>
            <table className="table table-hover mb-0 align-middle text-center">
                <thead style={{ background: 'linear-gradient(90deg, #f0f4ff, #e8f5ff)' }}>
                    <tr>
                        <th className="py-3 px-3" style={{ border: 'none', color: '#FF6B6B', fontWeight: 'bold' }}>Booking ID</th>
                        <th className="py-3" style={{ border: 'none', color: '#FF6B6B', fontWeight: 'bold' }}>Property Title</th>
                        <th className="py-3" style={{ border: 'none', color: '#FF6B6B', fontWeight: 'bold' }}>Request Date</th>
                        <th className="py-3" style={{ border: 'none', color: '#FF6B6B', fontWeight: 'bold' }}>Status</th>
                        <th className="py-3" style={{ border: 'none', color: '#FF6B6B', fontWeight: 'bold' }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {bookings.map(b => (
                        <tr key={b._id} style={{ backgroundColor: '#f8f9ff' }}>
                            <td className="small" style={{ color: '#64748b' }}>{b._id.substring(0, 10)}...</td>
                            
                            {/* FIX: Handle null properties if the owner deleted them */}
                            <td className="fw-bold" style={{ color: '#4f46e5' }}>
                                {b.propertyId ? (
                                    b.propertyId.propertyTitle || 'Unknown Property'
                                ) : (
                                    <span style={{ color: '#94a3b8', fontStyle: 'italic', fontWeight: 'normal' }}>
                                        Property Deleted
                                    </span>
                                )}
                            </td>
                            
                            <td style={{ color: '#2d3748' }}>
                                {new Date(b.createdAt).toLocaleDateString()}
                            </td>
                            <td>
                                <span className={`badge px-3 py-2 rounded-pill ${
                                    b.bookingStatus === 'booked' ? 'bg-success' : 
                                    b.bookingStatus === 'rejected' ? 'bg-danger' : 'bg-warning'
                                }`}>
                                    {b.bookingStatus.toUpperCase()}
                                </span>
                            </td>
                            <td>
                                {b.bookingStatus === 'pending' ? (
                                    <button 
                                        onClick={() => handleCancelRequest(b._id)} 
                                        className="btn btn-sm rounded-pill px-3 fw-bold"
                                        style={{ color: '#FF6B6B', border: '2px solid #FF6B6B', backgroundColor: 'transparent' }}
                                    >
                                        Cancel Request
                                    </button>
                                ) : (
                                    <span style={{ color: '#94a3b8', fontSize: '0.9rem' }}>-</span>
                                )}
                            </td>
                        </tr>
                    ))}
                    {bookings.length === 0 && (
                        <tr>
                            <td colSpan="5" className="py-5" style={{ color: '#94a3b8' }}>
                                You haven't made any booking requests yet.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default RenterBookings;