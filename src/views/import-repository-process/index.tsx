import { connect, MapDispatchToProps, MapStateToProps } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { startImportRepository } from "../../store/import-repository/action";
import { ImportRepositoryAcitons } from "../../store/import-repository/types";
import { RootState } from "../../store/reducers";
import ImportRepositoryProcess, {
  IDispatchProps,
  IOwnProps,
  IStateProps
} from "./import-repository-process";

const mapStateToProps: MapStateToProps<IStateProps, IOwnProps, RootState> = (
  state: RootState,
  ownProps: IOwnProps
) => {
  const {
    importRepositoryReducer: { importProccess, importDone, importedRepository },
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
    importedRepostiroy: importedRepository || {},
    importDone: !!importDone
  };
};

const mapDispatchToProps: MapDispatchToProps<IDispatchProps, IOwnProps> = (
  dispatch: ThunkDispatch<RootState, any, ImportRepositoryAcitons>
) => {
  return {
    startImport: repoRes => dispatch(startImportRepository(repoRes))
    // cloneBranches: () => dispatch(cloneBranches()),
    // cloneCommits: () => dispatch(cloneCommits()),
    // cloneFileStructure: () => dispatch(cloneFileStructure()),
    // cloneFileContent: () => dispatch(cloneFileContent()),
    // finishImport: () => dispatch({ type: "IMPORT_REPOSITORY_SUCCESS" })
  };
};

export const ConnectedImportRepositoryProcess = connect(
  mapStateToProps,
  mapDispatchToProps
)(ImportRepositoryProcess);
