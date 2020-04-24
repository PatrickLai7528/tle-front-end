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
  requirement: IRequirement
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
): AppThunk<void, RequirementActionTypes> => async dispatch => {
  dispatch({ type: DELETE_REQUIREMENT });
  try {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const descriptions = requirement.descriptions;
    descriptions.splice(descriptions.indexOf(description), 1);
    const newRequirement: IRequirement = {
      ...requirement,
      descriptions: [...descriptions]
    };
    const action: IDeleteRequirementSuccessAction = {
      type: DELETE_REQUIREMENT_SUCCESS,
      payload: newRequirement
    };
    dispatch(action);
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
  requirementDesc: string
): AppThunk<void, RootState> => async (
  dispatch: AppDispatch<RequirementActions>
) => {
  dispatch({ type: ADD_REQUIREMENT });
  try {
    await new Promise(resolve => setTimeout(resolve, 1000));

    //TODO
    let fakeData = requirement.descriptions[0];
    fakeData = { ...fakeData, name: requirementDesc, _id: requirementDesc };

    dispatch({ type: ADD_REQUIREMENT_SUCCESS, payload: fakeData });
    dispatch(toggleAddRequirementModal());
  } catch (e) {
    if (process.env.NODE_ENV !== "production") {
      console.log(e);
    }
    dispatch({ type: ADD_REQUIREMENT_FAILURE });
  }
};
