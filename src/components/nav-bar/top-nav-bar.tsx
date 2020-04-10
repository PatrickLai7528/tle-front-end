import { Menu } from "antd";
import React, { FunctionComponent, memo } from "react";
import { createUseStyles } from "react-jss";
import { sideMenuConfigs } from "./../../configs/side-menu.config";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export interface ITopNavBarProps {}

const useStyles = createUseStyles({
  topNavBar: {
    display: "flex",
    flexDirection: "row-reverse"
  }
});

const TopNavBar: FunctionComponent<ITopNavBarProps> = memo(
  (props: ITopNavBarProps) => {
    const { t } = useTranslation();
    const styles = useStyles();
    return (
      <div className={styles.topNavBar}>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["2"]}
          style={{ lineHeight: "64px" }}
        >
          {sideMenuConfigs.map(config => {
            return (
              <Menu.Item key={config.label}>
                {config.icon}
                <Link to={config.route}>{t(config.label)}</Link>
              </Menu.Item>
            );
          })}
        </Menu>
      </div>
    );
  }
);

export default TopNavBar;
