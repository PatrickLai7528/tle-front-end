import { Avatar, Col, PageHeader, Row, Skeleton, Typography } from "antd";
import React, { FunctionComponent, memo, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { createUseStyles } from "react-jss";
import { ConnectedRecentRepoList } from "../../components/recent-repo-list";
import { ConnectedUserActivity } from "../../components/user-activity";
import { RouteConstants } from "../../routes/constants";
import QuickAction, { IAction } from "./quick-action";
import TracingStatistic from "./tracing-statistic";

export interface IStateProps {
  githubAccessToken?: string;
  loading: boolean;
  userName?: string;
  userAvatarUrl?: string;
  userProfile?: string;
}

export interface IDispatchProps {
  fetchGHProfile: (ghToken: string) => void;
}

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
    const {
      userAvatarUrl,
      userName,
      userProfile,
      githubAccessToken,
      fetchGHProfile
    } = props;
    const styles = useStyles();

    useEffect(() => {
      if (githubAccessToken) {
        const doFetch = async () => {
          try {
            await fetchGHProfile(githubAccessToken);
          } catch (e) {
            if (process.env.NODE_ENV !== "production") {
              console.log(e);
            }
          }
        };

        doFetch();
      }
    }, [githubAccessToken, fetchGHProfile]);

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
            {userAvatarUrl && userName && userProfile ? (
              <>
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
              </>
            ) : (
              <Skeleton avatar={true} title={false} paragraph={{ rows: 5 }} />
            )}
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
                <ConnectedRecentRepoList style={{ marginBottom: "16px" }} />
                <ConnectedUserActivity />
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
