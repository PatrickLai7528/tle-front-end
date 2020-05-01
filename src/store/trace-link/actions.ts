import { getServerUrl } from "../../configs/get-url";
import {
  ICommit,
  IFileTreeNode,
  IRequirement,
  ITraceLink,
  ITraceLinkMatrix
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

export const deltetTraceLink = (
  matrixId: string,
  traceLink: ITraceLink
): AppThunk<void, TraceLinkActionTypes> => async (dispatch, getState) => {
  dispatch({ type: "DELETE_TRACE_LINK" });
  try {
    const {
      authReducer: { token }
    } = getState();
    if (!token) throw new Error("no token");
    const url = `${getServerUrl()}/api/tracelink`;
    const options: RequestInit = {
      method: "DELETE",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ matrixId, traceLink })
    };
    const res = await fetch(url, options).then(res => res.json());
    if (res && res.success) {
      dispatch({ type: "DELETE_TRACE_LINK_SUCCESS" });
    } else {
      dispatch({ type: "DELETE_TRACE_LINK_FALIURE", meta: res.meta });
    }
  } catch (e) {
    if (process.env.NODE_ENV !== "production") {
      console.log(e);
    }
    dispatch({ type: "NEW_TRACE_LINK_FAILURE" });
  }
};

export const newTraceLink = (
  repoName: string,
  traceLink: Omit<ITraceLink, "_id">,
  type: "FILE" | "REQUIREMENT"
): AppThunk<void, TraceLinkActionTypes> => async (dispatch, getState) => {
  dispatch({ type: "NEW_TRACE_LINK" });
  try {
    const {
      authReducer: { token }
    } = getState();
    if (!token) throw new Error("no token");
    const url = `${getServerUrl()}/api/tracelink/new`;
    const options: RequestInit = {
      method: "POST",
      body: JSON.stringify({
        repoName,
        newTraceLink: traceLink
      }),
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    };
    const res = await fetch(url, options).then(res => res.json());
    if (res && res.success) {
      dispatch({
        type: "NEW_TRACE_LINK_SUCCESS",
        payload: { type, link: res.payload }
      });
    } else {
      dispatch({ type: "NEW_TRACE_LINK_FAILURE", meta: res.meta });
    }
  } catch (e) {
    if (process.env.NODE_ENV !== "production") {
      console.log(e);
    }
    dispatch({ type: "NEW_TRACE_LINK_FAILURE" });
  }
};

export const fetchDescriptionRelatedTraceLinks = (
  repoName: string,
  descriptionId: string
): AppThunk<void, TraceLinkActionTypes> => async (dispatch, getState) => {
  dispatch({ type: "FETCH_DESCRIPTION_RELATED_TRACE_LINK" });
  try {
    const {
      authReducer: { token }
    } = getState();
    if (!token) throw new Error("no token");
    const res = await fetch(
      `${getServerUrl()}/api/tracelink?descriptionId=${descriptionId}&repoName=${repoName}`,
      {
        credentials: "include",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    ).then(res => res.json());
    if (res && res.success) {
      dispatch({
        type: "FETCH_DESCRIPTION_RELATED_TRACE_LINK_SUCCESS",
        payload: res.payload
      });
    } else {
      dispatch({
        type: "FETCH_DESCRIPTION_RELATED_TRACE_LINK_FAILURE",
        meta: res.meta
      });
    }
  } catch (e) {
    if (process.env.NODE_ENV !== "production") {
      console.log(e);
    }
    dispatch({ type: "FETCH_DESCRIPTION_RELATED_TRACE_LINK_FAILURE" });
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
  dispatch: AppDispatch<TraceLinkActions>,
  getState
) => {
  dispatch({ type: FETCH_REPO_TRACE_LINK });
  try {
    const {
      authReducer: { token }
    } = getState();
    if (!token) throw new Error("no token");
    const url = `${getServerUrl()}/api/tracelink/matrix?repoName=${repoName}`;
    const res = await fetch(url, {
      credentials: "include",
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(res => res.json());
    if (res && res.success) {
      dispatch({ type: "FETCH_REPO_TRACE_LINK_SUCCESS", payload: res.payload });
    } else {
      dispatch({ type: "FETCH_REPO_TRACE_LINK_FAILURE", meta: res.meta });
    }
  } catch (e) {
    if (process.env.NODE_ENV !== "production") {
      console.log(e);
    }
    dispatch({ type: FETCH_REPO_TRACE_LINK_FAILURE });
  }
};
