import React from "react";
import { Skeleton } from "antd";
import { EditableTraceLinkArea } from "../editable-trace-link-area";
import { IRequirementDescription, ITraceLink } from "../../types";
import { SimpleTraceLinkCard } from "../simple-trace-link-card";

export interface ITraceLinkContentProps {
  loading: boolean;
  description: IRequirementDescription;
  repoId: string;
  repoName: string;
  traceLinks: ITraceLink[];
}

export const TraceLinkContent: React.FunctionComponent<ITraceLinkContentProps> = React.memo(
  (props: ITraceLinkContentProps) => {
    const { loading, description, repoId, repoName, traceLinks } = props;
    if (loading) {
      return <Skeleton title={false} avatar={false} paragraph={{ rows: 5 }} />;
    } else {
      return (
        <>
          <EditableTraceLinkArea
            requirementDescription={description}
            repoId={repoId}
            type="REQUIREMENT"
            repoName={repoName}
          />
          {traceLinks.map(link => (
            <SimpleTraceLinkCard
              showOperation
              key={link._id}
              traceLink={link}
              showRequirement={false}
              showImplement={true}
            />
          ))}
        </>
      );
    }
  }
);
