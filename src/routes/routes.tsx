import React, { FunctionComponent, memo } from "react";
import { Layout } from "antd";
import { TopNavBar, SideNavBar } from "./../components/nav-bar";
import Content from "./content";

const { Header, Sider } = Layout;

export interface IRoutesProps {}

const Routes: FunctionComponent<IRoutesProps> = memo((props: IRoutesProps) => {
  return (
    <Layout style={{ minHeight: "100vmin" }}>
      <Header className="header">
        <TopNavBar />
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <SideNavBar />
        </Sider>
        <Layout style={{ padding: "0 24px 24px" }}>
          <Content />
        </Layout>
      </Layout>
    </Layout>
  );
});

export default Routes;
