import { connect, MapStateToProps, MapDispatchToProps } from "react-redux";
import { RootState } from "../../store/reducers";
import RequireAuth, {
  IOwnProps,
  IStateProps,
  IDispatchProps
} from "./require-auth";
import { loggedIn } from "../../store/auth/actions";
import { INotificationQueueItem } from "../../store/notification/types";
import { pushNotification } from "../../store/notification/actions";

const mapStateToProps: MapStateToProps<IStateProps, IOwnProps, RootState> = (
  state: RootState
) => {
  return {
    loggedIn: !!state.authReducer.loggedIn
  };
};

const mapDispatchToProps: MapDispatchToProps<
  IDispatchProps,
  IOwnProps
> = dispatch => {
  return {
    logInFromLocalStorage: (token: string, ghToken: string) =>
      dispatch(loggedIn(token, ghToken)),
    pushNotification: (item: INotificationQueueItem) =>
      dispatch(pushNotification(item))
  };
};

export const ConnectedRequireAuth = connect(
  mapStateToProps,
  mapDispatchToProps
)(RequireAuth);
