import {
  GitHubAPIRepositoryResponse,
  IImportedRepository
} from "./../../types/index";
export const FETCH_REPOSITORY_FROM_GITHUB = "FETCH_REPOSITORY_FROM_GITHUB";
export const FETCH_REPOSITORY_FROM_GITHUB_SUCCESS =
  "FETCH_REPOSITORY_FROM_GITHUB_SUCCESS";
export const FETCH_REPOSITORY_FROM_GITHUB_FAILRUE =
  "FETCH_REPOSITORY_FROM_GITHUB_FAILURE";

export const LOAD_MORE_REPOSITORY = "LOAD_MORE_REPOSITORY";
export const LOAD_MORE_REPOSITORY_SUCCESS = "LOAD_MORE_REPOSITORY_SUCCESS";
export const LOAD_MORE_REPOSITORY_FAILURE = "LOAD_MORE_REPOSITORY_FAILURE";

export const FETCH_IMPORTED_REPOSITORY_LIST = "FETCH_IMPORTED_REPOSITORY_LIST";
export const FETCH_IMPORTED_REPOSITORY_LIST_SUCCESS =
  "FETCH_IMPORTED_REPOSITORY_LIST_SUCCESS";
export const FETCH_IMPORTED_REPOSITORY_LIST_FAILURE =
  "FETCH_IMPORTED_REPOSITORY_LIST_FAILURE";

export interface IRepositoryManagementState {
  loading?: boolean;
  error?: boolean | string;
  rawRepositories: GitHubAPIRepositoryResponse[];
  loadMoreTimes: number;
  importedRepositoryList: IImportedRepository[];
}

export interface IFetchImportedRepositoryAction {
  type: typeof FETCH_IMPORTED_REPOSITORY_LIST;
}

export interface IFetchImportedRepositorySuccessAction {
  type: typeof FETCH_IMPORTED_REPOSITORY_LIST_SUCCESS;
  payload: IImportedRepository[];
}

export interface IFetchImportedRepositoryFailureAction {
  type: typeof FETCH_IMPORTED_REPOSITORY_LIST_FAILURE;
}

export interface IFetchRepositoryFromGitHubAction {
  type: typeof FETCH_REPOSITORY_FROM_GITHUB;
}

export interface IFetchRepositoryFromGitHubSuccessAction {
  type: typeof FETCH_REPOSITORY_FROM_GITHUB_SUCCESS;
  payload: GitHubAPIRepositoryResponse[];
}

export interface IFetchRepositoryFromGitHubFailureAction {
  type: typeof FETCH_REPOSITORY_FROM_GITHUB_FAILRUE;
  meta: string;
}

export interface ILoadMoreRepositoryAction {
  type: typeof LOAD_MORE_REPOSITORY;
}

export interface ILoadMoreRepositorySuccessAction {
  type: typeof LOAD_MORE_REPOSITORY_SUCCESS;
  payload: any[];
}

export interface ILoadMoreRepositoryFailureAction {
  type: typeof LOAD_MORE_REPOSITORY_FAILURE;
  meta: string;
}

export type RepositoryManagementActions =
  | IFetchRepositoryFromGitHubAction
  | IFetchRepositoryFromGitHubSuccessAction
  | IFetchRepositoryFromGitHubFailureAction
  | ILoadMoreRepositoryAction
  | ILoadMoreRepositorySuccessAction
  | ILoadMoreRepositoryFailureAction
  | IFetchImportedRepositoryAction
  | IFetchImportedRepositorySuccessAction
  | IFetchImportedRepositoryFailureAction;

export type RepositoryManagementActionTypes =
  | typeof FETCH_REPOSITORY_FROM_GITHUB
  | typeof FETCH_REPOSITORY_FROM_GITHUB_SUCCESS
  | typeof FETCH_REPOSITORY_FROM_GITHUB_FAILRUE
  | typeof LOAD_MORE_REPOSITORY
  | typeof LOAD_MORE_REPOSITORY_SUCCESS
  | typeof LOAD_MORE_REPOSITORY_FAILURE
  | typeof FETCH_IMPORTED_REPOSITORY_LIST
  | typeof FETCH_IMPORTED_REPOSITORY_LIST_FAILURE
  | typeof FETCH_IMPORTED_REPOSITORY_LIST_SUCCESS;
