import {
  ITraceLinkState,
  TraceLinkActions,
  FETCH_REPO_TRACE_LINK,
  FETCH_REPO_TRACE_LINK_SUCCESS,
  FETCH_REPO_TRACE_LINK_FAILURE
} from "./types";
import { ITraceLinkMatrix } from "../../types";

const initialState: ITraceLinkState = {
  loading: false,
  error: false
};

export const traceLinkReducer = (
  state = initialState,
  action: TraceLinkActions
): ITraceLinkState => {
  switch (action.type) {
    case FETCH_REPO_TRACE_LINK:
      return {
        ...state,
        loading: true,
        error: false
      };
    case FETCH_REPO_TRACE_LINK_SUCCESS:
      return {
        ...state,
        loading: false,
        traceLinkMatrix: action.payload as ITraceLinkMatrix
      };
    case FETCH_REPO_TRACE_LINK_FAILURE:
      return {
        ...state,
        loading: false,
        error: true
      };
    default:
      return { ...state };
  }
};
