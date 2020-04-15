import {
  ADD_REQUIREMENT,
  ADD_REQUIREMENT_FAILURE,
  ADD_REQUIREMENT_SUCCESS,
  FETCH_REPO_REQUIREEMENT_SUCCESS,
  FETCH_REPO_REQUIREMENT,
  FETCH_REPO_REQUIREMENT_FAILURE,
  IAddRequirementSuccessAction,
  IRequirementState,
  RequirementActions,
  TOGGLE_ADD_REQUIREMENT_MODAL,
  DELETE_REQUIREMENT,
  DELETE_REQUIREMENT_SUCCESS,
  IDeleteRequirementSuccessAction,
  DELETE_REQUIREMENT_FAILURE
} from "./types";

const initialState: IRequirementState = {
  loading: false,
  addRequirementLoading: false,
  addRequirementModalVisible: false,
  deleteRequirementLoading: false
};

export const requirementReducer = (
  state = initialState,
  action: RequirementActions
): IRequirementState => {
  switch (action.type) {
    case DELETE_REQUIREMENT:
      return {
        ...state,
        deleteRequirementLoading: true
      };
    case DELETE_REQUIREMENT_SUCCESS:
      return {
        ...state,
        deleteRequirementLoading: false,
        requirement: (action as IDeleteRequirementSuccessAction).payload
      };
    case DELETE_REQUIREMENT_FAILURE:
      return {
        ...state,
        error: true,
        deleteRequirementLoading: false
      };
    case ADD_REQUIREMENT:
      return {
        ...state,
        addRequirementLoading: true
      };
    case ADD_REQUIREMENT_SUCCESS:
      return {
        ...state,
        addRequirementLoading: false,
        requirement: state.requirement
          ? {
              ...state.requirement,
              descriptions: [
                (action as IAddRequirementSuccessAction).payload,
                ...state.requirement.descriptions
              ]
            }
          : undefined
      };
    case ADD_REQUIREMENT_FAILURE:
      return {
        ...state,
        addRequirementLoading: false
      };
    case TOGGLE_ADD_REQUIREMENT_MODAL:
      return {
        ...state,
        addRequirementModalVisible: !state.addRequirementModalVisible
      };
    case FETCH_REPO_REQUIREMENT:
      return {
        ...state,
        loading: true,
        error: false
      };
    case FETCH_REPO_REQUIREEMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        requirement: action.payload,
        error: false
      };
    case FETCH_REPO_REQUIREMENT_FAILURE:
      return {
        ...state,
        loading: false,
        error: true
      };
    default:
      return { ...state };
  }
};
