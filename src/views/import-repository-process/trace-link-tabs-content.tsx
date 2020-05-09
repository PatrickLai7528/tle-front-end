import React from "react";
import { RequirementForm } from "../../components/requirement/requirement-form";
import { Button, Result, Card, Tooltip, message } from "antd";
import { RequirementCard } from "../../components/requirement/requirement-card";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/reducers";
import {
  IRequirement,
  IFileTreeNode,
  IRequirementDescription,
  IImportedRepository,
  ITraceLinkMatrix,
  ITraceLink
} from "../../types";
import { ConnectedEditInitTraceLinkModal } from "../../components/edit-init-trace-link-modal";
import {
  toggleInitTraceLinkModal,
  generateInitialTraceLink
} from "../../store/trace-link/actions";
import { IGHRepositoryRes } from "../../types/github-api/repository";
import { createUseStyles } from "react-jss";
import { classifyTraceLinksByRequirement } from "../../utils/trace-links";
import TraceLinkCard from "../../components/trace-link/trace-link-card";

export interface ITraceLinkTabsContentProps {
  importedRepository?: Partial<IImportedRepository>;
  repositoryRes?: IGHRepositoryRes;
  initTraceLinkMatrix?: ITraceLinkMatrix;
  onDescriptionsConfirmed: (
    descriptions: Omit<IRequirementDescription, "_id">[]
  ) => void;
}

const Descriptions = React.memo<{
  descriptions: Omit<IRequirementDescription, "_id">[];
}>(({ descriptions }) => {
  return (
    <>
      {(descriptions || []).map((description, index) => (
        <RequirementCard key={index} description={description} />
      ))}
    </>
  );
});

const useStyles = createUseStyles({
  button: {
    margin: { top: "8px" }
  }
});

const parseDescriptions = (
  jsonStr: string,
  defaultUser?: string
): Omit<IRequirementDescription, "_id">[] => {
  const parsed: any = JSON.parse(jsonStr);
  const res: Omit<IRequirementDescription, "_id">[] = [];
  for (const item of parsed) {
    // lastUpdateAt: number;
    // name: string;
    // createBy: string;
    // lastUpdateBy: string;
    // createAt: number;
    // participants: string;
    // triggeringCondition: string;
    // preCondition: string;
    // postCondition: string;
    // priority: string;
    // normalProcess: string;
    // expansionProcess: string;
    // specialNeeds: string;
    // _id: string;
    const {
      createBy,
      preCondition,
      postCondition,
      priority,
      normalProcess,
      expansionProcess,
      specialNeeds,
      name,
      participants,
      triggeringCondition
    } = item;
    res.push({
      lastUpdateAt: Date.now(),
      createAt: Date.now(),
      lastUpdateBy: createBy || defaultUser,
      createBy: createBy || defaultUser,
      preCondition: preCondition || "",
      postCondition: postCondition || "",
      priority: priority || "medium",
      normalProcess: normalProcess || "",
      expansionProcess: expansionProcess || "",
      specialNeeds: specialNeeds || "",
      name: name || "",
      participants: participants || "",
      triggeringCondition: triggeringCondition || ""
    });
  }

  return res;
};

