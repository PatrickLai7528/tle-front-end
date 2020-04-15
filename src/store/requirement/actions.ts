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
    const [removed, ...others] = requirement.descriptions;
    const newRewquirement: IRequirement = {
      ...requirement,
      descriptions: [...others]
    };
    const action: IUpdateRequirementSuccessAction = {
      type: UPDATE_REQUIREMENT_SUCCESS,
      payload: newRewquirement
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
  dispatch: ThunkDispatch<RootState, any, RequirementActions>
) => {
  dispatch({ type: FETCH_REPO_REQUIREMENT });
  try {
    await new Promise(resolve => setTimeout(resolve, 1000));
    dispatch({ type: FETCH_REPO_REQUIREEMENT_SUCCESS, payload: requirement });
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
    fakeData = { ...fakeData, text: requirementDesc, id: requirementDesc };

    dispatch({ type: ADD_REQUIREMENT_SUCCESS, payload: fakeData });
    dispatch(toggleAddRequirementModal());
  } catch (e) {
    if (process.env.NODE_ENV !== "production") {
      console.log(e);
    }
    dispatch({ type: ADD_REQUIREMENT_FAILURE });
  }
};
