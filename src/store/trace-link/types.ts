import { ITraceLinkMatrix, ITraceLink } from "./../../types/index";
export const FETCH_REPO_TRACE_LINK = "FETCH_REPO_TRACE_LINK";
export const FETCH_REPO_TRACE_LINK_SUCCESS = "FETCH_REPO_TRACE_LINK_SUCCESS";
export const FETCH_REPO_TRACE_LINK_FAILURE = "FETCH_REPO_TRACE_LINK_FAILURE";

export const GENERATE_INIT_TRACE_LINK = "GENERATE_INIT_TRACE_LINK";
export const GENERATE_INIT_TRACE_LINK_SUCCESS =
  "GENERATE_INIT_TRACE_LINK_SUCCESS";
export const GENERATE_INTI_TRACE_LINK_FAILURE =
  "GENERATE_INIT_TRACE_LINK_FAILURE";

export const UPDATE_INIT_TRACE_LINK = "UPDATE_INIT_TRACE_LINK";

export const TOGGLE_INIT_TRACE_LINK_EDIT_MODAL =
  "TOGGLE_INIT_TRACE_LINK_EDIT_MODAL";

export const CONFIRM_INIT_TRACE_LINK = "CONFIRM_INIT_TRACE_LINK";

export const SEND_INIT_TRACE_LINK = "SEND_INIT_TRACE_LINK";
export const SEND_INIT_TRACE_LINK_SUCCESS = "SEND_INIT_TRACE_LINK_SUCCESS";
export const SEND_INIT_TRACE_LINK_FAILURE = "SEND_INIT_TRACE_LINK_FAILURE";

export const FETCH_COMMIT_RELATED_TRACE_LINK =
  "FETCH_COMMIT_RELATED_TRACE_LINK";
export const FETCH_COMMIT_RELATED_TRACE_LINK_SUCCESS =
  "FETCH_COMMIT_RELATED_TRACE_LINK_SUCCESS";
export const FETCH_COMMIT_RELATED_TRACE_LINK_FAILURE =
  "FETCH_COMMIT_RELATED_TRACE_LINK_FAILURE";

export const FETCH_FILE_RELATED_TRACE_LINK = "FETCH_FILE_RELATED_TRACE_LINK";
export const FETCH_FILE_RELATED_TRACE_LINK_SUCCESS =
  "FETCH_FILE_RELATED_TRACE_LINK_SUCCESS";
export const FETCH_FILE_RELATED_TRACE_LINK_FAILURE =
  "FETCH_FILE_RELATED_TRACE_LINK_FAILURE";

export const FETCH_REQUIREMENT_RELATED_TRACE_LINK =
  "FETCH_REQUIREMENT_RELATED_TRACE_LINK";
export const FETCH_REQUIREMENT_RELATED_TRACE_LINK_SUCCESS =
  "FETCH_REQUIREMENT_RELATED_TRACE_LINK_SUCCESS";
export const FETCH_REQUIREMENT_RELATED_TRACE_LINK_FAILURE =
  "FETCH_REQUIREMENT_RELATED_TRACE_LINK_FAILURE";

export interface IFetchRequirementRelatedTraceLinkAction {
  type: typeof FETCH_REQUIREMENT_RELATED_TRACE_LINK;
}

export interface IFetchRequirementRelatedTraceLinkSuccessAction {
  type: typeof FETCH_REQUIREMENT_RELATED_TRACE_LINK_SUCCESS;
  payload: ITraceLink[];
}

export interface IFetchRequirementRelatedTraceLinkFailureAction {
  type: typeof FETCH_REQUIREMENT_RELATED_TRACE_LINK_FAILURE;
}

export interface IFetchFileRelatedTraceLinkAction {
  type: typeof FETCH_FILE_RELATED_TRACE_LINK;
}

export interface IFetchFileRelatedTraceLinkSuccessAction {
  type: typeof FETCH_FILE_RELATED_TRACE_LINK_SUCCESS;
  payload: ITraceLink[];
}

export interface IFetchFileRelatedTraceLinkFailureAction {
  type: typeof FETCH_FILE_RELATED_TRACE_LINK_FAILURE;
}

export interface IFetchCommitRelatedTraceLinkAction {
  type: typeof FETCH_COMMIT_RELATED_TRACE_LINK;
}

export interface IFetchCommitRelatedTraceLinkSuccessAction {
  type: typeof FETCH_COMMIT_RELATED_TRACE_LINK_SUCCESS;
  payload: ICommitRelatedTraceLinks;
}

export interface IFetchCommitRelatedTraceLinkFailureAction {
  type: typeof FETCH_COMMIT_RELATED_TRACE_LINK_FAILURE;
}