export const TraceLinkTabsContent: React.FunctionComponent<ITraceLinkTabsContentProps> = React.memo(
  (props: ITraceLinkTabsContentProps) => {
    const styles = useStyles();
    const generateInitTraceLinkLoading = useSelector<RootState, boolean>(
      state => state.traceLinkReducer.initTraceLinkLoading
    );
    const importDone = useSelector<RootState, boolean>(
      state => state.importRepositoryReducer.importDone
    );
    const initTraceLinkConfirmed = useSelector<RootState, boolean>(
      state => state.traceLinkReducer.initTraceLinkConfirmed
    );

    const githubId = useSelector<RootState, string | undefined>(
      state => state.authReducer.ghProfile?.login
    );

    const repository = useSelector<RootState, IImportedRepository | undefined>(
      state => state.importRepositoryReducer.importedRepository
    );

    const {
      importedRepository,
      repositoryRes,
      initTraceLinkMatrix,
      onDescriptionsConfirmed
    } = props;
    const dispatch = useDispatch();

    const toggleModel = () => dispatch(toggleInitTraceLinkModal());

    const generateInit = (
      files: IFileTreeNode[],
      requirement: Omit<IRequirement, "_id">
    ) => dispatch(generateInitialTraceLink(files, requirement));

    const [descriptions, setDescriptions] = React.useState<
      Omit<IRequirementDescription, "_id">[]
    >([]);

    const requirementLinkMap = React.useMemo(
      () => classifyTraceLinksByRequirement(initTraceLinkMatrix?.links || []),
      [initTraceLinkMatrix]
    );

    const handleButtonClick = React.useCallback(() => {
      const requirement: Omit<IRequirement, "_id"> = {
        relatedRepoName: importedRepository?.name || repositoryRes?.name || "",
        descriptions: descriptions as any
      };
      generateInit(importedRepository?.trees || [], requirement);
      toggleModel();
    }, [toggleModel, generateInit]);

    React.useEffect(() => {
      if (initTraceLinkConfirmed && requirementLinkMap)
        onDescriptionsConfirmed(descriptions);
    }, [initTraceLinkConfirmed, requirementLinkMap]);

    const readRequirementDescriptionFromConfig = () => {
      if (repository) {
        const { trees, shaFileContentMap } = repository;

        let configFile: IFileTreeNode | null = null;

        for (const node of trees) {
          if (node.fullyQualifiedName === "tle_config.json") {
            configFile = node;
            break;
          }
        }

        if (!configFile) {
          message.error("根目錄下沒有找到`tle_config.json`");
          return;
        }

        const configFileContent: string | undefined =
          shaFileContentMap[configFile.sha];

        if (!configFileContent) {
          message.error("配置文件為空！");
          return;
        }

        const descriptions: Omit<
          IRequirementDescription,
          "_id"
        >[] = parseDescriptions(configFileContent, githubId);

        setDescriptions([...descriptions]);
      } else {
        message.error("請先導入倉庫");
        return;
      }
    };

    if (!importDone) {
      return <Result status="warning" title="請先等待導入結束" />;
    } else if (initTraceLinkConfirmed && requirementLinkMap) {
      return (
        <>
          {Object.keys(requirementLinkMap || {})
            .sort()
            .map(requirementId => {
              const traceLinks: ITraceLink[] =
                requirementLinkMap[requirementId];
              return (
                <TraceLinkCard
                  key={requirementId}
                  editable={false}
                  tracelinks={traceLinks}
                  requirement={traceLinks[0].requirementDescription}
                />
              );
            })}
        </>
      );
    } else {
      return (
        <>
          <Card style={{ marginBottom: "16px" }}>
            <Card.Meta
              title={"操作"}
              description={
                <>
                  <Button
                    type="primary"
                    size="small"
                    onClick={readRequirementDescriptionFromConfig}
                  >
                    從配置文件讀取
                  </Button>
                  <Tooltip title="需先輸入需求">
                    <Button
                      disabled={!descriptions || descriptions.length === 0}
                      style={{ marginLeft: "16px" }}
                      type="primary"
                      size="small"
                      loading={generateInitTraceLinkLoading}
                      onClick={handleButtonClick}
                    >
                      生成追踪線索
                    </Button>
                  </Tooltip>
                </>
              }
            />
          </Card>
          <RequirementForm
            onDone={(description: Omit<IRequirementDescription, "_id">) => {
              setDescriptions(old => [description, ...old]);
            }}
          />
          <Descriptions descriptions={descriptions} />
          <ConnectedEditInitTraceLinkModal
            width={"80vw"}
            traceLinkMatrix={initTraceLinkMatrix}
          />
        </>
      );
    }
  }
);
