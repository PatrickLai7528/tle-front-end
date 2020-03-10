import { authReducer } from "./auth/reducers";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  authReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
