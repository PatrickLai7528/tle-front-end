import { getServerUrl, getGitHubServiceUrl } from "../../configs/get-url";
import { gitHubAuthConfigs } from "../../configs/github-auth.config";
import { AppThunk } from "../store";
import {
  FETCH_IMPORTED_REPOSITORY_DETAIL,
  FETCH_IMPORTED_REPOSITORY_DETAIL_FAILURE,
  FETCH_IMPORTED_REPOSITORY_DETAIL_SUCCESS,
  FETCH_RECENT_REPOSITORY,
  FETCH_RECENT_REPOSITORY_FAILURE,
  FETCH_RECENT_REPOSITORY_SUCCESS,
  RepositoryActionTypes
} from "./types";

export const deleteRepository = (
  repoId: string
): AppThunk<void, RepositoryActionTypes> => async (dispatch, getState) => {
  dispatch({ type: "DELETE_REPOSITORY" });
  try {
    const {
      authReducer: { token }
    } = getState();
    if (!token) throw new Error("no token");
    const res = await fetch(`${getServerUrl()}/api/repository/${repoId}`, {
      credentials: "include",
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => res.json());
    if (res && res.success) {
      dispatch({ type: "DELETE_REPOSITORY_SUCCESS", payload: repoId });
    } else {
      dispatch({ type: "DELETE_REPOSITORY_FAILURE", meta: res.meta });
    }
  } catch (e) {
    if (process.env.NODE_ENV !== "production") {
      console.log(e);
    }
    dispatch({ type: "DELETE_REPOSITORY_FAILURE" });
  }
};

export const fetchRecentRepository = (): AppThunk<
  void,
  RepositoryActionTypes
> => async (dispatch, getState) => {
  dispatch({ type: FETCH_RECENT_REPOSITORY });
  try {
    const {
      authReducer: { token }
    } = getState();
    if (!token) throw new Error("no token");
    const res = await fetch(`${getServerUrl()}/api/repository/recent`, {
      credentials: "include",
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => res.json());
    if (res && res.success) {
      dispatch({
        type: FETCH_RECENT_REPOSITORY_SUCCESS,
        payload: res.payload
      });
    } else {
      dispatch({ type: "FETCH_RECENT_REPOSITORY_FAILURE", meta: res.meta });
    }
  } catch (e) {
    if (process.env.NODE_ENV !== "production") {
      console.log(e);
    }
    dispatch({ type: FETCH_RECENT_REPOSITORY_FAILURE });
  }
};

export const fetchImportedRepositoryDetail = (
  repoId: string
): AppThunk<void, RepositoryActionTypes> => async (dispatch, getState) => {
  dispatch({ type: FETCH_IMPORTED_REPOSITORY_DETAIL });
  try {
    const {
      authReducer: { token }
    } = getState();
    if (!token) throw new Error("no token");
    const res = await fetch(`${getServerUrl()}/api/repository/id/${repoId}`, {
      credentials: "include",
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(res => res.json());
    if (res && res.success) {
      dispatch({
        type: FETCH_IMPORTED_REPOSITORY_DETAIL_SUCCESS,
        payload: res.payload
      });
    } else {
      dispatch({
        type: "FETCH_IMPORTED_REPOSITORY_LIST_FAILURE"
      });
    }
  } catch (e) {
    if (process.env.NODE_ENV !== "production") {
      console.log(e);
    }
    dispatch({ type: FETCH_IMPORTED_REPOSITORY_DETAIL_FAILURE });
  }
};

export const fetchImportedRepositoryList = (): AppThunk<
  void,
  RepositoryActionTypes
> => async (dispatch, getState) => {
  dispatch({ type: "FETCH_IMPORTED_REPOSITORY_LIST" });
  try {
    const {
      authReducer: { token }
    } = getState();
    if (!token) throw new Error("token");
    const res = await fetch(`${getServerUrl()}/api/repository`, {
      credentials: "include",
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(res => res.json());
    if (res && res.success) {
      dispatch({
        type: "FETCH_IMPORTED_REPOSITORY_LIST_SUCCESS",
        payload: res.payload || []
      });
    } else {
      dispatch({
        type: "FETCH_IMPORTED_REPOSITORY_LIST_FAILURE",
        meta: res.meta
      });
    }
  } catch (e) {
    if (process.env.NODE_ENV !== "production") {
      console.log(e);
    }
    dispatch({ type: "FETCH_IMPORTED_REPOSITORY_LIST_FAILURE" });
  }
};

export const fetchAllRepositoryFromGitHub = (): AppThunk<
  void,
  RepositoryActionTypes
> => async (dispatch, getState) => {
  dispatch({ type: "FETCH_REPOSITORY_FROM_GITHUB" });
  try {
    const {
      authReducer: { gitHubAccessToken }
    } = getState();
    const url = `${getGitHubServiceUrl()}/repos?token=${gitHubAccessToken}`;
    const res = await fetch(url, {
      headers: {
        accept: "application/json"
      }
    }).then(res => res.json());
    dispatch({ type: "FETCH_REPOSITORY_FROM_GITHUB_SUCCESS", payload: res });
  } catch (e) {
    if (process.env.NODE_ENV === "development") {
      console.log(e);
    }
    dispatch({ type: "FETCH_REPOSITORY_FROM_GITHUB_FAILURE" });
  }
};

export const loadMoreRepository = (
  loadMoreTimes: number
): AppThunk<void, RepositoryActionTypes> => async (dispatch, getState) => {
  dispatch({ type: "LOAD_MORE_REPOSITORY" });
  try {
    const {
      authReducer: { gitHubAccessToken }
    } = getState();
    const res = await fetch(
      `${gitHubAuthConfigs.fetch_repository}?page=${loadMoreTimes}&per_page=50`,
      {
        headers: {
          accept: "application/json",
          Authorization: `token ${gitHubAccessToken}`
        }
      }
    ).then(res => res.json());
    dispatch({ type: "LOAD_MORE_REPOSITORY_SUCCESS", payload: res });
  } catch (e) {
    if (process.env.NODE_ENV === "development") {
      console.log(e);
    }
    dispatch({ type: "LOAD_MORE_REPOSITORY_FAILURE" });
  }
};
