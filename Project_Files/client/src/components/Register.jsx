import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { ENDPOINTS } from '../config';

function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [type, setType] = useState('Renter');
    const [hidden, setHidden] = useState(true);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    async function onsubmit(e) {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.post(ENDPOINTS.REGISTER, { username, email, password, type });
            sessionStorage.setItem('flash', 'Registration successful! Please login.');
            navigate('/login');
        } catch (error) {
            alert(error.response?.data?.message || "Registration failed.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-5 col-lg-4">
                    <div className="card house-rent-card shadow-lg p-4">
                        <div className="card-body">
                            <h2 className="fw-bold text-center mb-4 text-dark">Sign Up</h2>
                            <form onSubmit={onsubmit}>
                                <div className="mb-3">
                                    <label className="form-label small fw-bold text-uppercase" style={{ color: '#64748b' }}>Register As</label>
                                    <select 
                                        className="form-select border-0 bg-light py-3 shadow-none" 
                                        value={type} 
                                        onChange={(e) => setType(e.target.value)}
                                        style={{ color: '#2d3748' }}
                                    >
                                        <option value="Renter">Renter</option>
                                        <option value="Owner">Property Owner</option>
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <input type="text" className="form-control border-0 bg-light py-3" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} style={{ color: '#2d3748' }} required />
                                </div>
                                <div className="mb-3">
                                    <input type="email" className="form-control border-0 bg-light py-3" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} style={{ color: '#2d3748' }} required />
                                </div>
                                <div className="mb-4 position-relative">
                                    <input type={hidden ? "password" : "text"} className="form-control border-0 bg-light py-3" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ color: '#2d3748' }} required minLength="6" />
                                    <button className="btn position-absolute top-50 end-0 translate-middle-y" style={{ color: '#64748b' }} type="button" onClick={() => setHidden(!hidden)}>Show</button>
                                </div>
                                <button className="btn house-rent-btn w-100 py-3 mb-3" type="submit" disabled={loading}>
                                    {loading ? "Loading..." : "REGISTER"}
                                </button>
                            </form>
                            <div className="text-center">
                                <p className="small" style={{ color: '#64748b' }}>Already have an account? <Link to="/login" className="fw-bold text-decoration-none" style={{ color: '#4f46e5' }}>Login</Link></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;