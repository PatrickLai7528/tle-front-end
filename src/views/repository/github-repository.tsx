import React, { FunctionComponent, memo } from "react";
import { createUseStyles } from "react-jss";
import { ConnectedGitHubRepositoryList } from "../../components/github-repository-list";
import { ConnectedSearchGitHubRepository } from "../../components/search-github-repository";

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
        <ConnectedSearchGitHubRepository />
        <ConnectedGitHubRepositoryList />
      </div>
    );
  }
);

export default GitHubRepository;
