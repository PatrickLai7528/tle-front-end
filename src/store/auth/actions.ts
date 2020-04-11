import { ThunkDispatch } from "redux-thunk";
import {
  PUSH_NOTIFICATION_QUEUE,
  NotificationActionTypes,
  INotificationQueueItem
} from "./../notification/types";
import { AppThunk } from "./../store";
import {
  AuthActionTypes,
  ILogInData,
  IRegistryData,
  TOGGLE_AUTH_MODAL,
  SEND_GITHUB_LOG_IN,
  AuthActions
} from "./types";

export const toggleAuthModal = (): AuthActions => {
  return { type: TOGGLE_AUTH_MODAL };
};

export const sendGitHubLogIn = (
  code: string
): AppThunk<void, AuthActionTypes> => async dispatch => {
  dispatch({ type: SEND_GITHUB_LOG_IN });
  try {
    const res = await fetch(
      `http://localhost:8080/auth/access_token?code=${code}`
    ).then(res => res.json());
    console.log(res);
    const { success, meta, payload: accessToken } = res;
    if (success) {
      dispatch({ type: "SEND_GITHUB_LOG_IN_SUCCESS", payload: accessToken });
    } else {
      dispatch({ type: "SEND_GITHUB_LOG_IN_FAILURE", meta });
    }
  } catch (e) {
    if (process.env.NODE_ENV === "development") {
      console.log(e);
    }
    dispatch({ type: "SEND_GITHUB_LOG_IN_FAILURE" });
  }
};

export const sendLogIn = (
  data: ILogInData
): AppThunk<
  Promise<boolean>,
  AuthActionTypes | NotificationActionTypes
> => async dispatch => {
  dispatch({ type: "SEND_LOG_IN" });
  try {
    await new Promise(resolve => setTimeout(resolve, 1500));
    const token = "hahaha hahahaha fake token";
    dispatch({
      type: "SEND_LOG_IN_SUCCESS",
      payload: { token, email: data.email }
    });
    return true;
  } catch (e) {
    if (process.env.NODE_ENV === "development") {
      console.log(e);
    }
    dispatch({ type: "SEND_LOG_IN_FAILURE" });
    return false;
  }
};

export const sendRegistry = (
  data: IRegistryData
): AppThunk<Promise<boolean>, AuthActionTypes> => async dispatch => {
  dispatch({ type: "SEND_REGISTRY" });
  try {
    await new Promise(resolve => setTimeout(resolve, 1500));
    dispatch({ type: "SEND_REGISTRY_SUCCESS" });
    return true;
  } catch (e) {
    if (process.env.NODE_ENV === "development") {
      console.log(e);
    }
    dispatch({ type: "SEND_REGISTRY_FAILRE" });
    return false;
  }
};
