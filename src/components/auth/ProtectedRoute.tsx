import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'sonner';

interface Props {
  requiredRole: string;
  children: React.ReactElement;
}

export default function ProtectedRoute({ requiredRole, children }: Props) {
  const auth = useAuth();
  const role = auth?.role || null;
  if (!auth?.isAuthenticated) {
    toast.error('Access Denied');
    return <Navigate to="/login" replace />;
  }
  if (requiredRole && role !== requiredRole && role !== 'ADMIN') {
    toast.error('Access Denied');
    return <Navigate to="/" replace />;
  }
  return children;
}
