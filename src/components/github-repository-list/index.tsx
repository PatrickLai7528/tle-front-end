import { connect, MapStateToProps } from "react-redux";
import { RootState } from "../../store/reducers";
import RepositoryList, {
  IOwnProps,
  IStateProps
} from "./github-repository-list";

const mapStateToProps: MapStateToProps<
  IStateProps,
  IOwnProps,
  RootState
> = state => {
  const {
    searchReducer: { searchResult, loading: searchLoading }
  } = state;
  const {
    repositoryManagementReducer: { rawRepositories, loading: repoListLoading }
  } = state;
  return {
    loading: !!searchLoading || !!repoListLoading,
    repositoryList:
      searchResult && searchResult.length !== 0 ? searchResult : rawRepositories
  };
};

export const ConnectedGitHubRepositoryList = connect(mapStateToProps)(
  RepositoryList
);
