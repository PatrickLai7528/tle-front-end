import React, { FunctionComponent, memo } from "react";
import { Descriptions } from "antd";
import { IImportedRepository } from "../../types";
import { LanguageBadge } from "../../components/language-badge";
import { RepositoryDescription } from "../../components/repository-description";
import moment from "moment";

export interface IRepoDetailDescriptionProps {
  repo: IImportedRepository;
}

const RepoDetailDescription: FunctionComponent<IRepoDetailDescriptionProps> = memo(
  (props: IRepoDetailDescriptionProps) => {
    const { repo } = props;
    return (
      <Descriptions size="small" column={2}>
        <Descriptions.Item label="擁有者">{repo.ownerId}</Descriptions.Item>
        <Descriptions.Item label="當前分支">
          {repo.currentBranch}
        </Descriptions.Item>
        <Descriptions.Item label="語言">
          <LanguageBadge language={repo.language} />
        </Descriptions.Item>
        <Descriptions.Item label={"最近更新"}>
          {moment(repo.lastUpdateAt).format()}
        </Descriptions.Item>
        <Descriptions.Item label="描述">
          <RepositoryDescription description={repo.description} />
        </Descriptions.Item>
      </Descriptions>
    );
  }
);

export default RepoDetailDescription;
