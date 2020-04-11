import { connect, MapDispatchToProps, MapStateToProps } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { sendLogIn, sendRegistry } from "../../store/auth/actions";
import { AuthActions, ILogInData, IRegistryData } from "../../store/auth/types";
import {
  NotificationActions,
  INotificationQueueItem
} from "../../store/notification/types";
import { RootState } from "../../store/reducers";
import Auth, { IDispatchProps, IOwnProps, IStateProps } from "./auth";
import { pushNotification } from "../../store/notification/actions";

const mapStateToProps: MapStateToProps<IStateProps, IOwnProps, RootState> = (
  state: RootState
) => {
  return {
    loading: !!state.authReducer.loading,
    error: !!state.authReducer.error
  };
};

const mapDispatchToProps: MapDispatchToProps<IDispatchProps, IOwnProps> = (
  dispatch: ThunkDispatch<RootState, any, AuthActions | NotificationActions>
) => {
  return {
    logIn: (data: ILogInData): Promise<boolean> => dispatch(sendLogIn(data)),
    registry: (data: IRegistryData): Promise<boolean> =>
      dispatch(sendRegistry(data)),
    pushNotification: (item: INotificationQueueItem) =>
      dispatch(pushNotification(item))
  };
};

export const ConnectedAuth = connect(mapStateToProps, mapDispatchToProps)(Auth);
