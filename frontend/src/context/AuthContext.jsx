// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [userType, setUserType] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedType = localStorage.getItem('userType');
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedType && storedUser) {
      setUserType(storedType);
      setUser(storedUser);
    }
  }, []);

  const logout = () => {
    localStorage.clear();
    setUserType(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, userType, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
