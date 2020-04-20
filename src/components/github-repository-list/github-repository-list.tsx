import { List, Tooltip } from "antd";
import React, { FunctionComponent, memo } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { IGHRepositoryRes } from "../../types/github-api/repository";
import { ProgramLanguage } from "../../utils/language-color";
import { LanguageBadge } from "../language-badge";
import { RouteConstants } from "../../routes/constants";

export interface IStateProps {
  loading: boolean;
  repositoryList: IGHRepositoryRes[];
}

export interface IDispatchProps {}

export interface IOwnProps {
  onImportClick: (ghRepoRes: IGHRepositoryRes) => void;
}

export interface IGitHubRepositoryListProps
  extends IStateProps,
    IDispatchProps,
    IOwnProps {}

const IGitHubRepositoryList: FunctionComponent<IGitHubRepositoryListProps> = memo(
  (props: IGitHubRepositoryListProps) => {
    const { t } = useTranslation();
    const { loading, repositoryList } = props;
    return (
      <List
        loading={loading}
        dataSource={repositoryList}
        renderItem={(item: IGHRepositoryRes) => {
          const { language, html_url: htmlUrl, id } = item;
          return (
            <List.Item
              key={item.name}
              actions={[
                <Link to={RouteConstants.IMPORT_PROCESS(id.toString())}>
                  {t("import")}
                </Link>
              ]}
            >
              <List.Item.Meta
                title={
                  <Tooltip title={"View in Github"}>
                    <a href={htmlUrl}>{item.name}</a>
                  </Tooltip>
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
