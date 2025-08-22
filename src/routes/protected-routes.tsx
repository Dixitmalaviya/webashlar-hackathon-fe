import { Outlet } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";

const ProtectedRoutes = () => {
    //     const authToken = false;
    //     if (!authToken) {
    //     return <Navigate to='/login' replace />;
    //   }

    return (
        <Fragment>
            <Outlet />
        </Fragment>
    )
}

export default ProtectedRoutes;