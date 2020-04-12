import { IGHRepositoryRes } from "./../../types/github-api/repository";
import { IImportedRepository, IRecentRepo } from "./../../types/index";
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

export const FETCH_IMPORTED_REPOSITORY_DETAIL =
  "FETCH_IMPORTED_REPOSITORY_DETAIL";
export const FETCH_IMPORTED_REPOSITORY_DETAIL_SUCCESS =
  "FETCH_IMPORTED_REPOSITORY_DETAIL_SUCCESS";
export const FETCH_IMPORTED_REPOSITORY_DETAIL_FAILURE =
  "FETCH_IMPORTED_REPOSITORY_DETAIL_FAILURE";

export const FETCH_RECENT_REPOSITORY = "FETCH_RECENT_REPOSITORY";
export const FETCH_RECENT_REPOSITORY_SUCCESS =
  "FETCH_RECENT_REPOSITORY_SUCCESS";
export const FETCH_RECENT_REPOSITORY_FAILURE =
  "FETCH_RECENT_REPOSITORY_FAILURE";

export interface IRepositoryManagementState {
  loading?: boolean;
  error?: boolean | string;
  rawRepositories: IGHRepositoryRes[];
  loadMoreTimes: number;
  importedRepositoryList: IImportedRepository[];
  importedRepositoryDetail?: IImportedRepository;
  recentRepos: IRecentRepo[];
}

export interface IFetchRecentRepositoryAction {
  type: typeof FETCH_RECENT_REPOSITORY;
}

export interface IFetchRecentRepositorySuccessAction {
  type: typeof FETCH_RECENT_REPOSITORY_SUCCESS;
  payload: IRecentRepo[];
}

export interface IFetchRecentRepositoryFailureAction {
  type: typeof FETCH_RECENT_REPOSITORY_FAILURE;
}

export interface IFetchImportedRepositoryDetailAction {
  type: typeof FETCH_IMPORTED_REPOSITORY_DETAIL;
}

export interface IFetchImportedRepositoryDetailSuccessAction {
  type: typeof FETCH_IMPORTED_REPOSITORY_DETAIL_SUCCESS;
  payload: IImportedRepository;
}

export interface IFetchImportedRepositoryDetailFailureAction {
  type: typeof FETCH_IMPORTED_REPOSITORY_DETAIL_FAILURE;
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
  payload: IGHRepositoryRes[];
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
  | IFetchImportedRepositoryFailureAction
  | IFetchImportedRepositoryDetailAction
  | IFetchImportedRepositoryDetailSuccessAction
  | IFetchImportedRepositoryDetailFailureAction
  | IFetchRecentRepositoryAction
  | IFetchRecentRepositorySuccessAction
  | IFetchRecentRepositoryFailureAction;

export type RepositoryManagementActionTypes =
  | typeof FETCH_REPOSITORY_FROM_GITHUB
  | typeof FETCH_REPOSITORY_FROM_GITHUB_SUCCESS
  | typeof FETCH_REPOSITORY_FROM_GITHUB_FAILRUE
  | typeof LOAD_MORE_REPOSITORY
  | typeof LOAD_MORE_REPOSITORY_SUCCESS
  | typeof LOAD_MORE_REPOSITORY_FAILURE
  | typeof FETCH_IMPORTED_REPOSITORY_LIST
  | typeof FETCH_IMPORTED_REPOSITORY_LIST_FAILURE
  | typeof FETCH_IMPORTED_REPOSITORY_LIST_SUCCESS
  | typeof FETCH_IMPORTED_REPOSITORY_DETAIL
  | typeof FETCH_IMPORTED_REPOSITORY_DETAIL_SUCCESS
  | typeof FETCH_IMPORTED_REPOSITORY_DETAIL_FAILURE
  | typeof FETCH_RECENT_REPOSITORY
  | typeof FETCH_RECENT_REPOSITORY_SUCCESS
  | typeof FETCH_RECENT_REPOSITORY_FAILURE;
