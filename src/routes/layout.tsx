import React, { FunctionComponent, memo, ReactNode, ReactChild } from "react";
import { ConnectedRequireAuth } from "../components/require-auth";
import { TopNavBar } from "../components/nav-bar";
import { Layout as AntdLayout } from "antd";
import { createUseStyles } from "react-jss";
import { RouteConstants } from "./constants";

export interface ILayoutProps {
  requireAuth: boolean;
  content: ReactNode;
}

const useStyles = createUseStyles({
  outerLayout: {
    minHeight: "100vmin",
    width: "100%",
    overflowX: "hidden",
    padding: 0,
    margin: 0
  },
  innerLayout: {
    padding: "0px",
    margin: { top: "64px" }
  },
  header: {
    position: "fixed",
    zIndex: 10,
    width: "100%"
  },
  footer: {
    background: "#001529",
    textAlign: "center",
    color: "#999"
  }
});

const Layout: FunctionComponent<ILayoutProps> = memo((props: ILayoutProps) => {
  const { requireAuth, content } = props;
  const styles = useStyles();
  const withAuth = (content: ReactChild) => {
    return (
      <ConnectedRequireAuth redirectUrl={RouteConstants.HOME}>
        {content}
      </ConnectedRequireAuth>
    );
  };

  const layouted = (
    <AntdLayout className={styles.outerLayout}>
      <AntdLayout.Header className={styles.header}>
        <TopNavBar />
      </AntdLayout.Header>
      <AntdLayout className={styles.innerLayout}>{content}</AntdLayout>
      <AntdLayout.Footer className={styles.footer}>
        TLE ©2020 Created by NJU
      </AntdLayout.Footer>
    </AntdLayout>
  );

  return requireAuth ? withAuth(layouted) : layouted;
});

export default Layout;
