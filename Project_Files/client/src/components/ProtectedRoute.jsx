import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ component: Component, requiredType }) {
    const token = localStorage.getItem('token');
    const type = localStorage.getItem('type');

    // If no token, redirect to login
    if (!token) {
        return <Navigate to="/login" />;
    }

    // If token exists but type doesn't match required type, redirect to home
    if (type?.toLowerCase() !== requiredType?.toLowerCase()) {
        return <Navigate to="/" />;
    }

    // Token is valid and type matches, render component
    return <Component />;
}

export default ProtectedRoute;
