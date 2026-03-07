export const API_BASE_URL = "http://localhost:5000/api";

export const ENDPOINTS = {
    REGISTER: `${API_BASE_URL}/register`,
    LOGIN: `${API_BASE_URL}/login`,
    GET_USERS: `${API_BASE_URL}/users`,
    UPDATE_USER_STATUS: (id) => `${API_BASE_URL}/users/${id}/status`,
    
    ADD_PROPERTY: `${API_BASE_URL}/property`,
    GET_PROPERTIES: `${API_BASE_URL}/properties`,
    UPDATE_PROPERTY: (id) => `${API_BASE_URL}/property/${id}`,
    DELETE_PROPERTY: (id) => `${API_BASE_URL}/property/${id}`,
    
    CREATE_BOOKING: `${API_BASE_URL}/booking`,
    GET_BOOKINGS: `${API_BASE_URL}/bookings`,
    GET_OWNER_BOOKINGS: `${API_BASE_URL}/owner-bookings`,
    GET_ALL_BOOKINGS: `${API_BASE_URL}/all-bookings`,
    UPDATE_BOOKING: (id) => `${API_BASE_URL}/booking/${id}`,
};