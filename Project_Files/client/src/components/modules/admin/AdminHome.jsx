import React, { useState } from 'react';
import AllUsers from './AllUsers';
import AllProperties from './AllProperties';
import AllBookings from './AllBookings';

function AdminHome() {
    const [activeTab, setActiveTab] = useState('All Users');

    return (
        <div className="container mt-4" style={{ color: '#2d3748' }}>
            <div className="d-flex mb-4 border-bottom" style={{ borderColor: '#e0e7ff !important' }}>
                <button onClick={() => setActiveTab('All Users')} className={`btn px-4 py-2 ${activeTab === 'All Users' ? 'fw-bold' : ''}`} style={{ color: activeTab === 'All Users' ? '#FF6B6B' : '#94a3b8', borderBottom: activeTab === 'All Users' ? '3px solid #FF6B6B' : 'none' }}>All Users</button>
                <button onClick={() => setActiveTab('All Properties')} className={`btn px-4 py-2 ${activeTab === 'All Properties' ? 'fw-bold' : ''}`} style={{ color: activeTab === 'All Properties' ? '#4ECDC4' : '#94a3b8', borderBottom: activeTab === 'All Properties' ? '3px solid #4ECDC4' : 'none' }}>All Properties</button>
                <button onClick={() => setActiveTab('All Bookings')} className={`btn px-4 py-2 ${activeTab === 'All Bookings' ? 'fw-bold' : ''}`} style={{ color: activeTab === 'All Bookings' ? '#45B7D1' : '#94a3b8', borderBottom: activeTab === 'All Bookings' ? '3px solid #45B7D1' : 'none' }}>All Bookings</button>
            </div>
            
            <div className="p-4 rounded-3 shadow-lg" style={{ backgroundColor: '#ffffff', border: '2px solid #e0e7ff' }}>
                {activeTab === 'All Users' && <AllUsers />}
                {activeTab === 'All Properties' && <AllProperties />}
                {activeTab === 'All Bookings' && <AllBookings />}
            </div>
        </div>
    );
}
export default AdminHome;