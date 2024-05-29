import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { RootState } from '../../stories';
import { Role } from '../../types';

interface ProtectedRouteProps {
    accessRoles: Role[];
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ accessRoles }) => {
    const { user, isLoading, isInit } = useSelector((state: RootState) => state.user);

    if (isLoading || !isInit) {
        return <div>Loading...</div>; 
    }

    if (!user || !accessRoles.includes(user.role)) {
        return <Navigate to="/sign-in" replace />; 
    }

    return <Outlet />; 
};
