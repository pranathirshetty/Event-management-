import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, requiredRole }) => {
  const { isAuthenticated, user, loading } = useAuth();

  if (loading) {
    return (
      <div className="transition-screen">
        <div className="spinner"></div>
        <h2>Loading...</h2>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && user.role !== requiredRole) {
    // If they are logged in but wrong role, redirect to their own dashboard
    const redirectPath = user.role === 'admin' ? '/admin' : '/student';
    return <Navigate to={redirectPath} replace />;
  }

  return children;
};

export default ProtectedRoute;
