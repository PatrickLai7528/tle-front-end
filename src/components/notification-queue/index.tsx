import NotificationQueue, {
  IStateProps,
  IDispatchProps,
  IOwnProps
} from "./notification-queue";
import { MapStateToProps, connect } from "react-redux";
import { RootState } from "../../store/reducers";

const mapStateToProps: MapStateToProps<
  IStateProps,
  IOwnProps,
  RootState
> = state => {
  return {
    queue: state.notificationReducer.queue
  };
};

export const ConnectedNotificatioQueue = connect(mapStateToProps)(
  NotificationQueue
);
