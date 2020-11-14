import { Button, Drawer, Grid, Menu } from "antd";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { logoutUser } from "../../services/actions/auth";
import "./head.component.css";
import { Layout } from "antd";
import { UnorderedListOutlined } from "@ant-design/icons";

const { Header } = Layout;

const { useBreakpoint } = Grid;

function Head() {
  const location = useLocation();

  const getDefaultKey = () => {
    switch (location.pathname) {
      case "/":
        return "1";
      case "/auth/login/":
        return "2";
      case "/auth/register/":
        return "3";
      default:
        return "1";
    }
  };
  const [defaultKey, setdefaultKey] = useState(getDefaultKey());
  const [drawerOpen, setdrawerOpen] = useState(false);
  const { md } = useBreakpoint();

  const showDrawer = () => {
    setdrawerOpen(true);
  };

  const onClose = () => {
    setdrawerOpen(false);
  };

  return (
    <div className="header-wrapper">
      <Header>
        <Link to="/">
          <h3 className="logo">Railways</h3>
        </Link>
        {md ? (
          <NavMenu defaultKey={defaultKey} md={md} />
        ) : (
          <Button className="barsMenu" type="primary" onClick={showDrawer}>
            <UnorderedListOutlined />
          </Button>
        )}
      </Header>
      <Drawer
        placement="right"
        closable={false}
        onClose={onClose}
        visible={drawerOpen}
      >
        <NavMenu defaultKey={defaultKey} md={md} />
      </Drawer>
    </div>
  );
}

export default Head;

function NavMenu({ defaultKey, md }: any) {
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.authReducer.user);
  return (
    <Menu
      className="nav-links-wrapper"
      theme={md ? "dark" : "light"}
      mode={md ? "horizontal" : "vertical"}
      defaultSelectedKeys={[defaultKey]}
    >
      <Menu.Item key="1"></Menu.Item>

      {user ? (
        <Menu.Item key="logout" onClick={() => dispatch(logoutUser())}>
          Logout
        </Menu.Item>
      ) : (
        <>
          <Menu.Item key="2">
            <Link to="/auth/login/">Login</Link>
          </Menu.Item>
          <Menu.Item key="3">
            <Link to="/auth/register/">Register</Link>
          </Menu.Item>
        </>
      )}
    </Menu>
  );
}