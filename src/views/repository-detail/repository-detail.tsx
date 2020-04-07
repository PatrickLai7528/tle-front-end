import { Button, Descriptions, PageHeader, Spin, Skeleton } from "antd";
import React, { FunctionComponent, useMemo, memo, useEffect } from "react";
import { RouteConstants } from "../../routes/constants";
import { IImportedRepository } from "../../types";
import { RouteComponentProps } from "react-router-dom";
import { createUseStyles } from "react-jss";
import RepoDetailDescription from "./repo-detail-description";

export interface IStateProps {
  repo: IImportedRepository;
  loading: boolean;
}

export interface IDispatchProps {
  fetchRepoDetail: () => void;
}

export interface IOwnProps extends RouteComponentProps<{ name: string }> {}

export interface IRepositoryDetailProps
  extends IStateProps,
    IDispatchProps,
    IOwnProps {}

const useStyles = createUseStyles({
  spining: {
    width: "100%",
    minHeight: "60vh"
  }
});

const RepositoryDetail: FunctionComponent<IRepositoryDetailProps> = memo(
  (props: IRepositoryDetailProps) => {
    const { repo, fetchRepoDetail, loading } = props;
    const styles = useStyles();

    useEffect(() => {
      const doIt = async () => {
        try {
          fetchRepoDetail();
        } catch (e) {
          if (process.env.NODE_ENV !== "production") {
            console.log(e);
          }
        }
      };
      doIt();
    }, [fetchRepoDetail]);

    const routes = useMemo(() => {
      return !!repo
        ? [
            {
              path: "/",
              breadcrumbName: "首頁"
            },
            {
              path: RouteConstants.REPOSITORY,
              breadcrumbName: "倉庫"
            },
            {
              path: RouteConstants.REPOSITORY_DETAIL(repo.name),
              breadcrumbName: repo.name
            }
          ]
        : [];
    }, [repo]);

    const pageHeaderConfig = useMemo(() => {
      if (repo) {
        return {
          title: repo.name,
          subTitle: `Owned By ${repo.ownerId}`
        };
      } else {
        return {
          title: <Skeleton.Input />,
          subTitle: <Skeleton.Input />
        };
      }
    }, [repo]);

    return (
      <Spin spinning={loading} className={styles.spining}>
        <PageHeader
          breadcrumb={{ routes }}
          ghost={false}
          onBack={() => window.history.back()}
          title={pageHeaderConfig.title}
          subTitle={pageHeaderConfig.subTitle}
          extra={[
            <Button key="3">Operation</Button>,
            <Button key="2">Operation</Button>,
            <Button key="1" type="primary">
              Primary
            </Button>
          ]}
        >
          {repo ? <RepoDetailDescription repo={repo} /> : <Skeleton />}
        </PageHeader>
      </Spin>
    );
  }
);

export default RepositoryDetail;
