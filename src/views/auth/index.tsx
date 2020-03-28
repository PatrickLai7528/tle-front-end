import { connect, MapDispatchToProps, MapStateToProps } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { sendLogIn, sendRegistry } from "../../store/auth/actions";
import { AuthActions, ILogInData, IRegistryData } from "../../store/auth/types";
import { RootState } from "../../store/reducers";
import Auth from "./auth";
interface IStateProps {}

interface IDispatchProps {
  logIn: (data: ILogInData) => void;
  registry: (data: IRegistryData) => void;
}

const mapStateToProps: MapStateToProps<IStateProps, void, RootState> = (
  state: RootState
) => {
  return {};
};

const mapDispatchToProps: MapDispatchToProps<IDispatchProps, void> = (
  dispatch: ThunkDispatch<RootState, any, AuthActions>
) => {
  return {
    logIn: (data: ILogInData) => dispatch(sendLogIn(data)),
    registry: (data: IRegistryData) => dispatch(sendRegistry(data))
  };
};

export const AuthView = connect(mapStateToProps, mapDispatchToProps)(Auth);
