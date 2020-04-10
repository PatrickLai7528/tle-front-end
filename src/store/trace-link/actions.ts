import { traceLinkMatrix } from "./../../stubs/trace-link-matrix";
import {
  TraceLinkActionTypes,
  TraceLinkActions,
  FETCH_REPO_TRACE_LINK,
  FETCH_REPO_TRACE_LINK_SUCCESS,
  FETCH_REPO_TRACE_LINK_FAILURE
} from "./types";
import { AppThunk, AppDispatch } from "./../store";

export const fetchRepoTraceLink = (
  repoName: string
): AppThunk<void, TraceLinkActionTypes> => async (
  dispatch: AppDispatch<TraceLinkActions>
) => {
  dispatch({ type: FETCH_REPO_TRACE_LINK });
  try {
    await new Promise(resolve => setTimeout(resolve, 1500));
    dispatch({ type: FETCH_REPO_TRACE_LINK_SUCCESS, payload: traceLinkMatrix });
  } catch (e) {
    if (process.env.NODE_ENV !== "production") {
      console.log(e);
    }
    dispatch({ type: FETCH_REPO_TRACE_LINK_FAILURE });
  }
};
