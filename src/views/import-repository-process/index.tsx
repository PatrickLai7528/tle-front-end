import { MapStateToProps, MapDispatchToProps, connect } from "react-redux";
import { RootState } from "../../store/reducers";
import { ThunkDispatch } from "redux-thunk";
import { ImportRepositoryAcitons } from "../../store/import-repository/types";
import {
  cloneBranches,
  cloneCommits,
  cloneFileStructure,
  cloneFileContent,
  startImportRepository
} from "../../store/import-repository/action";
import ImportRepositoryProcess, {
  IStateProps,
  IDispatchProps,
  IOwnProps
} from "./import-repository-process";

const mapStateToProps: MapStateToProps<IStateProps, IOwnProps, RootState> = (
  state: RootState,
  ownProps: IOwnProps
) => {
  const {
    importRepositoryReducer: {
      importProccess,
      branches,
      files,
      commits,
      shaContentMap,
      importDone
    },
    repositoryManagementReducer: { rawRepositories }
  } = state;

  const {
    match: {
      params: { id }
    }
  } = ownProps;

  return {
    repositoryRes: rawRepositories.filter(repo => repo.id.toString() === id)[0],
    importProccess,
    branches,
    files,
    commits,
    shaContentMap,
    importDone: !!importDone
  };
};

const mapDispatchToProps: MapDispatchToProps<IDispatchProps, IOwnProps> = (
  dispatch: ThunkDispatch<RootState, any, ImportRepositoryAcitons>
) => {
  return {
    startImport: repoRes => dispatch(startImportRepository(repoRes)),
    cloneBranches: () => dispatch(cloneBranches()),
    cloneCommits: () => dispatch(cloneCommits()),
    cloneFileStructure: () => dispatch(cloneFileStructure()),
    cloneFileContent: () => dispatch(cloneFileContent()),
    finishImport: () => dispatch({ type: "IMPORT_REPOSITORY_SUCCESS" })
  };
};

export const ConnectedImportRepositoryProcess = connect(
  mapStateToProps,
  mapDispatchToProps
)(ImportRepositoryProcess);
