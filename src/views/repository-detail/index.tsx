import RepositoryDetail, {
  IStateProps,
  IOwnProps,
  IDispatchProps
} from "./repository-detail";
import { MapStateToProps, MapDispatchToProps, connect } from "react-redux";
import { RootState } from "../../store/reducers";
import {
  IImportedRepository,
  IRequirement,
  IRequirementDescription
} from "../../types";
import { ThunkDispatch } from "redux-thunk";
import { RepositoryActions } from "../../store/repository/types";
import { fetchImportedRepositoryDetail } from "../../store/repository/action";
import {
  fetchRepoRequirement,
  toggleAddRequirementModal,
  deleteRequirement,
  updateRequirement
} from "../../store/requirement/actions";
import { RequirementActions } from "../../store/requirement/types";

const mapStateToProps: MapStateToProps<
  IStateProps,
  IOwnProps,
  RootState
> = state => {
  return {
    requirement: state.requirementReducer.requirement as IRequirement,
    loading: !!state.repositoryReducer.loading,
    repo: state.repositoryReducer
      .importedRepositoryDetail as IImportedRepository,
    deleteRequirementLoading: state.requirementReducer.deleteRequirementLoading
  };
};

const mapDispatchToProps: MapDispatchToProps<IDispatchProps, IOwnProps> = (
  dispatch: ThunkDispatch<
    RootState,
    any,
    RepositoryActions | RequirementActions
  >,
  {
    match: {
      params: { id }
    }
  }: IOwnProps
) => {
  return {
    updateRequirement: requirement => dispatch(updateRequirement(requirement)),
    fetchRepoRequirement: (repoName: string) =>
      dispatch(fetchRepoRequirement(repoName)),
    fetchRepoDetail: () => dispatch(fetchImportedRepositoryDetail(id)),
    toggleAddRequirementModal: () => dispatch(toggleAddRequirementModal()),
    deleteRequirementDescription: (
      requirement: IRequirement,
      description: IRequirementDescription
    ) => dispatch(deleteRequirement(requirement, description))
  };
};

export const ConnectedRepositoryDetailView = connect(
  mapStateToProps,
  mapDispatchToProps
)(RepositoryDetail);
