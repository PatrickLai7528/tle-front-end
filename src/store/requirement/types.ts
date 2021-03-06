import { IRequirement, IDescriptionHistory } from "./../../types/index";
export const FETCH_REPO_REQUIREMENT = "FETCH_REPO_REQUIREMENT";
export const FETCH_REPO_REQUIREEMENT_SUCCESS = "FETCH_REPO_REQUIREMENT_SUCCESS";
export const FETCH_REPO_REQUIREMENT_FAILURE = "FETCH_REPO_REQUIREMENT_FAILURE";

export const ADD_REQUIREMENT = "ADD_REQUIREMENT";
export const ADD_REQUIREMENT_SUCCESS = "ADD_REQUIREMENT_SUCCESS";
export const ADD_REQUIREMENT_FAILURE = "ADD_REQUIREMENT_FAILURE";

export const POST_REQUIREMENT = "POST_REQUIREMENT";
export const POST_REQUIREMENT_SUCCESS = "POST_REQUIREMENT_SUCCESS";
export const POST_REQUIREMENT_FAILURE = "POST_REQUIREMENT_FAILURE";

export const UPDATE_REQUIREMENT = "UPDATE_REQUIREMENT";
export const UPDATE_REQUIREMENT_SUCCESS = "UPDATE_REQUIREMENT_SUCCESS";
export const UPDATE_REQUIREMENT_FAILURE = "UPDATE_REQUIREMENT_FAILURE";

export const DELETE_REQUIREMENT = "DELETE_REQUIREMENT";
export const DELETE_REQUIREMENT_SUCCESS = "DELETE_REQUIREMENT_SUCCESS";
export const DELETE_REQUIREMENT_FAILURE = "DELETE_REQUIREMENT_FAIULRE";

export const TOGGLE_ADD_REQUIREMENT_MODAL = "TOGGLE_ADD_REQUIREMENT_MODAL";

export const UPDATE_DESCRIPTION = "UPDATE_DESCRIPTION";
export const UPDATE_DESCRIPTION_SUCCESS = "UPDATE_DESCRIPTION_SUCCESS";
export const UPDATE_DESCRIPTION_FAILURE = "UPDATE_DESCRIPTION_FAILURE";

export const FETCH_DESCRIPTION_HISTORY = "FETCH_DESCRIPTION_HISTORY";
export const FETCH_DESCRIPTION_HISTORY_SUCCESS =
  "FETCH_DESCRIPTION_HISTORY_SUCCESS";
export const FETCH_DESCRIPTION_HISTORY_FAILURE =
  "FETCH_DESCRIPTION_HISTORY_FAILURE";

export interface IFetchDescriptionHistoryAction {
  type: typeof FETCH_DESCRIPTION_HISTORY;
}

export interface IFetchDescriptionHistorySuccessAction {
  type: typeof FETCH_DESCRIPTION_HISTORY_SUCCESS;
  payload: IDescriptionHistory[];
}

export interface IFetchDescriptionHistoryFailureAction {
  type: typeof FETCH_DESCRIPTION_HISTORY_FAILURE;
}

export interface IUpdateDescriptionAction {
  type: typeof UPDATE_DESCRIPTION;
}

export interface IUpdateDescriptionSuccessAction {
  type: typeof UPDATE_DESCRIPTION_SUCCESS;
}

export interface IUpdateDescriptionFailureAction {
  type: typeof UPDATE_DESCRIPTION_FAILURE;
}

export interface IPostRequirementAction {
  type: typeof POST_REQUIREMENT;
}

export interface IPostRequirementSuccessAction {
  type: typeof POST_REQUIREMENT_SUCCESS;
}

export interface IPostRequirementFailureAction {
  type: typeof POST_REQUIREMENT_FAILURE;
  meta?: string;
}

export interface IUpdateRequirementAciton {
  type: typeof UPDATE_REQUIREMENT;
}

export interface IUpdateRequirementSuccessAction {
  type: typeof UPDATE_REQUIREMENT_SUCCESS;
  payload: IRequirement;
}

