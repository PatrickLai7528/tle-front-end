import { Layout } from "antd";
import React, { FunctionComponent, memo } from "react";
import { Redirect, Route, Switch } from "react-router";
import { RepositoryView } from "../views/repository";
import { ConnectedRepositoryDetailView } from "../views/repository-detail";
import { ConnectedImportRepositoryProcess } from "../views/import-repository-process";
import { ConnectedWorkPlaceView } from "../views/workplace";
import { RouteConstants } from "./constants";
import { Error } from "../views/error";

const { Content: AntdContent } = Layout;

export interface IContentProps {}

const Content: FunctionComponent<IContentProps> = memo(
  (props: IContentProps) => {
    return (
      <>
        <AntdContent
          style={{
            padding: 0,
            margin: 0,
            minHeight: 280
          }}
        >
          <Switch>
            <Route
              exact
              path={RouteConstants.WORKPLACE}
              component={ConnectedWorkPlaceView}
            />
            <Route
              exact
              path={RouteConstants.REPOSITORY}
              component={RepositoryView}
            />
            <Route
              exact
              path={RouteConstants.REPOSITORY_DETAIL()}
              component={ConnectedRepositoryDetailView}
            />
            <Route
              exact
              path={RouteConstants.IMPORT_PROCESS()}
              component={ConnectedImportRepositoryProcess}
            />
            <Route exact path={RouteConstants.ERROR()} component={Error} />
            <Route exact path="/authed">
              <Redirect to={RouteConstants.WORKPLACE} />
            </Route>
          </Switch>
        </AntdContent>
      </>
    );
  }
);

export default Content;
