import React from "react";
import { Skeleton } from "antd";
import { EditableTraceLinkArea } from "../editable-trace-link-area";
import {
  IRequirementDescription,
  ITraceLink,
  IFileTreeNode
} from "../../types";
import { SimpleTraceLinkCard } from "../simple-trace-link-card";
import { SelectImplement } from "../add-trace-link/select-implement";
import { useSelector } from "react-redux";
import { RootState } from "../../store/reducers";

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

    const fullyQualifiedNames: string[] = useSelector<RootState, string[]>(
      state => {
        const {
          repositoryManagementReducer: { importedRepositoryDetail }
        } = state;

        if (!importedRepositoryDetail) return [];

        const names: string[] = [];

        const traverse = (node: IFileTreeNode) => {
          if (node.type === "FILE") {
            names.push(node.fullyQualifiedName);
          } else if (node.type === "FOLDER") {
            (node.subTrees || []).map(traverse);
          }
        };

        const { trees } = importedRepositoryDetail;
        trees.map(traverse);
        return names;
      }
    );

    if (loading) {
      return <Skeleton title={false} avatar={false} paragraph={{ rows: 5 }} />;
    } else {
      return (
        <>
          <SelectImplement
            repoName={repoName}
            description={description}
            fullyQualifiedNames={fullyQualifiedNames}
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
