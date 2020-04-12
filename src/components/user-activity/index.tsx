import UserActivity, {
  IStateProps,
  IDispatchProps,
  IOwnProps
} from "./user-activity";
import { RootState } from "../../store/reducers";
import { MapStateToProps, MapDispatchToProps, connect } from "react-redux";
import { AppDispatch } from "../../store/store";
import { UserActivityActions } from "../../store/user-activity/types";
import { fetchUserActivity } from "../../store/user-activity/actions";

const mapStateToProps: MapStateToProps<
  IStateProps,
  IOwnProps,
  RootState
> = state => {
  return {
    loading: state.userActivityReducer.loading,
    activities: state.userActivityReducer.activities
  };
};

const mapDispatchToProps: MapDispatchToProps<IDispatchProps, IOwnProps> = (
  dispatch: AppDispatch<UserActivityActions>
) => {
  return {
    fetchUserActivities: () => dispatch(fetchUserActivity())
  };
};

export const ConnectedUserActivity = connect(
  mapStateToProps,
  mapDispatchToProps
)(UserActivity);
