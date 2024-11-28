import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";




const UserContext = createContext();

function UserProvider({children}) {

  const [userInfo, setUserInfo] = useState({});
//   const [token, setToken] = useState(null);


  return (
    <UserContext.Provider value={{
      userInfo, 
      setUserInfo
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