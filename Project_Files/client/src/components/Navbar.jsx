import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const type = localStorage.getItem('type');
    const username = localStorage.getItem('username');

    const handleLogout = () => {
        localStorage.clear();
        navigate('/');
    };

    return (
        <nav className="navbar navbar-expand-lg border-bottom" style={{ background: 'linear-gradient(90deg, #f0f4ff 0%, #ffe8f0 100%)', borderColor: '#e0e7ff !important', padding: '1rem 0', position: 'fixed', top: 0, left: 0, right: 0, zIndex: 9998, width: '100%', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)' }}>
            <div className="container">
                <Link className="navbar-brand fw-bold fs-3" style={{ color: '#4f46e5' }} to={token ? `/${type.toLowerCase()}` : "/"}>
                    House<span style={{ color: '#FF6B6B' }}>Hunt</span>
                </Link>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation" style={{ color: '#2d3748' }}>
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto align-items-center">
                        {token ? (
                            <li className="nav-item ms-lg-3">
                                <div className="d-flex align-items-center rounded-pill px-4 py-2" style={{ background: 'linear-gradient(135deg, #f5e6ff, #e8f5ff)', border: '2px solid #e0e7ff', boxShadow: '0 4px 12px rgba(69, 183, 209, 0.1)' }}>
                                    <span className="me-3" style={{ color: '#2d3748', fontWeight: 'bold' }}>Hi, {username}</span>
                                    <button onClick={handleLogout} className="btn btn-sm rounded-pill px-4 fw-bold" style={{ background: 'linear-gradient(135deg, #FF6B6B, #FFA07A)', color: 'white', border: 'none', boxShadow: '0 4px 12px rgba(255, 107, 107, 0.25)', transition: 'all 0.3s ease' }} onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'} onMouseLeave={(e) => e.target.style.transform = 'none'}>
                                        Log Out
                                    </button>
                                </div>
                            </li>
                        ) : (
                            <>
                                <li className="nav-item ms-2"><Link className="nav-link fw-bold px-4 py-2 rounded-pill" style={{ color: '#4f46e5', background: 'linear-gradient(135deg, #e8eef9, #f0f4ff)', border: '2px solid #4f46e5', transition: 'all 0.3s ease' }} to="/login" onMouseEnter={(e) => { e.target.style.boxShadow = '0 6px 20px rgba(79, 70, 229, 0.3)'; e.target.style.transform = 'scale(1.05)'; }} onMouseLeave={(e) => { e.target.style.boxShadow = 'none'; e.target.style.transform = 'scale(1)'; }}>Login</Link></li>
                                <li className="nav-item ms-2"><Link className="nav-link fw-bold px-4 py-2 rounded-pill" style={{ color: 'white', background: 'linear-gradient(135deg, #4ECDC4, #45B7D1)', transition: 'all 0.3s ease', border: 'none' }} to="/register" onMouseEnter={(e) => { e.target.style.boxShadow = '0 6px 20px rgba(69, 183, 209, 0.4)'; e.target.style.transform = 'translateY(-2px)'; }} onMouseLeave={(e) => { e.target.style.boxShadow = 'none'; e.target.style.transform = 'none'; }}>Register</Link></li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;