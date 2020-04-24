import { getServerUrl } from "../../configs/get-url";
import { traceLinks } from "../../stubs/trace-link";
import { traceLinkMatrix } from "./../../stubs/trace-link-matrix";
import {
  ICommit,
  IFileTreeNode,
  IRequirement,
  ITraceLinkMatrix,
  ITraceLink
} from "./../../types/index";
import { AppDispatch, AppThunk } from "./../store";
import {
  CONFIRM_INIT_TRACE_LINK,
  FETCH_COMMIT_RELATED_TRACE_LINK,
  FETCH_COMMIT_RELATED_TRACE_LINK_FAILURE,
  FETCH_COMMIT_RELATED_TRACE_LINK_SUCCESS,
  FETCH_FILE_RELATED_TRACE_LINK,
  FETCH_FILE_RELATED_TRACE_LINK_FAILURE,
  FETCH_FILE_RELATED_TRACE_LINK_SUCCESS,
  FETCH_REPO_TRACE_LINK,
  FETCH_REPO_TRACE_LINK_FAILURE,
  FETCH_REPO_TRACE_LINK_SUCCESS,
  FETCH_REQUIREMENT_RELATED_TRACE_LINK,
  FETCH_REQUIREMENT_RELATED_TRACE_LINK_FAILURE,
  FETCH_REQUIREMENT_RELATED_TRACE_LINK_SUCCESS,
  GENERATE_INIT_TRACE_LINK,
  GENERATE_INIT_TRACE_LINK_SUCCESS,
  GENERATE_INTI_TRACE_LINK_FAILURE,
  IConfirmInitTraceLinkAction,
  IToggleInitTraceLinkEditModalAction,
  IUpdateInitTraceLinkAction,
  SEND_INIT_TRACE_LINK,
  SEND_INIT_TRACE_LINK_FAILURE,
  SEND_INIT_TRACE_LINK_SUCCESS,
  TOGGLE_INIT_TRACE_LINK_EDIT_MODAL,
  TraceLinkActions,
  TraceLinkActionTypes,
  UPDATE_INIT_TRACE_LINK
} from "./types";

export const newTraceLink = (
  repoName: string,
  traceLink: ITraceLink
): AppThunk<void, TraceLinkActionTypes> => async dispatch => {
  dispatch({ type: "NEW_TRACE_LINK" });
  try {
    await new Promise(resolve => setTimeout(resolve, 1400));
    dispatch({ type: "NEW_TRACE_LINK_SUCCESS" });
  } catch (e) {
    if (process.env.NODE_ENV !== "production") {
      console.log(e);
    }
    dispatch({ type: "NEW_TRACE_LINK_FAILURE" });
  }
};

export const fetchRequirementRelatedTraceLinks = (
  repoName: string,
  requirementId: string
): AppThunk<void, TraceLinkActionTypes> => async dispatch => {
  dispatch({ type: FETCH_REQUIREMENT_RELATED_TRACE_LINK });
  try {
    await new Promise(resolve => setTimeout(resolve, 1200));
    dispatch({
      type: FETCH_REQUIREMENT_RELATED_TRACE_LINK_SUCCESS,
      payload: traceLinks.splice(3, 6)
    });
  } catch (e) {
    if (process.env.NODE_ENV !== "production") {
      console.log(e);
    }
    dispatch({ type: FETCH_REQUIREMENT_RELATED_TRACE_LINK_FAILURE });
  }
};

export const fetchFileRelatedTraceLinks = (
  repoName: string,
  fullyQauilfiedName: string
): AppThunk<void, TraceLinkActionTypes> => async (dispatch, getState) => {
  dispatch({ type: FETCH_FILE_RELATED_TRACE_LINK });
  try {
    const {
      authReducer: { token }
    } = getState();
    if (!token) throw new Error("no token");
    const res = await fetch(
      `${getServerUrl()}/api/tracelink?file=${fullyQauilfiedName}&repoName=${repoName}`,
      {
        credentials: "include",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    ).then(res => res.json());
    if (res && res.success) {
      dispatch({
        type: FETCH_FILE_RELATED_TRACE_LINK_SUCCESS,
        payload: res.payload
      });
    } else {
      dispatch({ type: "FETCH_FILE_RELATED_TRACE_LINK_FAILURE" });
    }
  } catch (e) {
    if (process.env.NODE_ENV !== "production") {
      console.log(e);
    }
    dispatch({ type: FETCH_FILE_RELATED_TRACE_LINK_FAILURE });
  }
};

export const fetchCommitRelatedTraceLinks = (
  repoName: string,
  commit: ICommit
): AppThunk<void, TraceLinkActionTypes> => async (dispatch, getState) => {
  dispatch({ type: FETCH_COMMIT_RELATED_TRACE_LINK });
  try {
    const {
      authReducer: { token }
    } = getState();
    if (!token) throw new Error("no token");
    const res = await fetch(
      `${getServerUrl()}/api/tracelink/history?repoName=${repoName}&commitSha=${
        commit.sha
      }`,
      {
        credentials: "include",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    ).then(res => res.json());
    if (res && res.success) {
      dispatch({
        type: FETCH_COMMIT_RELATED_TRACE_LINK_SUCCESS,
        payload: res.payload
      });
    }
  } catch (e) {
    if (process.env.NODE_ENV !== "production") {
      console.log(e);
    }
    dispatch({ type: FETCH_COMMIT_RELATED_TRACE_LINK_FAILURE });
  }
};

export const sendInitTraceLink = (
  matrix: Omit<ITraceLinkMatrix, "_id">
): AppThunk<void, TraceLinkActionTypes> => async (dispatch, getState) => {
  dispatch({ type: SEND_INIT_TRACE_LINK });
  try {
    const {
      authReducer: { token }
    } = getState();
    if (!token) throw new Error("no token");
    const res = await fetch(`${getServerUrl()}/api/tracelink`, {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(matrix)
    }).then(res => res.json());
    if (res && res.success) {
      dispatch({ type: SEND_INIT_TRACE_LINK_SUCCESS });
    } else {
      dispatch({ type: "SEND_INIT_TRACE_LINK_FAILURE", meta: res.meta });
    }
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
  files: IFileTreeNode[],
  requirement: Omit<IRequirement, "_id">
): AppThunk<void, TraceLinkActionTypes> => async (dispatch, getState) => {
  dispatch({ type: GENERATE_INIT_TRACE_LINK });
  try {
    const {
      authReducer: { token }
    } = getState();
    if (!token) throw new Error("no token");
    const res = await fetch(`${getServerUrl()}/api/tracelink/init`, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({
        files: files,
        requirement: requirement
      }),
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    }).then(res => res.json());

    if (res && res.success) {
      dispatch({
        type: GENERATE_INIT_TRACE_LINK_SUCCESS,
        payload: res.payload
      });
    } else {
      dispatch({
        type: "GENERATE_INIT_TRACE_LINK_FAILURE",
        meta: res.meta
      });
    }
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
