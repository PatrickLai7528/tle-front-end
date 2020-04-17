import RequirementDetail, {
  IStateProps,
  IDispatchProps,
  IOwnProps
} from "./requirement-detail";
import { MapStateToProps, MapDispatchToProps, connect } from "react-redux";
import { RootState } from "../../store/reducers";
import { AppDispatch } from "../../store/store";
import { TraceLinkActions } from "../../store/trace-link/types";
import { fetchRequirementRelatedTraceLinks } from "../../store/trace-link/actions";

const mapStateToProps: MapStateToProps<
  IStateProps,
  IOwnProps,
  RootState
> = state => {
  const {
    traceLinkReducer: { loading, requirementRelatedTraceLinks }
  } = state;
  return {
    loading: loading,
    traceLinks: requirementRelatedTraceLinks
  };
};

const mapDispatchToProps: MapDispatchToProps<IDispatchProps, IOwnProps> = (
  dispatch: AppDispatch<TraceLinkActions>
) => {
  return {
    fetchRequirementRelatedTraceLinks: (
      repoName: string,
      requirementId: string
    ) => dispatch(fetchRequirementRelatedTraceLinks(repoName, requirementId))
  };
};

export const ConnectedRequirementDetail = connect(
  mapStateToProps,
  mapDispatchToProps
)(RequirementDetail);
