import RepositoryList, {
  IStateProps,
  IDispatchProps,
  IOwnProps
} from "./github-repository-list";
import { MapStateToProps, connect, MapDispatchToProps } from "react-redux";
import { RootState } from "../../store/reducers";
import { toggleImportProccessModal } from "../../store/import-repository/action";
import { loadMoreRepository } from "../../store/repository-management/action";
import { ThunkDispatch } from "redux-thunk";
import { RepositoryManagementActions } from "../../store/repository-management/types";
import { ImportRepositoryAcitons } from "../../store/import-repository/types";

const mapStateToProps: MapStateToProps<
  IStateProps,
  IOwnProps,
  RootState
> = state => {
  return {
    loading: !!state.repositoryManagementReducer.loading,
    loadMoreTimes: state.repositoryManagementReducer.loadMoreTimes,
    repositoryList: state.repositoryManagementReducer.rawRepositories
  };
};

const mapDispatchToProps: MapDispatchToProps<IDispatchProps, IOwnProps> = (
  dispatch: ThunkDispatch<RootState, any, ImportRepositoryAcitons>
) => {
  return {
    toggleModal: () => dispatch(toggleImportProccessModal()),
    loadMoreRepositories: loadMoreTimes =>
      dispatch(loadMoreRepository(loadMoreTimes))
  };
};

export const ConnectedGitHubRepositoryList = connect(
  mapStateToProps,
  mapDispatchToProps
)(RepositoryList);
