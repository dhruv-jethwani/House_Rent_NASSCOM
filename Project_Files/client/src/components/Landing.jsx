import React from 'react';
import { Link } from 'react-router-dom';

function Landing() {
    return (
        <div className="d-flex flex-column justify-content-center align-items-center text-center" style={{ minHeight: 'calc(100vh - 80px)' }}>
            <h1 className="display-3 fw-bold mb-3" style={{ color: '#2d3748' }}>
                Welcome to House<span style={{ color: '#FF6B6B' }}>Hunt</span>
            </h1>
            <p className="lead mb-5" style={{ color: '#64748b' }}>
                Your ultimate destination to find, rent, or list properties with ease.
            </p>
            <div className="d-flex gap-3">
                <Link to="/register" className="btn house-rent-btn btn-lg px-5">Get Started</Link>
                <Link to="/login" className="btn btn-lg px-5" style={{ background: 'linear-gradient(90deg, #4ECDC4, #45B7D1)', color: 'white', border: 'none' }}>Login</Link>
            </div>
        </div>
    );
}

export default Landing;