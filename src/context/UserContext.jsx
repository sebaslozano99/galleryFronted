import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
// import Cookies from "js-cookie";
import { verifyTokenForUse } from "../services/users";



const UserContext = createContext();

function UserProvider({children}) {

  const [userInfo, setUserInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);


  useEffect(() => {

    async function getUsersDataFromCookies(){
      setIsLoading(true);
      try{
        const userData = await verifyTokenForUse();

        if(Object.keys(userData).includes("message")){
          setUserInfo(null);
          setIsAuthenticated(false);
        }
        else{
          setUserInfo({user_id: userData?.user_id, user_fullname: userData?.user_fullname});
          setIsAuthenticated(true);
        }
      }
      catch(error){
        throw new Error(error.message);
      }
      finally {
        setIsLoading(false);
      }
    }

    getUsersDataFromCookies();
    
  }, [])



  return (
    <UserContext.Provider value={{
      isLoading,
      userInfo, 
      isAuthenticated,
      setUserInfo,
      setIsAuthenticated
    }}>
      { children }
    </UserContext.Provider>
  )
}

export { UserProvider, useUserContext }


function useUserContext(){
    const context = useContext(UserContext);
    if(context === undefined) throw new Error("useUserContext is being used outside of 'UserProvider' wrapper!");
    return context;
}



UserProvider.propTypes = {
    children: PropTypes.node,
}