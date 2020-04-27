import {
  ILoadMoreRepositorySuccessAction,
  IRepositoryManagementState,
  RepositoryManagementActions,
  IFetchRepositoryFromGitHubSuccessAction,
  IFetchImportedRepositorySuccessAction,
  FETCH_IMPORTED_REPOSITORY_DETAIL,
  FETCH_IMPORTED_REPOSITORY_DETAIL_SUCCESS,
  FETCH_IMPORTED_REPOSITORY_DETAIL_FAILURE,
  FETCH_RECENT_REPOSITORY,
  IFetchRecentRepositorySuccessAction,
  FETCH_RECENT_REPOSITORY_SUCCESS,
  FETCH_RECENT_REPOSITORY_FAILURE
} from "./types";

const initialState: IRepositoryManagementState = {
  rawRepositories: [],
  loadMoreTimes: 0,
  importedRepositoryList: [],
  recentRepos: [],
  fetchGHRepoLoading: false
};

export const repositoryManagementReducer = (
  state = initialState,
  action: RepositoryManagementActions
): IRepositoryManagementState => {
  switch (action.type) {
    case FETCH_RECENT_REPOSITORY:
      return {
        ...state,
        loading: true,
        error: false
      };
    case FETCH_RECENT_REPOSITORY_SUCCESS:
      return {
        ...state,
        loading: false,
        recentRepos: (action as IFetchRecentRepositorySuccessAction).payload
      };
    case FETCH_RECENT_REPOSITORY_FAILURE:
      return {
        ...state,
        loading: false,
        error: true
      };
    case FETCH_IMPORTED_REPOSITORY_DETAIL:
      return {
        ...state,
        loading: true,
        error: false
      };
    case FETCH_IMPORTED_REPOSITORY_DETAIL_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        importedRepositoryDetail: action.payload
      };
    case FETCH_IMPORTED_REPOSITORY_DETAIL_FAILURE:
      return {
        ...state,
        loading: false,
        error: true
      };
    case "FETCH_IMPORTED_REPOSITORY_LIST":
      return {
        ...state,
        loading: true,
        error: false
      };
    case "FETCH_IMPORTED_REPOSITORY_LIST_SUCCESS":
      return {
        ...state,
        loading: false,
        importedRepositoryList: (action as IFetchImportedRepositorySuccessAction)
          .payload
      };
    case "FETCH_IMPORTED_REPOSITORY_LIST_FAILURE":
      return {
        ...state,
        loading: false,
        error: true
      };
    case "FETCH_REPOSITORY_FROM_GITHUB":
      return {
        ...state,
        fetchGHRepoLoading: true
      };
    case "FETCH_REPOSITORY_FROM_GITHUB_SUCCESS":
      return {
        ...state,
        fetchGHRepoLoading: false,
        rawRepositories: (action as IFetchRepositoryFromGitHubSuccessAction)
          .payload
      };
    case "FETCH_REPOSITORY_FROM_GITHUB_FAILURE":
      return {
        ...state,
        fetchGHRepoLoading: false,
        error: true
      };
    case "LOAD_MORE_REPOSITORY":
      return {
        ...state,
        loading: true,
        error: false
      };
    case "LOAD_MORE_REPOSITORY_SUCCESS":
      return {
        ...state,
        loading: false,
        loadMoreTimes: state.loadMoreTimes + 1,
        rawRepositories: [
          ...state.rawRepositories,
          ...(action as ILoadMoreRepositorySuccessAction).payload
        ]
      };
    case "LOAD_MORE_REPOSITORY_FAILURE":
      return {
        ...state,
        error: true,
        loading: false
      };
    default:
      return { ...state };
  }
};
