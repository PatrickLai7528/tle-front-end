import { Skeleton, Spin } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/reducers";
import {
  IFileTreeNode,
  IRequirementDescription,
  ITraceLink
} from "../../types";
import { SelectImplement } from "../add-trace-link/select-implement";
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

    const fullyQualifiedNames: string[] = useSelector<RootState, string[]>(
      state => {
        const {
          repositoryReducer: { importedRepositoryDetail }
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

    const deleteTraceLinkLoading = useSelector<RootState, boolean>(
      state => state.traceLinkReducer.deleteTraceLinkLoading
    );

    if (loading) {
      return <Skeleton title={false} avatar={false} paragraph={{ rows: 5 }} />;
    } else {
      return (
        <Spin spinning={deleteTraceLinkLoading}>
          <SelectImplement
            repoName={repoName}
            description={description}
            fullyQualifiedNames={fullyQualifiedNames}
          />
          {traceLinks.map(link => (
            <SimpleTraceLinkCard
              showOperation
              deleteType="REQUIREMENT"
              key={link._id}
              traceLink={link}
              showRequirement={false}
              showImplement={true}
            />
          ))}
        </Spin>
      );
    }
  }
);
