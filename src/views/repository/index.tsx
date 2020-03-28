import { connect, MapDispatchToProps, MapStateToProps } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { ImportRepositoryAcitons } from "../../store/import-repository/types";
import { RootState } from "../../store/reducers";
import { RepositoryManagementActions } from "../../store/repository-management/types";
import Repository, {
  IDispatchProps,
  IOwnProps,
  IStateProps
} from "./repository";
import { fetchAllRepositoryFromGitHub } from "../../store/repository-management/action";

const mapStateToProps: MapStateToProps<IStateProps, IOwnProps, RootState> = (
  state: RootState
) => {
  return {
    gitHubAccessToken: state.authReducer.gitHubAccessToken,
    rawRepositories: state.repositoryManagementReducer.rawRepositories
    // loading: state.repositoryManagementReducer.loading,
    // loadMoreTimes: state.repositoryManagementReducer.loadMoreTimes
    // importedRepository: state.importRepositoryReducer.importedRepository,
    // importLoading: !!state.importRepositoryReducer.importLoading,
    // importProccessModalVisible: !!state.importRepositoryReducer
    // .importProcessModalVisible
  };
};

const mapDispatchToProps: MapDispatchToProps<IDispatchProps, IOwnProps> = (
  dispatch: ThunkDispatch<
    RootState,
    any,
    RepositoryManagementActions | ImportRepositoryAcitons
  >
) => {
  return {
    fetchAllRepositories: () => dispatch(fetchAllRepositoryFromGitHub())
    // loadMoreRepositories: (accessToken: string, loadMoreTimes: number) =>
    // dispatch(loadMoreRepository(accessToken, loadMoreTimes)),
    // importRepository: (accessToken: string, repository: any) =>
    // dispatch(importRepository(accessToken, repository)),
    // toggleModal: (repository: GitHubAPIRepositoryResponse) =>
    // dispatch(toggleImportProccessModal(repository))
  };
};

export const RepositoryView = connect(
  mapStateToProps,
  mapDispatchToProps
)(Repository);
