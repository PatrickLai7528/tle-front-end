import { IRequirement, IRequirementDescription } from "./../../types/index";
export const FETCH_REPO_REQUIREMENT = "FETCH_REPO_REQUIREMENT";
export const FETCH_REPO_REQUIREEMENT_SUCCESS = "FETCH_REPO_REQUIREMENT_SUCCESS";
export const FETCH_REPO_REQUIREMENT_FAILURE = "FETCH_REPO_REQUIREMENT_FAILURE";

export const ADD_REQUIREMENT = "ADD_REQUIREMENT";
export const ADD_REQUIREMENT_SUCCESS = "ADD_REQUIREMENT_SUCCESS";
export const ADD_REQUIREMENT_FAILURE = "ADD_REQUIREMENT_FAILURE";

export const TOGGLE_ADD_REQUIREMENT_MODAL = "TOGGLE_ADD_REQUIREMENT_MODAL";

export interface IToggleAddRequirementModalAction {
  type: typeof TOGGLE_ADD_REQUIREMENT_MODAL;
}

export interface IAddRequirementAction {
  type: typeof ADD_REQUIREMENT;
}

export interface IAddRequirementSuccessAction {
  type: typeof ADD_REQUIREMENT_SUCCESS;
  payload: IRequirementDescription;
}

export interface IAddRequirementFailureAction {
  type: typeof ADD_REQUIREMENT_FAILURE;
}
export interface IRequirementState {
  requirement?: IRequirement;
  addRequirementModalVisible: boolean;
  loading: boolean;
  addRequirementLoading: boolean;
  error?: boolean | any;
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
  | IToggleAddRequirementModalAction;

export type RequirementActionTypes =
  | typeof FETCH_REPO_REQUIREMENT
  | typeof FETCH_REPO_REQUIREEMENT_SUCCESS
  | typeof FETCH_REPO_REQUIREMENT_FAILURE
  | typeof ADD_REQUIREMENT
  | typeof ADD_REQUIREMENT_SUCCESS
  | typeof ADD_REQUIREMENT_FAILURE
  | typeof TOGGLE_ADD_REQUIREMENT_MODAL;
