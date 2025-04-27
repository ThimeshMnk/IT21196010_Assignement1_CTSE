// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { loginUser as apiLogin, registerUser as apiRegister } from '../api/authAPI';

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userType, setUserType] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = JSON.parse(localStorage.getItem('user') || 'null');
    const storedType = localStorage.getItem('userType');
    if (token && storedUser && storedType) {
      setUser(storedUser);
      setUserType(storedType);
    }
  }, []);

  const login = async (email, password) => {
    const { token, user: u, userType: type } = await apiLogin({ email, password });
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(u));
    localStorage.setItem('userType', type);
    setUser(u);
    setUserType(type);
  };

  const register = async (data) => {
    await apiRegister(data);
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
    setUserType(null);
  };

  return (
    <AuthContext.Provider value={{ user, userType, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
