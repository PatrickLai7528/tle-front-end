import {
  ISearchGitHubRepositorySuccessAction,
  ISearchRepositoryState,
  SAERCH_GITHUB_REPOSITORY_SUCCESS,
  SearchRepositoryActions,
  SEARCH_GITHUB_REPOSITORY,
  SEARCH_GITHUB_REPOSITORY_FAILURE
} from "./types";

const initialState: ISearchRepositoryState = {
  loading: false,
  searchHistory: [],
  searchResult: []
};

export const searchReducer = (
  state = initialState,
  action: SearchRepositoryActions
): ISearchRepositoryState => {
  switch (action.type) {
    case SEARCH_GITHUB_REPOSITORY:
      return {
        ...state,
        loading: true
      };
    case SAERCH_GITHUB_REPOSITORY_SUCCESS:
      const {
        res,
        searchStr
      } = (action as ISearchGitHubRepositorySuccessAction).payload;
      const oldRes = state.searchResult;
      const history = state.searchHistory;
      history.pop();
      history.push({ query: searchStr, res: oldRes });
      return {
        ...state,
        loading: false,
        searchResult: res,
        searchHistory: history
      };
    case SEARCH_GITHUB_REPOSITORY_FAILURE:
      return {
        ...state,
        loading: false,
        error: true
      };
    default:
      return { ...state };
  }
};
