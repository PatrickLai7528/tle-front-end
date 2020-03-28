import React, { useEffect, FunctionComponent, memo } from "react";
import { IImportedRepository } from "../../types";

export interface IStateProps {
  repositoryList: IImportedRepository[];
}

export interface IDispatchProps {
  fetchImportedRepositoryList: () => void;
}

export interface IOwnProps {}

export interface IImportedRepositoryTabProps
  extends IStateProps,
    IDispatchProps,
    IOwnProps {}

const ImportedRepositoryTab: FunctionComponent<IImportedRepositoryTabProps> = memo(
  (props: IImportedRepositoryTabProps) => {
    const { fetchImportedRepositoryList } = props;
    useEffect(() => {
      fetchImportedRepositoryList();
    }, [fetchImportedRepositoryList]);
    console.log(props);
    return <div>FUCK YOU</div>;
  }
);

export default ImportedRepositoryTab;
