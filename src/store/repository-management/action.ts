import { importedRepository } from "./../../stubs/imported-repositories";
import { gitHubAuthConfigs } from "./../../configs/github-auth.config";
import { AppThunk } from "./../store";
import {
  RepositoryManagementActionTypes,
  FETCH_IMPORTED_REPOSITORY_DETAIL,
  FETCH_IMPORTED_REPOSITORY_DETAIL_SUCCESS,
  FETCH_IMPORTED_REPOSITORY_DETAIL_FAILURE
} from "./types";

export const fetchImportedRepositoryDetail = (
  repoName: string
): AppThunk<void, RepositoryManagementActionTypes> => async dispatch => {
  dispatch({ type: FETCH_IMPORTED_REPOSITORY_DETAIL });
  try {
    await new Promise(resolve => setTimeout(resolve, 4000));
    dispatch({
      type: FETCH_IMPORTED_REPOSITORY_DETAIL_SUCCESS,
      payload: importedRepository[0]
    });
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
    await new Promise(resolve => setTimeout(resolve, 1000));
    dispatch({
      type: "FETCH_IMPORTED_REPOSITORY_LIST_SUCCESS",
      payload: importedRepository
    });
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
      }?page=${1}&per_page=50&sort=updated`,
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
