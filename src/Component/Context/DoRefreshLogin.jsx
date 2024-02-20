import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./useAuth";

const DoRefreshLogin = () => {
    const navigate = useNavigate();
    const {auth, setAuth}= useAuth();

  const refresh = async () => {

    console.log("Inside Refresh Token");
    const URL = "http://localhost:8080/api/v1/refresh";
    const body = {};
    const header = {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
    };

    try {
      const response = await axios.post(URL, body, header);
      console.log("RESPONSE", response);

      if (response.status === 200) {
        console.log(response);
        const user = {
            userId:response.data.data.userId,
            username:response.data.data.username,
            role:response.data.data.role,
            isAuthenticated:response.data.data.authenticated,
            accessExpiration:response.data.data.accessExpiration,
            refreshExpiration:response.data.data.refreshExpiration,
            login:true
          }
          localStorage.setItem("user", JSON.stringify(user));
        return user;
      }
    } catch (error) {
        console.log(error);
    }
  };

  const validateAndRefresh = async () => {
    console.log("Validating...")
    const userString = localStorage.getItem("user");
    if (userString !== null) {
      const user = JSON.parse(userString);
      if (new Date(user.refreshExpiration) > new Date()) {
        console.log("Refresh Token not expired")
        if (new Date(user.accessExpiration) > new Date()) {
            console.log("Access Token not expired")
            console.log(user);
          return user;
        } else return await refresh();
      } else {
        localStorage.removeItem("user");
        navigate("/login");
      }
    } else {
        navigate("/");
    }
  };

  return { validateAndRefresh };
};

export default DoRefreshLogin;
