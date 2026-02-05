import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom';

const PublicRoute = () => {
    const user = useSelector((state) => state.auth.user);
    if (user) {
        if (user.role === "Admin") return <Navigate to="/admin" replace />;
        if (user.role === "Recruiter") return <Navigate to='/recruiter-dashboard' replace />;
        return <Navigate to="/candidate-dashboard" replace />
    }
    return <Outlet />
}

export default PublicRoute