import { getServerUrl } from "./../../configs/get-url";
import { AppThunk } from "../store";
import { ImplementationActionTypes } from "./types";

export const fetchAllImplNames = (
  repoId: string
): AppThunk<void, ImplementationActionTypes> => async (dispatch, getState) => {
  dispatch({ type: "FETCH_ALL_IMPL_NAME" });
  try {
    const {
      authReducer: { token }
    } = getState();
    if (!token) throw new Error("no token");
    const options: RequestInit = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      credentials: "include"
    };
    const url = `${getServerUrl()}/api/repository/filenames/${repoId}`;
    console.log(url);
    console.log(repoId);
    const res = await fetch(url, options).then(res => res.json());
    if (res && res.success) {
      dispatch({ type: "FETCH_ALL_IMPL_NAME_SUCCESS", payload: res.payload });
    } else {
      dispatch({ type: "FETCH_ALL_IMPL_NAME_FAILURE", meta: res.meta });
    }
  } catch (err) {
    if (process.env.NODE_ENV !== "production") console.log(err);
    dispatch({ type: "FETCH_ALL_IMPL_NAME_FAILURE" });
  }
};
