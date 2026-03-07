import React, { useState } from 'react';
import AddProperty from './AddProperty';
import OwnerProperties from './OwnerProperties';
import OwnerBookings from './OwnerBookings';

function OwnerHome() {
    const [activeTab, setActiveTab] = useState('Add Property');

    return (
        <div className="container mt-4" style={{ color: '#2d3748' }}>
            <div className="d-flex mb-4 border-bottom" style={{ borderColor: '#e0e7ff !important' }}>
                <button onClick={() => setActiveTab('Add Property')} className={`btn px-4 py-2 ${activeTab === 'Add Property' ? 'fw-bold' : ''}`} style={{ color: activeTab === 'Add Property' ? '#FF6B6B' : '#94a3b8', borderBottom: activeTab === 'Add Property' ? '3px solid #FF6B6B' : 'none' }}>Add Property</button>
                <button onClick={() => setActiveTab('All Properties')} className={`btn px-4 py-2 ${activeTab === 'All Properties' ? 'fw-bold' : ''}`} style={{ color: activeTab === 'All Properties' ? '#4ECDC4' : '#94a3b8', borderBottom: activeTab === 'All Properties' ? '3px solid #4ECDC4' : 'none' }}>All Properties</button>
                <button onClick={() => setActiveTab('All Bookings')} className={`btn px-4 py-2 ${activeTab === 'All Bookings' ? 'fw-bold' : ''}`} style={{ color: activeTab === 'All Bookings' ? '#45B7D1' : '#94a3b8', borderBottom: activeTab === 'All Bookings' ? '3px solid #45B7D1' : 'none' }}>All Bookings</button>
            </div>
            
            <div className="p-4 rounded-3 shadow-lg" style={{ backgroundColor: '#ffffff', border: '2px solid #e0e7ff' }}>
                {activeTab === 'Add Property' && <AddProperty />}
                {activeTab === 'All Properties' && <OwnerProperties />}
                {activeTab === 'All Bookings' && <OwnerBookings />}
            </div>
        </div>
    );
}
export default OwnerHome;