export interface ISendInitTraceLinkAction {
  type: typeof SEND_INIT_TRACE_LINK;
}

export interface ISendInitTraceLinkSuccessAction {
  type: typeof SEND_INIT_TRACE_LINK_SUCCESS;
}

export interface ISendInitTraceLinkFailureAction {
  type: typeof SEND_INIT_TRACE_LINK_FAILURE;
  meta?: string;
}

export interface IConfirmInitTraceLinkAction {
  type: typeof CONFIRM_INIT_TRACE_LINK;
  payload: ITraceLinkMatrix;
}

export interface IUpdateInitTraceLinkAction {
  type: typeof UPDATE_INIT_TRACE_LINK;
  payload: ITraceLinkMatrix;
}

export interface IToggleInitTraceLinkEditModalAction {
  type: typeof TOGGLE_INIT_TRACE_LINK_EDIT_MODAL;
}

export interface IGenerateInitTraceLinkAction {
  type: typeof GENERATE_INIT_TRACE_LINK;
}

export interface IGenerateInitTraceLinkSuccessAction {
  type: typeof GENERATE_INIT_TRACE_LINK_SUCCESS;
  payload: ITraceLinkMatrix;
}

export interface IGenerateInitTraceLinkFailureAction {
  type: typeof GENERATE_INTI_TRACE_LINK_FAILURE;
}

export interface ICommitRelatedTraceLinks {
  added: { traceLinks: ITraceLink[] };
  removed: { traceLinks: ITraceLink[] };
}

export interface ITraceLinkState {
  loading: boolean;
  error?: boolean | any;
  initTraceLinkLoading: boolean;
  traceLinkMatrix?: ITraceLinkMatrix;
  initTraceLinkMartix?: ITraceLinkMatrix;
  initTraceLinkEditModalVisible: boolean;
  initTraceLinkConfirmed: boolean;

  commitRelatedTraceLinks: ICommitRelatedTraceLinks;
  fileRelatedTraceLinks: ITraceLink[];
  requirementRelatedTraceLinks: ITraceLink[];
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
  | IFetchRepoTraceLinkFailureAction
  | IGenerateInitTraceLinkAction
  | IGenerateInitTraceLinkSuccessAction
  | IGenerateInitTraceLinkFailureAction
  | IToggleInitTraceLinkEditModalAction
  | IUpdateInitTraceLinkAction
  | IConfirmInitTraceLinkAction
  | ISendInitTraceLinkAction
  | ISendInitTraceLinkSuccessAction
  | ISendInitTraceLinkFailureAction
  | IFetchCommitRelatedTraceLinkAction
  | IFetchCommitRelatedTraceLinkFailureAction
  | IFetchCommitRelatedTraceLinkSuccessAction
  | IFetchFileRelatedTraceLinkAction
  | IFetchFileRelatedTraceLinkSuccessAction
  | IFetchFileRelatedTraceLinkFailureAction
  | IFetchRequirementRelatedTraceLinkAction
  | IFetchRequirementRelatedTraceLinkSuccessAction
  | IFetchRequirementRelatedTraceLinkFailureAction;

export type TraceLinkActionTypes =
  | typeof FETCH_REPO_TRACE_LINK
  | typeof FETCH_REPO_TRACE_LINK_SUCCESS
  | typeof FETCH_REPO_TRACE_LINK_FAILURE
  | typeof GENERATE_INIT_TRACE_LINK
  | typeof GENERATE_INIT_TRACE_LINK_SUCCESS
  | typeof GENERATE_INTI_TRACE_LINK_FAILURE
  | typeof TOGGLE_INIT_TRACE_LINK_EDIT_MODAL
  | typeof UPDATE_INIT_TRACE_LINK
  | typeof CONFIRM_INIT_TRACE_LINK
  | typeof SEND_INIT_TRACE_LINK
  | typeof SEND_INIT_TRACE_LINK_SUCCESS
  | typeof SEND_INIT_TRACE_LINK_FAILURE
  | typeof FETCH_COMMIT_RELATED_TRACE_LINK
  | typeof FETCH_COMMIT_RELATED_TRACE_LINK_FAILURE
  | typeof FETCH_COMMIT_RELATED_TRACE_LINK_SUCCESS
  | typeof FETCH_FILE_RELATED_TRACE_LINK
  | typeof FETCH_FILE_RELATED_TRACE_LINK_SUCCESS
  | typeof FETCH_FILE_RELATED_TRACE_LINK_FAILURE
  | typeof FETCH_REQUIREMENT_RELATED_TRACE_LINK
  | typeof FETCH_REQUIREMENT_RELATED_TRACE_LINK_SUCCESS
  | typeof FETCH_REQUIREMENT_RELATED_TRACE_LINK_FAILURE;
