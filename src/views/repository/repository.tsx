import { Button, Col, PageHeader, Row, Typography } from "antd";
import React, { FunctionComponent, memo, useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { createUseStyles } from "react-jss";
import { RouteComponentProps } from "react-router-dom";
import { ConnectedGitHubRepositoryList } from "../../components/github-repository-list";
import { ConnectedImportedRepository } from "../../components/imported-repository";
import { ConnectedSearchGitHubRepository } from "../../components/search-github-repository";
import { IGHRepositoryRes } from "../../types/github-api/repository";
import { routes } from "./breadcrumb-routes";

export interface IStateProps {
  loadMoreTimes: number;
}

export interface IDispatchProps {
  fetchAllRepositories: () => void;
  loadMoreRepositories: (loadMoreTimes: number) => void;
  startImportRepository: (ghRepoRes: IGHRepositoryRes) => void;
}

export interface IOwnProps extends RouteComponentProps {}

const useStyles = createUseStyles({
  repositoryViewContainer: {
    width: "100%"
  },
  importedRepositoryListWrapper: {
    width: "100%",
    padding: "16px"
  },
  githubRepository: {
    width: "100%",
    height: "100%",
    borderRight: "2px solid #f2f2f2",
    padding: "16px"
  }
});

export interface IRepositoryProps
  extends IStateProps,
    IOwnProps,
    IDispatchProps {}

const Repository: FunctionComponent<IRepositoryProps> = memo(
  (props: IRepositoryProps) => {
    const { t } = useTranslation();
    const styles = useStyles();
    const { fetchAllRepositories, loadMoreRepositories, loadMoreTimes } = props;

    useEffect(() => {
      console.log(" in repo ");
      const doFetch = async () => {
        try {
          await fetchAllRepositories();
        } catch (e) {
          if (process.env.NODE_ENV !== "production") {
            console.log(e);
          }
        }
      };

      doFetch();
    }, [fetchAllRepositories]);

    const onLoadMore = useCallback(() => {
      loadMoreRepositories(loadMoreTimes);
    }, [loadMoreTimes, loadMoreRepositories]);

    return (
      <div className={styles.repositoryViewContainer}>
        <PageHeader
          breadcrumb={{ routes }}
          ghost={false}
          title={t("repository management")}
          extra={
            [
              // <Button key="reload" onClick={fetchAllRepositories}>
              //   {t("reload")}
              // </Button>,
              // <Button key={"loadMore"} onClick={onLoadMore} type={"primary"}>
              //   {t("load more")}
              // </Button>
            ]
          }
        >
          <Row gutter={[16, 16]}>
            <Col md={{ span: 6 }} sm={{ span: 24 }}>
              <div className={styles.githubRepository}>
                <Typography.Title level={4}>{t("search")}</Typography.Title>
                <ConnectedSearchGitHubRepository />
                <ConnectedGitHubRepositoryList
                  onImportClick={item => console.log(item)}
                />
              </div>
            </Col>
            <Col md={{ span: 18 }} sm={{ span: 24 }}>
              <div className={styles.importedRepositoryListWrapper}>
                <Typography.Title level={4}>
                  {t("imported repository")}
                </Typography.Title>
                <ConnectedImportedRepository />
              </div>
            </Col>
          </Row>
        </PageHeader>
      </div>
    );
  }
);

export default Repository;
