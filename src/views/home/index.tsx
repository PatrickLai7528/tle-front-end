import Home, { IStateProps, IDispatchProps, IOwnProps } from "./home";
import { MapStateToProps, connect, MapDispatchToProps } from "react-redux";
import { RootState } from "../../store/reducers";
import { Dispatch } from "redux";
import { AuthActions } from "../../store/auth/types";
import { toggleAuthModal } from "../../store/auth/actions";

const mapStateToProps: MapStateToProps<
  IStateProps,
  IOwnProps,
  RootState
> = state => {
  return {
    authModalVisible: state.authReducer.authModalVisible
  };
};

const mapDispatchToProps: MapDispatchToProps<IDispatchProps, IOwnProps> = (
  dispatch: Dispatch<AuthActions>
) => {
  return {
    toggle: () => dispatch(toggleAuthModal())
  };
};

export const ConnectedHomeView = connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
