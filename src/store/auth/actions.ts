import _ from "lodash";
import { getServerUrl } from "./../../configs/get-url";
import { IGHUserProfile } from "./../../types/github-api/user-profile";
import { NotificationActionTypes } from "./../notification/types";
import { AppThunk } from "./../store";
import {
  AuthActions,
  AuthActionTypes,
  FETCH_GH_PROFILE,
  FETCH_GH_PROFILE_FAILURE,
  FETCH_GH_PROFILE_SUCCESS,
  ILogInData,
  IRegistryData,
  SEND_GITHUB_LOG_IN,
  TOGGLE_AUTH_MODAL
} from "./types";

export const toggleAuthModal = (): AuthActions => {
  return { type: TOGGLE_AUTH_MODAL };
};

export const fetchGHProfile = (
  gitHubAccessToken: string
): AppThunk<void, AuthActionTypes> => async dispatch => {
  try {
    const res = await fetch(`https://api.github.com/user`, {
      headers: {
        accept: "application/json",
        Authorization: `token ${gitHubAccessToken}`
      }
    });
    const data = await res.json();
    const ghProfile: IGHUserProfile = Object.keys(data).reduce(
      (sum: any, curr) => {
        sum[_.camelCase(curr)] = data[curr];
        return sum;
      },
      {}
    ) as IGHUserProfile;
    dispatch({ type: FETCH_GH_PROFILE_SUCCESS, payload: ghProfile });
  } catch (e) {
    if (process.env.NODE_ENV !== "production") {
      console.log(e);
    }
    dispatch({ type: FETCH_GH_PROFILE_FAILURE });
  }
};

export const sendGitHubLogIn = (
  code: string
): AppThunk<void, AuthActionTypes> => async dispatch => {
  dispatch({ type: SEND_GITHUB_LOG_IN });
  try {
    const res = await fetch(
      `${getServerUrl()}/auth/access_token?code=${code}`
    ).then(res => res.json());
    const { success, meta, payload: accessToken } = res;
    if (success) {
      dispatch(fetchGHProfile(accessToken));
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
