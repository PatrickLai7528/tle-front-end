import { connect, MapDispatchToProps, MapStateToProps } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { sendLogIn, sendRegistry } from "../../store/auth/actions";
import { AuthActions, ILogInData, IRegistryData } from "../../store/auth/types";
import { RootState } from "../../store/reducers";
import Auth, { IStateProps, IDispatchProps, IOwnProps } from "./auth";

const mapStateToProps: MapStateToProps<IStateProps, IOwnProps, RootState> = (
  state: RootState
) => {
  return {};
};

const mapDispatchToProps: MapDispatchToProps<IDispatchProps, IOwnProps> = (
  dispatch: ThunkDispatch<RootState, any, AuthActions>
) => {
  return {
    logIn: (data: ILogInData) => dispatch(sendLogIn(data)),
    registry: (data: IRegistryData) => dispatch(sendRegistry(data))
  };
};

export const ConnectedAuth = connect(mapStateToProps, mapDispatchToProps)(Auth);
