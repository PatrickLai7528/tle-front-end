import { GitHubAPIRepositoriesResponse } from "./../../types/index";

export const SEARCH_GITHUB_REPOSITORY = "SEARCH_GITHUB_REPOSITORY";
export const SAERCH_GITHUB_REPOSITORY_SUCCESS =
  "SEARCH_GITHUB_REPOSITORY_SUCCESS";
export const SEARCH_GITHUB_REPOSITORY_FAILURE =
  "SEARCH_GITHUB_REPOSITORY_FAILURE";

export interface ISearchRepositoryState {
  error?: boolean | string;
  loading?: boolean;
  searchResult?: GitHubAPIRepositoriesResponse;
  searchHistory: string[];
}

export interface ISearchGitHubRepositoryAction {
  type: typeof SEARCH_GITHUB_REPOSITORY;
}

export interface ISearchGitHubRepositorySuccessAction {
  type: typeof SAERCH_GITHUB_REPOSITORY_SUCCESS;
  payload: GitHubAPIRepositoriesResponse;
}

export interface ISearchGitHubRepositoryFailureAction {
  type: typeof SEARCH_GITHUB_REPOSITORY_FAILURE;
}

export type SearchRepositoryActions =
  | ISearchGitHubRepositoryAction
  | ISearchGitHubRepositorySuccessAction
  | ISearchGitHubRepositoryFailureAction;

export type SearchRepositoryActionTypes =
  | typeof SEARCH_GITHUB_REPOSITORY
  | typeof SAERCH_GITHUB_REPOSITORY_SUCCESS
  | typeof SEARCH_GITHUB_REPOSITORY_FAILURE;
