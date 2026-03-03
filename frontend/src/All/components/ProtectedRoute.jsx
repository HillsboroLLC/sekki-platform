// src/components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../shared/auth/AuthContext';
import Spinner from './Spinner/Spinner';

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <Spinner />;
  }
  
  if (!user) {
    return <Navigate to="/?auth=1" replace />;
  }
  
  return children;
}
