import {
  INotificationState,
  NotificationActions,
  PUSH_NOTIFICATION_QUEUE,
  INotificationQueueItem,
  POP_NOTIFICATION_QUEUE
} from "./types";

const initialState: INotificationState = {
  queue: []
};

export const notificationReducer = (
  state = initialState,
  action: NotificationActions
): INotificationState => {
  switch (action.type) {
    case PUSH_NOTIFICATION_QUEUE:
      const item: INotificationQueueItem = action.payload;
      return {
        ...state,
        queue: [...state.queue, item]
      };
    case POP_NOTIFICATION_QUEUE:
      const [popedItem, ...leftItems] = state.queue;
      return {
        ...state,
        queue: leftItems,
        consumingItem: popedItem
      };
    default:
      return { ...state };
  }
};
