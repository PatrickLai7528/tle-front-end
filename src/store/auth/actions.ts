import _ from "lodash";
import { getServerUrl } from "./../../configs/get-url";
import { IGHUserProfile } from "./../../types/github-api/user-profile";
import { NotificationActionTypes } from "./../notification/types";
import { AppThunk } from "./../store";
import {
  AuthActions,
  AuthActionTypes,
  ILogInData,
  IRegistryData
} from "./types";

export const toggleAuthModal = (): AuthActions => {
  return { type: "TOGGLE_AUTH_MODAL" };
};

export const loggedIn = (token: string, ghToken: string) => ({
  type: "LOGGED_IN",
  payload: { token, ghToken }
});

export const fetchGHProfile = (
  gitHubAccessToken: string
): AppThunk<void, AuthActionTypes> => async dispatch => {
  dispatch({ type: "FETCH_GH_PROFILE" });
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
    dispatch({ type: "FETCH_GH_PROFILE_SUCCESS", payload: ghProfile });
  } catch (e) {
    if (process.env.NODE_ENV !== "production") {
      console.log(e);
    }
    dispatch({ type: "FETCH_GH_PROFILE_FAILURE" });
  }
};

export const sendGitHubLogIn = (
  code: string
): AppThunk<void, AuthActionTypes> => async dispatch => {
  dispatch({ type: "SEND_GITHUB_LOG_IN" });
  try {
    const res = await fetch(
      `${getServerUrl()}/api/auth/access_token?code=${code}`,
      { credentials: "include" }
    ).then(res => res.json());
    const { success, meta, payload: accessToken } = res;
    if (success) {
      if (accessToken) {
        localStorage.setItem("tle_app_gh_token", accessToken);
      }
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
    const res = await fetch(`${getServerUrl()}/api/auth/login`, {
      body: JSON.stringify({
        email: data.email,
        password: data.password
      }),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      method: "POST"
    }).then(res => res.json());
    if (res && res.success) {
      const { token, githubId } = res.payload || {};
      if (token) {
        localStorage.setItem("tle_app_token", token);
      }
      dispatch({
        type: "SEND_LOG_IN_SUCCESS",
        payload: { token, githubId }
      });
      return true;
    } else {
      dispatch({ type: "SEND_LOG_IN_FAILURE", meta: res.meta });
      return false;
    }
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
    // await new Promise(resolve => setTimeout(resolve, 1500));
    const res = await fetch(`${getServerUrl()}/api/auth/registry`, {
      method: "POST",
      body: JSON.stringify({
        email: data.email,
        password: data.password
      }),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    }).then(res => res.json());
    if (res && res.success) {
      dispatch({ type: "SEND_REGISTRY_SUCCESS" });
      return true;
    } else {
      dispatch({ type: "SEND_REGISTRY_FAILRE", meta: res.meta });
      return false;
    }
  } catch (e) {
    if (process.env.NODE_ENV === "development") {
      console.log(e);
    }
    dispatch({ type: "SEND_REGISTRY_FAILRE" });
    return false;
  }
};
