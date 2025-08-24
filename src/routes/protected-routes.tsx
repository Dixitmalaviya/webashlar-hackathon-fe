import { Navigate, Outlet } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";

const ProtectedRoutes = () => {
        const authToken = localStorage.getItem('auth');
    //     if (!authToken) {
    //     return <Navigate to='/login' replace />;
    //   }

    return (
        <>
        <Fragment>
            <Outlet />
        </Fragment>
        </>
    )
}

export default ProtectedRoutes;