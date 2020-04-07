import RepositoryDetail, {
  IStateProps,
  IOwnProps,
  IDispatchProps
} from "./repository-detail";
import { MapStateToProps, MapDispatchToProps, connect } from "react-redux";
import { RootState } from "../../store/reducers";
import { IImportedRepository } from "../../types";
import { ThunkDispatch } from "redux-thunk";
import { RepositoryManagementActions } from "../../store/repository-management/types";
import { fetchImportedRepositoryDetail } from "../../store/repository-management/action";

const mapStateToProps: MapStateToProps<
  IStateProps,
  IOwnProps,
  RootState
> = state => {
  return {
    loading: !!state.repositoryManagementReducer.loading,
    repo: state.repositoryManagementReducer
      .importedRepositoryDetail as IImportedRepository
  };
};

const mapDispatchToProps: MapDispatchToProps<IDispatchProps, IOwnProps> = (
  dispatch: ThunkDispatch<RootState, any, RepositoryManagementActions>,
  ownProps: IOwnProps
) => {
  return {
    fetchRepoDetail: () =>
      dispatch(fetchImportedRepositoryDetail(ownProps.match.params.name))
  };
};

export const ConnectedRepositoryDetailView = connect(
  mapStateToProps,
  mapDispatchToProps
)(RepositoryDetail);
