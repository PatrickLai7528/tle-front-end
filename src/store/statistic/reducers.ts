import {
  IFetchFileStatisticSuccessAction,
  IStatisticState,
  StatisticActions,
  IFetchRequirementStatisticSuccessAction
} from "./types";

const initialState: IStatisticState = {
  fileStatistics: [],
  requirementStatistic: [],
  loading: false,
  error: false
};

export const statisticReducer = (
  state = initialState,
  action: StatisticActions
): IStatisticState => {
  if (action.type === "FETCH_FILE_STATISTIC") {
    return {
      ...state,
      loading: true
    };
  } else if (action.type === "FETCH_FILE_STATISTIC_SUCCESS") {
    return {
      ...state,
      loading: false,
      fileStatistics: (action as IFetchFileStatisticSuccessAction).payload
    };
  } else if (action.type === "FETCH_FILE_STATISTIC_FAILURE") {
    return {
      ...state,
      loading: false,
      error: false
    };
  } else if (action.type === "FETCH_REQUIREMENT_STATISTIC") {
    return {
      ...state,
      loading: true,
      error: false
    };
  } else if (action.type === "FETCH_REQUIREMENT_STATISTIC_SUCCESS") {
    return {
      ...state,
      loading: false,
      requirementStatistic: (action as IFetchRequirementStatisticSuccessAction)
        .payload
    };
  } else if (action.type === "FETCH_REQUIREMENT_STATISTIC_FAILURE") {
    return {
      ...state,
      loading: false
    };
  } else return state;
};
