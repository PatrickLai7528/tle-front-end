import React, { FunctionComponent, memo } from "react";
import { Menu } from "antd";
import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined
} from "@ant-design/icons";
import { sideMenuConfigs } from "../../configs/side-menu.config";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
const { SubMenu } = Menu;

export interface ISideNavBarProps {}

const SideNavBar: FunctionComponent<ISideNavBarProps> = memo(
  (props: ISideNavBarProps) => {
    const { t } = useTranslation();
    return (
      <Menu
        mode="inline"
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        style={{ height: "100%", borderRight: 0 }}
      >
        {sideMenuConfigs.map(config => {
          return (
            <Menu.Item key={config.label}>
              {config.icon}
              <Link to={config.route}>{t(config.label)}</Link>
            </Menu.Item>
          );
        })}
        <SubMenu
          key="sub1"
          title={
            <span>
              <UserOutlined />
              1subnav
            </span>
          }
        >
          <Menu.Item key="1">option1</Menu.Item>
          <Menu.Item key="2">option2</Menu.Item>
          <Menu.Item key="3">option3</Menu.Item>
          <Menu.Item key="4">option4</Menu.Item>
        </SubMenu>
        <SubMenu
          key="sub2"
          title={
            <span>
              <LaptopOutlined />
              subnav 2
            </span>
          }
        >
          <Menu.Item key="5">option5</Menu.Item>
          <Menu.Item key="6">option6</Menu.Item>
          <Menu.Item key="7">option7</Menu.Item>
          <Menu.Item key="8">option8</Menu.Item>
        </SubMenu>
        <SubMenu
          key="sub3"
          title={
            <span>
              <NotificationOutlined />
              subnav 3
            </span>
          }
        >
          <Menu.Item key="9">option9</Menu.Item>
          <Menu.Item key="10">option10</Menu.Item>
          <Menu.Item key="11">option11</Menu.Item>
          <Menu.Item key="12">option12</Menu.Item>
        </SubMenu>
      </Menu>
    );
  }
);

export default SideNavBar;
