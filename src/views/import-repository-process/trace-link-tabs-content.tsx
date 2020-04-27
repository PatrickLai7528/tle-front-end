import React from "react";
import { RequirementForm } from "../../components/requirement/requirement-form";
import { Button, Result } from "antd";
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
import { v4 as uuid } from "uuid";
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
          <RequirementForm
            onDone={(description: Omit<IRequirementDescription, "_id">) => {
              setDescriptions(old => [description, ...old]);
            }}
          />
          <Descriptions descriptions={descriptions} />
          <Button
            block
            className={styles.button}
            loading={generateInitTraceLinkLoading}
            onClick={handleButtonClick}
          >
            生成追踪線索
          </Button>
          <ConnectedEditInitTraceLinkModal
            width={"80vw"}
            traceLinkMatrix={initTraceLinkMatrix}
          />
        </>
      );
    }
  }
);
