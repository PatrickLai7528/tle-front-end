import React, { FunctionComponent, memo } from "react";
import { createUseStyles } from "react-jss";
import { SearchGitHubRepository } from "../../components/search-github-repository";
import { ConnectedGitHubRepositoryList } from "../../components/github-repository-list";

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
    return (
      <div className={styles.githubRepository}>
        <SearchGitHubRepository />
        <ConnectedGitHubRepositoryList />
      </div>
    );
  }
);

export default GitHubRepository;
