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
        <Row className={styles.importedRepository} gutter={[16, 16]}>
          {repositoryList.map(repo => {
            return (
              <Col key={repo.name} span={8}>
                <RepositoryCard
                  repo={repo}
                  detailLink={RouteConstants.REPOSITORY_DETAIL(repo.name)}
                />
              </Col>
            );
          })}
        </Row>
      </Spin>
    );
  }
);

export default ImportedRepositoryTab;
