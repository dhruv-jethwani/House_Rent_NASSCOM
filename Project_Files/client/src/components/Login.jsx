import React, { useState, useRef } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { ENDPOINTS } from '../config';
import { animate, stagger } from 'animejs';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [hidden, setHidden] = useState(true);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const iconRef = useRef(null);

    const togglePassword = () => {
        setHidden(!hidden);
        
        animate(iconRef.current, {
            scale: [1, 1.3, 1],
            rotate: hidden ? [0, 15, 0] : [0, -15, 0],
            duration: 400,
            easing: 'easeOutElastic(1, .8)'
        });
    };

    async function onsubmit(e) {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post(ENDPOINTS.LOGIN, { username, password });
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('type', response.data.type);
            localStorage.setItem('username', response.data.username);
            localStorage.setItem('userId', response.data.userid);
            
            sessionStorage.setItem('flash', `Welcome back!`);
            navigate(`/${response.data.type.toLowerCase()}`);
        } catch (error) {
            alert(error.response?.data?.message || "Login failed.");
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
                            <h2 className="fw-bold text-center mb-4 text-dark">Welcome Back</h2>
                            <form onSubmit={onsubmit}>
                                <div className="mb-3">
                                    <input type="text" className="form-control border-0 bg-light py-3" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} style={{ color: '#2d3748' }} required />
                                </div>
                                <div className="mb-4 position-relative">
                                    <input 
                                        type={hidden ? "password" : "text"} 
                                        className="form-control border-0 bg-light py-3 pe-5" 
                                        placeholder="Password" 
                                        value={password} 
                                        onChange={(e) => setPassword(e.target.value)} 
                                        style={{ color: '#2d3748' }} 
                                        required 
                                    />
                                    <button 
                                        className="btn position-absolute top-50 end-0 translate-middle-y border-0" 
                                        style={{ color: '#2d3748', background: 'transparent', zIndex: 10 }} 
                                        type="button" 
                                        onClick={togglePassword}
                                    >
                                        <i 
                                            ref={iconRef} 
                                            className={`bi ${hidden ? 'bi-eye-slash-fill' : 'bi-eye-fill'} fs-5`}
                                            style={{ display: 'inline-block' }}
                                        ></i>
                                    </button>
                                </div>
                                <button className="btn house-rent-btn w-100 py-3 mb-3" type="submit" disabled={loading}>
                                    {loading ? "Loading..." : "LOGIN"}
                                </button>
                            </form>
                            <div className="text-center">
                                <p className="small" style={{ color: '#64748b' }}>New here? <Link to="/register" className="fw-bold text-decoration-none" style={{ color: '#4f46e5' }}>Register</Link></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;