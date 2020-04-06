import WorkPlace, { IDispatchProps, IOwnProps, IStateProps } from "./workplace";
import { MapStateToProps, MapDispatchToProps, connect } from "react-redux";
import { RootState } from "../../store/reducers";

const mapStateToProps: MapStateToProps<IStateProps, IOwnProps, RootState> = (
  state: RootState
) => {
  return {
    userAvatarUrl: "https://avatars3.githubusercontent.com/u/28004715?v=4",
    userName: "PatrickLai",
    userProfile: "123123123123"
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
