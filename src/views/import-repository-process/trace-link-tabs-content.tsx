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
import { TraceLinkCard } from "../../components/trace-link-card";

export interface ITraceLinkTabsContentProps {
  importedRepository?: Partial<IImportedRepository>;
  repositoryRes?: IGHRepositoryRes;
  initTraceLinkMatrix?: ITraceLinkMatrix;
}

const Descriptions = React.memo<{
  descriptions: IRequirementDescription[];
}>(({ descriptions }) => {
  return (
    <>
      {(descriptions || []).map(description => (
        <RequirementCard key={description._id} description={description} />
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
    const { importedRepository, repositoryRes, initTraceLinkMatrix } = props;
    const dispatch = useDispatch();
    const toggleModel = React.useCallback(
      () => dispatch(toggleInitTraceLinkModal()),
      [dispatch]
    );
    const generateInit = React.useCallback(
      (files: IFileTreeNode[], requirement: IRequirement) =>
        dispatch(generateInitialTraceLink(files, requirement)),
      [dispatch]
    );

    const [descriptions, setDescriptions] = React.useState<
      IRequirementDescription[]
    >([]);

    const requirementLinkMap = React.useMemo(
      () => classifyTraceLinksByRequirement(initTraceLinkMatrix?.links || []),
      [initTraceLinkMatrix]
    );

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
    }

    const handleButtonClick = React.useCallback(() => {
      const requirement: IRequirement = {
        _id: uuid(),
        relatedRepoName: importedRepository?.name || repositoryRes?.name || "",
        descriptions: descriptions
      };
      generateInit(importedRepository?.trees || [], requirement);
      toggleModel();
    }, [toggleModel, generateInit]);

    return (
      <>
        <RequirementForm
          onDone={(description: IRequirementDescription) => {
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
);
