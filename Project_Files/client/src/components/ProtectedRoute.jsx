import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ component: Component, requiredType }) {
    const token = localStorage.getItem('token');
    const type = localStorage.getItem('type');

    if (!token) {
        return <Navigate to="/login" />;
    }

    if (type?.toLowerCase() !== requiredType?.toLowerCase()) {
        return <Navigate to="/" />;
    }

    return <Component />;
}

export default ProtectedRoute;
