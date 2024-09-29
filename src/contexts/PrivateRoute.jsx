import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';

// Funkcja chroniąca prywatne drogi
export const PrivateRoute = ({ element }) => {
    const { user, loading } = useUser();

    if (loading) {
        return <div>Loading...</div>;
    }

    return user ? element : <Navigate to="/login" />;
};

// Funkcja chroniąca publiczne drogi (dostępne tylko dla niezalogowanych)
// export const PublicRoute = ({ element }) => {
//     const { user, loading } = useUser();
//
//     if (loading) {
//         return <div>Loading...</div>;
//     }
//
//     return !user ? element : <Navigate to="/profile" />;
// };
