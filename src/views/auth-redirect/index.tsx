import { connect, MapDispatchToProps, MapStateToProps } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { sendGitHubLogIn } from "../../store/auth/actions";
import { AuthActions } from "../../store/auth/types";
import { RootState } from "../../store/reducers";
import AuthRedirect from "./auth-redirect";

export interface IOwnProps {
  successRedirect: string;
  failureRedirect: string;
}

export interface IStateProps {
  loggedIn: boolean;
  error: boolean;
}

export interface IDispatchProps {
  sendGitHubLogIn: (code: string) => void;
}

const mapStateToProps: MapStateToProps<IStateProps, IOwnProps, RootState> = (
  state: RootState
) => {
  return {
    loggedIn: state.authReducer.loggedIn,
    error: !!state.authReducer.error
  };
};

const mapDispatchToProps: MapDispatchToProps<IDispatchProps, IOwnProps> = (
  dispatch: ThunkDispatch<RootState, any, AuthActions>
) => {
  return {
    sendGitHubLogIn: code => dispatch(sendGitHubLogIn(code))
  };
};

export const AuthRedirectView = connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthRedirect);
