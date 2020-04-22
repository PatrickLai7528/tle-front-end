import { getServerUrl } from "./../../configs/get-url";
import { gitHubAuthConfigs } from "./../../configs/github-auth.config";
import { AppThunk } from "./../store";
import {
  FETCH_IMPORTED_REPOSITORY_DETAIL,
  FETCH_IMPORTED_REPOSITORY_DETAIL_FAILURE,
  FETCH_IMPORTED_REPOSITORY_DETAIL_SUCCESS,
  FETCH_RECENT_REPOSITORY,
  FETCH_RECENT_REPOSITORY_FAILURE,
  FETCH_RECENT_REPOSITORY_SUCCESS,
  RepositoryManagementActionTypes
} from "./types";

export const fetchRecentRepository = (): AppThunk<
  void,
  RepositoryManagementActionTypes
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
): AppThunk<void, RepositoryManagementActionTypes> => async dispatch => {
  dispatch({ type: FETCH_IMPORTED_REPOSITORY_DETAIL });
  try {
    // await new Promise(resolve => setTimeout(resolve, 1000));
    const res = await fetch(
      `${getServerUrl()}/api/repository/id/${repoId}`
    ).then(res => res.json());
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
  RepositoryManagementActionTypes
> => async dispatch => {
  dispatch({ type: "FETCH_IMPORTED_REPOSITORY_LIST" });
  try {
    // await new Promise(resolve => setTimeout(resolve, 1000));
    const res = await fetch(`${getServerUrl()}/api/repository`).then(res =>
      res.json()
    );
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
  RepositoryManagementActionTypes
> => async (dispatch, getState) => {
  dispatch({ type: "FETCH_REPOSITORY_FROM_GITHUB" });
  try {
    const {
      authReducer: { gitHubAccessToken }
    } = getState();
    const res = await fetch(
      `${
        gitHubAuthConfigs.fetch_repository
      }?page=${1}&per_page=10&sort=updated`,
      {
        headers: {
          accept: "application/json",
          Authorization: `token ${gitHubAccessToken}`
        }
      }
    ).then(res => res.json());
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
): AppThunk<void, RepositoryManagementActionTypes> => async (
  dispatch,
  getState
) => {
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
