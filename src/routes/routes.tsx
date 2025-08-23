import { Route, Routes } from "react-router-dom";
import MainLayout from "../layout/MainLayout/MainLayout";
import EmailVerification from "../pages/auth/EmailVerify";
import ForgotPasswordForm from "../pages/auth/ForgotPassword";
import LoginForm from "../pages/auth/Login";
import SignupForm from "../pages/auth/SignUp";
import Home from "../pages/Home";
import PatientList from "../pages/PatientList";
import ProtectedRoutes from "./protected-routes";
import PatientReport from "../pages/PatientReport";

const Router = () => {
    return (
        <>
            <Routes>
                <Route path="" element={<Home />}></Route>
                <Route path="login" element={<LoginForm />}></Route>
                <Route path="verify-email" element={<EmailVerification />}></Route>
                <Route path="forget-password" element={<ForgotPasswordForm />}></Route>
                <Route path="signup" element={<SignupForm />}></Route>
                <Route element={<ProtectedRoutes />}>
                    <Route element={<MainLayout />}>
                        <Route path="Home" element={<Home />}></Route>
                        <Route path="patients" element={<PatientList />}></Route>
                        <Route path="patient-report" element={<PatientReport />}></Route>
                    </Route>
                </Route>
            </Routes>
        </>
    )
}

export default Router;