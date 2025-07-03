import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiresSubscription?: boolean;
  requiresAdmin?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requiresSubscription = false, 
  requiresAdmin = false 
}) => {
  const { isAuthenticated, isSubscribed, isAdmin } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requiresAdmin && !isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }

  if (requiresSubscription && !isSubscribed) {
    return <Navigate to="/subscribe" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;