import CommitDetail, {
  IStateProps,
  IDispatchProps,
  IOwnProps
} from "./commit-detail";
import { MapStateToProps, MapDispatchToProps, connect } from "react-redux";
import { RootState } from "../../store/reducers";
import { ICommit } from "../../types";
import { AppDispatch } from "../../store/store";
import {
  TraceLinkActionTypes,
  TraceLinkActions
} from "../../store/trace-link/types";
import { fetchCommitRelatedTraceLinks } from "../../store/trace-link/actions";

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
    fetchCommitRelatedTraceLinks: (repoName: string, commit: ICommit) =>
      dispatch(fetchCommitRelatedTraceLinks(repoName, commit))
  };
};

export const ConnectedCommitDetail = connect(
  mapStateToProps,
  mapDispatchToProps
)(CommitDetail);
