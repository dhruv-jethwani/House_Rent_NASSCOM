import React, { useState } from 'react';
import axios from 'axios';
import { ENDPOINTS } from '../../../config';

function AddProperty() {
    const [formData, setFormData] = useState({
        propertyTitle: '', // Added state for title
        propertyType: 'Residential',
        propertyAdType: 'Rent',
        propertyAddress: '',
        ownerContact: '',
        propertyAmt: 0,
        additionalInfo: '',
        propertyImage: '' // Handled as string URL/path for this project
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const ownerId = localStorage.getItem('userId');
        const ownerName = localStorage.getItem('username');

        try {
            await axios.post(ENDPOINTS.ADD_PROPERTY, { ...formData, ownerId, ownerName });
            sessionStorage.setItem('flash', 'Property added successfully!');
            window.location.reload();
        } catch (error) {
            console.error(error);
            alert("Error adding property");
        }
    };

    return (
        <div className="card shadow-lg border-0 p-4" style={{ backgroundColor: '#ffffff', borderRadius: '16px', border: '2px solid #e0e7ff' }}>
            <h3 className="text-center fw-bold mb-5" style={{ color: '#FF6B6B' }}>Add New Property</h3>
            
            <form onSubmit={handleSubmit}>
                {/* New Row for Property Title */}
                <div className="row mb-4">
                    <div className="col-12">
                        <label className="form-label small fw-semibold" style={{ color: '#64748b' }}>Property Title / Name</label>
                        <input 
                            type="text" 
                            className="form-control dark-input" 
                            placeholder="e.g. Luxury 2BHK Apartment or Sunrise Villa" 
                            name="propertyTitle" 
                            value={formData.propertyTitle} 
                            onChange={handleChange}
                            required 
                        />
                    </div>
                </div>

                <div className="row g-4 mb-4">
                    <div className="col-md-4">
                        <label className="form-label small fw-semibold" style={{ color: '#64748b' }}>Property Type</label>
                        <select className="form-select dark-input" name="propertyType" value={formData.propertyType} onChange={handleChange}>
                            <option value="Residential">Residential</option>
                            <option value="Commercial">Commercial</option>
                        </select>
                    </div>
                    <div className="col-md-4">
                        <label className="form-label small fw-semibold" style={{ color: '#64748b' }}>Property Ad Type</label>
                        <select className="form-select dark-input" name="propertyAdType" value={formData.propertyAdType} onChange={handleChange}>
                            <option value="Rent">Rent</option>
                            <option value="Sale">Sale</option>
                        </select>
                    </div>
                    <div className="col-md-4">
                        <label className="form-label small fw-semibold" style={{ color: '#64748b' }}>Property Full Address</label>
                        <input type="text" className="form-control dark-input" placeholder="Address" name="propertyAddress" value={formData.propertyAddress} onChange={handleChange} required />
                    </div>
                </div>

                <div className="row g-4 mb-4">
                    <div className="col-md-4">
                        <label className="form-label small fw-semibold" style={{ color: '#64748b' }}>Property Image URL</label>
                        <input type="text" className="form-control dark-input" placeholder="Paste image link" name="propertyImage" value={formData.propertyImage} onChange={handleChange} required />
                    </div>
                    <div className="col-md-4">
                        <label className="form-label small fw-semibold" style={{ color: '#64748b' }}>Owner Contact No.</label>
                        <input type="text" className="form-control dark-input" placeholder="Contact number" name="ownerContact" value={formData.ownerContact} onChange={handleChange} required />
                    </div>
                    <div className="col-md-4">
                        <label className="form-label small fw-semibold" style={{ color: '#64748b' }}>Property Amount</label>
                        <input type="number" className="form-control dark-input" name="propertyAmt" value={formData.propertyAmt} onChange={handleChange} required />
                    </div>
                </div>

                <div className="mb-4">
                    <label className="form-label small fw-semibold" style={{ color: '#64748b' }}>Additional Details</label>
                    <textarea className="form-control dark-input" rows="4" placeholder="Add any details here..." name="additionalInfo" value={formData.additionalInfo} onChange={handleChange}></textarea>
                </div>

                <div className="d-flex justify-content-end">
                    <button type="submit" className="btn px-5 py-2 fw-bold text-white" style={{ background: 'linear-gradient(90deg, #4ECDC4, #45B7D1)', borderRadius: '8px', border: 'none' }}>
                        Submit Form
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AddProperty;