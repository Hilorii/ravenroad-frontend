// contexts/AlertsContext.js
import React, { createContext, useState, useCallback, useContext } from 'react';

// Tworzymy kontekst
const AlertsContext = createContext();

// Eksportujemy hook do korzystania z kontekstu
export const useAlerts = () => useContext(AlertsContext);

// Komponent (provider) który dostarcza kontekst
export const AlertsProvider = ({ children }) => {
    const [alerts, setAlerts] = useState([]);

    // Metoda do dodawania nowego alertu
    const addAlert = useCallback((message, type = 'info', duration = 3000) => {
        const id = Date.now(); // unikatowe ID, np. timestamp

        // Tworzymy nowy alert
        const newAlert = { id, message, type };

        setAlerts((prev) => [...prev, newAlert]);

        // Usunięcie alertu po 'duration' milisekundach
        setTimeout(() => {
            setAlerts((prev) => prev.filter((alert) => alert.id !== id));
        }, duration);
    }, []);

    // Jeżeli chcesz też ręcznie usuwać alert:
    const removeAlert = useCallback((id) => {
        setAlerts((prev) => prev.filter((alert) => alert.id !== id));
    }, []);

    const value = {
        alerts,
        addAlert,
        removeAlert
    };

    return (
        <AlertsContext.Provider value={value}>
            {children}
        </AlertsContext.Provider>
    );
};
