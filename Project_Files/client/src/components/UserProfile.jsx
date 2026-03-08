import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ENDPOINTS } from '../config';

function UserProfile() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });
    const [balance, setBalance] = useState(0); // State for user wallet balance
    const [addAmount, setAddAmount] = useState(''); // State for adding funds
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [funding, setFunding] = useState(false);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(ENDPOINTS.GET_PROFILE, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setFormData({
                    username: response.data.user.username,
                    email: response.data.user.email,
                    password: ''
                });
                setBalance(response.data.user.balance || 0);
            } catch (error) {
                console.error("Failed to fetch profile", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            const token = localStorage.getItem('token');
            const dataToSubmit = { 
                username: formData.username, 
                email: formData.email 
            };
            
            if (formData.password.trim() !== '') {
                dataToSubmit.password = formData.password;
            }

            const response = await axios.put(ENDPOINTS.UPDATE_PROFILE, dataToSubmit, {
                headers: { Authorization: `Bearer ${token}` }
            });

            localStorage.setItem('username', response.data.user.username);
            sessionStorage.setItem('flash', 'Profile updated successfully!');
            window.location.reload(); 
        } catch (error) {
            console.error("Update error:", error);
            alert(error.response?.data?.message || "Failed to update profile");
        } finally {
            setSubmitting(false);
        }
    };

    const handleAddFunds = async (e) => {
        e.preventDefault();
        if (!addAmount || isNaN(addAmount) || Number(addAmount) <= 0) {
            alert("Please enter a valid amount.");
            return;
        }
        
        setFunding(true);
        try {
            const token = localStorage.getItem('token');
            const response = await axios.put(ENDPOINTS.UPDATE_PROFILE, { addBalance: Number(addAmount) }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            
            setBalance(response.data.user.balance);
            setAddAmount('');
            sessionStorage.setItem('flash', `Successfully added ₹${addAmount} to your wallet!`);
            window.location.reload();
        } catch (error) {
            console.error("Funding error:", error);
            alert("Failed to add funds.");
        } finally {
            setFunding(false);
        }
    };

    if (loading) return <div className="p-4" style={{ color: '#64748b' }}>Loading profile...</div>;

    return (
        <div className="row justify-content-center g-4">
            
            {/* Wallet Section */}
            <div className="col-md-10 col-lg-8">
                <div className="card shadow-sm border-0 p-4 mb-2" style={{ backgroundColor: '#ffffff', borderRadius: '16px', border: '2px solid #e0e7ff', background: 'linear-gradient(135deg, #f0f4ff 0%, #e8f5ff 100%)' }}>
                    <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
                        <div>
                            <h4 className="fw-bold mb-1" style={{ color: '#4f46e5' }}>My Wallet</h4>
                            <p className="mb-0 small" style={{ color: '#64748b' }}>Current Available Balance</p>
                        </div>
                        <h2 className="fw-bold mb-0" style={{ color: '#22c55e' }}>₹{balance}</h2>
                    </div>
                    
                    <hr style={{ borderColor: '#cbd5e0' }} />
                    
                    <form onSubmit={handleAddFunds} className="d-flex gap-2">
                        <input 
                            type="number" 
                            className="form-control dark-input" 
                            placeholder="Amount to add (₹)" 
                            value={addAmount} 
                            onChange={(e) => setAddAmount(e.target.value)}
                            required 
                            min="1"
                        />
                        <button type="submit" className="btn fw-bold px-4 text-white" style={{ background: 'linear-gradient(90deg, #4ECDC4, #45B7D1)', borderRadius: '8px', border: 'none', whiteSpace: 'nowrap' }} disabled={funding}>
                            {funding ? "Adding..." : "+ Add Funds"}
                        </button>
                    </form>
                </div>
            </div>

            {/* Profile Settings Section */}
            <div className="col-md-10 col-lg-8">
                <div className="card shadow-lg border-0 p-4" style={{ backgroundColor: '#ffffff', borderRadius: '16px', border: '2px solid #e0e7ff' }}>
                    <h4 className="fw-bold mb-4" style={{ color: '#2d3748' }}>Account Settings</h4>
                    
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="form-label small fw-semibold" style={{ color: '#64748b' }}>Username</label>
                            <input 
                                type="text" 
                                className="form-control dark-input py-2" 
                                name="username" 
                                value={formData.username} 
                                onChange={handleChange}
                                required 
                            />
                        </div>

                        <div className="mb-4">
                            <label className="form-label small fw-semibold" style={{ color: '#64748b' }}>Email Address</label>
                            <input 
                                type="email" 
                                className="form-control dark-input py-2" 
                                name="email" 
                                value={formData.email} 
                                onChange={handleChange}
                                required 
                            />
                        </div>

                        <div className="mb-4">
                            <label className="form-label small fw-semibold" style={{ color: '#64748b' }}>New Password (leave blank to keep current)</label>
                            <input 
                                type="password" 
                                className="form-control dark-input py-2" 
                                name="password" 
                                placeholder="Enter new password..."
                                value={formData.password} 
                                onChange={handleChange}
                                minLength="6"
                            />
                        </div>

                        <button 
                            type="submit" 
                            className="btn house-rent-btn w-100 py-3 mt-2" 
                            disabled={submitting}
                        >
                            {submitting ? "Saving..." : "Save Changes"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default UserProfile;