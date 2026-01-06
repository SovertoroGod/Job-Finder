import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from './../pages/auth/LoginPage';
import RegisterPage from './../pages/auth/RegisterPage';
import PublicRoute from "./PublicRoute";
import Home from "../pages/auth/Home";
import AuthRoute from "./AuthRoute";
import Public from "../pages/auth/Public";
import Unauthorized from "../pages/auth/Unauthorized";
import CandidateRoute from "./CandidateRoute";
import CandidateDashboard from "../pages/candidate/CandidateDashboard";
import RecruiterRoute from "./RecruiterRoute";
import RecruiterDashboard from "../pages/recruiter/RecruiterDashboard";
import AdminRoute from "./AdminRoute";
import AdminDashboard from "../pages/admin/AdminDashboard";
import JobsLists from "../pages/jobs/JobsLists";

export default function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                {/* <Route path="/" element={<Navigate to="/login" replace />} /> */}

                <Route path="/" element={<JobsLists />} />

                <Route path="/allJobs" element={<JobsLists />} />
                <Route element={<PublicRoute />}>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                </Route>

                <Route path="/public" element={<Public />} />

                <Route element={<AuthRoute />}>
                    <Route path="/home" element={<Home />} />
                </Route>

                <Route element={<CandidateRoute />}>
                    <Route path="/candidate-dashboard" element={<CandidateDashboard />} />
                </Route>


                <Route element={<RecruiterRoute />}>
                    <Route path="/recruiter-dashboard" element={<RecruiterDashboard />} />
                </Route>


                <Route element={<AdminRoute />}>
                    <Route path="/admin-dashboard" element={<AdminDashboard />} />
                </Route>

                <Route path="/unauthorized" element={<Unauthorized />} />
            </Routes>
        </BrowserRouter>
    )
}