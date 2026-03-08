import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ENDPOINTS } from '../../../config';

function RenterPropertiesCards() {
    const [properties, setProperties] = useState([]);
    const [myBookings, setMyBookings] = useState([]);
    const [selectedProperty, setSelectedProperty] = useState(null); // State for detailed view

    // Filtering states
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedState, setSelectedState] = useState('');
    const [selectedType, setSelectedType] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const propRes = await axios.get(ENDPOINTS.GET_PROPERTIES);
                setProperties(propRes.data.properties);

                const token = localStorage.getItem('token');
                if (token) {
                    const bookRes = await axios.get(ENDPOINTS.GET_BOOKINGS, {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    setMyBookings(bookRes.data.bookings);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

    const handleBook = async (propId, ownerId) => {
        if (!ownerId) {
            alert("Owner information not available. Please try again.");
            return;
        }
        const phone = prompt("Please enter your phone number to book:");
        if(!phone) return;
        
        try {
            await axios.post(ENDPOINTS.CREATE_BOOKING, {
                propertyId: propId,
                ownerID: ownerId,
                userID: localStorage.getItem('userId'),
                userName: localStorage.getItem('username'),
                phone: phone,
                bookingStatus: 'pending'
            });
            sessionStorage.setItem('flash', 'Booking request sent successfully!');
            window.location.reload();
        } catch (error) {
            alert(error.response?.data?.message || "Failed to create booking request.");
        }
    };

    // Helper function to determine button state and appearance
    const getButtonDetails = (property) => {
        const userBooking = myBookings.find(b => 
            (typeof b.propertyId === 'object' ? b.propertyId?._id : b.propertyId) === property._id
        );

        let text = "Book Now";
        let disabled = false;
        let style = { background: 'linear-gradient(90deg, #FF6B6B, #FFA07A)', borderRadius: '8px', border: 'none', color: 'white' };

        if (property.status === 'Unavailable') {
            disabled = true;
            if (userBooking && userBooking.bookingStatus === 'booked') {
                text = "Booked (Yours)";
                style.background = '#22c55e';
            } else {
                text = "Not Available";
                style.background = '#94a3b8';
            }
        } else if (userBooking) {
            if (userBooking.bookingStatus === 'pending') {
                disabled = true;
                text = "Request Pending";
                style.background = '#f59e0b';
            } else if (userBooking.bookingStatus === 'rejected') {
                disabled = true;
                text = "Request Rejected";
                style.background = '#ef4444';
            }
        }

        return { text, disabled, style };
    };

    // Render the Detailed View if a property is selected
    if (selectedProperty) {
        const { text, disabled, style } = getButtonDetails(selectedProperty);

        return (
            <div className="card border-0 shadow-sm mt-2" style={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '2px solid #e0e7ff' }}>
                <div className="card-header bg-white border-bottom-0 pt-4 pb-0 px-4">
                    <button 
                        className="btn btn-sm px-4 py-2 fw-bold" 
                        style={{ background: 'linear-gradient(90deg, #e8eef9, #f0f4ff)', color: '#4f46e5', border: '2px solid #4f46e5', borderRadius: '8px' }}
                        onClick={() => setSelectedProperty(null)}
                    >
                        &larr; Back to Search
                    </button>
                </div>
                <div className="card-body p-4">
                    <div className="row g-4">
                        <div className="col-lg-6">
                            <img 
                                src={selectedProperty.propertyImage} 
                                alt={selectedProperty.propertyTitle} 
                                className="img-fluid rounded shadow-sm w-100"
                                style={{ maxHeight: '450px', objectFit: 'cover', border: '2px solid #e0e7ff' }}
                            />
                        </div>
                        <div className="col-lg-6 d-flex flex-column">
                            <h2 className="fw-bold mb-3" style={{ color: '#FF6B6B' }}>{selectedProperty.propertyTitle}</h2>
                            <div className="mb-3 d-flex flex-wrap gap-2">
                                <span className={`badge px-3 py-2 rounded-pill ${selectedProperty.status === 'Available' ? 'bg-success' : 'bg-danger'}`}>
                                    {selectedProperty.status}
                                </span>
                                <span className="badge bg-primary px-3 py-2 rounded-pill">
                                    {selectedProperty.propertyType}
                                </span>
                                <span className="badge bg-info px-3 py-2 rounded-pill">
                                    For {selectedProperty.propertyAdType}
                                </span>
                            </div>
                            
                            <h3 className="fw-bold mb-4" style={{ color: '#4ECDC4' }}>₹{selectedProperty.propertyAmt}</h3>
                            
                            <div className="row mb-3">
                                <div className="col-md-6 mb-3 mb-md-0">
                                    <h6 className="fw-bold" style={{ color: '#64748b' }}>Location</h6>
                                    <p style={{ color: '#2d3748', margin: 0 }}>{selectedProperty.propertyAddress}</p>
                                    <p style={{ color: '#4f46e5', fontWeight: 'bold', margin: 0 }}>{selectedProperty.state || 'State not specified'}</p>
                                </div>
                                <div className="col-md-6">
                                    <h6 className="fw-bold" style={{ color: '#64748b' }}>Owner Contact</h6>
                                    <p style={{ color: '#2d3748', margin: 0 }}>{selectedProperty.ownerContact || 'N/A'}</p>
                                    <p style={{ color: '#64748b', fontSize: '0.85rem' }}>Listed by: {selectedProperty.ownerName || 'Unknown'}</p>
                                </div>
                            </div>

                            {selectedProperty.additionalInfo && (
                                <div className="mb-4 flex-grow-1">
                                    <h6 className="fw-bold" style={{ color: '#64748b' }}>Additional Information</h6>
                                    <p style={{ color: '#2d3748', whiteSpace: 'pre-wrap', backgroundColor: '#f8f9ff', padding: '15px', borderRadius: '8px', border: '1px solid #e0e7ff' }}>
                                        {selectedProperty.additionalInfo}
                                    </p>
                                </div>
                            )}

                            <div className="mt-auto pt-3 border-top">
                                <button 
                                    className="btn w-100 fw-bold py-3 fs-5" 
                                    style={style} 
                                    onClick={() => handleBook(selectedProperty._id, selectedProperty.ownerId?._id || selectedProperty.ownerId)} 
                                    disabled={disabled}
                                >
                                    {text}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Dynamically get unique states from available properties for the filter dropdown
    const availableStates = [...new Set(properties.map(p => p.state).filter(state => state))].sort();

    // Filter properties based on selected criteria
    const filteredProperties = properties.filter(p => {
        const matchesSearch = p.propertyTitle.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesState = selectedState ? p.state === selectedState : true;
        const matchesType = selectedType ? p.propertyType === selectedType : true;
        const matchesMinPrice = minPrice ? p.propertyAmt >= Number(minPrice) : true;
        const matchesMaxPrice = maxPrice ? p.propertyAmt <= Number(maxPrice) : true;

        return matchesSearch && matchesState && matchesType && matchesMinPrice && matchesMaxPrice;
    });

    return (
        <div>
            {/* Search and Filter Section */}
            <div className="card shadow-sm border-0 p-3 mb-4 mt-2" style={{ backgroundColor: '#f8f9ff', borderRadius: '12px', border: '2px solid #e0e7ff' }}>
                <div className="row g-3">
                    <div className="col-md-3">
                        <input 
                            type="text" 
                            className="form-control dark-input" 
                            placeholder="Search by property name..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="col-md-2">
                        <select className="form-select dark-input" value={selectedState} onChange={(e) => setSelectedState(e.target.value)}>
                            <option value="">All Locations</option>
                            {availableStates.map(state => (
                                <option key={state} value={state}>{state}</option>
                            ))}
                        </select>
                    </div>
                    <div className="col-md-2">
                        <select className="form-select dark-input" value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
                            <option value="">All Types</option>
                            <option value="Residential">Residential</option>
                            <option value="Commercial">Commercial</option>
                        </select>
                    </div>
                    <div className="col-md-2">
                        <input 
                            type="number" 
                            className="form-control dark-input" 
                            placeholder="Min Price (₹)" 
                            value={minPrice}
                            onChange={(e) => setMinPrice(e.target.value)}
                        />
                    </div>
                    <div className="col-md-2">
                        <input 
                            type="number" 
                            className="form-control dark-input" 
                            placeholder="Max Price (₹)" 
                            value={maxPrice}
                            onChange={(e) => setMaxPrice(e.target.value)}
                        />
                    </div>
                    <div className="col-md-1 d-flex align-items-end">
                        <button 
                            className="btn w-100 fw-bold" 
                            style={{ backgroundColor: '#cbd5e0', color: '#2d3748', border: 'none', borderRadius: '8px' }}
                            onClick={() => {
                                setSearchTerm('');
                                setSelectedState('');
                                setSelectedType('');
                                setMinPrice('');
                                setMaxPrice('');
                            }}
                        >
                            Reset
                        </button>
                    </div>
                </div>
            </div>

            {/* Properties List Section */}
            <div className="row g-4 mt-2">
                {filteredProperties.map(p => {
                    const { text, disabled, style } = getButtonDetails(p);

                    return (
                        <div className="col-md-4" key={p._id}>
                            <div className="card h-100 border-0 shadow" style={{ backgroundColor: '#ffffff', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 12px rgba(69, 183, 209, 0.1)', border: '2px solid #e0e7ff' }}>
                                <img src={p.propertyImage} className="card-img-top" alt="Property" style={{ height: '200px', objectFit: 'cover' }} />
                                <div className="card-body d-flex flex-column">
                                    <h5 className="card-title fw-bold" style={{ color: '#FF6B6B' }}>{p.propertyTitle}</h5>
                                    <p className="small mb-1" style={{ color: '#64748b' }}><i className="bi bi-geo-alt-fill me-1"></i>{p.propertyAddress}</p>
                                    {p.state && <p className="small mb-3" style={{ color: '#4f46e5', fontWeight: 'bold' }}>{p.state}</p>}
                                    <p className="small mb-1" style={{ color: '#2d3748' }}><strong>Type:</strong> {p.propertyType} ({p.propertyAdType})</p>
                                    <p className="small mb-1" style={{ color: '#2d3748' }}>
                                        <strong>Status:</strong> <span style={{ color: p.status === 'Available' ? '#22c55e' : '#ef4444' }}>{p.status}</span>
                                    </p>
                                    <h5 className="fw-bold mt-2 mb-3" style={{ color: '#4ECDC4' }}>₹{p.propertyAmt}</h5>
                                    
                                    <div className="mt-auto d-flex gap-2">
                                        <button 
                                            className="btn w-50 fw-bold" 
                                            style={{ color: '#4f46e5', border: '2px solid #4f46e5', backgroundColor: 'transparent', borderRadius: '8px' }}
                                            onClick={() => setSelectedProperty(p)}
                                        >
                                            View Details
                                        </button>
                                        <button 
                                            className="btn w-50 fw-bold text-white" 
                                            style={style} 
                                            onClick={() => handleBook(p._id, p.ownerId?._id || p.ownerId)} 
                                            disabled={disabled}
                                        >
                                            {text}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
                
                {filteredProperties.length === 0 && (
                    <div className="col-12 text-center py-5">
                        <p style={{ color: '#94a3b8', fontSize: '1.1rem' }}>No properties match your search criteria.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default RenterPropertiesCards;