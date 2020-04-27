import {
  IImplementationState,
  ImplementationActions,
  IFetchAllImplNameSuccessAction
} from "./types";
import { Reducer } from "redux";

const initialState: IImplementationState = {
  names: [],
  fetchLoading: false,
  error: false
};

export const implementationReducer: Reducer<IImplementationState> = (
  state = initialState,
  action: ImplementationActions
) => {
  switch (action.type) {
    case "FETCH_ALL_IMPL_NAME":
      return {
        ...state,
        fetchLoading: false,
        error: false
      };
    case "FETCH_ALL_IMPL_NAME_SUCCESS":
      return {
        ...state,
        fetchLoading: true,
        names: (action as IFetchAllImplNameSuccessAction).payload
      };
    case "FETCH_ALL_IMPL_NAME_FAILURE":
      return {
        ...state,
        fetchLoading: false
      };
    default:
      return { ...state };
  }
};
