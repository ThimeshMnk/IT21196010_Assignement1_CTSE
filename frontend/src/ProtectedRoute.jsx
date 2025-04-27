// src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ allowedRoles, children }) {
  const token    = localStorage.getItem('token');
  const userType = localStorage.getItem('userType');

  // 1) not logged in?
  if (!token) {
    return <Navigate to="/" replace />;
  }

  // 2) logged in but wrong role?
  if (allowedRoles && !allowedRoles.includes(userType)) {
    return <Navigate to="/" replace />;
  }

  // 3) all good
  return children;
}
