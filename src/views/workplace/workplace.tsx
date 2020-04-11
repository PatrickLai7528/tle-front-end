import React, { FunctionComponent, memo } from "react";
import { PageHeader, Avatar, Typography, Row, Col, Card } from "antd";
import { createUseStyles } from "react-jss";
import { RouteConstants } from "../../routes/constants";
import { useTranslation } from "react-i18next";
import { SimpleRepoCard } from "../../components/simple-repo-card";
import RecentRepos from "./recent-repos";
import { recentRepos } from "../../stubs/recent-repo";
import TracingStatistic from "./tracing-statistic";
import QuickAction, { IAction } from "./quick-action";
import Activity from "./activity";
import { activity } from "../../stubs/activity";
import RepoTracingChart from "./repo-tracing-chart";

export interface IStateProps {
  userName: string;
  userAvatarUrl: string;
  userProfile: string;
}

export interface IDispatchProps {}

export interface IOwnProps {}

export interface IWorkplaceProps
  extends IStateProps,
    IDispatchProps,
    IOwnProps {}

const useStyles = createUseStyles({
  pageHeaderContent: {
    display: "flex",
    flexDirection: "row"
  },
  contentTypography: {
    margin: {
      left: "18px"
    }
  },
  contentTitle: {
    margin: { bottom: "12px" },
    color: "gba(0, 0, 0, 0.85)",
    fontWeight: 500,
    fontSize: "20px",
    lineHeight: "28px"
  },
  statisticArea: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    flexGrow: 1
  },
  homeContent: {
    padding: "16px"
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
    const { userAvatarUrl, userName, userProfile } = props;
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
            <Avatar src={userAvatarUrl} size={64} />
            <Typography className={styles.contentTypography}>
              <Typography.Title
                className={styles.contentTitle}
                level={3}
              >{`您好，${userName}`}</Typography.Title>
              <Typography.Paragraph type={"secondary"}>
                {userProfile}
              </Typography.Paragraph>
            </Typography>
            <div className={styles.statisticArea}>
              <TracingStatistic
                repository={123}
                requirement={312}
                traceLink={165}
              />
            </div>
          </div>
        </PageHeader>
        <Row className={styles.homeContent} gutter={[16, 16]}>
          <Col lg={18} md={24}>
            <Row style={{ width: "100%" }}>
              <Col span={24}>
                <RecentRepos
                  style={{ marginBottom: "16px" }}
                  repos={recentRepos}
                />
                <Activity activities={activity} />
              </Col>
            </Row>
          </Col>
          <Col lg={{ span: 6 }} md={{ span: 24 }}>
            <Row style={{ width: "100%" }}>
              <Col span={24}>
                <QuickAction actions={actionShortCuts} />
                {/* <RepoTracingChart /> */}
              </Col>
            </Row>
          </Col>
        </Row>
      </>
    );
  }
);

export default Workplace;
