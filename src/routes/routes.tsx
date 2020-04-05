import { Layout } from "antd";
import React, { FunctionComponent, memo } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { SideNavBar, TopNavBar } from "./../components/nav-bar";
import Content from "./content";
import { AuthRedirectView } from "../views/auth-redirect";
import { RequireAuth } from "../components/require-auth";
import { ConnectedHomeView } from "./../views/home";
import { RouteConstants } from "./constants";

const { Header, Sider } = Layout;

export interface IRoutesProps {}

const Routes: FunctionComponent<IRoutesProps> = memo((props: IRoutesProps) => {
  return (
    <Switch>
      <Route exact path={RouteConstants.HOME} component={ConnectedHomeView} />
      <Route
        exact
        path="/auth/redirect"
        component={(props: any) => (
          <AuthRedirectView
            {...props}
            successRedirect={"/authed/"}
            failureRedirect={"/user/auth"}
          />
        )}
      />
      <Route
        path="/authed/*"
        component={() => {
          return (
            <RequireAuth>
              <Layout
                style={{
                  minHeight: "100vmin",
                  padding: 0,
                  margin: 0
                }}
              >
                <Header className="header">
                  <TopNavBar />
                </Header>
                <Layout style={{ padding: 0, margin: 0 }}>
                  <Sider width={200} className="site-layout-background">
                    <SideNavBar />
                  </Sider>
                  <Layout style={{ padding: "10px" }}>
                    <Content />
                  </Layout>
                </Layout>
              </Layout>
            </RequireAuth>
          );
        }}
      />
      <Route exact path={"/"}>
        <Redirect to={RouteConstants.HOME} />
      </Route>
    </Switch>
  );
});

export default Routes;
