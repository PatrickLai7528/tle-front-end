export const SEND_LOG_IN = "SEND_LOG_IN";
export const SEND_LOG_IN_SUCCESS = "SEND_LOG_IN_SUCCESS";
export const SEND_LOG_IN_FAILURE = "SEND_LOG_IN_FAILURE";

export const SEND_REGISTRY = "SEND_REGISTRY";
export const SEND_REGISTRY_SUCCESS = "SEND_REGISTRY_SUCCESS";
export const SEND_REGISTRY_FAILRE = "SEND_REGISTRY_FAILRE";

export const SEND_GITHUB_LOG_IN = "SEND_GITHUB_LOG_IN";
export const SEND_GITHUB_LOG_IN_SUCCESS = "SEND_GITHUB_LOG_IN_SUCCESS";
export const SEND_GITHUB_LOG_IN_FAILURE = "SEND_GITHUB_LOG_IN_FAILURE";

export interface IAuthState {
  loggedIn: boolean;
  email?: string;
  token?: string;
  gitHubAccessToken?: string;
  loading?: boolean;
  error?: string | boolean;
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
  | ISendGitHubLogInFailureAction;

export type AuthActionTypes =
  | typeof SEND_LOG_IN
  | typeof SEND_LOG_IN_SUCCESS
  | typeof SEND_LOG_IN_FAILURE
  | typeof SEND_REGISTRY
  | typeof SEND_REGISTRY_SUCCESS
  | typeof SEND_REGISTRY_FAILRE
  | typeof SEND_GITHUB_LOG_IN
  | typeof SEND_GITHUB_LOG_IN_SUCCESS
  | typeof SEND_GITHUB_LOG_IN_FAILURE;
