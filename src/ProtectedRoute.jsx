import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext'; // Use the authentication context

// Component to protect routes
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth(); // Get auth status from context

  // If the user is authenticated, prevent access to login/signup
  return isAuthenticated ? <Navigate to="/" /> : children;
};

export default ProtectedRoute; 


