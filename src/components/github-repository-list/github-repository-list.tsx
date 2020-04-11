import { Button, Divider, List, Popconfirm } from "antd";
import { PaginationConfig } from "antd/lib/pagination";
import React, { FunctionComponent, memo } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { LanguageBadge } from "../language-badge";
import { ProgramLanguage } from "../../utils/language-color";
import { RepositoryAvatar } from "../repository-avatar";
import { RepositoryDescription } from "../repository-description";
import { IGHRepositoryRes } from "../../types/github-api/repository";

export interface IStateProps {
  loading: boolean;
  loadMoreTimes: number;
  repositoryList: IGHRepositoryRes[];
}

export interface IDispatchProps {
  loadMoreRepositories: (loadMoreTimes: number) => void;
  toggleModal: (repo: IGHRepositoryRes) => void;
}

export interface IOwnProps {}

export interface IGitHubRepositoryListProps
  extends IStateProps,
    IDispatchProps,
    IOwnProps {}

// const paginationConfig: PaginationConfig = {
// 	simple: true,
// 	position: "top",
// 	pageSize: 10,
// 	style: { margin: 0 }
// };

const IGitHubRepositoryList: FunctionComponent<IGitHubRepositoryListProps> = memo(
  (props: IGitHubRepositoryListProps) => {
    const { t } = useTranslation();
    const { loading, repositoryList } = props;
    return (
      <List
        loading={loading}
        // pagination={paginationConfig}
        dataSource={repositoryList}
        renderItem={(item: IGHRepositoryRes) => {
          const { language, html_url: htmlUrl, id } = item;
          return (
            <List.Item
              key={item.name}
              actions={[
                <Link to={`/authed/import_process/${id}`}>{t("import")}</Link>
              ]}
            >
              <List.Item.Meta
                title={
                  <Popconfirm
                    title={"將前往GitHub"}
                    okText={"前往"}
                    cancelText={"取消"}
                    onConfirm={() => window.open(htmlUrl)}
                  >
                    <a href={htmlUrl} onClick={e => e.preventDefault()}>
                      {item.name}
                    </a>
                  </Popconfirm>
                }
                description={
                  <LanguageBadge language={language as ProgramLanguage} />
                }
              />
            </List.Item>
          );
        }}
      />
    );
  }
);

export default IGitHubRepositoryList;
