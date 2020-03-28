import { createStore, applyMiddleware, Action, compose } from "redux";
import rootReducer from "./reducers";
import thunk, { ThunkAction } from "redux-thunk";
import { RootState } from "./reducers";

//@ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export type AppThunk<ReturnType = void, a = string> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<a>
>;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
