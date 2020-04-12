import React, { useEffect, FunctionComponent, memo } from "react";
import { IImportedRepository } from "../../types";
import { createUseStyles } from "react-jss";
import { RepositoryCard } from "../repository-card";
import { Row, Col, Spin } from "antd";
import { RouteConstants } from "../../routes/constants";

export interface IStateProps {
  repositoryList: IImportedRepository[];
  loading: boolean;
}

export interface IDispatchProps {
  fetchImportedRepositoryList: () => void;
}

export interface IOwnProps {}

export interface IImportedRepositoryTabProps
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

const ImportedRepositoryTab: FunctionComponent<IImportedRepositoryTabProps> = memo(
  (props: IImportedRepositoryTabProps) => {
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

export default ImportedRepositoryTab;
