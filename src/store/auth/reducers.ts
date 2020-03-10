import {
  IAuthState,
  AuthActionTypes,
  SEND_LOG_IN,
  SEND_REGISTRY
} from "./types";

const initalAuthState: IAuthState = {
  loggedIn: false
};

export const authReducer = (
  state = initalAuthState,
  action: AuthActionTypes
): IAuthState => {
  switch (action.type) {
    case SEND_LOG_IN:
      return {
        loggedIn: true,
        userID: "fake user id"
      };
    case SEND_REGISTRY:
      return state;
    default:
      return state;
  }
};
