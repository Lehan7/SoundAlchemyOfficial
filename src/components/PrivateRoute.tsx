import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { AlertCircle } from 'lucide-react';

interface PrivateRouteProps {
  children: React.ReactNode;
  requiredRole?: string;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, requiredRole }) => {
  const { user, isTokenExpired } = useAuth();
  
  // Check if user is authenticated
  if (!user || isTokenExpired()) {
    return <Navigate to="/" replace />;
  }
  
  // Check if user has required role (if specified)
  if (requiredRole && user.role !== requiredRole) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="glass rounded-xl p-8 text-center max-w-md">
          <AlertCircle className="h-12 w-12 text-red-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Access Denied</h2>
          <p className="text-gray-300 mb-6">
            You don't have permission to access this page. This area is restricted to {requiredRole} users only.
          </p>
          <button 
            onClick={() => window.location.href = '/'}
            className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-all"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }
  
  return <>{children}</>;
};

export default PrivateRoute;