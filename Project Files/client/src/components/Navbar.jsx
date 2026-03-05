import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
    const navigate = useNavigate();
    const role = localStorage.getItem('role');
    const username = localStorage.getItem('username');

    const handleLogout = () => {
        localStorage.clear();
        navigate('/login');
    };

    return (
        <nav className="navbar navbar-expand-lg border-bottom border-secondary" 
             style={{ backgroundColor: '#0f172a', padding: '1rem 0' }}>
            <div className="container">
                <Link className="navbar-brand fw-bold fs-3 text-white" to="/home">
                    House<span style={{ color: '#4361ee' }}>Hunt</span>
                </Link>
                
                <button className="navbar-toggler btn-light" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto align-items-center">
                        <li className="nav-nav-item">
                            <Link className="nav-link text-white px-3" to="/home">Dashboard</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-white px-3" to="/search">Browse</Link>
                        </li>
                        {role === 'Admin' && (
                            <li className="nav-item">
                                <Link className="nav-link text-warning px-3" to="/admin/approvals">Approvals</Link>
                            </li>
                        )}
                        <li className="nav-item ms-lg-3">
                            <div className="d-flex align-items-center bg-dark rounded-pill px-3 py-1">
                                <span className="text-white-50 small me-2">{username}</span>
                                <Link to="/logout"><button onClick={handleLogout} className="btn btn-sm house-rent-btn rounded-pill px-3">
                                    Logout
                                </button></Link>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;