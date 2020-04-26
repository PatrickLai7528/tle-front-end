import { Input, Modal, Spin } from "antd";
import React, { ChangeEvent, FunctionComponent, memo, useState } from "react";
import { useTranslation } from "react-i18next";
import { RequirementForm } from "../requirement/requirement-form";
import { IRequirementDescription } from "../../types";

export interface IStateProps {
  visible: boolean;
  loading: boolean;
}

export interface IDisipatchProps {
  toggleModal: () => void;
  addRequirement: (description: Omit<IRequirementDescription, "_id">) => void;
}

export interface IOwnProps {}

export interface IAddRequirementModalProps
  extends IStateProps,
    IDisipatchProps,
    IOwnProps {}

const AddRequirementModal: FunctionComponent<IAddRequirementModalProps> = memo(
  (props: IAddRequirementModalProps) => {
    const { toggleModal, visible, loading, addRequirement } = props;

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
              addRequirement(description);
            }}
          />
        </Spin>
      </Modal>
    );
  }
);

export default AddRequirementModal;
