// src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ allowedRoles }) => {
  const { userType } = useAuth();
  const token = localStorage.getItem('token');

  if (!token) {
   
    return <Navigate to="/login" replace />;
  }
  if (!allowedRoles.includes(userType)) {
  
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
