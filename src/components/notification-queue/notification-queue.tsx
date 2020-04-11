import { notification, message } from "antd";
import { FunctionComponent, memo } from "react";
import { INotificationQueueItem } from "../../store/notification/types";
import { duration } from "moment";

export interface IStateProps {
  queue: INotificationQueueItem[];
}

export interface IDispatchProps {}

export interface IOwnProps {}

export interface INotificationQueueProps
  extends IStateProps,
    IDispatchProps,
    IOwnProps {}

const NotificationQueue: FunctionComponent<INotificationQueueProps> = memo(
  (props: INotificationQueueProps) => {
    const { queue } = props;
    queue.forEach(async item => {
      if (item.messageOrNotification === "message") {
        await message[item.type](item.title, item.duration);
      } else if (item.messageOrNotification === "notification") {
        notification[item.type]({
          message: item.title,
          description: item.description,
          duration: item.duration
        });
      }
    });
    return null;
  }
);

export default NotificationQueue;
