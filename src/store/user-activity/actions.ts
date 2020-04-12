import { activity } from "./../../stubs/activity";
import {
  FETCH_USER_ACTIVITY,
  UserActivityActionTypes,
  FETCH_USER_ACTIVITY_FAILURE,
  FETCH_USER_ACTIVITY_SUCCESS
} from "./types";
import { AppThunk } from "./../store";

export const fetchUserActivity = (): AppThunk<
  void,
  UserActivityActionTypes
> => async dispatch => {
  dispatch({ type: FETCH_USER_ACTIVITY });
  try {
    await new Promise(resolve => setTimeout(resolve, 1200));
    dispatch({ type: FETCH_USER_ACTIVITY_SUCCESS, payload: activity });
  } catch (e) {
    if (process.env.NODE_ENV !== "production") {
      console.log(e);
    }
    dispatch({ type: FETCH_USER_ACTIVITY_FAILURE });
  }
};
