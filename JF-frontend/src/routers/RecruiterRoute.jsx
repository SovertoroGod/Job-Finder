import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom';

const RecruiterRoute = () => {
    const user = useSelector((state) => state.auth.user);
    if (!user) return <Navigate to='/login' replace />
    if (user.role !== "Recruiter")
        return <Navigate to='/unauthorized' replace />;

    return <Outlet />;
}

export default RecruiterRoute