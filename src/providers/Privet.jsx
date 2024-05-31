import { useContext } from "react";
import { AuthContext } from "./AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
  
const Privet = ({children}) => {
    const {user, loading} = useContext(AuthContext)
    const location = useLocation() 
 
    if (loading) {
       return  <div className="min-h-[80vh] flex items-center justify-center">
       <h2  className=" text-center text-5xl font-semibold  text-purple-500">loading...</h2>
  </div>
    }
    if (user) {
        return children
    }
    return <Navigate state={location.pathname} to={'/login'}></Navigate>

};

export default Privet;