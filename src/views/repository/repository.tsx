import { Button, PageHeader, Tabs } from "antd";
import React, { FunctionComponent, memo, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { ConnectedGitHubRepositoryList } from "../../components/github-repository-list";
import { ConnectedImportProccessModal } from "../../components/import-proccess-modal";
import { SearchGitHubRepository } from "../../components/search-github-repository";
import { ConnectedImportedRepositorTab } from "../imported-repository-tab";
import "./style.scss";
export interface IStateProps {
  gitHubAccessToken?: string;
  rawRepositories: any[];
  // loading?: boolean;
  // loadMoreTimes: number;
  // importedRepository?: IClonedRepository;
  // importLoading: boolean;
  // importProccessModalVisible: boolean;
}

export interface IDispatchProps {
  fetchAllRepositories: () => void;
  // loadMoreRepositories: (accessToken: string, loadMoreTimes: number) => void;
  // importRepository: (accessToken: string, repositoryName: string) => void;
  // toggleModal: (repository: GitHubAPIRepositoryResponse) => void;
}

const routes = [
  {
    path: "/",
    breadcrumbName: "首頁"
  },
  {
    path: "/repository",
    breadcrumbName: "倉庫"
  }
];

export interface IOwnProps {}

export interface IRepositoryProps
  extends IStateProps,
    IOwnProps,
    IDispatchProps {}

const Repository: FunctionComponent<IRepositoryProps> = memo(
  (props: IRepositoryProps) => {
    const { t } = useTranslation();
    const { fetchAllRepositories } = props;

    useEffect(() => {
      fetchAllRepositories();
    }, [fetchAllRepositories]);

    return (
      <div className={"repository-view-container"}>
        <ConnectedImportProccessModal />
        <PageHeader
          breadcrumb={{ routes }}
          ghost={false}
          title={t("repository management")}
          extra={[
            <Button key="3">Operation</Button>,
            <Button key="2">Operation</Button>,
            <Button key="1" type="primary">
              Primary
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
            <Tabs.TabPane tab="Tab 3" key="3">
              Content of Tab Pane 3
            </Tabs.TabPane>
          </Tabs>
        </PageHeader>
      </div>
    );
  }
);

export default Repository;
