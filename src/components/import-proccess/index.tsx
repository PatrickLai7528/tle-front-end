import { MapStateToProps, MapDispatchToProps, connect } from "react-redux";
import { IStateProps, IOwnProps, IDispatchProps } from "./import-proccess";
import { RootState } from "../../store/reducers";
import ImportProccess from "./import-proccess";
import { ThunkDispatch } from "redux-thunk";
import { ImportRepositoryAcitons } from "../../store/import-repository/types";
import {
  cloneBranches,
  cloneCommits,
  cloneFileStructure,
  cloneFileContent
} from "../../store/import-repository/action";

const mapStateToProps: MapStateToProps<IStateProps, IOwnProps, RootState> = (
  state: RootState
) => {
  return {
    repository: state.importRepositoryReducer.importedRepository,
    importProccess: state.importRepositoryReducer.importProccess,
    branches: state.importRepositoryReducer.branches,
    files: state.importRepositoryReducer.files,
    commits: state.importRepositoryReducer.commits,
    shaContentMap: state.importRepositoryReducer.shaContentMap,
    importDone: !!state.importRepositoryReducer.importDone
  };
};

const mapDispatchToProps: MapDispatchToProps<IDispatchProps, IOwnProps> = (
  dispatch: ThunkDispatch<RootState, any, ImportRepositoryAcitons>
) => {
  return {
    cloneBranches: () => dispatch(cloneBranches()),
    cloneCommits: () => dispatch(cloneCommits()),
    cloneFileStructure: () => dispatch(cloneFileStructure()),
    cloneFileContent: () => dispatch(cloneFileContent()),
    finishImport: () => dispatch({ type: "IMPORT_REPOSITORY_SUCCESS" })
  };
};

export const ConnectedImportProccess = connect(
  mapStateToProps,
  mapDispatchToProps
)(ImportProccess);
