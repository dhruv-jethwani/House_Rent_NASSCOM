import React from 'react';
import { Link } from 'react-router-dom';

function Landing() {
    return (
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
                
                {/* Fixed positioning: centered row with gap */}
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
    );
}

export default Landing;