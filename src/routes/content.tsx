import { Layout } from "antd";
import React, { FunctionComponent, memo } from "react";
import { Redirect, Route, Switch } from "react-router";
import { RepositoryView } from "../views/repository";
import { RepositoryDetail } from "../views/repository-detail";
import { Other } from "./../views/other-view";
import { ConnectedImportRepositoryProcess } from "../views/import-repository-process";
import { WorkplaceView } from "../views/workplace";

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
            <Route exact path="/authed/workplace" component={WorkplaceView} />
            <Route exact path="/authed/other" component={Other} />
            <Route exact path="/authed/repository" component={RepositoryView} />
            <Route
              exact
              path="/authed/repository_detail"
              component={RepositoryDetail}
            />
            <Route
              exact
              path={`/authed/import_process/:id`}
              component={ConnectedImportRepositoryProcess}
            />
            <Route exact path="/authed">
              <Redirect to="/authed/home" />
            </Route>
          </Switch>
        </AntdContent>
      </>
    );
  }
);

export default Content;
