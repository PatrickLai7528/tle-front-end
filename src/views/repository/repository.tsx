import { Button, PageHeader, Tabs } from "antd";
import React, { FunctionComponent, memo, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { ConnectedGitHubRepositoryList } from "../../components/github-repository-list";
import { SearchGitHubRepository } from "../../components/search-github-repository";
import { ConnectedImportedRepositorTab } from "../imported-repository";
import { routes } from "./breadcrumb-routes";
import { createUseStyles } from "react-jss";

export interface IStateProps {
  gitHubAccessToken?: string;
  rawRepositories: any[];
  loadMoreTimes: number;
}

export interface IDispatchProps {
  fetchAllRepositories: () => void;
  loadMoreRepositories: (loadMoreTimes: number) => void;
}

export interface IOwnProps {}

const useStyles = createUseStyles({
  repositoryViewContainer: {
    width: "100%"
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
      fetchAllRepositories();
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
          extra={[
            <Button key="reload" onClick={fetchAllRepositories}>
              {t("reload")}
            </Button>,
            <Button key={"loadMore"} onClick={onLoadMore} type={"primary"}>
              {t("load more")}
            </Button>
          ]}
        >
          <Tabs defaultActiveKey="1">
            <Tabs.TabPane tab={t("github repository")} key="1">
              <SearchGitHubRepository />
              <ConnectedGitHubRepositoryList />
            </Tabs.TabPane>
            <Tabs.TabPane tab={t("imported repository")} key="2">
              <ConnectedImportedRepositorTab />
            </Tabs.TabPane>
          </Tabs>
        </PageHeader>
      </div>
    );
  }
);

export default Repository;
