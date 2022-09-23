import { useLocation, Navigate, Outlet } from 'react-router-dom'
import jwtDecode from 'jwt-decode';
import Logout from '../../Hooks/Logout'

const RequireAuth = () =>{
    const userToken = localStorage.getItem("zettel_user_token");
    const isTokenActive = userToken ? jwtDecode(userToken).exp > (new Date().getTime() + 1)/1000 : false
    const location = useLocation();
    if (!isTokenActive){
        Logout()
    }

    return (
        isTokenActive 
            ? < Outlet />
            : < Navigate to="/login-page" state={{ from: location }} replace />
    )
}

export default RequireAuth