import { connect, MapDispatchToProps, MapStateToProps } from "react-redux";
import { Action, Dispatch } from "redux";
import { toggleImportProccessModal } from "../../store/import-repository/action";
import { ImportRepositoryActionTypes } from "../../store/import-repository/types";
import { RootState } from "../../store/reducers";
import ImportProccessModal, {
  IDispatchProps,
  IOwnProps,
  IStateProps
} from "./import-proccess-modal";

const mapStateToProps: MapStateToProps<
  IStateProps,
  IOwnProps,
  RootState
> = state => {
  return {
    visible: !!state.importRepositoryReducer.importProcessModalVisible
  };
};

const mapDispatchToProps: MapDispatchToProps<IDispatchProps, IOwnProps> = (
  dispatch: Dispatch<Action<ImportRepositoryActionTypes>>
) => {
  return {
    toggle: () => dispatch(toggleImportProccessModal())
  };
};

export const ConnectedImportProccessModal = connect(
  mapStateToProps,
  mapDispatchToProps
)(ImportProccessModal);

// export { default as ImportProccessModal } from "./import-proccess-modal";
