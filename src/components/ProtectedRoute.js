import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({allowedRole}) => {

    const currentAuthState = useSelector((state) => state.authentication);
    const location = useLocation();

    return (
        currentAuthState.isAuthenticated && currentAuthState.user?.role.toLowerCase() === allowedRole.toLowerCase() ? <Outlet />
        : currentAuthState.isAuthenticated ?
        <Navigate to={'/unauthorized'} state={{ from: location }} replace />
        : <Navigate to={'/user/login'} state={{ from: location }} replace />
    );
}

export default ProtectedRoute;