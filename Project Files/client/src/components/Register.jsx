import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { ENDPOINTS } from '../config';
import '../App.css';

function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [hidden, setHidden] = useState(true);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    async function onsubmit(e) {
        e.preventDefault();
        if (!username || !email || !password) return;
        
        setLoading(true);
        try {
            await axios.post(ENDPOINTS.REGISTER, { username, email, password });
            setUsername(''); setEmail(''); setPassword('');
            // store a flash message and move to login page; App.jsx will read
            // the value from sessionStorage and display the green bar.
            sessionStorage.setItem('flash', 'Registration successful! Please login.');
            navigate('/login');
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="shopez-page-wrapper">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-5 col-lg-4">
                        <div className="card shopez-card shadow-lg p-4">
                            <div className="card-body">
                                <div className="text-center mb-4">
                                    <h2 className="fw-bold" style={{ color: '#1e293b' }}>ShopEZ</h2>
                                    <p className="text-muted small">Create your account</p>
                                </div>
                                
                                <form onSubmit={onsubmit}>
                                    <div className="mb-3">
                                        <label className="form-label small fw-bold text-uppercase text-muted">Username</label>
                                        <div className="input-group shopez-input-group">
                                            <span className="input-group-text border-0 bg-transparent text-muted ps-3">
                                                <i className="bi bi-person"></i>
                                            </span>
                                            <input type="text" className="form-control border-0 bg-transparent py-3 shadow-none" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                                        </div>
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label small fw-bold text-uppercase text-muted">Email</label>
                                        <div className="input-group shopez-input-group">
                                            <span className="input-group-text border-0 bg-transparent text-muted ps-3">
                                                <i className="bi bi-envelope"></i>
                                            </span>
                                            <input type="email" className="form-control border-0 bg-transparent py-3 shadow-none" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                        </div>
                                    </div>

                                    <div className="mb-4">
                                        <label className="form-label small fw-bold text-uppercase text-muted">Password</label>
                                        <div className="input-group shopez-input-group">
                                            <span className="input-group-text border-0 bg-transparent text-muted ps-3">
                                                <i className="bi bi-lock"></i>
                                            </span>
                                            <input type={hidden ? "password" : "text"} className="form-control border-0 bg-transparent py-3 shadow-none" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} />
                                            <button className="btn border-0 text-muted pe-3" type="button" onClick={() => setHidden(!hidden)}>
                                                <i className={`bi bi-eye${hidden ? '' : '-slash'}-fill`}></i>
                                            </button>
                                        </div>
                                    </div>

                                    <button className="btn shopez-btn w-100 py-3 mb-3" type="submit"  disabled={loading}>
                                        {loading ? <span className="spinner-border spinner-border-sm"></span> : "REGISTER"}
                                    </button>
                                </form>

                                <div className="text-center">
                                    <p className="text-muted small">Already have an account? <Link to="/login" className="fw-bold text-decoration-none" style={{ color: '#4361ee' }}>Login</Link></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;