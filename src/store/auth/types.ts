export const SEND_LOG_IN = "SEND_LOG_IN";
export const SEND_REGISTRY = "SEND_REGISTRY";

export interface IAuthState {
  loggedIn: boolean;
  userID?: string;
  error?: string;
}

export interface ILogInData {}

export interface IRegistryData {}

export interface ISendLogInAction {
  type: typeof SEND_LOG_IN;
  payload: ILogInData;
}

export interface ISendRegistryAction {
  type: typeof SEND_REGISTRY;
  payload: IRegistryData;
}

export type AuthActionTypes = ISendLogInAction | ISendRegistryAction;
