import React, { createContext, useContext, useState } from 'react';

// Tworzenie kontekstu
const PortalStateContext = createContext(null);

export const PortalProvider = ({ children }) => {
    const [portalState, setPortalState] = useState(/* initial state */);

    return (
        <PortalStateContext.Provider value={{ portalState, setPortalState }}>
            {children}
        </PortalStateContext.Provider>
    );
};

// Hook do użycia kontekstu
export const usePortalState = () => {
    const context = useContext(PortalStateContext);
    if (context === null) {
        throw new Error("'PortalStateContext' cannot be null, please add 'PortalProvider' to the root component.");
    }
    return context;
};
