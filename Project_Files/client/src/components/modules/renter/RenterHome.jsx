import React, { useState } from 'react';
import RenterPropertiesCards from './RenterPropertiesCards';
import RenterBookings from './RenterBookings';

function RenterHome() {
    const [activeTab, setActiveTab] = useState('All Properties');

    return (
        <div className="container mt-4" style={{ color: '#2d3748' }}>
            <div className="d-flex mb-4 border-bottom" style={{ borderColor: '#e0e7ff !important' }}>
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
            </div>
            
            <div className="p-4 rounded-3 shadow-lg" style={{ backgroundColor: '#ffffff', border: '2px solid #e0e7ff' }}>
                {activeTab === 'All Properties' && <RenterPropertiesCards />}
                {activeTab === 'Booking History' && <RenterBookings />}
            </div>
        </div>
    );
}

export default RenterHome;