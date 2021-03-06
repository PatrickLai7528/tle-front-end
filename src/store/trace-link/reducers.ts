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
  FETCH_FILE_RELATED_TRACE_LINK_FAILURE,
  IFetchDescriptionRelatedTraceLinkSuccessAction,
  ISendInitTraceLinkFailureAction,
  INewTraceLinkSuccessAction,
  IDeleteTraceLinkSuccessAction
} from "./types";
import { ITraceLinkMatrix } from "../../types";

const initialState: ITraceLinkState = {
  loading: false,
  error: false,
  initTraceLinkLoading: false,
  initTraceLinkEditModalVisible: false,
  initTraceLinkConfirmed: false,
  commitRelatedTraceLinks: {
    confirmed: false,
    added: { traceLinks: [] },
    removed: { traceLinks: [] }
  },
  fileRelatedTraceLinks: [],
  requirementRelatedTraceLinks: [],

  sendNewTraceLinkLoading: false,
  deleteTraceLinkLoading: false
};

export const traceLinkReducer = (
  state = initialState,
  action: TraceLinkActions
): ITraceLinkState => {
  switch (action.type) {
    case "REMOVE_COMMIT_RELATED_TRACE_LINK": {
      let { commitRelatedTraceLinks } = state;

      commitRelatedTraceLinks.added.traceLinks = commitRelatedTraceLinks.added.traceLinks.filter(
        link => link._id !== action.payload._id
      );
      commitRelatedTraceLinks.removed.traceLinks = commitRelatedTraceLinks.removed.traceLinks.filter(
        link => link._id !== action.payload._id
      );
      return {
        ...state,
        commitRelatedTraceLinks: { ...commitRelatedTraceLinks }
      };
    }
    case "ADD_COMMIT_RELATED_TRACE_LINK": {
      let { commitRelatedTraceLinks } = state;
      if (action.payload.type === "added") {
        commitRelatedTraceLinks.added.traceLinks.push({
          requirementDescription: action.payload.description,
          implement: { fullyQualifiedName: action.payload.implement } as any
        } as any);
      } else if (action.payload.type === "removed") {
        commitRelatedTraceLinks.removed.traceLinks.push({
          requirementDescription: action.payload.description,
          implement: { fullyQualifiedName: action.payload.implement } as any
        } as any);
      }
      return {
        ...state,
        commitRelatedTraceLinks: { ...commitRelatedTraceLinks }
      };
    }
    case "CONFIRM_COMMIT_TRACE_LINK_CHANGE": {
      return {
        ...state,
        loading: true
      };
    }
    case "CONFIRM_COMMIT_TRACE_LINK_CHANGE_SUCCESS": {
      return {
        ...state,
        loading: false,
        commitRelatedTraceLinks: action.payload
      };
    }
    case "CONFIRM_COMMIT_TRACE_LINK_CHANGE_FAILURE": {
      return {
        ...state,
        loading: false,
        error: action.meta
      };
    }
    case "DELETE_TRACE_LINK":
      return {
        ...state,
        deleteTraceLinkLoading: true,
        error: false
      };
    case "DELETE_TRACE_LINK_SUCCESS": {
      const payload = (action as IDeleteTraceLinkSuccessAction).payload;
      if (payload.type === "REQUIREMENT") {
        const newState = {
          ...state,
          deleteTraceLinkLoading: false,
          requirementRelatedTraceLinks: [
            ...state.requirementRelatedTraceLinks.filter(
              link => link._id.toString() !== payload.link._id.toString()
            )
          ]
        };
        return newState;
      } else if (payload.type === "FILE") {
        const newState = {
          ...state,
          deleteTraceLinkLoading: false,
          fileRelatedTraceLinks: [
            ...state.fileRelatedTraceLinks.filter(
              link => link._id.toString() !== payload.link._id.toString()
            )
          ]
        };
        return newState;
      }
      return { ...state };
    }
    case "DELETE_TRACE_LINK_FALIURE": {
      return { ...state, deleteTraceLinkLoading: false, error: true };
    }
    case "NEW_TRACE_LINK":
      return {
        ...state,
        sendNewTraceLinkLoading: true,
        error: false
      };
    case "NEW_TRACE_LINK_SUCCESS":
      const payload = (action as INewTraceLinkSuccessAction).payload;
      if (payload.type === "REQUIREMENT") {
        const newState = {
          ...state,
          sendNewTraceLinkLoading: false,
          requirementRelatedTraceLinks: [
            payload.link,
            ...state.requirementRelatedTraceLinks
          ]
        };
        return newState;
      } else if (payload.type === "FILE") {
        const newState = {
          ...state,
          sendNewTraceLinkLoading: false,
          fileRelatedTraceLinks: [payload.link, ...state.fileRelatedTraceLinks]
        };
        return newState;
      }
      return { ...state };
    case "NEW_TRACE_LINK_FAILURE":
      return {
        ...state,
        sendNewTraceLinkLoading: false,
        error: true
      };
    case "FETCH_DESCRIPTION_RELATED_TRACE_LINK":
      return {
        ...state,
        loading: true,
        error: false
      };
    case "FETCH_DESCRIPTION_RELATED_TRACE_LINK_SUCCESS":
      return {
        ...state,
        loading: false,
        requirementRelatedTraceLinks: [
          ...(action as IFetchDescriptionRelatedTraceLinkSuccessAction).payload
        ]
      };
    case "FETCH_DESCRIPTION_RELATED_TRACE_LINK_FAILURE":
      return {
        ...state,
        loading: false,
        error: true
      };
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
        loading: false,
        initTraceLinkMartix: undefined
      };
    case SEND_INIT_TRACE_LINK_FAILURE:
      return {
        ...state,
        loading: false,
        error: (action as ISendInitTraceLinkFailureAction).meta
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
        initTraceLinkLoading: true,
        initTraceLinkConfirmed: false
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
