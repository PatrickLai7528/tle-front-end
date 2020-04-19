import { Drawer, Empty, PageHeader, Skeleton, Spin, Tabs } from "antd";
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
import { ConnectedAddRequirementModal } from "../../components/add-requirement-modal";
import { ConnectedCommitDetail } from "../../components/commit-detail";
import { ConnectedFileDetail } from "../../components/file-detail";
import { RepositoryFiles } from "../../components/repository-files";
import { ConnectedRequirementDetail } from "../../components/requirement-detail";
import { RouteConstants } from "../../routes/constants";
import {
  ICommit,
  IFileTreeNode,
  IImportedRepository,
  IRequirement,
  IRequirementDescription
} from "../../types";
import CommitCard from "./commit/commit-card";
import RepoDetailDescription from "./repo-detail-description";
import RequirementCard from "./requirement/requirement-card";

// const data = {
// 	nodes: [
// 		{
// 			id: "0",
// 			label: "Node",
// 			x: 55,
// 			y: 55,
// 		},
// 		{
// 			id: "1",
// 			label: "Node",
// 			x: 55,
// 			y: 255,
// 		},
// 	],
// 	edges: [
// 		{
// 			label: "Label",
// 			source: "0",
// 			target: "1",
// 		},
// 	],
// };
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
      updateRequirement,
      match: {
        params: { id }
      }
    } = props;
    const styles = useStyles();
    const repoName = repo?.name || "";

    const [drawerType, setDrawerType] = useState<
      null | "COMMIT" | "REQUIREMENT" | "FILE"
    >(null);

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

    const openDrawer = (type: "COMMIT" | "REQUIREMENT" | "FILE") =>
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
          path: RouteConstants.REPOSITORY_DETAIL(id),
          breadcrumbName: id
        }
      ];
    }, [id]);

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

    const drawerContent = useMemo(() => {
      if (drawerType === "COMMIT") {
        return (
          <ConnectedCommitDetail commit={selectedCommit!} repoName={repoName} />
        );
      } else if (drawerType === "REQUIREMENT") {
        return (
          <ConnectedRequirementDetail
            repoName={repoName}
            onDescriptionUpdate={(descId: string, descriptionText: string) => {
              const oldDescriptions: IRequirementDescription[] =
                requirement.descriptions;
              const newDescriptions: IRequirementDescription[] = [];
              for (const oldDesc of oldDescriptions) {
                if (oldDesc.id === descId) {
                  newDescriptions.push({
                    ...oldDesc,
                    text: descriptionText
                  });
                } else {
                  newDescriptions.push({ ...oldDesc });
                }
              }
              const newRequirement: IRequirement = {
                ...requirement,
                descriptions: newDescriptions
              };
              updateRequirement(newRequirement);
            }}
            description={selectedRequirementDescription!}
          />
        );
      } else if (drawerType === "FILE") {
        return (
          <>
            {selectedFile ? (
              <ConnectedFileDetail
                repoName={repoName}
                fileNode={selectedFile}
                fileContent={selectedFileContent}
              />
            ) : (
              <Empty />
            )}
          </>
        );
      } else return null;
    }, [
      repoName,
      updateRequirement,
      selectedCommit,
      selectedFile,
      selectedRequirementDescription,
      drawerType,
      requirement,
      selectedFileContent
    ]);

    const drawerTitle = useMemo(() => {
      if (drawerType === "COMMIT") {
        return `ID: ${selectedCommit?.sha}`;
      } else if (drawerType === "REQUIREMENT") {
        return `ID: ${selectedRequirementDescription?.id}`;
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
        <ConnectedAddRequirementModal />
        <Drawer
          destroyOnClose
          width={"80vw"}
          visible={drawerVisible}
          onClose={closeDrawer}
          title={drawerTitle}
        >
          {drawerContent}
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
        <div style={{ width: "100%", background: "#fff" }}>
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
            {/* <Tabs.TabPane tab="圖" key="3">
            <GGEditor>
              <Flow style={{ width: 500, height: 500 }} data={data} />
            </GGEditor>
          </Tabs.TabPane> */}
          </Tabs>
        </div>
      </Spin>
    );
  }
);

export default RepositoryDetail;
