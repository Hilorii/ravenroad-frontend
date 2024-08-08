// UserContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:5000/user', { withCredentials: true })
            .then(response => {
                setUser(response.data);
                console.log('User data fetched:', response.data);  // Add logging
            })
            .catch(error => {
                console.error('Failed to fetch user data:', error);
            });
    }, []);

    const login = async (email, password) => {
        try {
            const response = await axios.post('http://localhost:5000/login', { email, password }, { withCredentials: true });
            setUser(response.data);
            console.log('User logged in:', response.data);  // Add logging
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    const logout = () => {
        setUser(null);
        console.log('User logged out');  // Add logging
        // Handle logout logic such as clearing cookies
    };

    return (
        <UserContext.Provider value={{ user, setUser, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
