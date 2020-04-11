import WorkPlace, { IDispatchProps, IOwnProps, IStateProps } from "./workplace";
import { MapStateToProps, MapDispatchToProps, connect } from "react-redux";
import { RootState } from "../../store/reducers";

const mapStateToProps: MapStateToProps<IStateProps, IOwnProps, RootState> = (
  state: RootState
) => {
  const {
    authReducer: { ghProfile, loading }
  } = state;
  return {
    loading: !!loading,
    userAvatarUrl: ghProfile?.avatarUrl,
    userName: ghProfile?.login,
    userProfile: ghProfile?.bio
  };
};

const mapDispatchToProps: MapDispatchToProps<
  IDispatchProps,
  IOwnProps
> = dispatch => {};

export const ConnectedWorkPlaceView = connect(
  mapStateToProps,
  mapDispatchToProps
)(WorkPlace);
