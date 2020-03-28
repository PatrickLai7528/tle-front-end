import ImportedRepositoryTab, {
  IStateProps,
  IOwnProps,
  IDispatchProps
} from "./imported-repository-tab";
import { MapStateToProps, connect, MapDispatchToProps } from "react-redux";
import { RootState } from "../../store/reducers";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import {
  RepositoryManagementActionTypes,
  RepositoryManagementActions
} from "../../store/repository-management/types";
import { fetchImportedRepositoryList } from "../../store/repository-management/action";

const mapStateToProps: MapStateToProps<IStateProps, IOwnProps, RootState> = (
  state: RootState
) => {
  return {
    repositoryList: state.repositoryManagementReducer.importedRepositoryList
  };
};

const mapDispatchToProps: MapDispatchToProps<IDispatchProps, IOwnProps> = (
  dispatch: ThunkDispatch<RootState, any, RepositoryManagementActions>
) => {
  return {
    fetchImportedRepositoryList: () => dispatch(fetchImportedRepositoryList())
  };
};

export const ConnectedImportedRepositorTab = connect(
  mapStateToProps,
  mapDispatchToProps
)(ImportedRepositoryTab);
