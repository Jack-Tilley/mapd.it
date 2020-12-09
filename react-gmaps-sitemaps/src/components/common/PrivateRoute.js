import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "../AuthContext";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const [auth, setAuth] = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={(props) => {
        if (auth.isLoading) {
          return <h2>Loading...</h2>;
        } else if (!auth.isAuthenticated) {
          return <Redirect to="/sign-in" />;
        } else {
          return <Component {...props} />;
        }
      }}
    />
  );
};
export default PrivateRoute;
