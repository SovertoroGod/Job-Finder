import React from 'react';
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const AuthRoute = () => {
    const user = useSelector((state) => state.auth.user);
    if (!user) {
        return <Navigate to='/login' replace />;
    }
    return <Outlet />
}

export default AuthRoute