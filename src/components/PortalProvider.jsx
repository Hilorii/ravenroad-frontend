import React, { createContext, useState } from 'react';

const PortalStateContext = createContext(null);

export const PortalProvider = ({ children }) => {
  const initialState = {
    someValue: null, // Tutaj definiujesz początkowy stan
  };

  const [state, setState] = useState(initialState);

  return (
    <PortalStateContext.Provider value={[state, setState]}>
      {children}
    </PortalStateContext.Provider>
  );
};

export const usePortalState = () => {
  const context = React.useContext(PortalStateContext);
  if (!context) {
    throw new Error('usePortalState must be used within a PortalProvider');
  }
  return context;
};
