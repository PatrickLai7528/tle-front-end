import RequireAuth, {
  IDispatchProps,
  IOwnProps,
  IStateProps
} from "./require-auth";
import { connect, MapStateToProps } from "react-redux";
import { RootState } from "../../store/reducers";

const mapStateToProps: MapStateToProps<IStateProps, IOwnProps, RootState> = (
  state: RootState
) => {
  return {
    loggedIn: !!state.authReducer.loggedIn
  };
};

export const ConnectedRequireAuth = connect(mapStateToProps)(RequireAuth);
