import React, { useState } from 'react';
import RenterPropertiesCards from './RenterPropertiesCards';
import RenterBookings from './RenterBookings';
import UserProfile from '../../UserProfile'; // NEW import

function RenterHome() {
    const [activeTab, setActiveTab] = useState('All Properties');

    return (
        <div className="container mt-4" style={{ color: '#2d3748' }}>
            <div className="d-flex mb-4 border-bottom overflow-auto" style={{ borderColor: '#e0e7ff !important', whiteSpace: 'nowrap' }}>
                <button 
                    onClick={() => setActiveTab('All Properties')} 
                    className={`btn px-4 py-2 ${activeTab === 'All Properties' ? 'fw-bold' : ''}`}
                    style={{ color: activeTab === 'All Properties' ? '#FF6B6B' : '#94a3b8', borderBottom: activeTab === 'All Properties' ? '3px solid #FF6B6B' : 'none' }}
                >
                    All Properties
                </button>
                <button 
                    onClick={() => setActiveTab('Booking History')} 
                    className={`btn px-4 py-2 ${activeTab === 'Booking History' ? 'fw-bold' : ''}`}
                    style={{ color: activeTab === 'Booking History' ? '#4ECDC4' : '#94a3b8', borderBottom: activeTab === 'Booking History' ? '3px solid #4ECDC4' : 'none' }}
                >
                    Booking History
                </button>
                {/* NEW Profile Tab Button */}
                <button 
                    onClick={() => setActiveTab('My Profile')} 
                    className={`btn px-4 py-2 ${activeTab === 'My Profile' ? 'fw-bold' : ''}`}
                    style={{ color: activeTab === 'My Profile' ? '#4f46e5' : '#94a3b8', borderBottom: activeTab === 'My Profile' ? '3px solid #4f46e5' : 'none' }}
                >
                    My Profile
                </button>
            </div>
            
            <div className="p-4 rounded-3 shadow-lg" style={{ backgroundColor: '#ffffff', border: '2px solid #e0e7ff' }}>
                {activeTab === 'All Properties' && <RenterPropertiesCards />}
                {activeTab === 'Booking History' && <RenterBookings />}
                {/* NEW Profile Tab Component */}
                {activeTab === 'My Profile' && <UserProfile />}
            </div>
        </div>
    );
}

export default RenterHome;