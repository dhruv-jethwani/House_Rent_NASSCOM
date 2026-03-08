import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
// Import your config to keep the API base URL centralized as per your project plan
import { ENDPOINTS } from '../config'; 

function Landing() {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // Check authentication status
    const isLoggedIn = !!localStorage.getItem('token');

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                // Using the exact endpoint from your RenterPropertiesCards logic
                const res = await axios.get(ENDPOINTS.GET_PROPERTIES);
                setProperties(res.data.properties);
            } catch (err) {
                console.error("Error fetching properties", err);
            } finally {
                setLoading(false);
            }
        };
        fetchProperties();
    }, []);

    const handlePropertyClick = (id) => {
        if (!isLoggedIn) {
            // Redirect to login if guest tries to view details
            navigate('/login');
        } else {
            // Proceed to details if logged in
            navigate(`/property/${id}`);
        }
    };

    return (
        <div>
            {/* --- HERO SECTION (Original CSS & Background Preserved) --- */}
            <div className="d-flex flex-column justify-content-center align-items-center text-center" style={{ 
                minHeight: 'calc(100vh - 80px)',
                backgroundImage: 'url(https://www.creatangarden.com/_next/static/media/brown-house.6420bfd5.webp)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundAttachment: 'fixed',
                position: 'relative'
            }}>
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    zIndex: 1
                }}></div>

                <div style={{ position: 'relative', zIndex: 2 }}>
                    <h1 className="display-3 fw-bold mb-3" style={{ color: '#ffffff' }}>
                        Welcome to House<span style={{ color: '#FF6B6B' }}>Hunt</span>
                    </h1>
                    <p className="lead mb-5" style={{ color: '#e8e8e8' }}>
                        Your ultimate destination to find, rent, or list properties with ease.
                    </p>
                    
                    <div className="d-flex justify-content-center gap-3">
                        <Link to="/register" className="btn house-rent-btn btn-lg px-5">
                            Get Started
                        </Link>
                        <Link to="/login" className="btn house-login-btn btn-lg px-5">
                            Login
                        </Link>
                    </div>
                </div>
            </div>

            {/* --- PROPERTY FEED SECTION --- */}
            <div className="container my-5">
                <h2 className="text-center mb-4 fw-bold" style={{ color: '#2d3748' }}>Featured Listings</h2>
                {loading ? (
                    <div className="text-center py-5">
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                ) : (
                    <div className="row g-4">
                        {properties.map((p) => (
                            <div key={p._id} className="col-md-4">
                                <div className="card h-100 border-0 shadow" style={{ borderRadius: '12px', overflow: 'hidden', border: '2px solid #e0e7ff' }}>
                                    <div style={{ height: '220px', overflow: 'hidden' }}>
                                        {/* FIXED: Using .propertyImage to match your Renter logic */}
                                        <img 
                                            src={p.propertyImage} 
                                            className="card-img-top w-100 h-100" 
                                            style={{ objectFit: 'cover' }}
                                            alt={p.propertyTitle} 
                                            onError={(e) => { e.target.src = 'https://via.placeholder.com/400x220?text=Property+Image'; }}
                                        />
                                    </div>
                                    <div className="card-body d-flex flex-column">
                                        <h5 className="card-title fw-bold" style={{ color: '#FF6B6B' }}>{p.propertyTitle}</h5>
                                        <p className="small mb-2" style={{ color: '#64748b' }}>
                                            <i className="bi bi-geo-alt-fill me-1"></i>{p.propertyAddress}
                                        </p>
                                        <p className="small mb-3" style={{ color: '#2d3748' }}>
                                            <strong>Type:</strong> {p.propertyType}
                                        </p>
                                        <h5 className="fw-bold mt-auto mb-3" style={{ color: '#4ECDC4' }}>₹{p.propertyAmt}</h5>
                                        
                                        <button 
                                            onClick={() => handlePropertyClick(p._id)}
                                            className="btn fw-bold py-2"
                                            style={{ 
                                                backgroundColor: isLoggedIn ? '#4f46e5' : '#6c757d',
                                                color: 'white',
                                                borderRadius: '8px'
                                            }}
                                        >
                                            {isLoggedIn ? "View & Book" : "Login to View Details"}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Landing;