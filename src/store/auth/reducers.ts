import {
  AuthActions,
  FETCH_GH_PROFILE,
  FETCH_GH_PROFILE_FAILURE,
  FETCH_GH_PROFILE_SUCCESS,
  IAuthState,
  IFetchGHProfileSuccessAction,
  ISendGitHubLogInSuccessAction,
  ISendLogInFailureAction,
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

export const initalAuthState: IAuthState = {
  loggedIn: false,
  authModalVisible: false
};

export const authReducer = (
  state = initalAuthState,
  action: AuthActions
): IAuthState => {
  switch (action.type) {
    case FETCH_GH_PROFILE:
      return {
        ...state,
        loading: true
      };
    case FETCH_GH_PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        ghProfile: (action as IFetchGHProfileSuccessAction).payload
      };
    case FETCH_GH_PROFILE_FAILURE:
      return {
        ...state,
        loading: false,
        error: true
      };
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
        token: (action as ISendLogInSuccessAction).payload.token,
        githubId: (action as ISendLogInSuccessAction).payload.githubId
      };
    case SEND_LOG_IN_FAILURE:
      return {
        ...state,
        error: (action as ISendLogInFailureAction).meta || "登錄失敗",
        loading: false
      };
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
