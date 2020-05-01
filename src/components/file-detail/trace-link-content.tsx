import React from "react";
import {
  IFileTreeNode,
  ITraceLink,
  IRequirementDescription
} from "../../types";
import { Skeleton, Empty } from "antd";
import { SimpleTraceLinkCard } from "../simple-trace-link-card";
import { SelectRequirement } from "../add-trace-link/select-requirement";
import { useSelector } from "react-redux";
import { RootState } from "../../store/reducers";

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

    const descriptions: IRequirementDescription[] = useSelector<
      RootState,
      IRequirementDescription[]
    >(state => state.requirementReducer.requirement?.descriptions || []);

    if (loading) {
      return (
        <Skeleton title={false} avatar={false} active paragraph={{ rows: 5 }} />
      );
    } else if (!loading && fileNode && traceLinks) {
      return (
        <>
          <SelectRequirement
            fullyQualifiedName={fileNode.fullyQualifiedName}
            repoName={repoName}
            descriptions={descriptions}
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
