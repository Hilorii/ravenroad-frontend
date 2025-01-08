import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Pobieranie danych użytkownika przy starcie aplikacji
    useEffect(() => {
        const fetchUser = async () => {
            try {
                setLoading(true);
                const response = await axios.get('http://localhost:5000/user', { withCredentials: true });
                setUser(response.data);
            } catch (error) {
                console.error('Failed to fetch user data:', error);
                setError('Failed to fetch user data');
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    // Funkcja logowania
    const login = async (email, password) => {
        try {
            setLoading(true);
            const response = await axios.post('http://localhost:5000/login', { email, password }, { withCredentials: true });
            setUser(response.data);
            setError(null);  // Resetowanie błędu po udanym logowaniu
        } catch (error) {
            console.error('Login failed:', error);
            setError('Login failed');
        } finally {
            setLoading(false);
        }
    };

    // Funkcja wylogowania
    const logout = async () => {
        try {
            await axios.post('http://localhost:5000/logout', {}, { withCredentials: true });
            setUser(null);
            setError(null);
            document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            console.log("User logged out");
        } catch (error) {
            console.error('Logout failed:', error);
            setError('Logout failed');
        }
    };

    return (
        <UserContext.Provider value={{ user, setUser, login, logout, loading, error }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
