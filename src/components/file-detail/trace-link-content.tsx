import React from "react";
import { IFileTreeNode, ITraceLink } from "../../types";
import { Skeleton, Empty } from "antd";
import { EditableTraceLinkArea } from "../editable-trace-link-area";
import { SimpleTraceLinkCard } from "../simple-trace-link-card";

export interface ITraceLinkContentProps {
  loading: boolean;
  fileNode: IFileTreeNode;
  traceLinks: ITraceLink[];
  repoId: string;
  repoName: string;
}

export const TraceLinkContent: React.FC<ITraceLinkContentProps> = React.memo(
  (props: ITraceLinkContentProps) => {
    const { loading, fileNode, traceLinks, repoId, repoName } = props;
    if (loading) {
      return (
        <Skeleton title={false} avatar={false} active paragraph={{ rows: 5 }} />
      );
    } else if (!loading && fileNode && traceLinks) {
      return (
        <>
          <EditableTraceLinkArea
            repoId={repoId}
            fullyQualifiedFileName={fileNode.fullyQualifiedName}
            type="IMPLEMENT"
            repoName={repoName}
          />
          {traceLinks.map(link => (
            <SimpleTraceLinkCard
              showOperation
              key={link._id}
              traceLink={link}
              showRequirement={true}
              showImplement={false}
            />
          ))}
        </>
      );
    } else {
      return <Empty />;
    }
  }
);
