import { gitHubAuthConfigs } from "../../configs/github-auth.config";
import {
  SearchRepositoryActionTypes,
  SEARCH_GITHUB_REPOSITORY,
  SEARCH_GITHUB_REPOSITORY_FAILURE,
  SAERCH_GITHUB_REPOSITORY_SUCCESS
} from "./types";
import { AppThunk } from "../store";

export const searchGitHubRepository = (
  searchFor: string
): AppThunk<void, SearchRepositoryActionTypes> => async (
  dispatch,
  getState
) => {
  dispatch({ type: SEARCH_GITHUB_REPOSITORY });
  try {
    const {
      authReducer: { gitHubAccessToken, ghProfile }
    } = getState();
    if (gitHubAccessToken && ghProfile?.login) {
      const queryString = `?q=${searchFor}+user:${ghProfile.login}`;
      const res = await fetch(`${gitHubAuthConfigs.search}${queryString}`, {
        headers: {
          accept: "application/json",
          Authorization: `token ${gitHubAccessToken}`
        }
      }).then(res => res.json());
      dispatch({
        type: SAERCH_GITHUB_REPOSITORY_SUCCESS,
        payload: { res: res.items, searchStr: searchFor }
      });
    } else {
      dispatch({ type: SEARCH_GITHUB_REPOSITORY_FAILURE });
    }
  } catch (e) {
    if (process.env.NODE_ENV !== "production") {
      console.log(e);
    }
    dispatch({ type: SEARCH_GITHUB_REPOSITORY_FAILURE });
  }
};
