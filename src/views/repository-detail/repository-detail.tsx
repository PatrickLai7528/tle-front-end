import { Drawer, PageHeader, Skeleton, Spin } from "antd";
import React, {
  FunctionComponent,
  memo,
  useEffect,
  useMemo,
  useState
} from "react";
import { createUseStyles } from "react-jss";
import { RouteComponentProps } from "react-router-dom";
import { ConnectedAddRequirementModal } from "../../components/add-requirement-modal";
import { RouteConstants } from "../../routes/constants";
import {
  ICommit,
  IImportedRepository,
  IRequirement,
  IRequirementDescription
} from "../../types";
import CommitCard from "./commit/commit-card";
import CommitDetail from "./commit/commit-detail";
import RepoDetailDescription from "./repo-detail-description";
import RequirementCard from "./requirement/requirement-card";
import RequirementDetail from "./requirement/requirement-detail";

export interface IStateProps {
  repo: IImportedRepository;
  requirement: IRequirement;
  loading: boolean;
  deleteRequirementLoading: boolean;
}

export interface IDispatchProps {
  fetchRepoDetail: () => void;
  fetchRepoRequirement: () => void;
  toggleAddRequirementModal: () => void;
  updateRequirement: (requirement: IRequirement) => void;
  deleteRequirementDescription: (
    requirement: IRequirement,
    description: IRequirementDescription
  ) => void;
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
  },
  content: {
    padding: "16px",
    overflowX: "scroll",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    background: "#fff"
  },
  contentCardWrapper: {
    width: "500px",
    flexGrow: "0",
    flexShrink: "0",
    margin: { right: "16px" }
  }
});

const RepositoryDetail: FunctionComponent<IRepositoryDetailProps> = memo(
  (props: IRepositoryDetailProps) => {
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
        params: { name: repoName }
      }
    } = props;
    const styles = useStyles();

    const [drawerType, setDrawerType] = useState<
      null | "COMMIT" | "REQUIREMENT" | "TRACE_LINK"
    >(null);

    const [selectedCommit, setSelectedCommit] = useState<ICommit | null>(null);

    const [
      selectedRequirementDescription,
      setSelectedRequirementDescription
    ] = useState<IRequirementDescription | null>(null);

    const openDrawer = (type: "COMMIT" | "REQUIREMENT" | "TRACE_LINK") =>
      setDrawerType(type);
    const closeDrawer = () => setDrawerType(null);

    useEffect(() => {
      const doIt = async () => {
        try {
          await Promise.all([fetchRepoDetail(), fetchRepoRequirement()]);
        } catch (e) {
          if (process.env.NODE_ENV !== "production") {
            console.log(e);
          }
        }
      };
      doIt();
    }, [fetchRepoDetail, fetchRepoRequirement]);

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
          path: RouteConstants.REPOSITORY_DETAIL(repoName),
          breadcrumbName: repoName
        }
      ];
    }, [repoName]);

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
        return <CommitDetail commit={selectedCommit!} />;
      } else if (drawerType === "REQUIREMENT") {
        return (
          <RequirementDetail
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
      } else return null;
    }, [
      updateRequirement,
      selectedCommit,
      selectedRequirementDescription,
      drawerType,
      requirement
    ]);

    const drawerTitle = useMemo(() => {
      if (drawerType === "COMMIT") {
        return `ID: ${selectedCommit?.sha}`;
      } else if (drawerType) {
        return `ID: ${selectedRequirementDescription?.id}`;
      } else return <Skeleton.Input />;
    }, [selectedRequirementDescription, selectedCommit, drawerType]);

    // drawType not equals null
    // one of selectedCommit and selectedRequirementDescription is not null
    const drawerVisible =
      !!drawerType && (!!selectedCommit || !!selectedRequirementDescription);

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
        <div className={styles.content}>
          <div className={styles.contentCardWrapper}>
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
          </div>
          <div className={styles.contentCardWrapper}>
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
          </div>
        </div>
      </Spin>
    );
  }
);

export default RepositoryDetail;
