export const FETCH_ALL_IMPL_NAME = "FETCH_ALL_IMPL_NAME";
export const FETCH_ALL_IMPL_NAME_SUCCESS = "FETCH_ALL_IMPL_NAME_SUCCESS";
export const FETCH_ALL_IMPL_NAME_FAILURE = "FETCH_ALL_IMPL_NAME_FAILURE";

export interface IFetchAllImplNameAction {
  type: typeof FETCH_ALL_IMPL_NAME;
}

export interface IFetchAllImplNameSuccessAction {
  type: typeof FETCH_ALL_IMPL_NAME_SUCCESS;
  payload: string[];
}

export interface IFetchAllImplNameFailureAction {
  type: typeof FETCH_ALL_IMPL_NAME_FAILURE;
}

export interface IImplementationState {
  names: string[];

  fetchLoading: boolean;
  error: boolean | string;
}

export type ImplementationActions =
  | IFetchAllImplNameAction
  | IFetchAllImplNameSuccessAction
  | IFetchAllImplNameFailureAction;
export type ImplementationActionTypes =
  | typeof FETCH_ALL_IMPL_NAME
  | typeof FETCH_ALL_IMPL_NAME_SUCCESS
  | typeof FETCH_ALL_IMPL_NAME_FAILURE;
