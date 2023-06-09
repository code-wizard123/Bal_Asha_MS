import decode from 'jwt-decode'
import Cookies from 'js-cookie'

const useAuth = (check) => {
    const cookie = Cookies.get("token")
    const role = localStorage.getItem("role")

    if(cookie){
        try{
            const decodedToken = decode(cookie)

            if(decodedToken.id){
                if(parseInt(role) === check){
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


export default useAuth