import { Button, Col, PageHeader, Row } from "antd";
import React, { FunctionComponent, memo, useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { createUseStyles } from "react-jss";
import { ConnectedImportedRepositorTab } from "../../components/imported-repository";
import { routes } from "./breadcrumb-routes";
import GitHubRepository from "./github-repository";

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
          <Row gutter={[16, 16]}>
            <Col md={{ span: 6 }} sm={{ span: 24 }}>
              <GitHubRepository />
            </Col>
            <Col md={{ span: 18 }} sm={{ span: 24 }}>
              <ConnectedImportedRepositorTab />
            </Col>
          </Row>
        </PageHeader>
      </div>
    );
  }
);

export default Repository;
