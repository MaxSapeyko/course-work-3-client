import { Layout, Menu } from "antd";
import { useContext, useEffect, useState } from "react";
import { Link, useHistory, withRouter } from "react-router-dom";

import { AppContext } from '../../Context';

import useStyles from "./style";

const { Header } = Layout;

const CustomHeader = () => {
  const classes = useStyles();
  const history = useHistory();

  const { auth } = useContext(AppContext);

  const [path, setPath] = useState(["/"]);

  useEffect(() => {
    setPath([`${history.location.pathname}`]);
  }, [history.location.pathname]);

  return (
    <Header
      className={classes.root}
      style={{ position: "fixed", zIndex: 1, width: "100%" }}
    >
      <div className="header_inner">
        <Menu selectedKeys={path}>
          <Menu.Item key="/">
            <Link to="/" className="menu_link">
              Головна
            </Link>
          </Menu.Item>
          <Menu.Item key="/directories">
            <Link to="/directories" className="menu_link">
              Довідники
            </Link>
          </Menu.Item>
          {!auth && <Menu.Item key="/auth">
            <Link to="/auth" className="menu_link">
              Auth
            </Link>
          </Menu.Item>}
          {auth &&
            <Menu.Item key="/add-cons">
              <Link to="/add-cons" className="menu_link">
                Додати призовника
            </Link>
            </Menu.Item>}
          {auth &&
            <Menu.Item key="/add-comm">
              <Link to="/add-comm" className="menu_link">
                Додати комісаріат
            </Link>
            </Menu.Item>}
          {auth &&
            <Menu.Item key="/create-callup">
              <Link to="/create-callup" className="menu_link">
                Сформувати призов
            </Link>
            </Menu.Item>}
        </Menu>
      </div>
    </Header>
  );
};

export default withRouter(CustomHeader);
