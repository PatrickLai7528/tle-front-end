import { connect, MapDispatchToProps, MapStateToProps } from "react-redux";
import { RootState } from "../../store/reducers";
import {
  addRequirement,
  toggleAddRequirementModal
} from "../../store/requirement/actions";
import { RequirementActions } from "../../store/requirement/types";
import { AppDispatch } from "../../store/store";
import AddRequirementModal, {
  IDisipatchProps,
  IOwnProps,
  IStateProps
} from "./add-requirement-modal";
import { IRequirement, IRequirementDescription } from "../../types";

const mapStateToProps: MapStateToProps<
  IStateProps,
  IOwnProps,
  RootState
> = state => {
  return {
    loading: state.requirementReducer.addRequirementLoading,
    visible: state.requirementReducer.addRequirementModalVisible
  };
};

const mapDispatchToProps: MapDispatchToProps<IDisipatchProps, IOwnProps> = (
  dispatch: AppDispatch<RequirementActions>
) => {
  return {
    toggleModal: () => dispatch(toggleAddRequirementModal()),
    addRequirement: (description: Omit<IRequirementDescription, "_id">) =>
      dispatch(addRequirement(description))
  };
};

export const ConnectedAddRequirementModal = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddRequirementModal);
