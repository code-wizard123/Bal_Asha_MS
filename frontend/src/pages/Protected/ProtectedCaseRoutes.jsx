import React, { useEffect } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import decode from 'jwt-decode'
import Cookies from 'js-cookie'

const checkAuth = () => {
    const cookie = Cookies.get("token")

    if(cookie){
        try{
            const decodedToken = decode(cookie)
            console.log(decodedToken)
            if(decodedToken.id){
                if(parseInt(decodedToken.role) === 1){
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

const ProtectedCaseRoutes = () => {
    let checker = checkAuth();
    useEffect(() => {
        checker = checkAuth();
    }, [])

    return (
        (checker) ? <Outlet /> : <Navigate to="/landing" />
    )
}

export default ProtectedCaseRoutes
