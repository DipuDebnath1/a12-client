import { useContext } from "react";
import { AuthContext } from "./AuthProvider";
import { Navigate } from "react-router-dom";
 
const User = ({children}) => {
    const {user, loading, userDetails} = useContext(AuthContext)
   //  console.log(userDetails);
    if (userDetails) {
      console.log(userDetails);
    }
    else{
      console.log('not found');
    }


     if (loading) {
        return <div className="min-h-[80vh] flex items-center justify-center">
             <h2  className=" text-center text-5xl font-semibold  text-purple-500">loading...</h2>
        </div>
     }
     if (user) {
        return children
      }
       
      else return <Navigate to={'/'}></Navigate>
  
};

export default User;