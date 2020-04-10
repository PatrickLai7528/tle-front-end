import { ITraceLinkMatrix } from "./../../types/index";
export const FETCH_REPO_TRACE_LINK = "FETCH_REPO_TRACE_LINK";
export const FETCH_REPO_TRACE_LINK_SUCCESS = "FETCH_REPO_TRACE_LINK_SUCCESS";
export const FETCH_REPO_TRACE_LINK_FAILURE = "FETCH_REPO_TRACE_LINK_FAILURE";

export interface ITraceLinkState {
  loading: boolean;
  error?: boolean | any;
  traceLinkMatrix?: ITraceLinkMatrix;
}

export interface IFetchRepoTraceLinkAction {
  type: typeof FETCH_REPO_TRACE_LINK;
}

export interface IFetchRepoTraceLinkSuccessAction {
  type: typeof FETCH_REPO_TRACE_LINK_SUCCESS;
  payload: ITraceLinkMatrix;
}

export interface IFetchRepoTraceLinkFailureAction {
  type: typeof FETCH_REPO_TRACE_LINK_FAILURE;
}

export type TraceLinkActions =
  | IFetchRepoTraceLinkAction
  | IFetchRepoTraceLinkSuccessAction
  | IFetchRepoTraceLinkFailureAction;

export type TraceLinkActionTypes =
  | typeof FETCH_REPO_TRACE_LINK
  | typeof FETCH_REPO_TRACE_LINK_SUCCESS
  | typeof FETCH_REPO_TRACE_LINK_FAILURE;
