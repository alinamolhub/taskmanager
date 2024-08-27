import React, { useContext, useState, useEffect } from "react";

import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';
const AuthContext = React.createContext({});
export const AuthProvider = ( {children} )=>{

  const navigate = useNavigate();
  const [ user,setUser ] = useState(); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const csrf = async () => axios.get('/sanctum/csrf-cookie');
  const getUser = async () => {
    try{
      const { data: response } = await axios.get("api/user");
      setUser(response.data);
      
      
    }
    catch(e){

    }
    setLoading(false);

  }
  const login = async ( {email,password} ) => {
    await csrf();
    try{
      await axios.post('/login',{ email, password });
      await getUser();
      navigate("/dashboard");
    }
    catch(e){

      setError(e.response.data.message);
    }
    

  }
  const logout = async () => {
    await axios.post('/logout');
    setUser(null);
    navigate("/login");
    
  }
  const userCan =(perm) =>{
    if(user.is_admin)
      return true;
    return user.role.permissions.map((perm)=>perm.name).includes(perm);
  }


  useEffect(() => {
    if(!user)
      getUser();
    
  }, []);


  
  return <AuthContext.Provider value={{userCan,user,loading,getUser,login,logout,error}}>{children}</AuthContext.Provider>;

}

export const useAuthContext =()=>{
  return useContext(AuthContext); 
}

//export {AuthProvider,useAuthContext};