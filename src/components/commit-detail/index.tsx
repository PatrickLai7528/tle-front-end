import { connect, MapDispatchToProps, MapStateToProps } from "react-redux";
import { RootState } from "../../store/reducers";
import { AppDispatch } from "../../store/store";
import { fetchCommitRelatedTraceLinks } from "../../store/trace-link/actions";
import { TraceLinkActions } from "../../store/trace-link/types";
import { ICommit } from "../../types";
import CommitDetail, {
  IDispatchProps,
  IOwnProps,
  IStateProps
} from "./commit-detail";

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
