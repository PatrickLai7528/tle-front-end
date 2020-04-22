import React, { FunctionComponent, memo } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { AuthRedirectView } from "../views/auth-redirect";
import { ConnectedHomeView } from "./../views/home";
import { RouteConstants } from "./constants";
import Content from "./content";
import Layout from "./layout";

export interface IRoutesProps {}

const Routes: FunctionComponent<IRoutesProps> = memo((props: IRoutesProps) => {
  return (
    <Switch>
      <Route exact path={"/"}>
        <Redirect to={RouteConstants.HOME} />
      </Route>
      <Route
        exact
        path={RouteConstants.HOME}
        component={(props: any) => {
          return (
            <Layout
              requireAuth={false}
              content={() => <ConnectedHomeView {...props} />}
            />
          );
        }}
      />
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
        component={(props: any) => {
          return (
            <Layout requireAuth={true} content={() => <Content {...props} />} />
          );
        }}
      />
    </Switch>
  );
});

export default Routes;
