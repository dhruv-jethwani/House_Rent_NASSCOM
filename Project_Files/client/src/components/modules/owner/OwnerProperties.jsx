import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ENDPOINTS } from '../../../config';

function OwnerProperties() {
    const [properties, setProperties] = useState([]);
    const [editingProperty, setEditingProperty] = useState(null);
    const [editData, setEditData] = useState({});
    const [loading, setLoading] = useState(true);
    const [selectedProperty, setSelectedProperty] = useState(null);
    const currentUserId = localStorage.getItem('userId');

    const fetchProps = async () => {
        try {
            const response = await axios.get(ENDPOINTS.GET_PROPERTIES);
            const mine = response.data.properties.filter(p => 
                p.ownerId === currentUserId || p.ownerId?._id === currentUserId
            );
            setProperties(mine);
            
            if (selectedProperty) {
                const updatedSelected = mine.find(p => p._id === selectedProperty._id);
                if (updatedSelected) {
                    setSelectedProperty(updatedSelected);
                }
            }
        } catch (error) {
            console.error("Fetch Error:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProps();
    }, [currentUserId]);

    const startEdit = (property) => {
        setEditingProperty(property._id);
        setEditData(property);
    };

    const handleEditChange = (e) => {
        setEditData({ ...editData, [e.target.name]: e.target.value });
    };

    const saveEdit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`${ENDPOINTS.GET_PROPERTIES}/${editingProperty}`, editData);
            setEditingProperty(null);
            sessionStorage.setItem('flash', 'Property updated successfully!');
            fetchProps();
        } catch (error) {
            console.error("Update failed", error);
            alert("Update failed");
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this property?")) return;
        try {
            await axios.delete(`${ENDPOINTS.GET_PROPERTIES}/${id}`);
            sessionStorage.setItem('flash', 'Property deleted successfully!');
            
            if (selectedProperty && selectedProperty._id === id) {
                setSelectedProperty(null);
            }
            fetchProps();
        } catch (error) {
            console.error("Delete failed", error);
        }
    };

    if (loading) return <div className="p-4" style={{ color: '#64748b' }}>Loading properties...</div>;

    if (editingProperty) {
        return (
            <div className="table-responsive rounded-3 overflow-hidden">
                <div className="p-4 rounded shadow-lg border" style={{ backgroundColor: '#f8f9ff', borderColor: '#e0e7ff' }}>
                    <h5 className="mb-4" style={{ color: '#FF6B6B' }}>Edit Property: {editData.propertyTitle}</h5>
                    <form onSubmit={saveEdit} className="row g-3">
                        <div className="col-md-6">
                            <label className="small" style={{ color: '#64748b' }}>Property Title</label>
                            <input type="text" name="propertyTitle" className="form-control dark-input" value={editData.propertyTitle || ''} onChange={handleEditChange} required />
                        </div>
                        <div className="col-md-6">
                            <label className="small" style={{ color: '#64748b' }}>Amount (₹)</label>
                            <input type="number" name="propertyAmt" className="form-control dark-input" value={editData.propertyAmt || 0} onChange={handleEditChange} required />
                        </div>
                        <div className="col-md-6">
                            <label className="small" style={{ color: '#64748b' }}>State</label>
                            <input type="text" name="state" className="form-control dark-input" value={editData.state || ''} onChange={handleEditChange} required />
                        </div>
                        <div className="col-md-6">
                            <label className="small" style={{ color: '#64748b' }}>Availability Status</label>
                            <select name="status" className="form-select dark-input" value={editData.status || 'Available'} onChange={handleEditChange}>
                                <option value="Available">Available</option>
                                <option value="Unavailable">Unavailable</option>
                            </select>
                        </div>
                        <div className="col-12">
                            <label className="small" style={{ color: '#64748b' }}>Full Address</label>
                            <input type="text" name="propertyAddress" className="form-control dark-input" value={editData.propertyAddress || ''} onChange={handleEditChange} required />
                        </div>
                        <div className="col-12 d-flex gap-2 mt-4">
                            <button type="submit" className="btn px-4 fw-bold" style={{ background: 'linear-gradient(90deg, #4ECDC4, #45B7D1)', color: 'white', border: 'none' }}>Save Changes</button>
                            <button type="button" className="btn px-4" style={{ color: '#64748b', border: '2px solid #e0e7ff', backgroundColor: 'transparent' }} onClick={() => setEditingProperty(null)}>Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }

    if (selectedProperty) {
        return (
            <div className="card border-0 shadow-sm" style={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '2px solid #e0e7ff' }}>
                <div className="card-header bg-white border-bottom-0 pt-4 pb-0 px-4">
                    <button 
                        className="btn btn-sm px-4 py-2 fw-bold" 
                        style={{ background: 'linear-gradient(90deg, #e8eef9, #f0f4ff)', color: '#4f46e5', border: '2px solid #4f46e5', borderRadius: '8px' }}
                        onClick={() => setSelectedProperty(null)}
                    >
                        &larr; Back to My Properties
                    </button>
                </div>
                <div className="card-body p-4">
                    <div className="row">
                        <div className="col-md-6 mb-4 mb-md-0">
                            <img 
                                src={selectedProperty.propertyImage} 
                                alt={selectedProperty.propertyTitle} 
                                className="img-fluid rounded shadow-sm"
                                style={{ width: '100%', maxHeight: '400px', objectFit: 'cover', border: '2px solid #e0e7ff' }}
                            />
                        </div>
                        <div className="col-md-6">
                            <h2 className="fw-bold mb-3" style={{ color: '#FF6B6B' }}>{selectedProperty.propertyTitle}</h2>
                            <div className="mb-3">
                                <span className={`badge px-3 py-2 rounded-pill me-2 ${selectedProperty.status === 'Available' ? 'bg-success' : 'bg-danger'}`}>
                                    {selectedProperty.status}
                                </span>
                                <span className="badge bg-primary px-3 py-2 rounded-pill me-2">
                                    {selectedProperty.propertyType}
                                </span>
                                <span className="badge bg-info px-3 py-2 rounded-pill">
                                    For {selectedProperty.propertyAdType}
                                </span>
                            </div>
                            
                            <h3 className="fw-bold mb-4" style={{ color: '#4ECDC4' }}>₹{selectedProperty.propertyAmt}</h3>
                            
                            <div className="mb-3">
                                <h6 className="fw-bold" style={{ color: '#64748b' }}>Address</h6>
                                <p style={{ color: '#2d3748', marginBottom: '4px' }}>{selectedProperty.propertyAddress}</p>
                                <p style={{ color: '#64748b', fontSize: '0.9rem' }}>{selectedProperty.state || 'State not specified'}</p>
                            </div>
                            
                            <div className="mb-3">
                                <h6 className="fw-bold" style={{ color: '#64748b' }}>Contact Listed</h6>
                                <p style={{ color: '#2d3748' }}>{selectedProperty.ownerContact || 'N/A'}</p>
                            </div>

                            {selectedProperty.additionalInfo && (
                                <div className="mb-4">
                                    <h6 className="fw-bold" style={{ color: '#64748b' }}>Additional Information</h6>
                                    <p style={{ color: '#2d3748', whiteSpace: 'pre-wrap' }}>{selectedProperty.additionalInfo}</p>
                                </div>
                            )}

                            <div className="d-flex gap-2 mt-4">
                                <button 
                                    onClick={() => startEdit(selectedProperty)} 
                                    className="btn px-4 py-2 fw-bold" 
                                    style={{ background: 'linear-gradient(90deg, #4ECDC4, #45B7D1)', color: 'white', border: 'none', borderRadius: '8px' }}
                                >
                                    Edit Property
                                </button>
                                <button 
                                    onClick={() => handleDelete(selectedProperty._id)} 
                                    className="btn px-4 py-2 fw-bold"
                                    style={{ background: 'linear-gradient(90deg, #FF6B6B, #FFA07A)', color: 'white', border: 'none', borderRadius: '8px' }}
                                >
                                    Delete Property
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="table-responsive rounded-3 overflow-hidden">
            <table className="table table-hover mb-0 align-middle text-center border" style={{ borderColor: '#e0e7ff' }}>
                <thead style={{ background: 'linear-gradient(90deg, #4ECDC4, #45B7D1)' }}>
                    <tr>
                        <th className="py-3 px-3" style={{ border: 'none', color: '#FF6B6B', fontWeight: 'bold' }}>Property Name</th>
                        <th className="py-3" style={{ border: 'none', color: '#FF6B6B', fontWeight: 'bold' }}>Type</th>
                        <th className="py-3" style={{ border: 'none', color: '#FF6B6B', fontWeight: 'bold' }}>Location</th>
                        <th className="py-3" style={{ border: 'none', color: '#FF6B6B', fontWeight: 'bold' }}>Amount</th>
                        <th className="py-3" style={{ border: 'none', color: '#FF6B6B', fontWeight: 'bold' }}>Status</th>
                        <th className="py-3" style={{ border: 'none', color: '#FF6B6B', fontWeight: 'bold' }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {properties.map(p => (
                        <tr key={p._id} style={{ backgroundColor: '#f8f9ff' }}>
                            <td 
                                className="fw-bold px-3" 
                                style={{ color: '#4f46e5', cursor: 'pointer', textDecoration: 'underline' }}
                                onClick={() => setSelectedProperty(p)}
                            >
                                {p.propertyTitle}
                            </td>
                            <td style={{ color: '#64748b' }}>{p.propertyType} ({p.propertyAdType})</td>
                            <td className="text-truncate" style={{ maxWidth: '200px', color: '#64748b' }}>
                                {p.state ? `${p.state}` : p.propertyAddress}
                            </td>
                            <td style={{ color: '#22c55e', fontWeight: 'bold' }}>₹{p.propertyAmt}</td>
                            <td>
                                <span className={`badge rounded-pill ${p.status === 'Available' ? 'bg-success' : 'bg-danger'}`}>
                                    {p.status}
                                </span>
                            </td>
                            <td>
                                <div className="d-flex justify-content-center gap-2">
                                    <button 
                                        onClick={() => setSelectedProperty(p)} 
                                        className="btn btn-sm px-3" 
                                        style={{ color: '#4f46e5', border: '2px solid #4f46e5', backgroundColor: 'transparent', borderRadius: '8px' }}
                                    >
                                        View
                                    </button>
                                    <button 
                                        onClick={() => startEdit(p)} 
                                        className="btn btn-sm px-3" 
                                        style={{ color: '#45B7D1', border: '2px solid #45B7D1', backgroundColor: 'transparent', borderRadius: '8px' }}
                                    >
                                        Edit
                                    </button>
                                    <button 
                                        onClick={() => handleDelete(p._id)} 
                                        className="btn btn-sm px-3" 
                                        style={{ color: '#FF6B6B', border: '2px solid #FF6B6B', backgroundColor: 'transparent', borderRadius: '8px' }}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                    {properties.length === 0 && (
                        <tr>
                            <td colSpan="6" className="py-5" style={{ color: '#94a3b8' }}>
                                No properties found in your account.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default OwnerProperties;