import { Skeleton, Typography } from "antd";
import React, { FunctionComponent, memo, useEffect, useMemo } from "react";
import { createUseStyles } from "react-jss";
import { IRequirementDescription, ITraceLink } from "../../types";
import { EditableTraceLinkArea } from "../editable-trace-link-area";
import { RequirementCard } from "./requirement-card";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/reducers";
import { TraceLinkActions } from "../../store/trace-link/types";
import { fetchRequirementRelatedTraceLinks } from "../../store/trace-link/actions";
import { AppDispatch } from "../../store/store";
import { updateDescription } from "../../store/requirement/actions";
import { HistoryTable } from "./history-table";

export interface IOwnProps {
  description: IRequirementDescription;
  repoName: string;
  repoId: string;
  onDescriptionUpdate: (id: string, descriptionText: string) => void;
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
      dispatch(fetchRequirementRelatedTraceLinks(repoName, descriptionId));

    const onUpdateDescription = (description: IRequirementDescription) =>
      dispatch(updateDescription(requirementId, description));

    useEffect(() => {
      const doFetch = async () => {
        try {
          await fetchTraceLinks(repoName, description._id);
        } catch (e) {
          if (process.env.NODE_ENV !== "production") {
            console.log(e);
          }
        }
      };
      doFetch();
    }, [repoName, fetchRequirementRelatedTraceLinks, description]);

    const traceLinksContent = useMemo(() => {
      if (loading) {
        return (
          <Skeleton title={false} avatar={false} paragraph={{ rows: 5 }} />
        );
      } else if (!loading && traceLinks) {
        return (
          <EditableTraceLinkArea
            repoId={repoId}
            type="REQUIREMENT"
            repoName={repoName}
            traceLinks={traceLinks}
          />
        );
      }
    }, [traceLinks, loading]);

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
        <Typography.Title level={3}>修改紀錄</Typography.Title>
        <HistoryTable
          requirementId={requirementId}
          descriptionId={description._id}
        />
        <Typography.Title level={3}>追踪線索</Typography.Title>
        {traceLinksContent}
      </div>
    );
  }
);
