import { Skeleton, Typography } from "antd";
import React, { FunctionComponent, memo, useEffect, useMemo } from "react";
import { createUseStyles } from "react-jss";
import { IRequirementDescription, ITraceLink } from "../../types";
import { EditableTraceLinkArea } from "../editable-trace-link-area";
import { RequirementCard } from "./requirement-card";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/reducers";
import { TraceLinkActions } from "../../store/trace-link/types";
import { AppDispatch } from "../../store/store";
import { updateDescription } from "../../store/requirement/actions";
import { HistoryTable } from "./history-table";
import { fetchDescriptionRelatedTraceLinks } from "../../store/trace-link/actions";
import { SimpleTraceLinkCard } from "../simple-trace-link-card";
import { TraceLinkContent } from "./trace-link-content";

export interface IOwnProps {
  description: IRequirementDescription;
  repoName: string;
  repoId: string;
  requirementId: string;
}

export interface IRequirementDetailProps extends IOwnProps {}

const useStyles = createUseStyles({
  requirementDetail: {
    width: "100%"
  },
  relatedImplements: {
    margin: { top: "16px" },
    display: "flex",
    flexDirection: "column"
  },
  implementCard: {
    margin: { top: "8px" },
    width: "100%"
  },
  editableArea: {
    marginBottom: "16px"
  },
  requirementArea: {
    margin: { bottom: "16px" }
  },
  typographyTitle: {
    margin: { top: "24px" }
  }
});

export const RequirementDetail: FunctionComponent<IRequirementDetailProps> = memo(
  (props: IRequirementDetailProps) => {
    const { repoName, requirementId, description, repoId } = props;
    const styles = useStyles();
    const dispatch = useDispatch<AppDispatch<TraceLinkActions>>();
    const loading = useSelector<RootState, boolean>(
      state => state.traceLinkReducer.loading
    );

    const traceLinks = useSelector<RootState, ITraceLink[]>(
      state => state.traceLinkReducer.requirementRelatedTraceLinks
    );

    const fetchTraceLinks = (repoName: string, descriptionId: string) =>
      dispatch(fetchDescriptionRelatedTraceLinks(repoName, descriptionId));

    const onUpdateDescription = (description: IRequirementDescription) =>
      dispatch(updateDescription(requirementId, description));

    useEffect(() => {
      fetchTraceLinks(repoName, description._id);
    }, [repoName, fetchDescriptionRelatedTraceLinks, description]);

    return (
      <div className={styles.requirementDetail}>
        <Typography.Title level={3}>需求描述</Typography.Title>
        <div className={styles.requirementArea}>
          <RequirementCard
            onUpdateDescription={onUpdateDescription}
            description={description}
            useCard={false}
            editable
            useTooltips
          />
        </div>
        <Typography.Title level={3} className={styles.typographyTitle}>
          修改紀錄
        </Typography.Title>
        <HistoryTable
          requirementId={requirementId}
          descriptionId={description._id}
        />
        <Typography.Title level={3} className={styles.typographyTitle}>
          追踪線索
        </Typography.Title>
        <TraceLinkContent
          loading={loading}
          repoName={repoName}
          repoId={repoId}
          description={description}
          traceLinks={traceLinks}
        />
      </div>
    );
  }
);
