import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import AllRoutes from "./Component/Routes/AllRoutes.jsx";
import AuthProvider from "./Component/Context/AuthProvider";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider children={<AllRoutes/>}/>
    </BrowserRouter>
  </React.StrictMode>
);