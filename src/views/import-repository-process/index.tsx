import {
  connect,
  MapDispatchToProps,
  MapStateToProps,
  batch
} from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import {
  startImportRepository,
  sendImportedRepository
} from "../../store/import-repository/action";
import { ImportRepositoryAcitons } from "../../store/import-repository/types";
import { RootState } from "../../store/reducers";
import { RequirementActions } from "../../store/requirement/types";
import ImportRepositoryProcess, {
  IDispatchProps,
  IOwnProps,
  IStateProps
} from "./import-repository-process";
import {
  generateInitialTraceLink,
  toggleInitTraceLinkModal,
  sendInitTraceLink
} from "../../store/trace-link/actions";
import { TraceLinkActions } from "../../store/trace-link/types";
import { IImportedRepository, ITraceLinkMatrix } from "../../types";

const mapStateToProps: MapStateToProps<IStateProps, IOwnProps, RootState> = (
  state: RootState,
  ownProps: IOwnProps
) => {
  const {
    importRepositoryReducer: {
      importProccess,
      importDone,
      importedRepository,
      loading: sendImportedRepositoryLoading
    },
    repositoryManagementReducer: { rawRepositories },
    traceLinkReducer: {
      loading: sendTraceLinkLoading,
      initTraceLinkLoading,
      initTraceLinkMartix,
      initTraceLinkConfirmed
    }
  } = state;

  const {
    match: {
      params: { id }
    }
  } = ownProps;

  return {
    confirmImportLoading: sendImportedRepositoryLoading && sendTraceLinkLoading,
    repositoryRes: rawRepositories.filter(repo => repo.id.toString() === id)[0],
    importProccess,
    importedRepostiroy: importedRepository || {},
    importDone: !!importDone,
    genInitTraceLinkLoading: initTraceLinkLoading,
    initTraceLinkMatrix: initTraceLinkMartix,
    initTraceLinkConfirmed: initTraceLinkConfirmed
  };
};

const mapDispatchToProps: MapDispatchToProps<IDispatchProps, IOwnProps> = (
  dispatch: ThunkDispatch<
    RootState,
    any,
    ImportRepositoryAcitons | RequirementActions | TraceLinkActions
  >
) => {
  return {
    startImport: repoRes => dispatch(startImportRepository(repoRes)),
    generateInitTraceLinkMatrix: requirement =>
      dispatch(generateInitialTraceLink(requirement)),
    toggleInitTraceLinkModal: () => dispatch(toggleInitTraceLinkModal()),
    confirmImport: (repo: IImportedRepository, matrix: ITraceLinkMatrix) =>
      batch(() => {
        dispatch(sendImportedRepository(repo));
        dispatch(sendInitTraceLink(matrix));
      })
  };
};

export const ConnectedImportRepositoryProcess = connect(
  mapStateToProps,
  mapDispatchToProps
)(ImportRepositoryProcess);
