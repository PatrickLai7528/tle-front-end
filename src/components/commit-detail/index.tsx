import CommitDetail, {
  IStateProps,
  IDispatchProps,
  IOwnProps
} from "./commit-detail";
import { MapStateToProps, MapDispatchToProps, connect } from "react-redux";
import { RootState } from "../../store/reducers";
import { ICommit } from "../../types";
import { fetchRelatedTraceLinks } from "../../store/trace-link/actions";
import { AppDispatch } from "../../store/store";
import {
  TraceLinkActionTypes,
  TraceLinkActions
} from "../../store/trace-link/types";

const mapStateToProps: MapStateToProps<
  IStateProps,
  IOwnProps,
  RootState
> = state => {
  const {
    traceLinkReducer: { commitRelatedTraceLinks, loading }
  } = state;

  return {
    traceLinks: commitRelatedTraceLinks || [],
    fetchTraceLinkLoading: loading
  };
};

const mapDispatchToProps: MapDispatchToProps<IDispatchProps, IOwnProps> = (
  dispatch: AppDispatch<TraceLinkActions>
) => {
  return {
    fetchRelatedTraceLinks: (commit: ICommit) =>
      dispatch(fetchRelatedTraceLinks(commit))
  };
};

export const ConnectedCommitDetail = connect(
  mapStateToProps,
  mapDispatchToProps
)(CommitDetail);
