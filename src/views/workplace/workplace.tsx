import { Avatar, Col, PageHeader, Row, Skeleton, Typography } from "antd";
import React, { FunctionComponent, memo, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { createUseStyles } from "react-jss";
import { RouteComponentProps } from "react-router-dom";
import { ConnectedRecentRepoList } from "../../components/recent-repo-list";
import { ConnectedUserActivity } from "../../components/user-activity";
import { RouteConstants } from "../../routes/constants";
import QuickAction, { IAction } from "./quick-action";
import TracingStatistic from "./tracing-statistic";
import PageHeaderContent from "./page-header-content";

export interface IStateProps {}

export interface IDispatchProps {}

export interface IOwnProps extends RouteComponentProps {}

export interface IWorkplaceProps
  extends IStateProps,
    IDispatchProps,
    IOwnProps {}

const useStyles = createUseStyles({
  pageHeaderContent: {
    display: "flex",
    flexDirection: "row"
  },
  homeContent: {
    padding: "16px"
  },
  result: {
    background: "#fff",
    height: "100vh",
    width: "100%"
  }
});

const actionShortCuts: IAction[] = [
  {
    name: "short 1",
    url: "#"
  },
  {
    name: "short 2",
    url: "#"
  },
  {
    name: "short 3",
    url: "#"
  },
  {
    name: "short 4",
    url: "#"
  }
];

const Workplace: FunctionComponent<IWorkplaceProps> = memo(
  (props: IWorkplaceProps) => {
    const { t } = useTranslation();
    const styles = useStyles();

    const routes = [
      {
        path: RouteConstants.HOME,
        breadcrumbName: t("home page")
      },
      {
        path: RouteConstants.WORKPLACE,
        breadcrumbName: t("workplace")
      }
    ];

    return (
      <>
        <PageHeader
          breadcrumb={{ routes }}
          ghost={false}
          title={t("workplace")}
        >
          <div className={styles.pageHeaderContent}>
            <PageHeaderContent />
          </div>
        </PageHeader>
        <Row className={styles.homeContent} gutter={[16, 16]}>
          <Col lg={18} md={24} style={{ width: "100%" }}>
            <Row style={{ width: "100%" }}>
              <Col span={24}>
                <ConnectedRecentRepoList style={{ marginBottom: "16px" }} />
                <ConnectedUserActivity />
              </Col>
            </Row>
          </Col>
          <Col lg={{ span: 6 }} md={{ span: 24 }}>
            <Row style={{ width: "100%" }}>
              <Col span={24}>
                <QuickAction actions={actionShortCuts} />
              </Col>
            </Row>
          </Col>
        </Row>
      </>
    );
  }
);

export default Workplace;
