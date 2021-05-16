import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import { AppContext } from '../../Context';

const PrivateRoute = ({ children, ...props }) => {
  const { auth } = useContext(AppContext);

  if (auth === null) {
    return <div>Loading...</div>;
  }

  if (auth) {
    return <Route {...props}>{children}</Route>;
  }
  return <Redirect to="/auth" />;
};

export default PrivateRoute;
