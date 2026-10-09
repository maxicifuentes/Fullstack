import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useStore } from '../store/StoreContext';

export default function ProtectedRoute({ roles = [] }) {
  const { state } = useStore();
  if (!state.session) return <Navigate to="/login" replace />;
  if (roles.length && !roles.includes(state.session.tipo)) return <Navigate to="/" replace />;
  return <Outlet />;
}
