import { useContext } from "react";
import { AuthContext } from "./AuthProvider";
import { Navigate } from "react-router-dom";
import { Spinner } from "flowbite-react";

const Admin = ({children}) => {

    const {user, userDetails, loading} = useContext(AuthContext)

    if (loading) {
      return <div className="min-h-[80vh] flex items-center justify-center">
      <Spinner color="purple" aria-label="Purple spinner example" />
   </div>
   }

   if (user && !userDetails) {
    return <div className="min-h-[80vh] flex items-center justify-center">
             {/* <Spinner color="purple" aria-label="Purple spinner example" /> */}
             <h4>loading...</h4>
          </div>
    }

   if (user && userDetails.role==="admin") {
      return children
    }
     
    else return <Navigate to={'/login'}></Navigate>
};

export default Admin;