import React, { FunctionComponent, memo } from "react";
import { Descriptions, Skeleton, Typography } from "antd";
import { LanguageBadge } from "../../components/language-badge";
import { RepositoryDescription } from "../../components/repository-description";
import { FileTree } from "../../components/file-tree";
import { IImportedRepository } from "../../types";
import { useTranslation } from "react-i18next";

export interface IBasicInfoDescriptionsProps {
  repo: IImportedRepository;
}

const BasicInfoDescriptions: FunctionComponent<IBasicInfoDescriptionsProps> = memo(
  (props: IBasicInfoDescriptionsProps) => {
    const { repo } = props;
    const { t } = useTranslation();
    const {
      name,
      language,
      lastUpdateAt,
      currentBranch,
      description,
      shaFileContentMap,
      trees,
      commits,
      branches
    } = repo;

    console.log(description);

    return (
      <Descriptions bordered>
        <Descriptions.Item label="名稱">
          {!!name ? <span>{name}</span> : <Skeleton.Input active />}
        </Descriptions.Item>
        <Descriptions.Item label="語言">
          {!!language ? (
            <LanguageBadge language={language} />
          ) : (
            <Skeleton.Input active />
          )}
        </Descriptions.Item>
        <Descriptions.Item label="當前分支">
          {!!currentBranch ? (
            <span>{currentBranch}</span>
          ) : (
            <Skeleton.Input active />
          )}
        </Descriptions.Item>
        <Descriptions.Item label="描述" span={3}>
          {!!description ? (
            <RepositoryDescription description={description} />
          ) : (
            <Skeleton.Input active />
          )}
        </Descriptions.Item>
        <Descriptions.Item label="其它分支" span={3}>
          {!!branches ? (
            <Typography.Paragraph>
              <ul>
                {branches.map(branch => (
                  <li key={branch.name}>{branch.name}</li>
                ))}
              </ul>
            </Typography.Paragraph>
          ) : (
            <Skeleton
              active
              paragraph={{ rows: 3 }}
              avatar={false}
              title={false}
            />
          )}
        </Descriptions.Item>
        <Descriptions.Item label={t("commit")} span={3}>
          {!!commits ? (
            <Typography.Paragraph>
              <ul>
                {commits.map(commit => (
                  <li key={commit.sha}>{commit.message}</li>
                ))}
              </ul>
            </Typography.Paragraph>
          ) : (
            <Skeleton
              paragraph={{ rows: 3 }}
              avatar={false}
              title={false}
              active
            />
          )}
        </Descriptions.Item>
        <Descriptions.Item label={"文件"} span={3}>
          {trees ? (
            <FileTree
              treeData={trees}
              shaFileContentMap={
                {
                  ...shaFileContentMap
                } || {}
              }
            />
          ) : (
            <Skeleton
              paragraph={{ rows: 3 }}
              avatar={false}
              title={false}
              active
            />
          )}
        </Descriptions.Item>
      </Descriptions>
    );
  }
);

export default BasicInfoDescriptions;
