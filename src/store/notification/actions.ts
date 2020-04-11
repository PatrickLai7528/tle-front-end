import {
  INotificationQueueItem,
  PUSH_NOTIFICATION_QUEUE,
  IPushNotificationQueueAction
} from "./types";

export const pushNotification = (
  item: INotificationQueueItem
): IPushNotificationQueueAction => {
  return {
    type: PUSH_NOTIFICATION_QUEUE,
    payload: item
  };
};
