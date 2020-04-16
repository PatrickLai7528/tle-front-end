import { connect, MapDispatchToProps, MapStateToProps } from "react-redux";
import { RootState } from "../../store/reducers";
import {
  confirmInitTraceLink,
  toggleInitTraceLinkModal
} from "../../store/trace-link/actions";
import EditInitTraceLinkModal, {
  IDispatchProps,
  IOwnProps,
  IStateProps
} from "./edit-init-trace-link-modal";

const mapStateToProps: MapStateToProps<
  IStateProps,
  IOwnProps,
  RootState
> = state => {
  const {
    traceLinkReducer: { initTraceLinkEditModalVisible }
  } = state;

  return {
    visible: initTraceLinkEditModalVisible
  };
};

const mapDispatchToProps: MapDispatchToProps<
  IDispatchProps,
  IOwnProps
> = dispatch => {
  return {
    close: () => dispatch(toggleInitTraceLinkModal()),
    confirmInitTraceLink: matrix => dispatch(confirmInitTraceLink(matrix))
  };
};

export const ConnectedEditInitTraceLinkModal = connect(
  mapStateToProps,
  mapDispatchToProps
)(EditInitTraceLinkModal);
