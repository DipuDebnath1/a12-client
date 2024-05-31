import { createContext, useEffect, useState } from "react";
import auth from "../../firebase.auth";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import axios from "axios";

export const AuthContext = createContext(null)

const AuthProvider = ({children}) => {

    const [user, setUser] = useState(null)
    const  [loading, setLoading] = useState(true)
    const [userDetails, setUserDetails] = useState({}) 

    //all user details
    useEffect(()=>{
         axios.get(`${import.meta.env.VITE_SERVER_API}/users/${user?.email}`)
        .then((res)=>{
            setUserDetails(res.data)
        }) 
    },[user])

    // create user 
    const register = (email, password) =>{
           return createUserWithEmailAndPassword(auth, email, password)
    }

    //login user
    const login = (email,password)=>{
        return signInWithEmailAndPassword(auth,email,password)
    }

    //update user
    const updateUserProfile = (name, img) =>{
        return updateProfile(auth.currentUser,{
            displayName:name, photoURL:img
        })

    }
    // logout user 
    const logOut = () =>{
        setLoading(true)
        return signOut(auth)
    }

    // user observer 
    useEffect(()=>{
    const onSubscribe = onAuthStateChanged(auth,user=>{
    setUser(user) 
    setLoading(false)
    })
    return onSubscribe
    },[])

    const authInfo = {
        user,
        setUser,
        register,
        login,
        updateUserProfile,
        logOut,
        loading,
        userDetails
    }

    return (
       <AuthContext.Provider value={authInfo}>
            {children}
       </AuthContext.Provider>
    );
};

export default AuthProvider;