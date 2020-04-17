import { MapDispatchToProps, MapStateToProps, connect } from "react-redux";
import { RootState } from "../../store/reducers";
import {
  fetchRepoTraceLink,
  fetchFileRelatedTraceLinks
} from "../../store/trace-link/actions";
import { TraceLinkActions } from "../../store/trace-link/types";
import RepositoryFiles, {
  IDispatchProps,
  IOwnProps,
  IStateProps
} from "./repository-files";
import { AppDispatch } from "../../store/store";

const mapStateToProps: MapStateToProps<
  IStateProps,
  IOwnProps,
  RootState
> = state => {
  const {
    traceLinkReducer: { loading, traceLinkMatrix, fileRelatedTraceLinks }
  } = state;

  return {
    loading: loading,
    traceLinks: fileRelatedTraceLinks || []
  };
};

const mapDispatchToProps: MapDispatchToProps<IDispatchProps, IOwnProps> = (
  dispatch: AppDispatch<TraceLinkActions>
) => {
  return {
    fetchFileRelatedTraceLinks: (
      repoName: string,
      fullyQualifiedName: string
    ) => dispatch(fetchFileRelatedTraceLinks(repoName, fullyQualifiedName))
  };
};

export const ConnectedRepositoryFiles = connect(
  mapStateToProps,
  mapDispatchToProps
)(RepositoryFiles);
