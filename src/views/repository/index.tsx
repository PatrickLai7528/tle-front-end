import { connect, MapDispatchToProps, MapStateToProps } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { ImportRepositoryAcitons } from "../../store/import-repository/types";
import { RootState } from "../../store/reducers";
import { RepositoryManagementActions } from "../../store/repository/types";
import Repository, {
  IDispatchProps,
  IOwnProps,
  IStateProps
} from "./repository";
import {
  fetchAllRepositoryFromGitHub,
  loadMoreRepository
} from "../../store/repository/action";
import { IGHRepositoryRes } from "../../types/github-api/repository";
import { startImportRepository } from "../../store/import-repository/action";

const mapStateToProps: MapStateToProps<IStateProps, IOwnProps, RootState> = (
  state: RootState
) => {
  return {
    gitHubAccessToken: state.authReducer.gitHubAccessToken,
    rawRepositories: state.repositoryManagementReducer.rawRepositories,
    loadMoreTimes: state.repositoryManagementReducer.loadMoreTimes,
    importDone: state.importRepositoryReducer.importDone,
    importStarted: state.importRepositoryReducer.importStarted,
    importProcess: state.importRepositoryReducer.importProccess
  };
};

const mapDispatchToProps: MapDispatchToProps<IDispatchProps, IOwnProps> = (
  dispatch: ThunkDispatch<
    RootState,
    any,
    RepositoryManagementActions | ImportRepositoryAcitons
  >
) => {
  return {
    fetchAllRepositories: () => dispatch(fetchAllRepositoryFromGitHub()),
    loadMoreRepositories: loadMoreTimes =>
      dispatch(loadMoreRepository(loadMoreTimes)),
    startImportRepository: (ghRepoRes: IGHRepositoryRes) =>
      dispatch(startImportRepository(ghRepoRes))
  };
};

export const RepositoryView = connect(
  mapStateToProps,
  mapDispatchToProps
)(Repository);
