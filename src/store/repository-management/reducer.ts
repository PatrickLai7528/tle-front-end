import {
  ILoadMoreRepositorySuccessAction,
  IRepositoryManagementState,
  RepositoryManagementActions,
  IFetchRepositoryFromGitHubSuccessAction,
  IFetchImportedRepositorySuccessAction
} from "./types";

const initialState: IRepositoryManagementState = {
  rawRepositories: [],
  loadMoreTimes: 0,
  importedRepositoryList: []
};

export const repositoryManagementReducer = (
  state = initialState,
  action: RepositoryManagementActions
): IRepositoryManagementState => {
  switch (action.type) {
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
        loading: true
      };
    case "FETCH_REPOSITORY_FROM_GITHUB_SUCCESS":
      return {
        ...state,
        loading: false,
        rawRepositories: (action as IFetchRepositoryFromGitHubSuccessAction)
          .payload
      };
    case "FETCH_REPOSITORY_FROM_GITHUB_FAILURE":
      return {
        ...state,
        loading: false,
        error: true
      };
    case "LOAD_MORE_REPOSITORY":
      return {
        ...state,
        loading: true
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
