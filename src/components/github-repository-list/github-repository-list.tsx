import React, { FunctionComponent, memo, useMemo, useCallback } from "react";
import { Button, Avatar, Popconfirm, Divider, List } from "antd";
import { colorByLanguage, ProgramLanguage } from "../../utils/language-color";
import { LoadMore } from "../load-more";
import {
  GitHubAPIRepositoriesResponse,
  GitHubAPIRepositoryResponse
} from "../../types";
import { PaginationConfig } from "antd/lib/pagination";
import { useTranslation } from "react-i18next";
import { RepositoryAvatar } from "../repository-avatar";
import { LanguageBadge } from "../ language-badge";
import { RepositoryDescription } from "../repository-description";
import { Link } from "react-router-dom";

export interface IStateProps {
  loading: boolean;
  loadMoreTimes: number;
  repositoryList: GitHubAPIRepositoriesResponse;
}

export interface IDispatchProps {
  loadMoreRepositories: (loadMoreTimes: number) => void;
  toggleModal: (repo: GitHubAPIRepositoryResponse) => void;
}

export interface IOwnProps {}

export interface IGitHubRepositoryListProps
  extends IStateProps,
    IDispatchProps,
    IOwnProps {}

const paginationConfig: PaginationConfig = {
  simple: true,
  position: "top",
  pageSize: 10,
  style: { margin: 0 }
};

const IGitHubRepositoryList: FunctionComponent<IGitHubRepositoryListProps> = memo(
  (props: IGitHubRepositoryListProps) => {
    const { t } = useTranslation();
    const {
      loading,
      loadMoreTimes,
      loadMoreRepositories,
      repositoryList,
      toggleModal
    } = props;

    const onLoadMore = useCallback(() => {
      loadMoreRepositories(loadMoreTimes);
    }, [loadMoreTimes, loadMoreRepositories]);

    const wrappedLoadMore = useMemo(() => {
      return !loading ? <LoadMore onLoadMore={onLoadMore} /> : null;
    }, [loading, onLoadMore]);

    return (
      <List
        loading={loading}
        loadMore={wrappedLoadMore}
        pagination={paginationConfig}
        dataSource={repositoryList}
        renderItem={(item: GitHubAPIRepositoryResponse) => {
          const { name, language, description, html_url: htmlUrl, id } = item;
          return (
            <List.Item
              key={item.name}
              actions={[
                <Link to={`/authed/import_process/${id}`}>
                  <Button type={"link"}>{t("import")}</Button>
                </Link>
              ]}
            >
              <List.Item.Meta
                avatar={
                  <RepositoryAvatar
                    repositoryName={name}
                    language={language as ProgramLanguage}
                  />
                }
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
                  <>
                    <LanguageBadge language={language as ProgramLanguage} />
                    <Divider type="vertical" />
                    {description && (
                      <RepositoryDescription description={description} />
                    )}
                  </>
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
