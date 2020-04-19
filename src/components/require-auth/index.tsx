import {
  batch,
  connect,
  MapDispatchToProps,
  MapStateToProps
} from "react-redux";
import { fetchGHProfile, loggedIn } from "../../store/auth/actions";
import { pushNotification } from "../../store/notification/actions";
import { INotificationQueueItem } from "../../store/notification/types";
import { RootState } from "../../store/reducers";
import RequireAuth, {
  IDispatchProps,
  IOwnProps,
  IStateProps
} from "./require-auth";

const mapStateToProps: MapStateToProps<IStateProps, IOwnProps, RootState> = (
  state: RootState
) => {
  return {
    loggedIn: !!state.authReducer.loggedIn
  };
};

const mapDispatchToProps: MapDispatchToProps<IDispatchProps, IOwnProps> = (
  dispatch: any
) => {
  return {
    logInFromLocalStorage: (token: string, ghToken: string) =>
      batch(() => {
        dispatch(loggedIn(token, ghToken));
        dispatch(fetchGHProfile(ghToken));
      }),
    pushNotification: (item: INotificationQueueItem) =>
      dispatch(pushNotification(item))
  };
};

export const ConnectedRequireAuth = connect(
  mapStateToProps,
  mapDispatchToProps
)(RequireAuth);
