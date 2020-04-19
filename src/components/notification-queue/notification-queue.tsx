import { message, notification } from "antd";
import { FunctionComponent, memo } from "react";
import { INotificationQueueItem } from "../../store/notification/types";

export interface IStateProps {
  queue: INotificationQueueItem[];
}

export interface IDispatchProps {
  pop: () => void;
}

export interface IOwnProps {}

export interface INotificationQueueProps
  extends IStateProps,
    IDispatchProps,
    IOwnProps {}

const NotificationQueue: FunctionComponent<INotificationQueueProps> = memo(
  (props: INotificationQueueProps) => {
    const { queue, pop } = props;
    queue.forEach(async item => {
      if (item.messageOrNotification === "message") {
        message[item.type](item.title, item.duration);
      } else if (item.messageOrNotification === "notification") {
        notification[item.type]({
          message: item.title,
          description: item.description,
          duration: item.duration
        });
      }
      await pop();
    });
    return null;
  }
);

export default NotificationQueue;
