import { IStatistic } from "./../../types/index";
export const FETCH_FILE_STATISTIC = "FETCH_FILE_STATISTIC";
export const FETCH_FILE_STATISTIC_SUCCESS = "FETCH_FILE_STATISTIC_SUCCESS";
export const FETCH_FILE_STATISTIC_FAILURE = "FETCH_FILE_STATISTIC_FAILURE";

export const FETCH_REQUIREMENT_STATISTIC = "FETCH_REQUIREMENT_STATISTIC";
export const FETCH_REQUIREMENT_STATISTIC_SUCCESS =
  "FETCH_REQUIREMENT_STATISTIC_SUCCESS";
export const FETCH_REQUIREMENT_STATISTIC_FAILURE =
  "FETCH_REQUIREMENT_STATISTIC_FAILURE";

export interface IFetchRequirementStatisticAction {
  type: typeof FETCH_REQUIREMENT_STATISTIC;
}

export interface IFetchRequirementStatisticSuccessAction {
  type: typeof FETCH_REQUIREMENT_STATISTIC_SUCCESS;
  payload: IStatistic[];
}

export interface IFetchRequirementStatisticFailureAction {
  type: typeof FETCH_REQUIREMENT_STATISTIC_FAILURE;
}

export interface IStatisticState {
  fileStatistics: IStatistic[];
  requirementStatistic: IStatistic[];
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
  | IFetchFileStatisticFailureAction
  | IFetchRequirementStatisticAction
  | IFetchRequirementStatisticSuccessAction
  | IFetchRequirementStatisticFailureAction;

export type StatisticActionTypes =
  | typeof FETCH_FILE_STATISTIC
  | typeof FETCH_FILE_STATISTIC_SUCCESS
  | typeof FETCH_FILE_STATISTIC_FAILURE
  | typeof FETCH_REQUIREMENT_STATISTIC
  | typeof FETCH_REQUIREMENT_STATISTIC_SUCCESS
  | typeof FETCH_REQUIREMENT_STATISTIC_FAILURE;
