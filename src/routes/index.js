import React from "react";
import { Switch, Route } from "react-router-dom";
import { Content } from "antd/lib/layout/layout";

import Home from "../pages/Home/index.jsx";
import Auth from "../pages/Auth/index.jsx";
import Directories from "../pages/Directories/index.jsx";
import Conscripts from "../pages/Directories/Conscripts/index.jsx";
import Commissariat from "../pages/Directories/Commissariat/index.jsx";
import AddComm from "../pages/AddComm/index.jsx";
import AddCons from "../pages/AddCons/index.jsx";
import CreateCallUp from "../pages/CreateCallUp/index.jsx";
import PrivateRoute from "../routes/PrivateRoute/index.js";

import useStyles from "./style";

const ROUTES = [
  {
    path: "/",
    exact: true,
    componnent: <Home />,
    private: false,
  },
  {
    path: "/auth",
    exact: false,
    componnent: <Auth />,
    private: false,
  },
  {
    path: "/directories",
    exact: false,
    componnent: <Directories />,
    private: false,
  },
  {
    path: "/conscripts",
    exact: false,
    componnent: <Conscripts />,
    private: false,
  },
  {
    path: "/commissariat",
    exact: false,
    componnent: <Commissariat />,
    private: false,
  },
  {
    path: "/add-comm",
    exact: false,
    componnent: <AddComm />,
    private: true,
  },
  {
    path: "/add-cons",
    exact: false,
    componnent: <AddCons />,
    private: true,
  },
  {
    path: "/create-callup",
    exact: false,
    componnent: <CreateCallUp />,
    private: true,
  },
];

const AppRouter = () => {
  const classes = useStyles();

  return (
    <Content className={classes.root}>
      <Switch>
        {ROUTES.map((item, index) =>
          item.private ? (
            <PrivateRoute path={item.path} exact={item.exact} key={index}>
              {item.componnent}
            </PrivateRoute>
          ) : (
            <Route path={item.path} exact={item.exact} key={index}>
              {item.componnent}
            </Route>
          )
        )}
      </Switch>
    </Content>
  );
};

export default AppRouter;
