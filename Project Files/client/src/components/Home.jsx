import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate();
    const [user, setUser] = useState({ name: '', role: '' });

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) return navigate('/login');
        
        setUser({
            name: localStorage.getItem('username'),
            role: localStorage.getItem('role')
        });
    }, [navigate]);

    return (
        <div className="house-rent-page-wrapper flex-column py-5">
            <div className="container">
                <header className="d-flex justify-content-between align-items-center mb-5 text-white">
                    <div>
                        <h1 className="fw-bold">Hello, {user.name}!</h1>
                        <p className="opacity-75">Welcome to your <span style={{ color: '#4361ee' }}>{user.role} Panel</span></p>
                    </div>
                    <span className="badge border border-primary px-3 py-2" style={{color: '#4361ee'}}>
                         <i className="bi bi-patch-check-fill me-1"></i> Verified
                    </span>
                </header>

                <div className="row g-4">
                    {/* Left: Table */}
                    <div className="col-lg-8">
                        <div className="card house-rent-card p-4 shadow border-0">
                            <h5 className="fw-bold mb-4">My Active Bookings</h5>
                            <table className="table">
                                <thead className="small text-muted">
                                    <tr><th>PROPERTY</th><th>CHECK-IN</th><th>STATUS</th></tr>
                                </thead>
                                <tbody>
                                    <tr><td>Modern Villa, CA</td><td>Mar 24, 2026</td><td><span className="badge bg-success-subtle text-success">Confirmed</span></td></tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Right: Actions */}
                    <div className="col-lg-4">
                        <div className="card house-rent-btn p-4 shadow mb-4 text-center">
                            <h5>Need a Room?</h5>
                            <Link to="/search" className="btn btn-light w-100 mt-3 rounded-pill fw-bold" style={{color: '#4361ee'}}>Browse Listings</Link>
                        </div>

                        <div className="card house-rent-card p-4 shadow border-0">
                            <h6 className="fw-bold">Profile Completion</h6>
                            <div className="progress my-2" style={{height: '8px'}}>
                                <div className="progress-bar" style={{width: '70%', backgroundColor: '#4361ee'}}></div>
                            </div>
                            <p className="text-muted smallest mb-3">70% completed</p>
                            <Link to="/profile" className="btn btn-sm btn-outline-primary w-100 rounded-pill">Complete Profile</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;