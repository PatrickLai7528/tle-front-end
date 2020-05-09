import { connect, MapDispatchToProps, MapStateToProps } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { RootState } from "../../store/reducers";
import { fetchImportedRepositoryList } from "../../store/repository/action";
import { RepositoryManagementActions } from "../../store/repository/types";
import ImportedRepository, {
  IDispatchProps,
  IOwnProps,
  IStateProps
} from "./imported-repository";

const mapStateToProps: MapStateToProps<IStateProps, IOwnProps, RootState> = (
  state: RootState
) => {
  return {
    repositoryList: state.repositoryManagementReducer.importedRepositoryList,
    loading: !!state.repositoryManagementReducer.loading
  };
};

const mapDispatchToProps: MapDispatchToProps<IDispatchProps, IOwnProps> = (
  dispatch: ThunkDispatch<RootState, any, RepositoryManagementActions>
) => {
  return {
    fetchImportedRepositoryList: () => dispatch(fetchImportedRepositoryList())
  };
};

export const ConnectedImportedRepository = connect(
  mapStateToProps,
  mapDispatchToProps
)(ImportedRepository);
