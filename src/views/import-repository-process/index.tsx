import {
  batch,
  connect,
  MapDispatchToProps,
  MapStateToProps
} from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { RouteConstants } from "../../routes/constants";
import {
  sendImportedRepository,
  startImportRepository,
  stopImport
} from "../../store/import-repository/action";
import { ImportRepositoryAcitons } from "../../store/import-repository/types";
import { pushNotification } from "../../store/notification/actions";
import { NotificationActions } from "../../store/notification/types";
import { RootState } from "../../store/reducers";
import { postRequirement } from "../../store/requirement/actions";
import { RequirementActions } from "../../store/requirement/types";
import { sendInitTraceLink } from "../../store/trace-link/actions";
import { TraceLinkActions } from "../../store/trace-link/types";
import {
  IImportedRepository,
  IRequirement,
  ITraceLinkMatrix
} from "../../types";
import { IGHRepositoryRes } from "../../types/github-api/repository";
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
    importRepositoryReducer: {
      importProccess,
      importDone,
      importedRepository,
      loading: sendImportedRepositoryLoading
    },
    repositoryReducer: { rawRepositories },
    searchReducer: { searchResult },
    requirementReducer: { loading: postRequirementLoading },
    traceLinkReducer: {
      loading: sendTraceLinkLoading,
      initTraceLinkConfirmed,
      initTraceLinkMartix
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
    importedRepostiroy: importedRepository,
    importDone: !!importDone,
    initTraceLinkMatrix: initTraceLinkMartix,
    initTraceLinkConfirmed: initTraceLinkConfirmed
  };
};

const mapDispatchToProps: MapDispatchToProps<IDispatchProps, IOwnProps> = (
  dispatch: ThunkDispatch<
    RootState,
    any,
    | ImportRepositoryAcitons
    | RequirementActions
    | TraceLinkActions
    | NotificationActions
  >,
  ownProps: IOwnProps
) => {
  return {
    startImport: repoRes => dispatch(startImportRepository(repoRes)),
    stopImport: () => dispatch(stopImport()),
    confirmImport: (
      repo: Omit<IImportedRepository, "_id">,
      requirement: Omit<IRequirement, "_id">,
      matrix: Omit<ITraceLinkMatrix, "_id">
    ) =>
      batch(async () => {
        await dispatch(sendImportedRepository(repo));
        await dispatch(postRequirement(requirement));
        await dispatch(sendInitTraceLink(matrix));
        dispatch(
          pushNotification({
            title: "導入成功",
            duration: 4.5,
            messageOrNotification: "message",
            type: "success"
          })
        );
        ownProps.history.push(RouteConstants.REPOSITORY);
      })
  };
};

export const ConnectedImportRepositoryProcess = connect(
  mapStateToProps,
  mapDispatchToProps
)(ImportRepositoryProcess);
