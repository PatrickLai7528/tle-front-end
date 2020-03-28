import { Modal } from "antd";
import React, { FunctionComponent, memo } from "react";
import { ConnectedImportProccess } from "../import-proccess";

export interface IStateProps {
  visible: boolean;
}

export interface IDispatchProps {
  toggle: () => void;
}

export interface IOwnProps {}

export interface IImportProccessModalProps
  extends IStateProps,
    IDispatchProps,
    IOwnProps {}

const ImportProccessModal: FunctionComponent<IImportProccessModalProps> = memo(
  (props: IImportProccessModalProps) => {
    const { visible, toggle } = props;
    return (
      <Modal
        title={null}
        closable={false}
        maskClosable
        visible={visible}
        onOk={toggle}
        onCancel={toggle}
      >
        <ConnectedImportProccess />
      </Modal>
    );
  }
);

export default ImportProccessModal;
