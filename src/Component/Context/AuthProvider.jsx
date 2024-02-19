import { createContext, useEffect, useState } from "react";
import DoRefreshLogin from "./DoRefreshLogin";

export const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  let isRefreshRequested = false;
  const [auth, setAuth] = useState({
    userId: "",
    username: "",
    role: "CUSTOMER",
    isAuthenticated: false,
    accessExpiration: "",
    refreshExpiration: "",
  });

  const { validateAndRefresh } = DoRefreshLogin();

  const refresh = async () => {
    const data = await validateAndRefresh();
    if(data){
      setAuth({...data})
    }
  };

  useEffect(() => {
    if (!isRefreshRequested) {
      isRefreshRequested = true;
      refresh();
    }
  }, []);

  useEffect(() => {
    console.log(auth)
  },[auth])

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
