import {
  ITraceLinkState,
  IGenerateInitTraceLinkSuccessAction,
  TraceLinkActions,
  FETCH_REPO_TRACE_LINK,
  FETCH_REPO_TRACE_LINK_SUCCESS,
  FETCH_REPO_TRACE_LINK_FAILURE,
  GENERATE_INIT_TRACE_LINK,
  GENERATE_INIT_TRACE_LINK_SUCCESS,
  GENERATE_INTI_TRACE_LINK_FAILURE,
  TOGGLE_INIT_TRACE_LINK_EDIT_MODAL,
  UPDATE_INIT_TRACE_LINK,
  IUpdateInitTraceLinkAction,
  CONFIRM_INIT_TRACE_LINK,
  IConfirmInitTraceLinkAction,
  SEND_INIT_TRACE_LINK,
  SEND_INIT_TRACE_LINK_SUCCESS,
  SEND_INIT_TRACE_LINK_FAILURE,
  FETCH_COMMIT_RELATED_TRACE_LINK,
  FETCH_COMMIT_RELATED_TRACE_LINK_SUCCESS,
  IFetchCommitRelatedTraceLinkSuccessAction,
  FETCH_COMMIT_RELATED_TRACE_LINK_FAILURE,
  FETCH_FILE_RELATED_TRACE_LINK,
  FETCH_FILE_RELATED_TRACE_LINK_SUCCESS,
  IFetchFileRelatedTraceLinkSuccessAction,
  FETCH_FILE_RELATED_TRACE_LINK_FAILURE
} from "./types";
import { ITraceLinkMatrix } from "../../types";

const initialState: ITraceLinkState = {
  loading: false,
  error: false,
  initTraceLinkLoading: false,
  initTraceLinkEditModalVisible: false,
  initTraceLinkConfirmed: false,
  commitRelatedTraceLinks: {
    added: { traceLinks: [] },
    removed: { traceLinks: [] }
  },
  fileRelatedTraceLinks: []
};

export const traceLinkReducer = (
  state = initialState,
  action: TraceLinkActions
): ITraceLinkState => {
  switch (action.type) {
    case FETCH_FILE_RELATED_TRACE_LINK:
      return {
        ...state,
        loading: true,
        error: false
      };
    case FETCH_FILE_RELATED_TRACE_LINK_SUCCESS:
      return {
        ...state,
        loading: false,
        fileRelatedTraceLinks: [
          ...(action as IFetchFileRelatedTraceLinkSuccessAction).payload
        ]
      };
    case FETCH_FILE_RELATED_TRACE_LINK_FAILURE:
      return {
        ...state,
        loading: false,
        error: true
      };
    case FETCH_COMMIT_RELATED_TRACE_LINK:
      return {
        ...state,
        loading: true,
        error: false
      };
    case FETCH_COMMIT_RELATED_TRACE_LINK_SUCCESS:
      return {
        ...state,
        loading: false,
        commitRelatedTraceLinks: {
          ...(action as IFetchCommitRelatedTraceLinkSuccessAction).payload
        }
      };
    case FETCH_COMMIT_RELATED_TRACE_LINK_FAILURE:
      return {
        ...state,
        loading: false,
        error: true
      };
    case SEND_INIT_TRACE_LINK:
      return {
        ...state,
        loading: true,
        error: false
      };
    case SEND_INIT_TRACE_LINK_SUCCESS:
      return {
        ...state,
        loading: false
      };
    case SEND_INIT_TRACE_LINK_FAILURE:
      return {
        ...state,
        loading: false,
        error: true
      };
    case CONFIRM_INIT_TRACE_LINK:
      return {
        ...state,
        initTraceLinkConfirmed: true,
        initTraceLinkMartix: {
          ...(action as IConfirmInitTraceLinkAction).payload
        }
      };
    case UPDATE_INIT_TRACE_LINK:
      return {
        ...state,
        initTraceLinkMartix: {
          ...(action as IUpdateInitTraceLinkAction).payload
        }
      };
    case TOGGLE_INIT_TRACE_LINK_EDIT_MODAL:
      return {
        ...state,
        initTraceLinkEditModalVisible: !state.initTraceLinkEditModalVisible
      };
    case GENERATE_INIT_TRACE_LINK:
      return {
        ...state,
        initTraceLinkLoading: true
      };
    case GENERATE_INIT_TRACE_LINK_SUCCESS:
      return {
        ...state,
        initTraceLinkLoading: false,
        initTraceLinkMartix: (action as IGenerateInitTraceLinkSuccessAction)
          .payload
      };
    case GENERATE_INTI_TRACE_LINK_FAILURE:
      return {
        ...state,
        initTraceLinkLoading: false,
        error: true
      };
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
