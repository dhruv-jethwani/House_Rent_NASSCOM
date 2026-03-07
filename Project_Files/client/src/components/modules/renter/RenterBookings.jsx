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

    if (loading) return <div className="p-4" style={{ color: '#64748b' }}>Loading your booking history...</div>;

    return (
        <div className="table-responsive rounded-3 overflow-hidden">
            <table className="table table-hover mb-0 align-middle text-center">
                <thead style={{ background: 'linear-gradient(90deg, #FF6B6B, #FFA07A)' }}>
                    <tr>
                        <th className="py-3 px-3" style={{ border: 'none', color: '#4ECDC4', fontWeight: 'bold' }}>Booking ID</th>
                        <th className="py-3" style={{ border: 'none', color: '#4ECDC4', fontWeight: 'bold' }}>Property ID</th>
                        <th className="py-3" style={{ border: 'none', color: '#4ECDC4', fontWeight: 'bold' }}>Request Date</th>
                        <th className="py-3" style={{ border: 'none', color: '#4ECDC4', fontWeight: 'bold' }}>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {bookings.map(b => (
                        <tr key={b._id} style={{ backgroundColor: '#f8f9ff' }}>
                            <td className="small" style={{ color: '#64748b' }}>{b._id}</td>
                            <td className="small" style={{ color: '#64748b' }}>{typeof b.propertyId === 'object' ? b.propertyId?._id : b.propertyId}</td>
                            <td style={{ color: '#2d3748' }}>
                                {new Date(b.createdAt).toLocaleDateString()}
                            </td>
                            <td>
                                <span className={`badge px-3 py-2 rounded-pill ${
                                    b.bookingStatus === 'booked' ? 'bg-success' : 
                                    b.bookingStatus === 'rejected' ? 'bg-danger' : 
                                    'bg-warning'
                                }`}>
                                    {b.bookingStatus.toUpperCase()}
                                </span>
                            </td>
                        </tr>
                    ))}
                    {bookings.length === 0 && (
                        <tr>
                            <td colSpan="4" className="py-5" style={{ color: '#94a3b8' }}>
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