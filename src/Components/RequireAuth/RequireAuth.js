import { useLocation, Navigate, Outlet } from 'react-router-dom'
import jwtDecode from 'jwt-decode';
const RequireAuth = () =>{
    const userToken = localStorage.getItem("zettel_user_token");
    const isTokenActive = jwtDecode(userToken).exp > (new Date().getTime() + 1)/1000
    const location = useLocation();
    return (
        isTokenActive 
            ? < Outlet />
            : < Navigate to="/login-page" state={{ from: location }} replace />
    )
}

export default RequireAuth