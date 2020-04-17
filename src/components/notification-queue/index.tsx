import { connect, MapStateToProps } from "react-redux";
import { RootState } from "../../store/reducers";
import NotificationQueue, {
  IOwnProps,
  IStateProps
} from "./notification-queue";

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
