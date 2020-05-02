import { IStatistic } from "./../../types/index";
export const FETCH_FILE_STATISTIC = "FETCH_FILE_STATISTIC";
export const FETCH_FILE_STATISTIC_SUCCESS = "FETCH_FILE_STATISTIC_SUCCESS";
export const FETCH_FILE_STATISTIC_FAILURE = "FETCH_FILE_STATISTIC_FAILURE";

export interface IStatisticState {
  fileStatistics: IStatistic[];
  loading: boolean;
  error: boolean | string;
}

export interface IFetchFileStatisticAction {
  type: typeof FETCH_FILE_STATISTIC;
}

export interface IFetchFileStatisticSuccessAction {
  type: typeof FETCH_FILE_STATISTIC_SUCCESS;
  payload: IStatistic[];
}

export interface IFetchFileStatisticFailureAction {
  type: typeof FETCH_FILE_STATISTIC_FAILURE;
  payload: IStatistic[];
}

export type StatisticActions =
  | IFetchFileStatisticAction
  | IFetchFileStatisticSuccessAction
  | IFetchFileStatisticFailureAction;
export type StatisticActionTypes =
  | typeof FETCH_FILE_STATISTIC
  | typeof FETCH_FILE_STATISTIC_SUCCESS
  | typeof FETCH_FILE_STATISTIC_FAILURE;
