import React, { createContext, useContext, useState } from 'react';  // Add `createContext`, `useContext`, `useState`

const LogContext = createContext(); 

export const LogProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Set based on actual authentication state

  return (
    <LogContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </LogContext.Provider>
  );
};

export const useAuth = () => useContext(LogContext);