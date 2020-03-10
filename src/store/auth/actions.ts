import {
  AuthActionTypes,
  SEND_LOG_IN,
  SEND_REGISTRY,
  ILogInData,
  IRegistryData
} from "./types";

export const sendLogIn = (data: ILogInData): AuthActionTypes => {
  return {
    type: SEND_LOG_IN,
    payload: data
  };
};

export const sendRegistry = (data: IRegistryData): AuthActionTypes => {
  return {
    type: SEND_REGISTRY,
    payload: data
  };
};
