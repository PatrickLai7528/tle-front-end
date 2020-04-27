import { Menu } from "antd";
import React, { FunctionComponent, memo } from "react";
import { createUseStyles, useTheme } from "react-jss";
import { sideMenuConfigs } from "./../../configs/side-menu.config";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { CustomTheme } from "../../theme";

export interface ITopNavBarProps {}

const useStyles = createUseStyles<CustomTheme>(theme => ({
  topNavBar: {
    display: "flex",
    flexDirection: "row-reverse",
    background: theme.primaryColor
  },
  menu: {
    background: theme.primaryColor
  }
}));

const TopNavBar: FunctionComponent<ITopNavBarProps> = memo(
  (props: ITopNavBarProps) => {
    const { t } = useTranslation();
    const theme = useTheme();
    const styles = useStyles({ theme });
    return (
      <div className={styles.topNavBar}>
        <Menu theme="dark" mode="horizontal" className={styles.menu}>
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
