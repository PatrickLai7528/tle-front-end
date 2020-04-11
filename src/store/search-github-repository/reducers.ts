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
  searchHistory: []
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
      return {
        ...state,
        loading: false,
        searchResult: (action as ISearchGitHubRepositorySuccessAction).payload
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
