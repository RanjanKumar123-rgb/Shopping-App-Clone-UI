import React, { createContext, useContext, useEffect, useState } from "react";

const authContext = createContext({});

const AuthProvider = ({ children }) => {
  // Destructure children properly
  const [auth, setAuth] = useState({
    userId: "",
    username: "",
    role: "CUSTOMER",
    isAuthenticated: false,
    accessExpiration: "",
    refreshExpiration: "",
  });

  useEffect(() => {
    console.log("Auth state updated:", auth);
  }, [auth]);

  return (
    <authContext.Provider value={{ auth, setAuth }}>
      {children}
    </authContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => useContext(authContext);
