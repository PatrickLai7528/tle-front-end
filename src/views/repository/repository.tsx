import { Button, Col, PageHeader, Row, Typography } from "antd";
import React, {
  FunctionComponent,
  memo,
  useCallback,
  useEffect,
  useMemo
} from "react";
import { useTranslation } from "react-i18next";
import { createUseStyles } from "react-jss";
import { ConnectedImportedRepository } from "../../components/imported-repository";
import { routes } from "./breadcrumb-routes";
import { ImportProccess } from "../../store/import-repository/types";
import { ImportProcessStep } from "../../components/import-process-step";
import { ConnectedSearchGitHubRepository } from "../../components/search-github-repository";
import { ConnectedGitHubRepositoryList } from "../../components/github-repository-list";
import { IGHRepositoryRes } from "../../types/github-api/repository";
import { RouteComponentProps } from "react-router-dom";

export interface IStateProps {
  gitHubAccessToken?: string;
  rawRepositories: any[];
  loadMoreTimes: number;
  importStarted: boolean;
  importDone: boolean;
  importProcess?: ImportProccess;
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
    const {
      fetchAllRepositories,
      loadMoreRepositories,
      loadMoreTimes,
      importDone,
      importStarted,
      importProcess,
      startImportRepository
    } = props;

    useEffect(() => {
      fetchAllRepositories();
    }, [fetchAllRepositories]);

    const onLoadMore = useCallback(() => {
      loadMoreRepositories(loadMoreTimes);
    }, [loadMoreTimes, loadMoreRepositories]);

    const currentStep = useMemo(() => {
      if (importProcess)
        return {
          BRANCHES: 1,
          COMMITS: 2,
          FILE_STUCTURE: 3,
          FILE_CONTENT: 4
        }[importProcess];
      else return 0;
    }, [importProcess]);

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
              <div className={styles.githubRepository}>
                <Typography.Title level={4}>{t("search")}</Typography.Title>
                <ConnectedSearchGitHubRepository />
                <ConnectedGitHubRepositoryList
                  onImportClick={item => console.log(item)}
                />
              </div>
            </Col>
            <Col md={{ span: 18 }} sm={{ span: 24 }}>
              {/* {importStarted && (
								<ImportProcessStep
									currentStep={currentStep}
									done={importDone}
								/>
							)} */}
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
