import { Modal, Spin } from "antd";
import React, { FunctionComponent, memo } from "react";
import { IRequirementDescription } from "../../types";
import { RequirementForm } from "../requirement/requirement-form";

export interface IStateProps {
  visible: boolean;
  loading: boolean;
}

export interface IDisipatchProps {
  toggleModal: () => void;
  addRequirement: (
    requirementId: string,
    description: Omit<IRequirementDescription, "_id">
  ) => void;
}

export interface IOwnProps {
  requirementId: string;
}

export interface IAddRequirementModalProps
  extends IStateProps,
    IDisipatchProps,
    IOwnProps {}

const AddRequirementModal: FunctionComponent<IAddRequirementModalProps> = memo(
  (props: IAddRequirementModalProps) => {
    const {
      toggleModal,
      visible,
      loading,
      addRequirement,
      requirementId
    } = props;

    return (
      <Modal
        closable={false}
        maskClosable
        footer={null}
        onCancel={toggleModal}
        visible={visible}
      >
        <Spin spinning={loading}>
          <RequirementForm
            onDone={description => {
              addRequirement(requirementId, description);
            }}
          />
        </Spin>
      </Modal>
    );
  }
);

export default AddRequirementModal;
