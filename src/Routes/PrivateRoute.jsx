import { Outlet, Navigate } from "react-router-dom"
import { useSelector } from "react-redux"
// import { useLocation } from "react-router-dom"                  
const PrivateRoute = ({children}) => {
    const {userInfo} = useSelector((state) => state.auth)

    return userInfo ? children : <Navigate to="/login" replace />

}

export default PrivateRoute