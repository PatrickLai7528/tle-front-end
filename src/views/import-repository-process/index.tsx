import {
  connect,
  MapDispatchToProps,
  MapStateToProps,
  batch
} from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import {
  startImportRepository,
  sendImportedRepository,
  stopImport
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
import {
  IImportedRepository,
  ITraceLinkMatrix,
  IRequirement
} from "../../types";
import { postRequirement } from "../../store/requirement/actions";
import { IGHRepositoryRes } from "../../types/github-api/repository";

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
    searchReducer: { searchResult },
    requirementReducer: { loading: postRequirementLoading },
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

  let repositoryRes: IGHRepositoryRes = rawRepositories.filter(
    repo => repo.id.toString() === id
  )[0];

  // use search resulte
  if (!repositoryRes) {
    repositoryRes = searchResult.filter(res => res.id.toString() === id)[0];
  }

  return {
    confirmImportLoading:
      sendImportedRepositoryLoading &&
      sendTraceLinkLoading &&
      postRequirementLoading,
    repositoryRes: repositoryRes,
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
    generateInitTraceLinkMatrix: (files, requirement) =>
      dispatch(generateInitialTraceLink(files, requirement)),
    toggleInitTraceLinkModal: () => dispatch(toggleInitTraceLinkModal()),
    stopImport: () => dispatch(stopImport()),
    confirmImport: (
      repo: IImportedRepository,
      requirement: IRequirement,
      matrix: ITraceLinkMatrix
    ) =>
      batch(() => {
        dispatch(sendImportedRepository(repo));
        dispatch(postRequirement(requirement));
        dispatch(sendInitTraceLink(matrix));
      })
  };
};

export const ConnectedImportRepositoryProcess = connect(
  mapStateToProps,
  mapDispatchToProps
)(ImportRepositoryProcess);
