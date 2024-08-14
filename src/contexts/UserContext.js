import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:5000/user', { withCredentials: true })
            .then(response => {
                console.log("Fetched user data:", response.data);
                setUser(response.data);
            })
            .catch(error => {
                console.error('Failed to fetch user data:', error);
            });
    }, []);

    const login = async (email, password) => {
        try {
            const response = await axios.post('http://localhost:5000/login', { email, password }, { withCredentials: true });
            console.log("Logged in user:", response.data);
            setUser(response.data);
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    const logout = () => {
        console.log("User logged out");
        setUser(null);
        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    };

    return (
        <UserContext.Provider value={{ user, setUser, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
