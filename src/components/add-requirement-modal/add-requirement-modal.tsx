import React, { memo, FunctionComponent, useState, ChangeEvent } from "react";
import { Modal, Input } from "antd";
import { useTranslation } from "react-i18next";
import { useStore } from "react-redux";

export interface IStateProps {
  visible: boolean;
  loading: boolean;
}

export interface IDisipatchProps {
  toggleModal: () => void;
  addRequirement: (description: string) => void;
}

export interface IOwnProps {}

export interface IAddRequirementModalProps
  extends IStateProps,
    IDisipatchProps,
    IOwnProps {}

const AddRequirementModal: FunctionComponent<IAddRequirementModalProps> = memo(
  (props: IAddRequirementModalProps) => {
    const { toggleModal, visible, loading, addRequirement } = props;
    const { t } = useTranslation();
    const [value, setValue] = useState<string | undefined>();

    return (
      <Modal
        closable={false}
        maskClosable
        okText={t("confirm")}
        cancelText={t("cancel")}
        onCancel={toggleModal}
        onOk={() => addRequirement(value || "")}
        visible={visible}
        confirmLoading={loading}
      >
        <Input.TextArea
          autoSize={{ minRows: 6 }}
          placeholder={"Markdown supported"}
          value={value}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
            setValue(e.target.value)
          }
        />
      </Modal>
    );
  }
);

export default AddRequirementModal;
