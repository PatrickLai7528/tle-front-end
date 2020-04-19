import { connect, MapDispatchToProps, MapStateToProps } from "react-redux";
import { Dispatch } from "redux";
import { toggleAuthModal } from "../../store/auth/actions";
import { AuthActions } from "../../store/auth/types";
import { RootState } from "../../store/reducers";
import Home, { IDispatchProps, IOwnProps, IStateProps } from "./home";

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
