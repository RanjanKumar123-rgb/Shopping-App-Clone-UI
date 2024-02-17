
import { Route, Routes } from "react-router-dom";
import navs from "./Navigation";
import App from "./../../App";

const auth = JSON.parse(localStorage.getItem("user"))

const AllRoutes = () => {
  // const { auth } = useAuth();
  // console.log({useAuth:useAuth()})
  const { role, isAuthenticated } = auth;

  const routes = () => {
    return (
      <Routes>
        <Route path={"/"} element={<App />}>
          {navs.map((nav, i) => {
            if (isAuthenticated) {
              if (nav.isVisibleAfterAuth) {
                if (nav.role === role || nav.role === "ALL") {
                  console.log(nav);
                  return (
                    <Route key={i} path={nav.path} element={nav.element} />
                  );
                }
              }
            } else {
              if (!nav.requireAuth && nav.role === "ALL") {
                console.log(nav);
                return <Route key={i} path={nav.path} element={nav.element} />;
              }
            }
          })}
        </Route>
      </Routes>
    );
  };
  return routes();
};

export default AllRoutes;
