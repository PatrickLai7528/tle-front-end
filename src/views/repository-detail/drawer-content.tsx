import React from "react";
import { RepositoryDetailDrawerType } from "./repository-detail";
import { ConnectedCommitDetail } from "../../components/commit-detail";
import { ICommit, IRequirementDescription, IFileTreeNode } from "../../types";
import { RequirementDetail } from "../../components/requirement/requirement-detail";
import { ConnectedFileDetail } from "../../components/file-detail";
import { Empty } from "antd";

export interface IDrawerContentProps {
  drawerType: RepositoryDetailDrawerType;
  description: IRequirementDescription | null;
  file: (IFileTreeNode & { content: string }) | null;
  commit: ICommit | null;
  repoName: string;
  requirementId: string;
  repoId: string;
}

export const DrawerContent: React.FC<IDrawerContentProps> = React.memo(
  (props: IDrawerContentProps) => {
    const {
      drawerType,
      commit,
      repoName,
      requirementId,
      repoId,
      description,
      file
    } = props;
    if (drawerType === "COMMIT") {
      return commit ? (
        <ConnectedCommitDetail commit={commit} repoName={repoName} />
      ) : (
        <Empty />
      );
    } else if (drawerType === "REQUIREMENT") {
      return description ? (
        <RequirementDetail
          repoId={repoId}
          requirementId={requirementId}
          repoName={repoName}
          description={description}
        />
      ) : (
        <Empty />
      );
    } else if (drawerType === "FILE") {
      return (
        <>
          {file ? (
            <ConnectedFileDetail
              repoId={repoId}
              repoName={repoName}
              fileNode={file}
              fileContent={file.content}
            />
          ) : (
            <Empty />
          )}
        </>
      );
    } else return null;
  }
);
