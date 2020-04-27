import { Drawer, PageHeader, Skeleton, Spin, Tabs } from "antd";
import React, {
  FunctionComponent,
  memo,
  useEffect,
  useMemo,
  useState
} from "react";
import { useTranslation } from "react-i18next";
import { createUseStyles } from "react-jss";
import { RouteComponentProps } from "react-router-dom";
import { RepositoryFiles } from "../../components/repository-files";
import { AddRequirementModal } from "../../components/requirement/add-requirement-modal";
import { TraceLinkGraph } from "../../components/trace-link-graph";
import { RouteConstants } from "../../routes/constants";
import {
  ICommit,
  IFileTreeNode,
  IImportedRepository,
  IRequirement,
  IRequirementDescription
} from "../../types";
import CommitCard from "./commit/commit-card";
import { DrawerContent } from "./drawer-content";
import RepoDetailDescription from "./repo-detail-description";
import RequirementCard from "./requirement/requirement-card";

export interface IStateProps {
  repo?: IImportedRepository;
  requirement: IRequirement;
  loading: boolean;
  deleteRequirementLoading: boolean;
}

export interface IDispatchProps {
  fetchRepoDetail: () => void;
  fetchRepoRequirement: (repoName: string) => void;
  toggleAddRequirementModal: () => void;
  updateRequirement: (requirement: IRequirement) => void;
  deleteRequirementDescription: (
    requirement: IRequirement,
    description: IRequirementDescription
  ) => void;
}

export interface IOwnProps extends RouteComponentProps<{ id: string }> {}

export interface IRepositoryDetailProps
  extends IStateProps,
    IDispatchProps,
    IOwnProps {}

const useStyles = createUseStyles({
  spining: {
    width: "100%",
    minHeight: "60vh"
  },
  content: {
    padding: "16px",
    background: "#fff",
    margin: { left: "3rem", right: "3rem" }
  },
  contentCardWrapper: {}
});

export type RepositoryDetailDrawerType = "COMMIT" | "REQUIREMENT" | "FILE";

const RepositoryDetail: FunctionComponent<IRepositoryDetailProps> = memo(
  (props: IRepositoryDetailProps) => {
    const { t } = useTranslation();
    const {
      repo,
      fetchRepoDetail,
      loading,
      requirement,
      fetchRepoRequirement,
      deleteRequirementLoading,
      toggleAddRequirementModal,
      deleteRequirementDescription,
      match: {
        params: { id: repoId }
      }
    } = props;
    const styles = useStyles();
    const repoName = repo?.name || "";

    const [
      drawerType,
      setDrawerType
    ] = useState<null | RepositoryDetailDrawerType>(null);

    const [selectedCommit, setSelectedCommit] = useState<ICommit | null>(null);

    const [
      selectedRequirementDescription,
      setSelectedRequirementDescription
    ] = useState<IRequirementDescription | null>(null);

    const [selectedFile, setSelectedFile] = useState<IFileTreeNode | null>(
      null
    );

    const selectedFileContent =
      selectedFile && repo ? repo.shaFileContentMap[selectedFile.sha] : "";

    const openDrawer = (type: RepositoryDetailDrawerType) =>
      setDrawerType(type);

    const closeDrawer = () => setDrawerType(null);

    useEffect(() => {
      const doIt = async () => {
        try {
          await fetchRepoDetail();
          await fetchRepoRequirement(repoName);
        } catch (e) {
          if (process.env.NODE_ENV !== "production") {
            console.log(e);
          }
        }
      };
      doIt();
    }, [fetchRepoDetail, fetchRepoRequirement, repoName]);

    const routes = useMemo(() => {
      return [
        {
          path: "/",
          breadcrumbName: "首頁"
        },
        {
          path: RouteConstants.REPOSITORY,
          breadcrumbName: "倉庫"
        },
        {
          path: RouteConstants.REPOSITORY_DETAIL(repoId),
          breadcrumbName: repoId
        }
      ];
    }, [repoId]);

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

    const drawerTitle = useMemo(() => {
      if (drawerType === "COMMIT") {
        return `ID: ${selectedCommit?.sha}`;
      } else if (drawerType === "REQUIREMENT") {
        return `ID: ${selectedRequirementDescription?._id}`;
      } else if (drawerType === "FILE") {
        return selectedFile?.path;
      } else return <Skeleton.Input />;
    }, [
      selectedRequirementDescription,
      selectedCommit,
      drawerType,
      selectedFile
    ]);

    // drawType not equals null
    // one of selectedCommit and selectedRequirementDescription is not null
    const drawerVisible =
      !!drawerType &&
      (!!selectedCommit || !!selectedRequirementDescription || !!selectedFile);

    return (
      <Spin spinning={loading} className={styles.spining}>
        {requirement && <AddRequirementModal requirementId={requirement._id} />}
        <Drawer
          destroyOnClose
          width={"90vw"}
          visible={drawerVisible}
          onClose={closeDrawer}
          title={drawerTitle}
        >
          {drawerType && (
            <DrawerContent
              repoId={repoId}
              repoName={repoName}
              commit={selectedCommit}
              file={
                selectedFile
                  ? {
                      ...selectedFile,
                      content: selectedFileContent
                    }
                  : null
              }
              description={selectedRequirementDescription}
              drawerType={drawerType}
              requirementId={requirement._id}
            />
          )}
        </Drawer>
        <PageHeader
          breadcrumb={{ routes }}
          ghost={false}
          onBack={() => window.history.back()}
          title={pageHeaderConfig.title}
          subTitle={pageHeaderConfig.subTitle}
        >
          {repo ? <RepoDetailDescription repo={repo} /> : <Skeleton />}
        </PageHeader>
        <div
          style={{
            width: "100%",
            background: "#fff",
            minHeight: "80vh"
          }}
        >
          <Tabs defaultActiveKey={"1"} type="card" className={styles.content}>
            <Tabs.TabPane tab={t("commit")} key="1">
              {!!repo ? (
                <CommitCard
                  commits={repo.commits}
                  onDetailClick={commit => {
                    openDrawer("COMMIT");
                    setSelectedCommit(commit);
                  }}
                />
              ) : (
                <Skeleton />
              )}
            </Tabs.TabPane>
            <Tabs.TabPane tab={t("requirement")} key="2">
              {!!requirement ? (
                <RequirementCard
                  loading={deleteRequirementLoading}
                  toggleAddRequirementModal={toggleAddRequirementModal}
                  onDeleteClick={description =>
                    deleteRequirementDescription(requirement, description)
                  }
                  requirement={requirement}
                  onDetailClick={description => {
                    openDrawer("REQUIREMENT");
                    setSelectedRequirementDescription(description);
                  }}
                />
              ) : (
                <Skeleton />
              )}
            </Tabs.TabPane>
            <Tabs.TabPane tab={"文件"} key={"file"}>
              {repo ? (
                <RepositoryFiles
                  onFileNodeClick={node => {
                    if (node && node.type === "FILE") {
                      setSelectedFile(node);
                      openDrawer("FILE");
                    }
                  }}
                  shaFileContentMap={repo.shaFileContentMap}
                  treeData={repo.trees}
                />
              ) : (
                <Skeleton
                  avatar={false}
                  title={false}
                  paragraph={{ rows: 5 }}
                />
              )}
            </Tabs.TabPane>
            <Tabs.TabPane tab="圖" key="3">
              <TraceLinkGraph />
            </Tabs.TabPane>
          </Tabs>
        </div>
      </Spin>
    );
  }
);

export default RepositoryDetail;
