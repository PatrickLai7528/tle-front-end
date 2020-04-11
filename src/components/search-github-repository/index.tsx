import { connect, MapDispatchToProps, MapStateToProps } from "react-redux";
import { RootState } from "../../store/reducers";
import { searchGitHubRepository } from "../../store/search-github-repository/actions";
import { SearchRepositoryActions } from "../../store/search-github-repository/types";
import { AppDispatch } from "../../store/store";
import SearchGitHubrepository, {
  IDispatchProps,
  IOwnProps,
  IStateProps
} from "./search-github-repository";

export const mapStateToProps: MapStateToProps<
  IStateProps,
  IOwnProps,
  RootState
> = state => {
  return {
    loading: !!state.searchReducer.loading
  };
};

export const mapDispatchToProps: MapDispatchToProps<
  IDispatchProps,
  IOwnProps
> = (dispatch: AppDispatch<SearchRepositoryActions>) => {
  return {
    doSearch: (str: string) => dispatch(searchGitHubRepository(str))
  };
};

export const ConnectedSearchGitHubRepository = connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchGitHubrepository);
