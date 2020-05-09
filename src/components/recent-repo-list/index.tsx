import { connect, MapDispatchToProps, MapStateToProps } from "react-redux";
import { RootState } from "../../store/reducers";
import { fetchRecentRepository } from "../../store/repository/action";
import { RepositoryManagementActions } from "../../store/repository/types";
import { AppDispatch } from "../../store/store";
import RecentRepoList, {
  IDispatchProps,
  IStateProps,
  IOwnProps
} from "./recent-repos-list";

const mapStateToProps: MapStateToProps<
  IStateProps,
  IOwnProps,
  RootState
> = state => {
  return {
    loading: !!state.repositoryManagementReducer.loading,
    repos: state.repositoryManagementReducer.recentRepos || []
  };
};

const mapDispatchToProps: MapDispatchToProps<IDispatchProps, IOwnProps> = (
  dispatch: AppDispatch<RepositoryManagementActions>
) => {
  return {
    fetchRecentRepos: () => dispatch(fetchRecentRepository())
  };
};

export const ConnectedRecentRepoList = connect(
  mapStateToProps,
  mapDispatchToProps
)(RecentRepoList);
