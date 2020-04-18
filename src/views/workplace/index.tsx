import { connect, MapDispatchToProps, MapStateToProps } from "react-redux";
import { fetchGHProfile } from "../../store/auth/actions";
import { AuthActions } from "../../store/auth/types";
import { RootState } from "../../store/reducers";
import { AppDispatch } from "../../store/store";
import WorkPlace, { IDispatchProps, IOwnProps, IStateProps } from "./workplace";

const mapStateToProps: MapStateToProps<IStateProps, IOwnProps, RootState> = (
  state: RootState
) => {
  const {
    authReducer: { ghProfile, loading, gitHubAccessToken }
  } = state;
  return {
    githubAccessToken: gitHubAccessToken,
    loading: !!loading,
    userAvatarUrl: ghProfile?.avatarUrl,
    userName: ghProfile?.login,
    userProfile: ghProfile?.bio
  };
};

const mapDispatchToProps: MapDispatchToProps<IDispatchProps, IOwnProps> = (
  dispatch: AppDispatch<AuthActions>
) => {
  return {
    fetchGHProfile: (ghToken: string) => dispatch(fetchGHProfile(ghToken))
  };
};

export const ConnectedWorkPlaceView = connect(
  mapStateToProps,
  mapDispatchToProps
)(WorkPlace);
