// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [userType, setUserType] = useState(null);
  const [user, setUser]         = useState(null);

  useEffect(() => {
    const storedType = localStorage.getItem('userType');
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedType) setUserType(storedType);
    if (storedUser) setUser(storedUser);
  }, []);

  const login = (data) => {
    // called from your login page
    localStorage.setItem('token', data.token);
    localStorage.setItem('userType', data.userType);
    localStorage.setItem('user', JSON.stringify(data.user));
    setUserType(data.userType);
    setUser(data.user);
  };

  const logout = () => {
    localStorage.clear();
    setUserType(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, userType, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
