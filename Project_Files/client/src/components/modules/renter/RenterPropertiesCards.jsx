import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ENDPOINTS } from '../../../config';

function RenterPropertiesCards() {
    const [properties, setProperties] = useState([]);

    useEffect(() => {
        const fetchProps = async () => {
            try {
                const response = await axios.get(ENDPOINTS.GET_PROPERTIES);
                setProperties(response.data.properties);
            } catch (error) {
                console.error(error);
            }
        };
        fetchProps();
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
            alert("Failed to create booking request.");
        }
    };

    return (
        <div className="row g-4 mt-2">
            {properties.map(p => (
                <div className="col-md-4" key={p._id}>
                    <div className="card h-100 border-0 shadow" style={{ backgroundColor: '#ffffff', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 12px rgba(69, 183, 209, 0.1)', border: '2px solid #e0e7ff' }}>
                        <img src={p.propertyImage} className="card-img-top" alt="Property" style={{ height: '200px', objectFit: 'cover' }} />
                        <div className="card-body">
                            <h5 className="card-title fw-bold" style={{ color: '#FF6B6B' }}>{p.propertyTitle}</h5>
                            <p className="small mb-2" style={{ color: '#64748b' }}><i className="bi bi-geo-alt-fill me-1"></i>{p.propertyAddress}</p>
                            <p className="small mb-1" style={{ color: '#2d3748' }}><strong>Type:</strong> {p.propertyType} ({p.propertyAdType})</p>
                            <p className="small mb-1" style={{ color: '#2d3748' }}><strong>Owner:</strong> {p.ownerContact}</p>
                            <p className="small mb-1" style={{ color: '#2d3748' }}><strong>Status:</strong> <span style={{ color: p.status === 'Available' ? '#22c55e' : '#ef4444' }}>{p.status}</span></p>
                            <h5 className="fw-bold mt-3 mb-4" style={{ color: '#4ECDC4' }}>₹{p.propertyAmt}</h5>
                            <button className="btn w-100 fw-bold text-white py-2" style={{ background: 'linear-gradient(90deg, #FF6B6B, #FFA07A)', borderRadius: '8px', border: 'none' }} onClick={() => handleBook(p._id, p.ownerId?._id)} disabled={p.status !== 'Available'}>
                                Get Info / Book
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default RenterPropertiesCards;