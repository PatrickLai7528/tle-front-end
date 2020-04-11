import RepositoryList, {
  IStateProps,
  IDispatchProps,
  IOwnProps
} from "./github-repository-list";
import { MapStateToProps, connect, MapDispatchToProps } from "react-redux";
import { RootState } from "../../store/reducers";
import { loadMoreRepository } from "../../store/repository-management/action";
import { ThunkDispatch } from "redux-thunk";
import { ImportRepositoryAcitons } from "../../store/import-repository/types";

const mapStateToProps: MapStateToProps<
  IStateProps,
  IOwnProps,
  RootState
> = state => {
  return {
    loading: !!state.searchReducer.loading,
    // loadMoreTimes: state.repositoryManagementReducer.loadMoreTimes,
    repositoryList: state.searchReducer.searchResult
  };
};

const mapDispatchToProps: MapDispatchToProps<IDispatchProps, IOwnProps> = (
  dispatch: ThunkDispatch<RootState, any, ImportRepositoryAcitons>
) => {
  return {
    // loadMoreRepositories: loadMoreTimes =>
    // 	dispatch(loadMoreRepository(loadMoreTimes))
  };
};

export const ConnectedGitHubRepositoryList = connect(
  mapStateToProps,
  mapDispatchToProps
)(RepositoryList);