export interface IUpdateRequirementFailureAction {
  type: typeof UPDATE_REQUIREMENT_FAILURE;
}

export interface IDeleteRequirementAction {
  type: typeof DELETE_REQUIREMENT;
}

export interface IDeleteRequirementSuccessAction {
  type: typeof DELETE_REQUIREMENT_SUCCESS;
  payload: IRequirement;
}

export interface IDeleteRequirementFailreAction {
  type: typeof DELETE_REQUIREMENT_FAILURE;
}

export interface IToggleAddRequirementModalAction {
  type: typeof TOGGLE_ADD_REQUIREMENT_MODAL;
}

export interface IAddRequirementAction {
  type: typeof ADD_REQUIREMENT;
}

export interface IAddRequirementSuccessAction {
  type: typeof ADD_REQUIREMENT_SUCCESS;
  payload: IRequirement;
}

export interface IAddRequirementFailureAction {
  type: typeof ADD_REQUIREMENT_FAILURE;
}
export interface IRequirementState {
  requirement?: IRequirement;
  addRequirementModalVisible: boolean;
  loading: boolean;
  addRequirementLoading: boolean;
  deleteRequirementLoading: boolean;
  updateRequirementLoading: boolean;
  error?: boolean | any;

  histories?: IDescriptionHistory[];
}

export interface IFetchRepoRequirementAction {
  type: typeof FETCH_REPO_REQUIREMENT;
}

export interface IFetchRepoRequirementSuccessAction {
  type: typeof FETCH_REPO_REQUIREEMENT_SUCCESS;
  payload: IRequirement;
}

export interface IFetchRepoRequirementFailureAction {
  type: typeof FETCH_REPO_REQUIREMENT_FAILURE;
}

export type RequirementActions =
  | IFetchRepoRequirementAction
  | IFetchRepoRequirementSuccessAction
  | IFetchRepoRequirementFailureAction
  | IAddRequirementAction
  | IAddRequirementSuccessAction
  | IAddRequirementFailureAction
  | IToggleAddRequirementModalAction
  | IUpdateRequirementAciton
  | IUpdateRequirementSuccessAction
  | IUpdateRequirementFailureAction
  | IDeleteRequirementAction
  | IDeleteRequirementSuccessAction
  | IDeleteRequirementFailreAction
  | IPostRequirementAction
  | IPostRequirementSuccessAction
  | IPostRequirementFailureAction
  | IUpdateDescriptionAction
  | IUpdateDescriptionSuccessAction
  | IUpdateDescriptionFailureAction
  | IFetchDescriptionHistoryAction
  | IFetchDescriptionHistorySuccessAction
  | IFetchDescriptionHistoryFailureAction;

export type RequirementActionTypes =
  | typeof FETCH_REPO_REQUIREMENT
  | typeof FETCH_REPO_REQUIREEMENT_SUCCESS
  | typeof FETCH_REPO_REQUIREMENT_FAILURE
  | typeof ADD_REQUIREMENT
  | typeof ADD_REQUIREMENT_SUCCESS
  | typeof ADD_REQUIREMENT_FAILURE
  | typeof TOGGLE_ADD_REQUIREMENT_MODAL
  | typeof UPDATE_REQUIREMENT
  | typeof UPDATE_REQUIREMENT_SUCCESS
  | typeof UPDATE_REQUIREMENT_FAILURE
  | typeof DELETE_REQUIREMENT
  | typeof DELETE_REQUIREMENT_SUCCESS
  | typeof DELETE_REQUIREMENT_FAILURE
  | typeof POST_REQUIREMENT
  | typeof POST_REQUIREMENT_SUCCESS
  | typeof POST_REQUIREMENT_FAILURE
  | typeof UPDATE_DESCRIPTION
  | typeof UPDATE_DESCRIPTION_SUCCESS
  | typeof UPDATE_DESCRIPTION_FAILURE
  | typeof FETCH_DESCRIPTION_HISTORY
  | typeof FETCH_DESCRIPTION_HISTORY_SUCCESS
  | typeof FETCH_DESCRIPTION_HISTORY_FAILURE;
