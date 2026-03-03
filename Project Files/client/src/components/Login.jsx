import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ENDPOINTS } from '../config';
import '../App.css';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [hidden, setHidden] = useState(true);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(ENDPOINTS.GET_USERS);
                console.log("Users sync:", res.data.users);
            } catch (err) { console.error(err); }
        };
        fetchData();
    }, []);

    async function onsubmit(e) {
        e.preventDefault();
        if (!username || !password) return;

        setLoading(true);
        try {
            const response = await axios.post(ENDPOINTS.LOGIN, { username, password });
            console.log(response.data.message);
            setUsername(''); setPassword('');
            alert("Welcome back!");
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
                                    <p className="text-muted small">Welcome back! Login to continue.</p>
                                </div>
                                
                                <form onSubmit={onsubmit}>
                                    <div className="mb-3">
                                        <label className="form-label small fw-bold text-uppercase text-muted">Username</label>
                                        <div className="input-group shopez-input-group">
                                            <span className="input-group-text border-0 bg-transparent text-muted ps-3">
                                                <i className="bi bi-person-circle"></i>
                                            </span>
                                            <input type="text" className="form-control border-0 bg-transparent py-3 shadow-none" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                                        </div>
                                    </div>

                                    <div className="mb-4">
                                        <label className="form-label small fw-bold text-uppercase text-muted">Password</label>
                                        <div className="input-group shopez-input-group">
                                            <span className="input-group-text border-0 bg-transparent text-muted ps-3">
                                                <i className="bi bi-shield-lock"></i>
                                            </span>
                                            <input type={hidden ? "password" : "text"} className="form-control border-0 bg-transparent py-3 shadow-none" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} />
                                            <button className="btn border-0 text-muted pe-3" type="button" onClick={() => setHidden(!hidden)}>
                                                <i className={`bi bi-eye${hidden ? '' : '-slash'}-fill`}></i>
                                            </button>
                                        </div>
                                    </div>

                                    <button className="btn shopez-btn w-100 py-3 mb-3" type="submit" disabled={loading}>
                                        {loading ? <span className="spinner-border spinner-border-sm"></span> : "LOGIN"}
                                    </button>
                                </form>

                                <div className="text-center">
                                    <p className="text-muted small">New here? <Link to="/" className="fw-bold text-decoration-none" style={{ color: '#4361ee' }}>Register</Link></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;