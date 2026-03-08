import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ENDPOINTS } from '../../../config';

function AllProperties() {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedProperty, setSelectedProperty] = useState(null); // State to manage the detailed view

    const fetchProperties = async () => {
        try {
            const response = await axios.get(ENDPOINTS.GET_PROPERTIES);
            setProperties(response.data.properties);
        } catch (error) {
            console.error("Error fetching properties:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProperties();
    }, []);

    const handleDeleteProperty = async (propertyId) => {
        if (!window.confirm("Are you sure you want to delete this property?")) return;
        try {
            const token = localStorage.getItem('token');
            await axios.delete(ENDPOINTS.DELETE_PROPERTY(propertyId), {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setProperties(properties.filter(p => p._id !== propertyId));
            
            // If the deleted property is currently being viewed, go back to the list
            if (selectedProperty && selectedProperty._id === propertyId) {
                setSelectedProperty(null);
            }
            
            sessionStorage.setItem('flash', 'Property deleted successfully');
        } catch (error) {
            console.error("Error deleting property:", error);
            alert("Could not delete property");
        }
    };

    if (loading) return <div className="p-4" style={{ color: '#64748b' }}>Loading properties...</div>;

    // Detailed View Rendering
    if (selectedProperty) {
        return (
            <div className="card border-0 shadow-sm" style={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '2px solid #e0e7ff' }}>
                <div className="card-header bg-white border-bottom-0 pt-4 pb-0 px-4">
                    <button 
                        className="btn btn-sm px-4 py-2 fw-bold" 
                        style={{ background: 'linear-gradient(90deg, #e8eef9, #f0f4ff)', color: '#4f46e5', border: '2px solid #4f46e5', borderRadius: '8px' }}
                        onClick={() => setSelectedProperty(null)}
                    >
                        &larr; Back to All Properties
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
                                <p style={{ color: '#2d3748' }}>{selectedProperty.propertyAddress}</p>
                            </div>
                            
                            <div className="row mb-3">
                                <div className="col-6">
                                    <h6 className="fw-bold" style={{ color: '#64748b' }}>Owner Name</h6>
                                    <p style={{ color: '#2d3748' }}>{selectedProperty.ownerName || 'N/A'}</p>
                                </div>
                                <div className="col-6">
                                    <h6 className="fw-bold" style={{ color: '#64748b' }}>Contact</h6>
                                    <p style={{ color: '#2d3748' }}>{selectedProperty.ownerContact || 'N/A'}</p>
                                </div>
                            </div>

                            {selectedProperty.additionalInfo && (
                                <div className="mb-4">
                                    <h6 className="fw-bold" style={{ color: '#64748b' }}>Additional Information</h6>
                                    <p style={{ color: '#2d3748', whiteSpace: 'pre-wrap' }}>{selectedProperty.additionalInfo}</p>
                                </div>
                            )}

                            <button 
                                onClick={() => handleDeleteProperty(selectedProperty._id)} 
                                className="btn px-4 py-2 mt-2 fw-bold"
                                style={{ background: 'linear-gradient(90deg, #FF6B6B, #FFA07A)', color: 'white', border: 'none', borderRadius: '8px' }}
                            >
                                Delete Property
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // List View Rendering
    return (
        <div className="table-responsive rounded-3 overflow-hidden" style={{ border: '2px solid #e0e7ff' }}>
            <table className="table table-hover mb-0 align-middle text-center">
                <thead style={{ background: 'linear-gradient(90deg, #FF6B6B, #FFA07A)' }}>
                    <tr>
                        <th className="py-3 px-4" style={{ border: 'none', color: '#ffffff', fontWeight: 'bold' }}>Property Title</th>
                        <th className="py-3" style={{ border: 'none', color: '#ffffff', fontWeight: 'bold' }}>Type</th>
                        <th className="py-3" style={{ border: 'none', color: '#ffffff', fontWeight: 'bold' }}>Address</th>
                        <th className="py-3" style={{ border: 'none', color: '#ffffff', fontWeight: 'bold' }}>Owner</th>
                        <th className="py-3" style={{ border: 'none', color: '#ffffff', fontWeight: 'bold' }}>Amount</th>
                        <th className="py-3" style={{ border: 'none', color: '#ffffff', fontWeight: 'bold' }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {properties.map((property) => (
                        <tr key={property._id} style={{ backgroundColor: '#f8f9ff' }}>
                            <td 
                                className="px-4 fw-bold" 
                                style={{ color: '#4f46e5', cursor: 'pointer', textDecoration: 'underline' }} 
                                onClick={() => setSelectedProperty(property)}
                            >
                                {property.propertyTitle}
                            </td>
                            <td style={{ color: '#64748b' }}>{property.propertyType}</td>
                            <td className="small text-truncate" style={{ maxWidth: '150px', color: '#64748b' }}>{property.propertyAddress}</td>
                            <td style={{ color: '#2d3748' }}>{property.ownerName || 'N/A'}</td>
                            <td style={{ color: '#22c55e', fontWeight: 'bold' }}>₹{property.propertyAmt || 'N/A'}</td>
                            <td>
                                <div className="d-flex justify-content-center gap-2">
                                    <button 
                                        onClick={() => setSelectedProperty(property)} 
                                        className="btn btn-sm rounded-pill px-3"
                                        style={{ background: 'linear-gradient(90deg, #4ECDC4, #45B7D1)', color: 'white', border: 'none' }}
                                    >
                                        View
                                    </button>
                                    <button 
                                        onClick={() => handleDeleteProperty(property._id)} 
                                        className="btn btn-sm rounded-pill px-3"
                                        style={{ background: 'linear-gradient(90deg, #FF6B6B, #FFA07A)', color: 'white', border: 'none' }}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                    {properties.length === 0 && (
                        <tr>
                            <td colSpan="6" className="py-4" style={{ color: '#94a3b8' }}>
                                No properties available.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default AllProperties;