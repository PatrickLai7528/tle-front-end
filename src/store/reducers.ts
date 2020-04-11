import { notificationReducer } from "./notification/reducers";
import { traceLinkReducer } from "./trace-link/reducers";
import { requirementReducer } from "./requirement/reducers";
import { combineReducers } from "redux";
import { authReducer } from "./auth/reducers";
import { importRepositoryReducer } from "./import-repository/reducer";
import { repositoryManagementReducer } from "./repository-management/reducer";
import { searchReducer } from "./search-repository/reducers";

const rootReducer = combineReducers({
  authReducer,
  repositoryManagementReducer,
  importRepositoryReducer,
  searchReducer,
  requirementReducer,
  traceLinkReducer,
  notificationReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
