import { IRequirement, IRequirementDescription } from "./../../types/index";
import { ThunkDispatch } from "redux-thunk";
import { RootState } from "./../reducers";
import { AppThunk, AppDispatch } from "./../store";
import {
  RequirementActions,
  FETCH_REPO_REQUIREEMENT_SUCCESS,
  FETCH_REPO_REQUIREMENT,
  FETCH_REPO_REQUIREMENT_FAILURE,
  ADD_REQUIREMENT,
  ADD_REQUIREMENT_SUCCESS,
  ADD_REQUIREMENT_FAILURE,
  TOGGLE_ADD_REQUIREMENT_MODAL,
  UPDATE_REQUIREMENT,
  RequirementActionTypes,
  UPDATE_REQUIREMENT_SUCCESS,
  IUpdateRequirementSuccessAction,
  UPDATE_REQUIREMENT_FAILURE,
  DELETE_REQUIREMENT,
  DELETE_REQUIREMENT_SUCCESS,
  IDeleteRequirementSuccessAction
} from "./types";
import { requirement } from "../../stubs/requirement";
import { getServerUrl } from "../../configs/get-url";

export const postRequirement = (
  requirement: Omit<IRequirement, "_id">
): AppThunk<void, RequirementActionTypes> => async (dispatch, getState) => {
  dispatch({ type: "POST_REQUIREMENT" });
  try {
    const {
      authReducer: { token }
    } = getState();
    if (!token) throw new Error("no token");
    const res = await fetch(`${getServerUrl()}/api/requirement`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      credentials: "include",
      body: JSON.stringify(requirement)
    }).then(res => res.json());
    if (res && res.success) {
      dispatch({ type: "POST_REQUIREMENT_SUCCESS" });
    } else {
      dispatch({ type: "POST_REQUIREMENT_FAILURE", meta: res.meta });
    }
  } catch (e) {
    if (process.env.NODE_ENV !== "production") {
      console.log(e);
    }
    dispatch({ type: "ADD_REQUIREMENT_FAILURE" });
  }
};

export const toggleAddRequirementModal = (): RequirementActions => {
  return {
    type: TOGGLE_ADD_REQUIREMENT_MODAL
  };
};

export const deleteRequirement = (
  requirement: IRequirement,
  description: IRequirementDescription
): AppThunk<void, RequirementActionTypes> => async (dispatch, getState) => {
  dispatch({ type: DELETE_REQUIREMENT });
  try {
    const {
      authReducer: { token }
    } = getState();
    if (!token) throw new Error("no token");
    const url = `${getServerUrl()}/api/requirement/description/${
      requirement._id
    }/${description._id}`;
    const options: RequestInit = {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      credentials: "include"
    };
    const res = await fetch(url, options).then(res => res.json());
    if (res && res.success) {
      const action: IDeleteRequirementSuccessAction = {
        type: DELETE_REQUIREMENT_SUCCESS,
        payload: res.payload
      };
      dispatch(action);
    } else {
      dispatch({ type: "DELETE_REQUIREMENT_FAIULRE", meta: res.meta });
    }
  } catch (e) {
    if (process.env.NODE_ENV !== "production") {
      console.log(e);
    }
    dispatch({ type: DELETE_REQUIREMENT_SUCCESS });
  }
};

export const updateRequirement = (
  requirement: IRequirement
): AppThunk<void, RequirementActionTypes> => async dispatch => {
  dispatch({ type: UPDATE_REQUIREMENT });
  try {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const action: IUpdateRequirementSuccessAction = {
      type: UPDATE_REQUIREMENT_SUCCESS,
      payload: requirement
    };
    dispatch(action);
  } catch (e) {
    if (process.env.NODE_ENV !== "production") {
      console.log(e);
    }
    dispatch({ type: UPDATE_REQUIREMENT_FAILURE });
  }
};

export const fetchRepoRequirement = (
  repoName: string
): AppThunk<void, RequirementActions> => async (
  dispatch: ThunkDispatch<RootState, any, RequirementActions>,
  getState
) => {
  dispatch({ type: FETCH_REPO_REQUIREMENT });
  try {
    const {
      authReducer: { token }
    } = getState();
    if (!token) throw new Error("no token");
    const res = await fetch(
      `${getServerUrl()}/api/requirement?repoName=${repoName}`,
      {
        credentials: "include",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    ).then(res => res.json());
    if (res && res.success) {
      dispatch({ type: FETCH_REPO_REQUIREEMENT_SUCCESS, payload: res.payload });
    } else {
      dispatch({ type: "FETCH_REPO_REQUIREMENT_FAILURE", meta: res.meta });
    }
  } catch (e) {
    if (process.env.NODE_ENV !== "production") {
      console.log(e);
    }
    dispatch({ type: FETCH_REPO_REQUIREMENT_FAILURE });
  }
};

export const addRequirement = (
  requirementId: string,
  requirementDescription: Omit<IRequirementDescription, "_id">
): AppThunk<void, RootState> => async (
  dispatch: AppDispatch<RequirementActions>,
  getState
) => {
  dispatch({ type: ADD_REQUIREMENT });
  try {
    const {
      authReducer: { token }
    } = getState();
    if (!token) throw new Error("no token");

    const url = `${getServerUrl()}/api/requirement/description/${requirementId}`;
    const options: RequestInit = {
      method: "POST",
      body: JSON.stringify({ ...requirementDescription }),
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    };
    const res = await fetch(url, options).then(res => res.json());
    if (res && res.success) {
      dispatch({ type: ADD_REQUIREMENT_SUCCESS, payload: res.payload });
      dispatch(toggleAddRequirementModal());
    } else {
      dispatch({ type: "ADD_REQUIREMENT_FAILURE", meta: res.meta });
    }
  } catch (e) {
    if (process.env.NODE_ENV !== "production") {
      console.log(e);
    }
    dispatch({ type: ADD_REQUIREMENT_FAILURE });
  }
};
