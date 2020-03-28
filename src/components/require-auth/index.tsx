import Component from "./require-auth";
import { connect, MapStateToProps } from "react-redux";
import { RootState } from "../../store/reducers";

export interface IStateProps {
  loggedIn: boolean;
}

const mapStateToProps: MapStateToProps<IStateProps, any, RootState> = (
  state: RootState
) => {
  return {
    loggedIn: !!state.authReducer.loggedIn
  };
};

export const RequireAuth = connect(mapStateToProps)(Component);
