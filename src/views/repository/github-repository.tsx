import React, { FunctionComponent, memo } from "react";
import { createUseStyles } from "react-jss";
import { ConnectedGitHubRepositoryList } from "../../components/github-repository-list";
import { ConnectedSearchGitHubRepository } from "../../components/search-github-repository";
import { Typography } from "antd";
import { useTranslation } from "react-i18next";

export interface IGitHubRepositoryProps {}

const useStyles = createUseStyles({
  githubRepository: {
    width: "100%",
    height: "100%",
    borderRight: "2px solid #f2f2f2",
    padding: "16px"
  }
});

const GitHubRepository: FunctionComponent<IGitHubRepositoryProps> = memo(
  (props: IGitHubRepositoryProps) => {
    const styles = useStyles();
    const { t } = useTranslation();
    return (
      <div className={styles.githubRepository}>
        <Typography.Title level={4}>{t("search")}</Typography.Title>
        <ConnectedSearchGitHubRepository />
        <ConnectedGitHubRepositoryList />
      </div>
    );
  }
);

export default GitHubRepository;
