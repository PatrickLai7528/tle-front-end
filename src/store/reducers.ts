import { statisticReducer } from "./statistic/reducers";
import { userActivityReducer } from "./user-activity/reducers";
import { notificationReducer } from "./notification/reducers";
import { traceLinkReducer } from "./trace-link/reducers";
import { requirementReducer } from "./requirement/reducers";
import { combineReducers } from "redux";
import { authReducer } from "./auth/reducers";
import { importRepositoryReducer } from "./import-repository/reducer";
import { repositoryReducer } from "./repository/reducer";
import { searchReducer } from "./search-github-repository/reducers";
import { implementationReducer } from "./implementation/reducers";

const rootReducer = combineReducers({
  authReducer,
  repositoryReducer: repositoryReducer,
  importRepositoryReducer,
  searchReducer,
  requirementReducer,
  traceLinkReducer,
  notificationReducer,
  userActivityReducer,
  implementationReducer,
  statisticReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
