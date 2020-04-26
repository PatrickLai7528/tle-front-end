import { Modal, Spin } from "antd";
import React, { FunctionComponent, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import { RootState } from "../../store/reducers";
import { RequirementActions } from "../../store/requirement/types";
import { IRequirementDescription } from "../../types";
import { RequirementForm } from "../requirement/requirement-form";
import {
  toggleAddRequirementModal,
  addRequirement
} from "../../store/requirement/actions";
import { AppDispatch } from "../../store/store";

export interface IAddRequirementModalProps {
  requirementId: string;
}

export const AddRequirementModal: FunctionComponent<IAddRequirementModalProps> = memo(
  (props: IAddRequirementModalProps) => {
    const { requirementId } = props;

    const visible = useSelector<RootState, boolean>(
      state => state.requirementReducer.addRequirementModalVisible
    );
    const loading = useSelector<RootState, boolean>(
      state => state.requirementReducer.addRequirementLoading
    );

    const dispatch = useDispatch<AppDispatch<RequirementActions>>();

    const onCancel = () => dispatch(toggleAddRequirementModal());

    const onDone = (description: Omit<IRequirementDescription, "_id">) =>
      dispatch(addRequirement(requirementId, description));

    return (
      <Modal
        closable={false}
        maskClosable
        footer={null}
        onCancel={onCancel}
        visible={visible}
      >
        <Spin spinning={loading}>
          <RequirementForm onDone={onDone} />
        </Spin>
      </Modal>
    );
  }
);
