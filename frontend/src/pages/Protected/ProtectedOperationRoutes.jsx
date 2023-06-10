import React, { useEffect } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import decode from 'jwt-decode'
import Cookies from 'js-cookie'

const checkAuth = () => {
    const cookie = Cookies.get("token")

    if(cookie){
        try{
            const decodedToken = decode(cookie)
            if(decodedToken.id){
                if(parseInt(decodedToken.role) === 2){
                    return true;
                }
                else{
                    return false;
                }
            }
            else{
                return false;
            }
        }
        catch(e){
            return false;
        }
    }
}

const ProtectedOperationRoutes = () => {
    let checker = checkAuth();
    useEffect(() => {
        checker = checkAuth();
    }, [])

    return (
        (checker) ? <Outlet /> : <Navigate to="/landing" />
    )
}

export default ProtectedOperationRoutes
