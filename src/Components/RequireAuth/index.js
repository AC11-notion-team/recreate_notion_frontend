import { useLocation, Navigate, Outlet } from 'react-router-dom'

const RequireAuth = () =>{
    const userToken = localStorage.getItem("zettel_user_token");
    const location = useLocation();
    return (
        userToken 
            ? < Outlet />
            : < Navigate to="/login-page" state={{ from: location }} replace />

    )
}

export default RequireAuth