import {
  AuthActions,
  IAuthState,
  ISendGitHubLogInSuccessAction,
  ISendLogInSuccessAction,
  SEND_GITHUB_LOG_IN,
  SEND_GITHUB_LOG_IN_FAILURE,
  SEND_GITHUB_LOG_IN_SUCCESS,
  SEND_LOG_IN,
  SEND_LOG_IN_FAILURE,
  SEND_LOG_IN_SUCCESS,
  SEND_REGISTRY,
  SEND_REGISTRY_FAILRE,
  SEND_REGISTRY_SUCCESS,
  TOGGLE_AUTH_MODAL
} from "./types";

const initalAuthState: IAuthState = {
  loggedIn: false,
  authModalVisible: false
};

export const authReducer = (
  state = initalAuthState,
  action: AuthActions
): IAuthState => {
  switch (action.type) {
    case TOGGLE_AUTH_MODAL:
      return {
        ...state,
        authModalVisible: !state.authModalVisible
      };
    case SEND_LOG_IN:
      return {
        ...state,
        error: false,
        loading: true
      };
    case SEND_LOG_IN_SUCCESS:
      return {
        ...state,
        error: false,
        loading: false,
        loggedIn: true,
        email: (action as ISendLogInSuccessAction).payload.email,
        token: (action as ISendLogInSuccessAction).payload.token
      };
    case SEND_LOG_IN_FAILURE:
      return { ...state, error: true, loading: false };
    case SEND_REGISTRY:
      return {
        ...state,
        loading: true
      };
    case SEND_REGISTRY_SUCCESS:
      return {
        ...state,
        loading: false
      };
    case SEND_REGISTRY_FAILRE:
      return {
        ...state,
        loading: false,
        error: true
      };
    case SEND_GITHUB_LOG_IN:
      return {
        ...state,
        loading: true,
        error: false
      };
    case SEND_GITHUB_LOG_IN_SUCCESS:
      return {
        ...state,
        loggedIn: true,
        gitHubAccessToken: (action as ISendGitHubLogInSuccessAction).payload
      };
    case SEND_GITHUB_LOG_IN_FAILURE:
      return {
        ...state,
        loading: false,
        error: true
      };
    default:
      return state;
  }
};
