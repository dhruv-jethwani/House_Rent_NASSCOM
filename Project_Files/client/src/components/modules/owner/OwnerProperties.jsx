import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ENDPOINTS } from '../../../config';

function OwnerProperties() {
    const [properties, setProperties] = useState([]);
    const [editingProperty, setEditingProperty] = useState(null);
    const [editData, setEditData] = useState({});
    const [loading, setLoading] = useState(true);
    const currentUserId = localStorage.getItem('userId');

    // 1. Fetch properties and filter by current owner
    const fetchProps = async () => {
        try {
            const response = await axios.get(ENDPOINTS.GET_PROPERTIES);
            // Ensure we are filtering based on the ownerId object structure
            const mine = response.data.properties.filter(p => 
                p.ownerId === currentUserId || p.ownerId?._id === currentUserId
            );
            setProperties(mine);
        } catch (error) {
            console.error("Fetch Error:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProps();
    }, [currentUserId]);

    // 2. Edit Logic
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
            // hitting the PUT route: /api/properties/:id
            await axios.put(`${ENDPOINTS.GET_PROPERTIES}/${editingProperty}`, editData);
            setEditingProperty(null);
            sessionStorage.setItem('flash', 'Property updated successfully!');
            fetchProps();
        } catch (error) {
            console.error("Update failed", error);
            alert("Update failed");
        }
    };

    // 3. Delete Logic
    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this property?")) return;
        try {
            await axios.delete(`${ENDPOINTS.GET_PROPERTIES}/${id}`);
            sessionStorage.setItem('flash', 'Property deleted successfully!');
            fetchProps();
        } catch (error) {
            console.error("Delete failed", error);
        }
    };

    if (loading) return <div className="p-4" style={{ color: '#64748b' }}>Loading properties...</div>;

    return (
        <div className="table-responsive rounded-3 overflow-hidden">
            {editingProperty ? (
                /* EDIT FORM VIEW */
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
                        <div className="col-12">
                            <label className="small" style={{ color: '#64748b' }}>Full Address</label>
                            <input type="text" name="propertyAddress" className="form-control dark-input" value={editData.propertyAddress || ''} onChange={handleEditChange} required />
                        </div>
                        <div className="col-md-6">
                            <label className="small" style={{ color: '#64748b' }}>Availability Status</label>
                            <select name="status" className="form-select dark-input" value={editData.status || 'Available'} onChange={handleEditChange}>
                                <option value="Available">Available</option>
                                <option value="Unavailable">Unavailable</option>
                            </select>
                        </div>
                        <div className="col-12 d-flex gap-2 mt-4">
                            <button type="submit" className="btn px-4 fw-bold" style={{ background: 'linear-gradient(90deg, #4ECDC4, #45B7D1)', color: 'white', border: 'none' }}>Save Changes</button>
                            <button type="button" className="btn px-4" style={{ color: '#64748b', border: '2px solid #e0e7ff', backgroundColor: 'transparent' }} onClick={() => setEditingProperty(null)}>Cancel</button>
                        </div>
                    </form>
                </div>
            ) : (
                /* TABLE VIEW */
                <table className="table table-hover mb-0 align-middle text-center">
                    <thead style={{ background: 'linear-gradient(90deg, #4ECDC4, #45B7D1)' }}>
                        <tr>
                            <th className="py-3 px-3" style={{ color: '#FF6B6B', fontWeight: 'bold' }}>Property Name</th>
                            <th className="py-3" style={{ color: '#FF6B6B', fontWeight: 'bold' }}>Type</th>
                            <th className="py-3" style={{ color: '#FF6B6B', fontWeight: 'bold' }}>Address</th>
                            <th className="py-3" style={{ color: '#FF6B6B', fontWeight: 'bold' }}>Amount</th>
                            <th className="py-3" style={{ color: '#FF6B6B', fontWeight: 'bold' }}>Status</th>
                            <th className="py-3" style={{ color: '#FF6B6B', fontWeight: 'bold' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {properties.map(p => (
                            <tr key={p._id} style={{ backgroundColor: '#f8f9ff' }}>
                                <td className="fw-bold" style={{ color: '#FF6B6B' }}>{p.propertyTitle}</td>
                                <td style={{ color: '#64748b' }}>{p.propertyType} ({p.propertyAdType})</td>
                                <td className="text-truncate" style={{ maxWidth: '200px', color: '#64748b' }}>{p.propertyAddress}</td>
                                <td style={{ color: '#22c55e', fontWeight: 'bold' }}>₹{p.propertyAmt}</td>
                                <td>
                                    <span className={`badge rounded-pill ${p.status === 'Available' ? 'bg-success' : 'bg-danger'}`}>
                                        {p.status}
                                    </span>
                                </td>
                                <td>
                                    <button onClick={() => startEdit(p)} className="btn btn-sm me-2 px-3" style={{ color: '#45B7D1', border: '2px solid #45B7D1', backgroundColor: 'transparent' }}>Edit</button>
                                    <button onClick={() => handleDelete(p._id)} className="btn btn-sm px-3" style={{ color: '#FF6B6B', border: '2px solid #FF6B6B', backgroundColor: 'transparent' }}>Delete</button>
                                </td>
                            </tr>
                        ))}
                        {properties.length === 0 && (
                            <tr><td colSpan="6" className="py-5" style={{ color: '#94a3b8' }}>No properties found in your account.</td></tr>
                        )}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default OwnerProperties;