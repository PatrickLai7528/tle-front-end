import { Spin } from "antd";
import React, { FunctionComponent, memo, useEffect } from "react";
import { createUseStyles } from "react-jss";
import { IImportedRepository } from "../../types";
import { RepositoryCard } from "../repository-card";

export interface IStateProps {
  repositoryList: IImportedRepository[];
  loading: boolean;
}

export interface IDispatchProps {
  fetchImportedRepositoryList: () => void;
}

export interface IOwnProps {}

export interface IImportedRepositoryProps
  extends IStateProps,
    IDispatchProps,
    IOwnProps {}

const useStyles = createUseStyles({
  importedRepository: {
    width: "100%",
    minHeight: "100vh"
  },
  repoCardList: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start"
  }
});

const ImportedRepository: FunctionComponent<IImportedRepositoryProps> = memo(
  (props: IImportedRepositoryProps) => {
    const { loading, fetchImportedRepositoryList, repositoryList } = props;
    const styles = useStyles();
    useEffect(() => {
      fetchImportedRepositoryList();
    }, [fetchImportedRepositoryList]);

    return (
      <Spin spinning={loading}>
        <div className={styles.importedRepository}>
          <div className={styles.repoCardList}>
            {repositoryList.map(repo => {
              return <RepositoryCard repo={repo} key={repo.name} />;
            })}
          </div>
        </div>
      </Spin>
    );
  }
);

export default ImportedRepository;
