import RepositoryDetail, {
  IStateProps,
  IOwnProps,
  IDispatchProps
} from "./repository-detail";
import { MapStateToProps, MapDispatchToProps, connect } from "react-redux";
import { RootState } from "../../store/reducers";
import { IImportedRepository, IRequirement } from "../../types";
import { ThunkDispatch } from "redux-thunk";
import { RepositoryManagementActions } from "../../store/repository-management/types";
import { fetchImportedRepositoryDetail } from "../../store/repository-management/action";
import {
  fetchRepoRequirement,
  toggleAddRequirementModal
} from "../../store/requirement/actions";
import { RequirementActions } from "../../store/requirement/types";

const mapStateToProps: MapStateToProps<
  IStateProps,
  IOwnProps,
  RootState
> = state => {
  return {
    requirement: state.requirementReducer.requirement as IRequirement,
    loading: !!state.repositoryManagementReducer.loading,
    repo: state.repositoryManagementReducer
      .importedRepositoryDetail as IImportedRepository
  };
};

const mapDispatchToProps: MapDispatchToProps<IDispatchProps, IOwnProps> = (
  dispatch: ThunkDispatch<
    RootState,
    any,
    RepositoryManagementActions | RequirementActions
  >,
  {
    match: {
      params: { name }
    }
  }: IOwnProps
) => {
  return {
    fetchRepoRequirement: () => dispatch(fetchRepoRequirement(name)),
    fetchRepoDetail: () => dispatch(fetchImportedRepositoryDetail(name)),
    toggleAddRequirementModal: () => dispatch(toggleAddRequirementModal())
  };
};

export const ConnectedRepositoryDetailView = connect(
  mapStateToProps,
  mapDispatchToProps
)(RepositoryDetail);
