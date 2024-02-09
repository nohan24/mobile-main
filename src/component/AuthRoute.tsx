import { Redirect, Route } from "react-router-dom";

interface AuthRoute {
    component: React.FC;
    path: string; 
  }


const AuthRoute = ({ children, path}: any) => {
    var loggedIn = localStorage.getItem("auth") != null ? true : false;
    return (
      <Route exact path={path}>
        {
            loggedIn == true ? children: <Redirect to="/login" />
        }
      </Route>
    );
};

export default AuthRoute;