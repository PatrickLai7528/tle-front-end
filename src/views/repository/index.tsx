import { connect, MapDispatchToProps, MapStateToProps } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { ImportRepositoryAcitons } from "../../store/import-repository/types";
import { RootState } from "../../store/reducers";
import { RepositoryManagementActions } from "../../store/repository-management/types";
import Repository, {
  IDispatchProps,
  IOwnProps,
  IStateProps
} from "./repository";
import {
  fetchAllRepositoryFromGitHub,
  loadMoreRepository
} from "../../store/repository-management/action";

const mapStateToProps: MapStateToProps<IStateProps, IOwnProps, RootState> = (
  state: RootState
) => {
  return {
    gitHubAccessToken: state.authReducer.gitHubAccessToken,
    rawRepositories: state.repositoryManagementReducer.rawRepositories,
    loadMoreTimes: state.repositoryManagementReducer.loadMoreTimes
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
      dispatch(loadMoreRepository(loadMoreTimes))
  };
};

export const RepositoryView = connect(
  mapStateToProps,
  mapDispatchToProps
)(Repository);
