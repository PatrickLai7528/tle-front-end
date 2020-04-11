import { IGHUserProfile } from "./../../types/github-api/user-profile";
export const SEND_LOG_IN = "SEND_LOG_IN";
export const SEND_LOG_IN_SUCCESS = "SEND_LOG_IN_SUCCESS";
export const SEND_LOG_IN_FAILURE = "SEND_LOG_IN_FAILURE";

export const SEND_REGISTRY = "SEND_REGISTRY";
export const SEND_REGISTRY_SUCCESS = "SEND_REGISTRY_SUCCESS";
export const SEND_REGISTRY_FAILRE = "SEND_REGISTRY_FAILRE";

export const SEND_GITHUB_LOG_IN = "SEND_GITHUB_LOG_IN";
export const SEND_GITHUB_LOG_IN_SUCCESS = "SEND_GITHUB_LOG_IN_SUCCESS";
export const SEND_GITHUB_LOG_IN_FAILURE = "SEND_GITHUB_LOG_IN_FAILURE";

export const FETCH_GH_PROFILE = "FETCH_GH_PROFILE";
export const FETCH_GH_PROFILE_SUCCESS = "FETCH_GH_PROFILE_SUCCESS";
export const FETCH_GH_PROFILE_FAILURE = "FETCH_GH_PROFILE_SUCCESS";

export const TOGGLE_AUTH_MODAL = "TOGGLE_AUTH_MODAL";

export interface IAuthState {
  loggedIn: boolean;
  email?: string;
  token?: string;
  gitHubAccessToken?: string;
  loading?: boolean;
  error?: string | boolean;
  authModalVisible: boolean;
  ghProfile?: IGHUserProfile;
}

export interface IFetchGhProfileAction {
  type: typeof FETCH_GH_PROFILE;
}

export interface IFetchGHProfileSuccessAction {
  type: typeof FETCH_GH_PROFILE_SUCCESS;
  payload: IGHUserProfile;
}

export interface IFetchGHProfileFailureAction {
  type: typeof FETCH_GH_PROFILE_FAILURE;
}

export interface IToggleAuthModalAction {
  type: typeof TOGGLE_AUTH_MODAL;
}

export interface ISendGitHubLogInAction {
  type: typeof SEND_GITHUB_LOG_IN;
}

export interface ISendGitHubLogInSuccessAction {
  type: typeof SEND_GITHUB_LOG_IN_SUCCESS;
  payload: string;
}

export interface ISendGitHubLogInFailureAction {
  type: typeof SEND_GITHUB_LOG_IN_FAILURE;
  meta?: string;
}

export interface ILogInData {
  email: string;
  password: string;
}

export interface IRegistryData {}

// 發送登錄請求
export interface ISendLogInAction {
  type: typeof SEND_LOG_IN;
  payload: ILogInData;
}

// 登錄成功
export interface ISendLogInSuccessAction {
  type: typeof SEND_LOG_IN_SUCCESS;
  payload: { email: string; token: string };
}

// 登錄失敗
export interface ISendLogInFailureAction {
  type: typeof SEND_LOG_IN_FAILURE;
  meta?: string;
}

// 發送注冊請求
export interface ISendRegistryAction {
  type: typeof SEND_REGISTRY;
  payload: IRegistryData;
}

export interface ISendRegistrySuccessAction {
  type: typeof SEND_REGISTRY_SUCCESS;
}

export interface ISendRegistryFailureAction {
  type: typeof SEND_REGISTRY_FAILRE;
  meta?: string;
}

export type AuthActions =
  | ISendLogInAction
  | ISendLogInSuccessAction
  | ISendLogInFailureAction
  | ISendRegistryAction
  | ISendRegistrySuccessAction
  | ISendRegistryFailureAction
  | ISendGitHubLogInAction
  | ISendGitHubLogInSuccessAction
  | ISendGitHubLogInFailureAction
  | IToggleAuthModalAction
  | IFetchGhProfileAction
  | IFetchGHProfileSuccessAction
  | IFetchGHProfileFailureAction;

export type AuthActionTypes =
  | typeof SEND_LOG_IN
  | typeof SEND_LOG_IN_SUCCESS
  | typeof SEND_LOG_IN_FAILURE
  | typeof SEND_REGISTRY
  | typeof SEND_REGISTRY_SUCCESS
  | typeof SEND_REGISTRY_FAILRE
  | typeof SEND_GITHUB_LOG_IN
  | typeof SEND_GITHUB_LOG_IN_SUCCESS
  | typeof SEND_GITHUB_LOG_IN_FAILURE
  | typeof TOGGLE_AUTH_MODAL
  | typeof FETCH_GH_PROFILE
  | typeof FETCH_GH_PROFILE_SUCCESS
  | typeof FETCH_GH_PROFILE_FAILURE;
