import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ allowedRoles, children }) => {
  const token    = localStorage.getItem('token');
  const userType = localStorage.getItem('userType');

  if (!token) {
    return <Navigate to="/" replace />;
  }
  if (!allowedRoles.includes(userType)) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default ProtectedRoute;
