import { AppThunk } from "./../store";
import { StatisticActionTypes } from "./types";
import { getServerUrl } from "../../configs/get-url";

export const fetchFileStatistic = (
  repoId: string
): AppThunk<void, StatisticActionTypes> => async (dispatch, getState) => {
  dispatch({ type: "FETCH_FILE_STATISTIC" });
  try {
    const {
      authReducer: { token }
    } = getState();
    if (!token) throw new Error("no tokne");
    const url = `${getServerUrl()}/api/statistic/file?repoId=${repoId}`;
    const options: RequestInit = {
      credentials: "include",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json"
      }
    };
    const res = await fetch(url, options).then(res => res.json());
    if (res && res.success) {
      dispatch({ type: "FETCH_FILE_STATISTIC_SUCCESS", payload: res.payload });
    } else {
      dispatch({ type: "FETCH_FILE_STATISTIC_FAILURE", meta: res.meta });
    }
  } catch (e) {
    if (process.env.NODE_ENV !== "production") {
      console.log(e);
    }
    dispatch({ type: "FETCH_FILE_STATISTIC_FAILURE" });
  }
};
