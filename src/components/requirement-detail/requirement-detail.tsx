import { Skeleton, Typography } from "antd";
import React, { FunctionComponent, memo, useEffect, useMemo } from "react";
import { createUseStyles } from "react-jss";
import { IRequirementDescription, ITraceLink } from "../../types";
import { EditableTraceLinkArea } from "../editable-trace-link-area";
import { RequirementCard } from "../requirement/requirement-card";

export interface IStateProps {
  traceLinks: ITraceLink[];
  loading: boolean;
}

export interface IDispatchProps {
  fetchRequirementRelatedTraceLinks: (
    repoName: string,
    requirementId: string
  ) => void;
}

export interface IOwnProps {
  description: IRequirementDescription;
  repoName: string;
  onDescriptionUpdate: (id: string, descriptionText: string) => void;
}

export interface IRequirementDetailProps
  extends IStateProps,
    IDispatchProps,
    IOwnProps {}

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

const RequirementDetail: FunctionComponent<IRequirementDetailProps> = memo(
  (props: IRequirementDetailProps) => {
    const {
      repoName,
      description,
      onDescriptionUpdate,
      fetchRequirementRelatedTraceLinks,
      loading,
      traceLinks
    } = props;
    const styles = useStyles();

    useEffect(() => {
      const doFetch = async () => {
        try {
          await fetchRequirementRelatedTraceLinks(repoName, description._id);
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
            description={description}
            useCard={false}
            editable
            useTooltips
          />
        </div>
        <Typography.Title level={3}>追踪線索</Typography.Title>
        {traceLinksContent}
      </div>
    );
  }
);

export default RequirementDetail;
