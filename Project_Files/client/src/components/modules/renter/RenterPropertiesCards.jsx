import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ENDPOINTS } from '../../../config';

function RenterPropertiesCards() {
    const [properties, setProperties] = useState([]);
    const [myBookings, setMyBookings] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch all properties
                const propRes = await axios.get(ENDPOINTS.GET_PROPERTIES);
                setProperties(propRes.data.properties);

                // Fetch the current user's bookings to check request statuses
                const token = localStorage.getItem('token');
                if (token) {
                    const bookRes = await axios.get(ENDPOINTS.GET_BOOKINGS, {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    setMyBookings(bookRes.data.bookings);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

    const handleBook = async (propId, ownerId) => {
        if (!ownerId) {
            alert("Owner information not available. Please try again.");
            return;
        }
        const phone = prompt("Please enter your phone number to book:");
        if(!phone) return;
        
        try {
            await axios.post(ENDPOINTS.CREATE_BOOKING, {
                propertyId: propId,
                ownerID: ownerId,
                userID: localStorage.getItem('userId'),
                userName: localStorage.getItem('username'),
                phone: phone,
                bookingStatus: 'pending'
            });
            sessionStorage.setItem('flash', 'Booking request sent successfully!');
            window.location.reload();
        } catch (error) {
            alert(error.response?.data?.message || "Failed to create booking request.");
        }
    };

    return (
        <div className="row g-4 mt-2">
            {properties.map(p => {
                // Check if the current user has any booking request for this specific property
                const userBooking = myBookings.find(b => 
                    (typeof b.propertyId === 'object' ? b.propertyId?._id : b.propertyId) === p._id
                );

                // Default button states
                let buttonText = "Get Info / Book";
                let buttonDisabled = false;
                let buttonStyle = { background: 'linear-gradient(90deg, #FF6B6B, #FFA07A)', borderRadius: '8px', border: 'none', color: 'white' };

                // Logic to change button based on property status and user's booking status
                if (p.status === 'Unavailable') {
                    buttonDisabled = true;
                    if (userBooking && userBooking.bookingStatus === 'booked') {
                        buttonText = "Booked (Yours)";
                        buttonStyle.background = '#22c55e'; // Green for success
                    } else {
                        buttonText = "Not Available";
                        buttonStyle.background = '#94a3b8'; // Gray for unavailable
                    }
                } else if (userBooking) {
                    if (userBooking.bookingStatus === 'pending') {
                        buttonDisabled = true;
                        buttonText = "Request Pending";
                        buttonStyle.background = '#f59e0b'; // Orange for pending
                    } else if (userBooking.bookingStatus === 'rejected') {
                        buttonDisabled = true;
                        buttonText = "Request Rejected";
                        buttonStyle.background = '#ef4444'; // Red for rejected
                    }
                }

                return (
                    <div className="col-md-4" key={p._id}>
                        <div className="card h-100 border-0 shadow" style={{ backgroundColor: '#ffffff', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 12px rgba(69, 183, 209, 0.1)', border: '2px solid #e0e7ff' }}>
                            <img src={p.propertyImage} className="card-img-top" alt="Property" style={{ height: '200px', objectFit: 'cover' }} />
                            <div className="card-body">
                                <h5 className="card-title fw-bold" style={{ color: '#FF6B6B' }}>{p.propertyTitle}</h5>
                                <p className="small mb-2" style={{ color: '#64748b' }}><i className="bi bi-geo-alt-fill me-1"></i>{p.propertyAddress}</p>
                                <p className="small mb-1" style={{ color: '#2d3748' }}><strong>Type:</strong> {p.propertyType} ({p.propertyAdType})</p>
                                <p className="small mb-1" style={{ color: '#2d3748' }}><strong>Owner:</strong> {p.ownerContact}</p>
                                <p className="small mb-1" style={{ color: '#2d3748' }}>
                                    <strong>Status:</strong> <span style={{ color: p.status === 'Available' ? '#22c55e' : '#ef4444' }}>{p.status}</span>
                                </p>
                                <h5 className="fw-bold mt-3 mb-4" style={{ color: '#4ECDC4' }}>₹{p.propertyAmt}</h5>
                                
                                <button 
                                    className="btn w-100 fw-bold py-2 text-white" 
                                    style={buttonStyle} 
                                    onClick={() => handleBook(p._id, p.ownerId?._id || p.ownerId)} 
                                    disabled={buttonDisabled}
                                >
                                    {buttonText}
                                </button>
                            </div>
                        </div>
                    </div>
                );
            })}
            
            {properties.length === 0 && (
                <div className="col-12 text-center py-5">
                    <p style={{ color: '#94a3b8' }}>No properties available right now.</p>
                </div>
            )}
        </div>
    );
}

export default RenterPropertiesCards;