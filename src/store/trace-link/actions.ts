import {
  IRequirement,
  ITraceLinkMatrix,
  ICommit,
  ITraceLink
} from "./../../types/index";
import { traceLinkMatrix } from "./../../stubs/trace-link-matrix";
import {
  TraceLinkActionTypes,
  TraceLinkActions,
  FETCH_REPO_TRACE_LINK,
  FETCH_REPO_TRACE_LINK_SUCCESS,
  FETCH_REPO_TRACE_LINK_FAILURE,
  GENERATE_INIT_TRACE_LINK,
  GENERATE_INIT_TRACE_LINK_SUCCESS,
  GENERATE_INTI_TRACE_LINK_FAILURE,
  TOGGLE_INIT_TRACE_LINK_EDIT_MODAL,
  IToggleInitTraceLinkEditModalAction,
  UPDATE_INIT_TRACE_LINK,
  IUpdateInitTraceLinkAction,
  IConfirmInitTraceLinkAction,
  CONFIRM_INIT_TRACE_LINK,
  SEND_INIT_TRACE_LINK,
  SEND_INIT_TRACE_LINK_SUCCESS,
  SEND_INIT_TRACE_LINK_FAILURE,
  FETCH_COMMIT_RELATED_TRACE_LINK_FAILURE,
  FETCH_COMMIT_RELATED_TRACE_LINK,
  FETCH_COMMIT_RELATED_TRACE_LINK_SUCCESS
} from "./types";
import { AppThunk, AppDispatch } from "./../store";
import { traceLinks } from "../../stubs/trace-link";
import { implementStubs } from "../../stubs/implement";

export const fetchRelatedTraceLinks = (
  commit: ICommit
): AppThunk<void, TraceLinkActionTypes> => async dispatch => {
  dispatch({ type: FETCH_COMMIT_RELATED_TRACE_LINK });
  try {
    await new Promise(resolve => setTimeout(resolve, 1200));
    const { changedFiles } = commit;
    const fetched: (ITraceLink & {
      status: "ADDED" | "REMOVED";
    })[] = traceLinks.slice(1, 10).map((link, index) => ({
      ...link,
      implements:
        implementStubs[Math.round(Math.random() * implementStubs.length)],
      status: index % 2 === 0 ? "ADDED" : "REMOVED"
    }));
    dispatch({
      type: FETCH_COMMIT_RELATED_TRACE_LINK_SUCCESS,
      payload: fetched
    });
  } catch (e) {
    if (process.env.NODE_ENV !== "production") {
      console.log(e);
    }
    dispatch({ type: FETCH_COMMIT_RELATED_TRACE_LINK_FAILURE });
  }
};

export const sendInitTraceLink = (
  matrix: ITraceLinkMatrix
): AppThunk<void, TraceLinkActionTypes> => async dispatch => {
  dispatch({ type: SEND_INIT_TRACE_LINK });
  try {
    await new Promise(resolve => setTimeout(resolve, 1200));
    dispatch({ type: SEND_INIT_TRACE_LINK_SUCCESS });
  } catch (e) {
    if (process.env.NODE_ENV !== "production") {
      console.log(e);
    }
    dispatch({ type: SEND_INIT_TRACE_LINK_FAILURE });
  }
};

export const toggleInitTraceLinkModal = (): IToggleInitTraceLinkEditModalAction => {
  return {
    type: TOGGLE_INIT_TRACE_LINK_EDIT_MODAL
  };
};

export const updateInitTraceLink = (
  matrix: ITraceLinkMatrix
): IUpdateInitTraceLinkAction => {
  return {
    type: UPDATE_INIT_TRACE_LINK,
    payload: matrix
  };
};

export const confirmInitTraceLink = (
  matrix: ITraceLinkMatrix
): IConfirmInitTraceLinkAction => {
  return {
    type: CONFIRM_INIT_TRACE_LINK,
    payload: matrix
  };
};

export const generateInitialTraceLink = (
  requirement: IRequirement
): AppThunk<void, TraceLinkActionTypes> => async dispatch => {
  dispatch({ type: GENERATE_INIT_TRACE_LINK });
  try {
    await new Promise(resolve => setTimeout(resolve, 1000));
    dispatch({
      type: GENERATE_INIT_TRACE_LINK_SUCCESS,
      payload: traceLinkMatrix
    });
  } catch (e) {
    if (process.env.NODE_ENV !== "production") {
      console.log(e);
    }
    dispatch({ type: GENERATE_INTI_TRACE_LINK_FAILURE });
  }
};

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
