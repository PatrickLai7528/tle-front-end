import React, { FunctionComponent, memo } from "react";
import { Layout, Breadcrumb } from "antd";
import { Switch, Route, Redirect } from "react-router";
import { Home } from "./../views/home";
import { Other } from "./../views/other-view";

const { Content: AntdContent } = Layout;

export interface IContentProps {}

const Content: FunctionComponent<IContentProps> = memo(
  (props: IContentProps) => {
    return (
      <>
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
        <AntdContent
          className="site-layout-background"
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280
          }}
        >
          <Switch>
            <Route exact path="/home" component={Home} />
            <Route exact path="/other" component={Other} />
            <Route exact path="/">
              <Redirect to="/home" />
            </Route>
            {/* <Route exact path="/About" component={About} />
						<Route exact path="/About" component={Home} />
						<Route exact path="/Topics" component={TopicList} />
						<Route path="/Topics/:topicId" component={TopicDetail} />
						<Route component={NoMatch} /> */}
          </Switch>
        </AntdContent>
      </>
    );
  }
);

export default Content;
