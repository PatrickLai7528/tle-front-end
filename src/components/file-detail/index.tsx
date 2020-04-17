import { connect, MapDispatchToProps, MapStateToProps } from "react-redux";
import { RootState } from "../../store/reducers";
import { AppDispatch } from "../../store/store";
import { fetchFileRelatedTraceLinks } from "../../store/trace-link/actions";
import { TraceLinkActions } from "../../store/trace-link/types";
import FileDetail, {
  IDispatchProps,
  IOwnProps,
  IStateProps
} from "./file-detail";

const mapStateToProps: MapStateToProps<
  IStateProps,
  IOwnProps,
  RootState
> = state => {
  const {
    traceLinkReducer: { loading, fileRelatedTraceLinks }
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

export const ConnectedFileDetail = connect(
  mapStateToProps,
  mapDispatchToProps
)(FileDetail);
