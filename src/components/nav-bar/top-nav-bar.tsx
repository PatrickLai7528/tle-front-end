import { Menu } from "antd";
import React, { FunctionComponent, memo } from "react";
import "./top-nav-bar.scss";

export interface ITopNavBarProps {}

const TopNavBar: FunctionComponent<ITopNavBarProps> = memo(
  (props: ITopNavBarProps) => {
    return (
      <div className={"top-nav-bar"}>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["2"]}
          style={{ lineHeight: "64px" }}
        >
          <Menu.Item key="1">nav 1</Menu.Item>
          <Menu.Item key="2">nav 2</Menu.Item>
          <Menu.Item key="3">nav 3</Menu.Item>
        </Menu>
      </div>
    );
  }
);

export default TopNavBar;
