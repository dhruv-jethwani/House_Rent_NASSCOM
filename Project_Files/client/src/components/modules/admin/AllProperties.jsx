import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ENDPOINTS } from '../../../config';

function AllProperties() {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);

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
            sessionStorage.setItem('flash', 'Property deleted successfully');
        } catch (error) {
            console.error("Error deleting property:", error);
            alert("Could not delete property");
        }
    };

    if (loading) return <div className="p-4" style={{ color: '#64748b' }}>Loading properties...</div>;

    return (
        <div className="table-responsive rounded-3 overflow-hidden" style={{ border: '2px solid #e0e7ff' }}>
            <table className="table table-hover mb-0 align-middle text-center">
                <thead style={{ background: 'linear-gradient(90deg, #FF6B6B, #FFA07A)' }}>
                    <tr>
                        <th className="py-3 px-4" style={{ border: 'none', color: '#4ECDC4', fontWeight: 'bold' }}>Property Title</th>
                        <th className="py-3" style={{ border: 'none', color: '#4ECDC4', fontWeight: 'bold' }}>Type</th>
                        <th className="py-3" style={{ border: 'none', color: '#4ECDC4', fontWeight: 'bold' }}>Address</th>
                        <th className="py-3" style={{ border: 'none', color: '#4ECDC4', fontWeight: 'bold' }}>Owner</th>
                        <th className="py-3" style={{ border: 'none', color: '#4ECDC4', fontWeight: 'bold' }}>Amount</th>
                        <th className="py-3" style={{ border: 'none', color: '#4ECDC4', fontWeight: 'bold' }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {properties.map((property) => (
                        <tr key={property._id} style={{ backgroundColor: '#f8f9ff' }}>
                            <td className="px-4" style={{ color: '#2d3748' }}>{property.propertyTitle}</td>
                            <td style={{ color: '#64748b' }}>{property.propertyType}</td>
                            <td className="small" style={{ color: '#64748b' }}>{property.propertyAddress}</td>
                            <td style={{ color: '#2d3748' }}>{property.ownerName || 'N/A'}</td>
                            <td style={{ color: '#22c55e', fontWeight: 'bold' }}>₹{property.propertyAmt || 'N/A'}</td>
                            <td>
                                <button 
                                    onClick={() => handleDeleteProperty(property._id)} 
                                    className="btn btn-sm rounded-pill px-3"
                                    style={{ background: 'linear-gradient(90deg, #FF6B6B, #FFA07A)', color: 'white', border: 'none' }}
                                >
                                    Delete
                                </button>
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
