import React from 'react';
import { useAuth } from '../context/AuthContext';

export function PermissionGuard({ roles, children, fallback = null }: { roles: string[]; children: React.ReactNode; fallback?: React.ReactNode }) {
  const { role } = useAuth();
  if (!role) return fallback;
  if (roles.includes(role)) return <>{children}</>;
  return <>{fallback}</>;
}

export default PermissionGuard;
