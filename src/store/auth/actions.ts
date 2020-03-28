import { fakeLogIn, fakeRegistry } from "./../../mock/auth-api";
import { AppThunk } from "./../store";
import {
  AuthActionTypes,
  ILogInData,
  IRegistryData,
  SEND_GITHUB_LOG_IN
} from "./types";

export const sendGitHubLogIn = (
  code: string
): AppThunk<void, AuthActionTypes> => async dispatch => {
  dispatch({ type: SEND_GITHUB_LOG_IN });
  try {
    const { accessToken } = await fetch(
      `http://localhost:3001/access_token?code=${code}`
    ).then(res => res.json());
    dispatch({ type: "SEND_GITHUB_LOG_IN_SUCCESS", payload: accessToken });
  } catch (e) {
    if (process.env.NODE_ENV === "development") {
      console.log(e);
    }
    dispatch({ type: "SEND_GITHUB_LOG_IN_FAILURE" });
  }
};

export const sendLogIn = (
  data: ILogInData
): AppThunk<void, AuthActionTypes> => async dispatch => {
  dispatch({ type: "SEND_LOG_IN" });
  try {
    const token = await fakeLogIn(data);
    dispatch({
      type: "SEND_LOG_IN_SUCCESS",
      payload: { token, email: data.email }
    });
  } catch (e) {
    if (process.env.NODE_ENV === "development") {
      console.log(e);
    }
    dispatch({ type: "SEND_LOG_IN_FAILURE" });
  }
};

export const sendRegistry = (
  data: IRegistryData
): AppThunk<void, AuthActionTypes> => async dispatch => {
  dispatch({ type: "SEND_REGISTRY" });
  try {
    await fakeRegistry(data);
    dispatch({ type: "SEND_REGISTRY_SUCCESS" });
  } catch (e) {
    if (process.env.NODE_ENV === "development") {
      console.log(e);
    }
    dispatch({ type: "SEND_REGISTRY_FAILRE" });
  }
};
