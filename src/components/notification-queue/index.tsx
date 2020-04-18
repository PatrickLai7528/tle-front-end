import { connect, MapStateToProps, MapDispatchToProps } from "react-redux";
import { RootState } from "../../store/reducers";
import NotificationQueue, {
  IOwnProps,
  IStateProps,
  IDispatchProps
} from "./notification-queue";
import { popNotification } from "../../store/notification/actions";

const mapStateToProps: MapStateToProps<
  IStateProps,
  IOwnProps,
  RootState
> = state => {
  return {
    queue: state.notificationReducer.queue
  };
};

const mapDispatchToProps: MapDispatchToProps<
  IDispatchProps,
  IOwnProps
> = dispatch => {
  return {
    pop: () => dispatch(popNotification())
  };
};

export const ConnectedNotificatioQueue = connect(
  mapStateToProps,
  mapDispatchToProps
)(NotificationQueue);
